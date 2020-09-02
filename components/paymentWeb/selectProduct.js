import React, { Component } from 'react';
import Router from 'next/router';
import { connect } from 'react-redux';
import CONSTANT from 'CONSTANTS';
import Immutable from 'immutable';
import Helper from 'Lib/helper';
import API from 'CONSTANTS/api';
import AlertDialog from 'Components/common/AlertDialog';
import Expansion from 'Components/paymentWeb/Expansion';
import ButtonControlGroup from 'Components/paymentWeb/ButtonControlGroup';
import StatusRow from 'Components/paymentWeb/statusRow';
import UrlChange from 'Components/common/urlChange';
import {
  setProductPopcornFlag,
  setProductPopcornText,
  setBookingTicket,
  addTicket,
  reduceTicket,
  setInitTicketList,
  setInitUseFare,
  addFareProduct,
  reduceFareProduct,
} from 'Actions/productCartActions';
import { setInitFoodList, addFood, reduceFood } from 'Actions/foodCartActions';

class selectProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      isShowAlert: false,
      expandedID: null,
      seeMore: {}, // 偵測看更多
      seeMoreSize: 2, // 看更多隱藏篇數
    };
  }

  componentDidMount() {
    const { productPopcornOpen, setProductPopcornText } = this.props;

    // 打開爆米花
    setProductPopcornText(CONSTANT.popcorn.product.initText);
    productPopcornOpen();

    // 取得資料
    this.fetechProduct();
  }

  fetechProduct = () => {
    const { ticketList, setInitUseFare } = this.props;

    // 檢查Redux是否有資料，若有資料，則不再重新取得
    if (ticketList.size !== 0) {
      this.setState({ isLoading: false });
      return;
    }

    const tickets = [];
    const useFares = {};
    let foods = null;

    Helper.axios.fetch(
      API.PRODUCT.GET_PRODUCT(),

      cb => {
        if (cb.length > 0) {
          cb.forEach(item => {
            if (item.product_type === 1 || item.product_type === 2) {
              tickets[item.product_type - 1] = item;
            }
            if (item.product_type === 3) {
              foods = item;
            }
            useFares[item.product_type] = {
              title: item.product_name,
              id: item.product_type,
              fareNum: item.use_fare,
              fareQty: 0,
              selectedQty: 0,
            };
          });

          setInitUseFare(useFares);
          this.processTicket(tickets);
          this.processFoods(foods);
          this.setState({ isLoading: false });
        }
      },
      {
        errorFn: () => {
          this.setState({ isLoading: false });
          Router.push({ pathname: '/repairPage' });
        },
      },
    );
  };

  // 電影票, 套票
  processTicket = data => {
    if (data.length <= 0) return;
    const { setInitTicketList } = this.props;
    const result = [];
    const seeMore = {};

    // 整理存進redux的資料
    data.map(product => {
      const id = product.product_type;
      seeMore[id] = false;

      result.push({
        id,
        title: product.product_name,
        list: product.product_info.map(item => {
          return {
            sort: item.sort,
            id: item.epfm_id,
            code: item.erp_product_code,
            name: product.product_type === 1 ? item.fare_name : item.short_content,
            summary: product.product_type === 1 ? item.short_fare_name : item.content,
            desc: item.product_description,
            image: item.img_url,
            price: item.price,
            fee: item.fare_fee,
            point: item.bonus_point,
            quantity: 0,
          };
        }),
      });
      return null;
    });

    this.setState({ seeMore });
    setInitTicketList(Immutable.fromJS(result));
  };

  // 加購餐
  processFoods = data => {
    if (data === null) return;
    const { setInitFoodList } = this.props;

    // 整理存進redux的資料
    const result = data.product_info.map(item => ({
      sort: item.sort,
      id: item.epfm_id,
      code: item.erp_product_code,
      name: item.short_content,
      summary: item.content,
      desc: item.product_description,
      image: item.img_url,
      price: item.price,
      fee: item.fare_fee,
      quantity: 0,
    }));

    setInitFoodList(Immutable.fromJS(result));
  };

  // 顯示 警告訊息
  handleAlertOpen = () => {
    this.setState({ isShowAlert: true });
  };

  // 關閉 警告訊息
  handleAlertClose = () => {
    this.setState({ isShowAlert: false });
  };

  // 設定應目前應 展開 或 關閉 的物件
  handleChangeExpandID = (id, data, data2) => {
    let isOpen = false;
    if (
      (data !== null && data !== undefined && data !== '') ||
      (data2 !== null && data2 !== undefined && data2 !== '')
    ) {
      isOpen = true;
    }
    if (!isOpen) return;
    const expandedID = id === this.state.expandedID ? null : id;

    this.setState({ expandedID });
  };

  // 開關看更多功能
  handleSeeMore = id => {
    const { seeMore } = this.state;
    seeMore[id] = !seeMore[id];

    this.setState({ seeMore });
  };

  render() {
    const { isLoading, isShowAlert, expandedID, seeMore, seeMoreSize } = this.state;
    const {
      // 電影票相關
      setBookingTicket,
      bookingTicket = 0,
      selectedTicket = 0,
      ticketList,
      addTicket,
      reduceTicket,
      // 可選優惠票種相關
      addFareProduct,
      reduceFareProduct,
      // 食物相關
      foodList,
      addFood,
      reduceFood,
    } = this.props;

    // 設定應選電影張數
    setBookingTicket(parseInt(bookingTicket));

    return isLoading ? (
      <UrlChange />
    ) : (
      <div className="fullWrap expansionWrap">
        {/* 狀態列 */}
        <StatusRow
          data={[
            { text: '訂購座位數', value: bookingTicket },
            { text: '已選擇', value: selectedTicket },
          ]}
        />

        {/* 電影票 & 套票 */}
        {ticketList.map((group, gIdx) =>
          group.get('list').size > 0 ? (
            <div className="box" key={group.get('id')}>
              <div className="titleWrap noLine">
                <div className="title">{group.get('title')}</div>
                {group.get('list').size > seeMoreSize ? (
                  <div
                    className={`more ${seeMore[group.get('id')] ? 'open' : ''}`}
                    onClick={() => this.handleSeeMore(group.get('id'))}
                  >
                    看更多
                  </div>
                ) : null}
              </div>
              {group
                .get('list')
                .slice(0, seeMore[group.get('id')] ? group.get('list').size : seeMoreSize)
                .map((ticket, tIdx) => (
                  <Expansion
                    key={ticket.get('code')}
                    item={ticket}
                    selectID={expandedID}
                    children={ticket.get('desc')}
                    handleChange={() =>
                      this.handleChangeExpandID(
                        ticket.get('id') + ticket.get('code'),
                        ticket.get('desc'),
                        ticket.get('image'),
                      )
                    }
                    add={() => addTicket(gIdx, tIdx)}
                    reduce={() => reduceTicket(gIdx, tIdx)}
                  />
                ))}
            </div>
          ) : null,
        )}

        {/* 加購餐 */}
        {foodList.size > 0 ? (
          <React.Fragment>
            <div className="title padding-bottom-10">加購餐</div>
            <div className="foodWrap">
              {foodList.map((food, idx) => {
                return (
                  <div key={food.get('code')} className="foodItem">
                    <div className="foodContext">
                      <img src={food.get('image')} />
                      <br />
                      <span className="product_name">{food.get('name')}</span>
                      <ButtonControlGroup
                        price={food.get('price')}
                        quantity={food.get('quantity')}
                        add={() => {
                          addFood(idx);
                          addFareProduct(3, food.get('id'));
                        }}
                        reduce={() => {
                          reduceFood(idx);
                          reduceFareProduct(3, food.get('id'));
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </React.Fragment>
        ) : null}

        {/* 警告訊息 */}
        <AlertDialog
          open={isShowAlert}
          handleClose={this.handleAlertClose}
          title={'請重新選擇'}
          context={'選擇數量與訂購座位數不符喔！'}
        />
      </div>
    );
  }
}

export default connect(
  state => ({
    bookingTicket: state.getIn(['main', 'orderInfo', 'ticketQuantity']),
    selectedTicket: state.getIn(['product', 'selectedTicket']),
    ticketList: state.getIn(['product', 'ticketList']),
    foodList: state.getIn(['food', 'foodList']),
  }),
  dispatch => ({
    productPopcornOpen() {
      dispatch(setProductPopcornFlag(true));
    },
    setProductPopcornText(text) {
      dispatch(setProductPopcornText(text));
    },
    setInitTicketList(data) {
      dispatch(setInitTicketList(data));
    },
    setBookingTicket(qty) {
      dispatch(setBookingTicket(qty));
    },
    addTicket(gIdx, tIdx) {
      dispatch(addTicket({ groupIdx: gIdx, ticketIdx: tIdx }));
    },
    reduceTicket(gIdx, tIdx) {
      dispatch(reduceTicket({ groupIdx: gIdx, ticketIdx: tIdx }));
    },
    setInitUseFare(payload) {
      dispatch(setInitUseFare(payload));
    },
    addFareProduct(id, num) {
      dispatch(addFareProduct({ id, num }));
    },
    reduceFareProduct(id, num) {
      dispatch(reduceFareProduct({ id, num }));
    },
    setInitFoodList(data) {
      dispatch(setInitFoodList(data));
    },
    addFood(Idx) {
      dispatch(addFood({ foodIdx: Idx }));
    },
    reduceFood(Idx) {
      dispatch(reduceFood({ foodIdx: Idx }));
    },
  }),
)(selectProduct);
