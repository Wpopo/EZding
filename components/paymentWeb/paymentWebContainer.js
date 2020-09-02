import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import { connect } from 'react-redux';
import Helper from 'Lib/helper';
import AlertDialog from 'Components/common/AlertDialog';
import ServicePolicy from 'Components/paymentWeb/servicePolicy';
import SelectProduct from 'Components/paymentWeb/selectProduct';
import SelectPreferential from 'Components/paymentWeb/Preferential/selectPreferential';
import Checkout from 'Components/paymentWeb/Checkout';
import Information from 'Components/paymentWeb/Information';
import { PaymentWebWrapper } from 'Styled/paymentGoStyled';
import { mainReset, setPopcornFlag, setView, setPreferentialView } from 'Actions/mainActions';
import { productReset, setProductPopcornFlag } from 'Actions/productCartActions';
import { foodReset } from 'Actions/foodCartActions';
import { preferentialReset, setPreferentialPopcornFlag } from 'Actions/preferentialActions';
import Button from '@material-ui/core/Button';

const PaymentWeb = ({ ...props }) => {
  const {
    view,
    setView,
    setPreferentialView,
    mainReset,
    productReset,
    foodReset,
    preferentialReset,
    popcornClose,
    productPopcornClose,
    preferentialPopcornClose,
    isNavber,
  } = props;

  const [open, setOpen] = useState(false);

  useEffect(() => {
    // 監聽重新整理
    window.onbeforeunload = handleBeforeunload;

    const nView = Helper.data.getUrlParam(window.location.href).pages;
    // 是否開起警告視窗
    setOpen(Helper.redirect.getStorageData('open'));
    Helper.redirect.setStorage('open', false);

    // 若初始畫面無帶參數時，給定預設頁面
    // 若有設定，則直接帶入指定頁面
    if (nView === null || nView === undefined || nView === '') {
      Router.push({
        pathname: '/paymentWeb',
        query: { pages: 'servicePolicy' },
      });
    } else {
      setView(nView);
    }

    // 重新整理 導回首頁
    if (Helper.redirect.getStorageData('forceLeave')) {
      leaveReset();
      window.location.href = '/';
    }

    // 處理頁面轉跳行為
    Router.events.on('routeChangeStart', url => {
      if (url.startsWith('/paymentWeb')) {
        setView(Helper.data.getUrlParam(url).pages);
      }
      Helper.redirect.handleRouteChange(url);
    });

    return () => {
      const redirect = Helper.redirect.getStorage();

      if (redirect === null || redirect === undefined) {
        leaveReset();
        return;
      }
      // 強制離開
      if (redirect.forceLeave) {
        leaveReset();
        Router.push(redirect.goToUrl);
        return;
      }

      if (redirect.open) {
        Router.push({
          pathname: '/paymentWeb',
          query: { pages: redirect.leaveFromUrl },
        });
        return;
      }

      // 以上情況皆不符合
      // 離開Payment Web
      leaveReset();
    };
  }, []);

  // 監聽頁面轉跳時，需將參數寫入網址
  useEffect(() => {
    if (location.pathname === '/paymentWeb' && view !== undefined && view !== null && view !== '') {
      // 到選商品頁時，清空優惠內容，防止User使用瀏覽器亂跳頁
      if (view === 'selectProduct') {
        preferentialReset();
        setPreferentialView('');
      }
      // 到選規則頁時，清空優惠、商品內容，防止User使用瀏覽器亂跳頁
      if (view === 'servicePolicy') {
        productReset();
        foodReset();
        preferentialReset();
      }

      Router.push({
        pathname: '/paymentWeb',
        query: { pages: view },
      });
    }
  }, [view]);

  // 處理重新整理事件
  const handleBeforeunload = e => {
    e.returnValue = '本頁所選內容將不會保留，確定結束此次訂購嗎？';
  };

  // Reset PaymentWeb
  const leaveReset = () => {
    // 離開Payment時，清空Redux資料 & storage資料
    Router.events.off('routeChangeStart', Helper.redirect.handleRouteChange());
    window.onbeforeunload = null;
    mainReset();
    productReset();
    foodReset();
    preferentialReset();
    localStorage.removeItem('redirectPage');
    sessionStorage.removeItem('bodyData');
    sessionStorage.removeItem('campaignCode');
    sessionStorage.removeItem('channel');
    sessionStorage.removeItem('redirectClose');
    sessionStorage.removeItem('redirectPaymentUrl');
    sessionStorage.removeItem('redirectLeaveUrl');
    sessionStorage.removeItem('redirect');
  };

  // Reset 爆米花
  const popcornReset = () => {
    popcornClose();
    productPopcornClose();
    preferentialPopcornClose();
  };

  return (
    <PaymentWebWrapper isNavber={isNavber}>
      {/* Debug專用 - START */}
      {/* <div style={{ marginBottom: '30px', border: '1px solid #ffffff' }}>
        <Button onClick={() => setView('servicePolicy')}>會員條款</Button>
        <Button onClick={() => setView('selectProduct')}>選商品</Button>
        <Button onClick={() => setView('selectPreferential')}>選優惠</Button>
        <Button onClick={() => setView('checkOut')}>去結帳</Button>
      </div> */}
      {/* Debug專用 - END */}
      <AlertDialog
        open={open}
        style={'YESNO'}
        handleCancle={() => setOpen(false)}
        handleClose={() => {
          Router.push(Helper.redirect.getStorageData('goToUrl'));
          Helper.redirect.setStorage('forceLeave', true);
        }}
        title={'注意'}
        context={'本頁所選內容將不會保留，確定結束此次訂購嗎？'}
      />
      <div className="fullPage" onClick={() => popcornReset()}>
        {(() => {
          switch (view) {
            // 會員條款
            case 'servicePolicy':
              return <ServicePolicy />;

            // 選商品
            case 'selectProduct':
              return (
                <div className="twoBlocks">
                  <div className="left">
                    <SelectProduct />
                  </div>
                  <Information />
                </div>
              );

            // 選優惠
            case 'selectPreferential':
              return (
                <div className="twoBlocks">
                  <div className="left">
                    <SelectPreferential />
                  </div>
                  <Information />
                </div>
              );

            // 去結帳
            case 'checkOut':
              return (
                <div className="twoBlocks">
                  <div className="left">
                    <Checkout />
                  </div>
                  <Information />
                </div>
              );
            default:
              return null;
          }
        })()}
      </div>
    </PaymentWebWrapper>
  );
};
const PaymentWebContainer = connect(
  state => ({ view: state.getIn(['main', 'view']) }),
  dispatch => ({
    mainReset() {
      dispatch(mainReset());
    },
    productReset() {
      dispatch(productReset());
    },
    foodReset() {
      dispatch(foodReset());
    },
    preferentialReset() {
      dispatch(preferentialReset());
    },
    setView(view) {
      dispatch(setView(view));
    },
    setPreferentialView(view) {
      dispatch(setPreferentialView(view));
    },
    popcornClose() {
      dispatch(setPopcornFlag(false));
    },
    productPopcornClose() {
      dispatch(setProductPopcornFlag(false));
    },
    preferentialPopcornClose() {
      dispatch(setPreferentialPopcornFlag(false));
    },
  }),
)(PaymentWeb);

export default PaymentWebContainer;
