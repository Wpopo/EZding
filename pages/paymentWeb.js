import React, { useState, useEffect } from 'react';
import store from 'Store';
import { Provider } from 'react-redux';
import { withRouter } from 'next/router';
import Helper from 'Lib/helper';
import { MuiThemeProvider } from '@material-ui/core/styles';
import muiTheme from 'Styled/materialUITheme';
import Navbar from 'Components/common/navbar';
import HeadMeta from 'Components/headMeta';
import PaymentWebContainer from 'Components/paymentWeb/paymentWebContainer';
import UrlChange from 'Components/common/urlChange';
import * as memberAPI from '../actions/memberAPI';

const PaymentWeb = (props) => {
  const { router } = props;
  const [isLoading, setLoading] = useState(false);
  const [isNavber, setNavber] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      setLoading(true);
    }

    // 判斷是否需要隱藏天地 : line/ App/ isHide = 1
    const chId = sessionStorage.getItem('channel');
    const isHide = sessionStorage.getItem('isHide');
    if (chId !== 'line' && chId !== 'MRAPP' && !router.query.comeFromApp && isHide !== '1') {
      setNavber(true);
    }

    // Line進來的要手動換token
    if (chId === 'line' && !isLoading) {
      const code = Helper.data.getUrlParam(window.location.href).code;
      if (code !== undefined) {
        // member token get
        memberAPI
          .webCodeGetToken(Helper.data.getUrlParam(window.location.href).code)
          .then((result) => {
            localStorage.setItem('accessToken', result.result.access_token);
            setLoading(true);
          })
          .catch(() => {});
      }
    }

    // 判斷是不是從 app 來
    if (router.query.comeFromApp) {
      const {
        sessionId,
        cinemaTransId,
        seatsInfo,
        userToken,
        comeFromApp,
        ticketQuantity,
        sourceChannel,
        osType,
      } = router.query;
      const bodyData = {
        channelCode: 'ezding',
        campaignCode: `ezding${sourceChannel}_${osType}`,
        userToken,
        seatsInfo,
        cinemaTransId,
        comeFromApp,
        sessionId,
        ticketQuantity,
        osType,
      };
      sessionStorage.setItem('bodyData', JSON.stringify(bodyData));
      sessionStorage.setItem('paymentInit', true);
      localStorage.setItem('accessToken', userToken);

      setLoading(true);
    }

    // 初始化導頁系統
    Helper.redirect.init();
  }, []);

  useEffect(() => {
    // 檢查Payment資料是否存在
    Helper.redirect.checkData();
  });

  return (
    <Provider store={store}>
      <MuiThemeProvider theme={muiTheme}>
        <HeadMeta />
        {isNavber ? <Navbar notChangeToken url={router} bookingFunc={(bool) => setLoading(bool)} /> : null}
        {isLoading ? <PaymentWebContainer isNavber={isNavber} /> : <UrlChange />}
      </MuiThemeProvider>
    </Provider>
  );
};
export default withRouter(PaymentWeb);
