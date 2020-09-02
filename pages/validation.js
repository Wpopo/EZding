import React from 'react';
import domain from '../actions/domain';
import Router from 'next/router';
import { isExitUser } from './../actions/memberAPI';
import { thirdPartyLogin } from './../components/memberLogin/thirdPartyAction';

class Validation extends React.Component {
  componentDidMount() {
    //Todo https://app.gitbook.com/@ftcgroup/s/ezding/san-ez-ding-gai-ban-xiang-guan/3.2-api-lie-biao-ji-shuo-ming/27-di-san-fang-yan-zheng/27.3-jian-cha-guo-tai-chuan-ru-can-shu
    let params = new URLSearchParams(document.location.search.substring(1));
    let x_3rd_timestamp = params.get('x-3rd-timestamp');
    let x_3rd_vendor_id = params.get('x-3rd-vendor-id');
    let x_3rd_platform_id = params.get('x-3rd-platform-id');
    let x_3rd_app_id = params.get('x-3rd-app-id');
    let x_3rd_user_id = params.get('x-3rd-user-id');
    let x_3rd_custom_data = params.get('x-3rd-custom-data');
    let x_3rd_token = params.get('x-3rd-token');
    let x_3rd_signature = params.get('x-3rd-signature');
    let x_3rd_next_url = params.get('x-3rd-next-url');
    const data = {};
    data.x3rd_timestamp = x_3rd_timestamp;
    data.x3rd_vendor_id = x_3rd_vendor_id;
    data.x3rd_platform_id = x_3rd_platform_id;
    data.x3rd_app_id = x_3rd_app_id;
    data.x3rd_user_id = x_3rd_user_id;
    data.x3rd_custom_data = x_3rd_custom_data;
    data.x3rd_token = x_3rd_token;
    data.x3rd_signature = x_3rd_signature;
    sessionStorage.setItem('3rdUserId', x_3rd_user_id);
    sessionStorage.setItem('3rdUserToken', x_3rd_token);
    sessionStorage.setItem('3rdHide', 1);
    cathayProcess(data)
      .then((result) => {
        if (result.result === '' && result.code === '200' && x_3rd_next_url !== null) {
          let ezParams = new URL(x_3rd_next_url.toString());
          let ezURLSearchParams = new URLSearchParams(ezParams.search);

          isExitUser(x_3rd_user_id, 'MRAPP').then((result) => {
            switch (result.result) {
              case '使用者已註冊此平台':
                thirdPartyLogin(x_3rd_user_id, 'MRAPP');
                break;
              case '使用者帳號可註冊':
                break;
              default:
            }
          });

          Router.push({
            pathname: '/seatMap',
            query: {
              session_id: ezURLSearchParams.get('session_id'),
              tickets: ezURLSearchParams.get('tickets'),
              channel: ezURLSearchParams.get('channel'),
              campaignCode: ezURLSearchParams.get('campaign_code'),
            },
          });
        } else {
          mrappErr();
        }
      })
      .catch((error) => {
        mrappErr();
      });
  }

  render() {
    return <div style={{ backgroundColor: '#404040' }}></div>;
  }
}

function mrappErr() {
  let url = '';
  if (window.location.hostname === 'www.ezding.com.tw') {
    url = encodeURI(`https://static.oopocket.com/3rd/ezding/stable/index.html??result=ERROR&order_id=&error_code=2`);
  } else {
    url = encodeURI(
      `https://at-uat-static.oopocket-dev.com/3rd/ezding/latest/index.html??result=ERROR&order_id=&error_code=2`,
    );
  }
  window.location.href = url;
}

function cathayProcess(data) {
  const promise = new Promise((resolve, reject) => {
    let query = `${domain.ROOT_URL}new_ezding/ez_thirdparty/cathay`;
    // console.log(query);
    fetch(query, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.status !== 200) {
          response
            .text()
            .then((result) => {
              reject(result);
            })
            .catch((error) => {
              reject(error);
            });
        } else {
          const contentType = response.headers.get('Content-type');

          if (contentType.indexOf('json') !== -1) {
            response
              .json()
              .then((result) => {
                if (result && result.error) {
                  reject(result.error);
                } else if (result) {
                  resolve(result);
                } else {
                  reject();
                }
              })
              .catch((error) => {
                reject(error);
              });
          } else {
            response
              .text()
              .then((result) => {
                resolve(result);
              })
              .catch((error) => {
                reject(error);
              });
          }
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
  return promise;
}

export default Validation;
