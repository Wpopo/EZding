import React, { Component } from 'react';
import Router from 'next/router';
import { connect } from 'react-redux';
import CONSTANTS from 'CONSTANTS';
import Helper from 'Lib/helper';
import API from 'CONSTANTS/api';
import { setView, setMovieInfo, setErpCode, setInitOrderInfo } from 'Actions/mainActions';
import CheckCircle from 'Components/common/CheckCircle';
import ScrollDialog from 'Components/common/ScrollDialog';
import UrlChange from 'Components/common/urlChange';
import Button from '@material-ui/core/Button';
import { ServicePolicyWrapper } from 'Styled/paymentGoStyled';

class servicePolicy extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      context: ['目前暫無資訊'],
      isAgree: false,
      isShow: false,
    };
  }

  componentDidMount() {
    // 存入 reducer
    const { setInitOrderInfo, ecmID } = this.props;
    const bodyData = JSON.parse(sessionStorage.getItem('bodyData'));
    if (bodyData !== null) setInitOrderInfo(bodyData);
    const token = localStorage.getItem('accessToken') || (bodyData !== null ? bodyData.userToken : null);

    // payment 初始化 call Api
    if (sessionStorage.getItem('paymentInit')) {
      // 如果有 comeFromApp 就代表從 app 來的
      if (bodyData.comeFromApp) {
        this.newOrder(bodyData, token);
        localStorage.setItem('redirectPage', 'comeFromApp');
      } else {
        this.bookingSelectedSeats(bodyData, token);
        this.newOrder(bodyData, token);
      }
      if (bodyData.channelCode === 'line') {
        localStorage.setItem('redirectPage', 'lineToday');
      }
      if (bodyData.channelCode === 'MRAPP') {
        localStorage.setItem('redirectPage', 'MRAPP');
      }
      sessionStorage.removeItem('paymentInit');
    } else {
      // 取得影城規定
      this.fetchRule(ecmID);
    }
  }

  // 取得影城規定
  fetchRule = (ecmID) => {
    // 取得影城規則
    Helper.axios.fetch(
      API.CINEMAS.GET_INFO(ecmID),
      (cb) => {
        if (cb[0] !== undefined) {
          this.setState({ context: decodeURIComponent(escape(window.atob(cb[0].cinema_provision))), isLoading: false });
        }
      },
      {
        errorFn: () => this.setState({ context: '查無此系列影城', isLoading: false }),
        cusCode: { 300: (msg) => this.setState({ context: msg, isLoading: false }) },
      },
    );
  };

  // 鎖位 booking_selected_seats
  bookingSelectedSeats = (data, token) => {
    const {
      cinema_id,
      movie_id,
      sessionId,
      transaction_id,
      seat_idx_list,
      hall_id,
      area_num,
      area_category_code,
      cinema_trans_id,
    } = data;
    const seatsData = {
      session_id: sessionId,
      cinema_id,
      movie_id,
      transaction_id,
      seat_idx_list,
      hall_id,
      area_num,
      area_category_code,
      cinema_trans_id,
    };
    Helper.axios.fetch(API.ORDERS.LOCK_SEATS(seatsData, token), (cb) => {}, {
      errorFn: () => {
        Router.push({ pathname: '/repairPage' });
      },
    });
  };

  // 新增訂購資訊
  newOrder = (data, token) => {
    const { setMovieInfo, setErpCode } = this.props;
    const { sessionId, cinemaTransId, seatsInfo, channelCode, campaignCode } = data;
    const orderData = {
      cinema_trans_id: cinemaTransId,
      session_id: sessionId,
      seats_info: seatsInfo,
      channel_code: channelCode || 'ezding',
      campaign_code: campaignCode || 'ezding',
    };

    Helper.axios.fetch(
      API.ORDERS.NEW_ORDER(orderData, token),
      (cb) => {
        const erpCode = cb.erp_product_code.join(',');
        setMovieInfo(cb);
        setErpCode(erpCode);
        this.setState({ movieInfo: cb });
        // 取得影城規定
        this.fetchRule(cb.ecm_id);
      },
      {
        errorFn: () => {
          Router.push({ pathname: '/repairPage' });
        },
      },
    );
  };

  setAgree = () => {
    this.setState({ isAgree: true });
  };

  handleOpen = () => {
    this.setState({ isShow: true });
  };

  handleClose = () => {
    this.setState({ isShow: false });
  };

  render() {
    const { isLoading, context, isAgree, isShow } = this.state;
    const { setView } = this.props;

    return isLoading ? (
      <UrlChange />
    ) : (
      <ServicePolicyWrapper>
        <div className="boxWrap">
          <div className="box">
            <p dangerouslySetInnerHTML={Helper.data.createMarkup(context)} />
          </div>
        </div>
        <div className="bottom">
          <CheckCircle onClick={this.setAgree} isChecked={isAgree} />
          <span>我已閱讀並同意上述訂票規定及</span>
          <span className="tag" onClick={this.handleOpen}>
            會員條款
          </span>
        </div>
        <div className="center">
          <Button
            className="common-btn"
            variant={isAgree ? 'contained' : null}
            disabled={!isAgree}
            onClick={() => setView('selectProduct')}
          >
            同意
          </Button>
        </div>

        {/* 會員條款 Modal */}
        <ScrollDialog open={isShow} handleClose={this.handleClose} children={CONSTANTS.POLICY.MEMBER_POLICY} />
      </ServicePolicyWrapper>
    );
  }
}

export default connect(
  (state) => ({
    ecmID: state.getIn(['main', 'movieInfo', 'ecm_id']),
  }),
  (dispatch) => ({
    setView(view) {
      dispatch(setView(view));
    },
    setMovieInfo(data) {
      dispatch(setMovieInfo(data));
    },
    setErpCode(data) {
      dispatch(setErpCode(data));
    },
    setInitOrderInfo(data) {
      dispatch(setInitOrderInfo(data));
    },
  }),
)(servicePolicy);
