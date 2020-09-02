import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helper from 'Lib/helper';
import API from 'CONSTANTS/api';
import CuponCard from 'Components/common/CuponCard';
import Tooltip from 'Components/common/Tooltip';
import Palette from 'Styled/palette';
import { setPersonalCoupon, addOneCoupon } from 'Actions/preferentialActions';
import { withStyles } from '@material-ui/core/styles';

class SerialNum extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mode: 'add',
    };
  }

  componentDidMount() {
    this.fetchPersonalCoupon();
  }

  // 取得會員歸戶coupon清單
  fetchPersonalCoupon = () => {
    const { setPersonalCoupon, personalCoupon, setAlert } = this.props;

    if (personalCoupon === undefined) return;
    if (personalCoupon.length > 0) return;

    Helper.axios.fetch(
      API.PRODUCT.GET_PERSONAL_COUPON(),
      cb => {
        if (cb !== undefined) {
          const result = cb.map((item, id) => ({
            id,
            mode: item.discount_mode,
            title: item.coupon_name,
            price: item.discount_amount,
            code: item.coupon_no,
            date: `${Helper.datetime.MsToformat(item.start_time)}-${Helper.datetime.MsToformat(item.end_time)}`,
            selectID: `personal-${id}`,
            selected: false,
          }));

          setPersonalCoupon(result);
        }
      },
      {
        cusCode: { 300: msg => setAlert(msg) },
      },
    );
  };

  // 檢核單筆coupon資訊
  handleCheckCoupon = (couponText, errorHandler) => {
    const { addOneCoupon, tempCoupon } = this.props;

    Helper.axios.fetch(
      API.PRODUCT.GET_ONE_COUPON(couponText),
      cb => {
        if (cb !== undefined) {
          const { coupon_no, discount_mode, coupon_name, discount_amount, end_time, start_time } = cb;
          const id = tempCoupon === undefined ? 0 : tempCoupon.length;
          // if (code === '200') {
          // 成功檢核序號
          addOneCoupon({
            id,
            mode: discount_mode,
            title: coupon_name,
            price: discount_amount,
            code: coupon_no,
            date: `${Helper.datetime.MsToformat(start_time)}-${Helper.datetime.MsToformat(end_time)}`,
            selectID: `temp-${id}`,
            selected: false,
          });
          this.setState({ mode: 'add' });
        }
      },
      {
        noHandleCode: [],
        cusCode: { 300: msg => errorHandler(msg) },
      },
    );
  };

  render() {
    const { mode } = this.state;
    const { classes, personalCoupon, tempCoupon } = this.props;
    const isPCouponValid = personalCoupon !== undefined ? personalCoupon.length > 0 : false;
    return (
      <div>
        <div className={classes.block}>
          <div className="Blocktitle">手動輸入優惠序號<Tooltip text="＊可於會員中心進行優惠券歸戶作業。優惠序號皆以一般時段票價進行折抵(若訂購早場票會於結帳時轉換)" /></div>
          <div className={classes.cardWrap}>
            {mode === 'add' ? (
              <div
                onClick={() => {
                  this.setState({ mode: 'input' });
                }}
              >
                <CuponCard styleView="addCard" />
              </div>
            ) : (
              <CuponCard styleView="inputCard" handleCheckCoupon={this.handleCheckCoupon} />
            )}

            {/* 手動輸入並驗證成功的Coupon */}
            {tempCoupon !== undefined
              ? tempCoupon.map(card => <CuponCard key={card.id} styleView="commonCard" data={card} type="temp" />)
              : null}
          </div>
        </div>
        <div className={classes.block}>
          <div className="Blocktitle">
            已歸戶優惠序號
            <Tooltip text="＊可於會員中心進行優惠券歸戶作業。優惠序號皆以一般時段票價進行折抵(若訂購早場票會於結帳時轉換)" />
          </div>

          <div className={classes.cardWrap}>
            {isPCouponValid ? (
              personalCoupon.map(card => <CuponCard key={card.id} styleView="commonCard" data={card} />)
            ) : (
              <span className="noData">您目前沒有已歸戶的優惠序號</span>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
  block: {
    paddingBottom: '30px',
    '& .Blocktitle': {
      display: 'flex',
      color: '#FFFFFF',
      fontSize: '16px',
      lineHeight: '20px',
      padding: '10px 0px',
    },
  },

  cardWrap: {
    display: 'flex',
    flexWrap: 'wrap',
    // 加上 card 的padding-right 5px
    // 已維持畫面比例
    width: 'calc(100% + 5px)',
    '& .noData': {
      fontSize: '16px',
      color: Palette.secondary['gray-60'],
      margin: '60px auto 0 auto',
    },
  },
};

export default connect(
  state => ({
    tempCoupon: state.getIn(['preferential', 'serialNum', 'tempCoupon']),
    personalCoupon: state.getIn(['preferential', 'serialNum', 'personalCoupon']),
  }),
  dispatch => ({
    addOneCoupon(data) {
      dispatch(addOneCoupon({ data }));
    },
    setPersonalCoupon(data) {
      dispatch(setPersonalCoupon(data));
    },
  }),
)(withStyles(styles)(SerialNum));
