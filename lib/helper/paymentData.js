import store from 'Store';
import HelperData from './data';
import Button from '@material-ui/core/Button';

const Helper = {
  // 取得資訊欄資料
  // 格式：
  // [
  //   0, // 總金額
  //   [
  //     [{...tickets props, preferential:{...}}, {...}, ...] 電影票
  //     [{...tickets props, preferential:{...}}, {...}, ...] 套票
  //   ],
  //   [{...foods props}, {...}, ...] 加購餐
  // ]
  //
  // ** 注意：目前僅抓取電影片優惠，若未來套票和加購餐有需求，需在改寫 **
  getInformatData() {
    const state = store.getState();
    const result = [0, [], []];

    let money = 0;

    const ticketList = state.getIn(['product', 'ticketList']).toJS();
    const foodList = state.getIn(['food', 'foodList']).toJS();
    const ticketFareNum = state.getIn(['product', 'useFare', '1', 'fareNum']);
    const selectedFareTicket = state.getIn(['preferential', 'selectedFareTicket']);
    let preferential = [];

    // 如果未選擇優惠票種 或 未定義優惠票種 則不抓取優惠清單
    // if (selectedFareTicket > 0) {
    if (selectedFareTicket > 0 && ticketFareNum !== null) {
      preferential = this.getPreferentialList();
    }

    // 處理目前所選的電影票
    if (ticketList === [] || ticketList === undefined) result[1] = [];
    ticketList.map(item => {
      // 無商品
      if (item.list.length <= 0) return null;

      const subItem = [];
      // 從商品清單選出 數量大於0
      item.list.map(ticket => {
        if (ticket.quantity > 0) {
          // 確認能使用優惠的票種
          if (ticketFareNum.includes(ticket.id) && preferential.length > 0) {
            // 搭配優惠情況
            // 原商品數量扣除搭配優惠數量
            ticket.quantity -= selectedFareTicket;
            // 搭配優惠寫入該商品參數
            ticket.preferential = preferential;

            // 優惠票價加總
            // 優惠數量 * (優惠價格+商品手續費)
            // console.log(preferential);
            money += preferential.reduce((acc, item) => {
              // coupon的情況
              // 迴圈計算coupon折抵後的價錢
              if (item.couponList !== undefined) {
                let couponMoney = 0;
                couponMoney += item.couponList.reduce((acc2, coupon) => {
                  const tempCouponMoney = HelperData.calCouponPrice(ticket.price, coupon.price, coupon.mode);
                  // 將折價後的價錢存進列表中
                  coupon.discount = tempCouponMoney;
                  return acc2 + tempCouponMoney + ticket.fee;
                }, 0);
                return acc + couponMoney;
              }
              return acc + item.quantity * (item.price + ticket.fee);
            }, 0);
            // 數量 * (票價+手續費)
            money += ticket.quantity * (ticket.price + ticket.fee);
          } else {
            // 未搭配優惠情況
            // 算出此票種金額
            // 數量 * (票價+手續費)
            money += ticket.quantity * (ticket.price + ticket.fee);
          }
          subItem.push(ticket);
        }
        return null;
      });

      if (subItem.length > 0) result[1].push(subItem);
      return null;
    });

    // 處理目前所選的加購餐
    if (foodList === [] || foodList === undefined) result[2] = [];
    foodList.map(food => {
      // 從商品清單選出 數量大於0
      if (food.quantity > 0) {
        // 算出此票種金額
        // 數量 * (價錢+手續費)
        money += food.quantity * (food.price + food.fee);
        result[2].push(food);
      }
      return null;
    });

    result[0] = money;
    return result;
  },

  // 取得電影票優惠清單
  getPreferentialList() {
    const state = store.getState();

    const preferential = [];
    const preferentialList = state.getIn(['preferential']).toJS();

    // 處理目前所選的電影票優惠
    if (preferentialList.selectedFareTicket > 0) {
      // *** 銀行優惠 ***
      if (preferentialList.bank.selected !== '' && preferentialList.bank.selected !== undefined) {
        // 紅利折抵 type = 0, 滿額贈票 type = 1
        const type = preferentialList.bank.selected.split('-')[0];
        const item = preferentialList.bank.selected.split('-')[1];

        // 紅利折抵
        if (type === '0') {
          preferential.push(preferentialList.bank.point[item]);
        }
        // 滿額贈票
        if (type === '1') {
          preferential.push(preferentialList.bank.purchase[item]);
        }
      }

      // *** 會員紅利 ***
      // 若有選擇會員紅利，則將會員紅利優惠大項加入已選優惠清單
      if (preferentialList.redPoint.quantity > 0) preferential.push(preferentialList.redPoint);

      // *** 優惠序號 ***
      if (preferentialList.serialNum.quantity > 0) {
        const couponList = [];

        // 手動輸入Coupon
        preferentialList.serialNum.tempCoupon.map(item => (item.selected ? couponList.push(item) : null));
        // 歸戶Coupon
        preferentialList.serialNum.personalCoupon.map(item => (item.selected ? couponList.push(item) : null));

        // 若有選擇Coupon，則將Coupon優惠大項加入已選優惠清單
        if (couponList.length > 0) {
          preferentialList.serialNum.couponList = couponList;
          preferential.push(preferentialList.serialNum);
          preferentialList.serialNum.coupon_no = couponList.map(coupon => coupon.code).join(',');
        }
      }

      // *** 消費點數 ***
      preferentialList.salesPoint.list.map(item => (item.quantity > 0 ? preferential.push(item) : null));
    }

    return preferential;
  },

  // 取得目前所選的電影票
  getSelectedTicket() {
    const state = store.getState();
    const result = [];
    const selectedTicket = state.getIn(['product', 'selectedTicket']);
    const ticketList = state.getIn(['product', 'ticketList']).toJS();

    // 已選座位數量大於0
    if (selectedTicket > 0) {
      ticketList.map(item => item.list.map(ticket => (ticket.quantity > 0 ? result.push(ticket) : null)));
    }

    return result;
  },

  // 取得目前所選的加購餐
  getSelectedFood() {
    const state = store.getState();
    const foodList = state.getIn(['food', 'foodList']).toJS();
    const result = [];

    if (foodList !== [] && foodList !== undefined) {
      // 從商品清單選出 數量大於0
      foodList.map(food => (food.quantity > 0 ? result.push(food) : null));
    }

    return result;
  },

  // 優惠頁 取得所有商品 已呈現該顯示Side bar
  // {id:bool, id:bool,...}
  // EX: {1:true, 3:true}
  getShowSideBar() {
    const state = store.getState();
    const ticketList = state.getIn(['product', 'ticketList']).toJS();
    const foodList = state.getIn(['food', 'foodList']).toJS();
    const result = {};

    ticketList.map(ticket => ticket.list.map(item => (item.quantity > 0 ? (result[ticket.id] = true) : null)));
    foodList.map(food => (food.quantity > 0 ? (result[3] = true) : null));
    return result;
  },

  // 結帳頁 取得所有商品、優惠資訊的ID
  // EX: "16,28,.."
  getCheckOutID() {
    const orderList = this.getInformatData(); //  [0, [], []]
    let result = [];

    // 處理票價、套票
    orderList[1].map(product =>
      product.map(ticket => {
        ticket.preferential !== undefined
          ? // 優惠票數大於零
            ticket.preferential.map(pre => (pre.quantity > 0 ? result.push(pre) : null))
          : null;

        // 票數大於零
        ticket.quantity > 0 ? result.push(ticket) : null;
      }),
    );

    // 處理加購餐
    result = result.concat(this.getSelectedFood());

    // 整理取得資訊
    if (result.length > 0) {
      result = result.map(item => item.id).join(',');
    } else {
      result = 0;
    }

    return result;
  },

  // 結帳頁 取得所有商品、優惠資訊
  getCheckOutOrder() {
    const orderList = this.getInformatData(); //  [0, [], []]
    let result = [];

    // 處理票價、套票
    orderList[1].map(product =>
      product.map(ticket => {
        ticket.preferential !== undefined
          ? // 優惠票數大於零
            ticket.preferential.map(pre => (pre.quantity > 0 ? result.push(pre) : null))
          : null;

        // 票數大於零
        ticket.quantity > 0 ? result.push(ticket) : null;
      }),
    );

    // 處理加購餐
    result = result.concat(this.getSelectedFood());

    // 整理取得資訊
    if (result.length > 0) {
      result = result.map(item => ({
        epfm_id: item.id,
        erp_product_code: item.code,
        quantity: item.quantity,
        coupon_no: item.coupon_no !== undefined ? item.coupon_no : '',
        check_number:
          item.check_number !== undefined
            ? item.check_number
            : // 滿額贈票的情況
            item.checkInfo !== undefined
            ? item.checkInfo.check_number !== undefined
              ? item.checkInfo.check_number
              : ''
            : '',
        trans_info: item.trans_info !== undefined ? item.trans_info : null,
      }));
    }
    return result;
  },

  // 結帳頁 取得環境變數
  getCheckOutEVN() {
    const state = store.getState();
    const options = state.getIn(['main', 'orderInfo', 'options']);
    const campaign_code = state.getIn(['main', 'orderInfo', 'campaignCode']);
    const channel_code = state.getIn(['main', 'orderInfo', 'channelCode']);
    const ez_trans_master_id = state.getIn(['main', 'movieInfo', 'ez_trans_master_id']);
    const os_type = state.getIn(['main', 'orderInfo', 'osType']);
    const result = { options, campaign_code, channel_code, ez_trans_master_id, os_type };

    return result;
  },

  // 產生資訊欄下方Button
  createInformationButon: props => {
    const { view = '', setView, setPopcornFlag, setPopcornText } = props;
    const state = store.getState();
    const selectedFareTicket = state.getIn(['product', 'selectedTicket']);
    const bookingTicket = state.getIn(['product', 'bookingTicket']);

    let jsx = '';

    if (view === 'selectProduct') {
      jsx = (
        <Button
          className="common-btn"
          variant="contained"
          onClick={e => {
            if (selectedFareTicket !== bookingTicket) {
              setPopcornFlag(true);
              setPopcornText('選擇商品與訂購座位數不符喔！');
              e.stopPropagation();
            } else {
              setView('selectPreferential');
            }
          }}
        >
          選優惠
        </Button>
      );
    } else if (view === 'selectPreferential') {
      if (selectedFareTicket !== bookingTicket) setView('selectProduct');
      jsx = (
        <Button className="common-btn" variant="contained" onClick={() => setView('checkOut')}>
          去結帳
        </Button>
      );
    } else if (view === 'checkOut') {
      jsx = (
        <Button
          className="common-btn"
          variant="contained"
          onClick={() => document.getElementById('checkOutBtn').click()}
        >
          去結帳
        </Button>
      );
    }

    return jsx;
  },

  // 爆米花控制項
  processPopcorn: (flag, setFlag, text, setText, props) => {
    // console.log(flag);
    // console.log(props);

    const {
      popcornFlag,
      popcornText,
      ticketPopcornFlag,
      ticketPopcornText,
      preferentialPopcornText,
      preferentialPopcornFlag,
    } = props;
    // 爆米花控制項 有順序關係
    // 重要性高的 請擺前面
    if (popcornFlag) {
      // main redux popcorn controll
      if (flag === true && text === popcornText) return;
      setFlag(true);
      setText(popcornText);
    } else if (ticketPopcornFlag) {
      if (flag === true && text === ticketPopcornText) return;
      setFlag(true);
      setText(ticketPopcornText);
    } else if (preferentialPopcornFlag) {
      if (flag === true && text === preferentialPopcornText) return;
      setFlag(true);
      setText(preferentialPopcornText);
    } else {
      if (flag === false) return;
      setFlag(false);
    }
  },
};

export default Helper;
