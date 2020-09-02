import Router from 'next/router';

const Helper = {
  fetch: (API, callback, { noHandleCode = [], cusCode = {}, errorFn = null } = {}) => {
    API.then(res => {
      // console.log(res);
      return res.data;
    })
      .then(data => {
        // 正常取得API資料
        if (data.code === '200') {
          return data.result !== undefined ? callback(data.result, data.code, data.message) : callback(data);
        }

        // API Error
        // custom do not handle error code
        if (noHandleCode.includes(data.code)) {
          return null;
        }

        // custom template error handle
        if (data.code === '300') {
          if (cusCode[data.code] !== undefined) {
            if (typeof cusCode[data.code] === 'function') {
              return cusCode[data.code](data.message);
            }
          }
        }

        // default Template error handle
        if (data.code === '401.103') {
          throw new Error('使用者存取TOKEN無效');
        } else {
          throw new Error('Bad response from server');
        }
      })
      .catch(error => {
        const redirectPage = localStorage.getItem('redirectPage');
        if (redirectPage === 'comeFromApp') {
          // 執行付款，關閉導頁監控
          window.onbeforeunload = null;

          let msg = 'Bad response from server';
          if (error.response) msg = error.response.data.message;
          // 導回 app
          window.location.href = `ezding.movieOrder://error_${encodeURI(msg)}`;
          return;
        }
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          // console.log(error.response.data);
          // console.log(error.response.status);
          // console.log(error.response.headers);

          if (error.response.status === undefined) {
            Router.push({ pathname: '/repairPage' });
          } else if (error.response.status === 401) {
            Router.push({ pathname: '/repairPage' });
          } else if (error.response.status >= 400) {
            Router.push({ pathname: '/repairPage' });
          }
        } else {
          Router.push({ pathname: '/repairPage' });
        }

        if (errorFn !== null && errorFn !== undefined) {
          errorFn();
        }
      });
  },
};

export default Helper;
