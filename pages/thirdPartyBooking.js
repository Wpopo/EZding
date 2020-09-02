import React from 'react';
import UrlChange from '../components/common/urlChange';
import Router from 'next/router';
import Helper from 'Lib/helper';
import API from 'CONSTANTS/api';

class ThirdPartyBooking extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      router: '',
    };
  }

  componentDidMount() {
    this.setState(
      {
        router: Router.router,
      },
      () => {
        // 完成交易(外部交易)
        this.completeExternalOrder();
      },
    );
  }

  // 完成交易（第三方）
  completeExternalOrder = () => {
    const {
      channel_foreign_trans_id,
      bank_trans_id,
      bank_code,
      redeem_price,
      redeem_point,
      code,
    } = this.state.router.query;

    const redirectPage = localStorage.getItem('redirectPage');

    if (code === '200') {
      const orderData = {
        channel_foreign_trans_id,
        bank_code,
        bank_trans_id,
        redeem_price,
        redeem_point,
      };

      const token = localStorage.getItem('accessToken');

      Helper.axios.fetch(
        API.ORDERS.COMPLETE_EXTERNAL_ORDER(orderData, token),
        cb => {
          const orderID = cb.ez_order_id;
          // 進行導頁
          if (redirectPage === 'lineToday') {
            // 導回 line today
            const urlLine = encodeURI(`mypage/movie?orderId=${orderID}`);
            location.href = `line://nv/news?page=${urlLine}`;
          } else if (redirectPage === 'comeFromApp') {
            // 導回 app
            const urlLine = encodeURI(orderID);
            location.href = `ezding.movieOrder://${urlLine}`;
          } else {
            sessionStorage.setItem('orderID', orderID);
            Router.push({
              pathname: '/endingPage',
            });
          }
        },
        {
          // 錯誤導頁
          errorFn: () => redirectPage === 'comeFromApp'
              ? (window.location.href = `ezding.movieOrder://error_${encodeURI('訂票失敗')}`)
              : Router.push({
                  pathname: '/bookingError',
                }),
        },
      );
    } else {
      // new payment 回覆錯誤
      redirectPage === 'comeFromApp'
        ? (window.location.href = `ezding.movieOrder://error_${encodeURI('訂票失敗')}`)
        : Router.push({
            pathname: '/bookingError',
          });
    }
  };

  render() {
    return (
      <div>
        <UrlChange />
      </div>
    );
  }
}

export default ThirdPartyBooking;
