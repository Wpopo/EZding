import { memberBind, memberThirdPartyLogin } from '../../actions/memberAPI';

export function bindThirdParty(token, id, channel) {
  // console.log(token);
  // console.log(id);
  // console.log(channel);

  const userdData = {
    bind_login_id: id,
    bind_login_type: channel,
  };
  memberBind(userdData, token)
    .then((result) => {
      const redirect_uri = localStorage.getItem('redirect_uri');

      if (result.code === '200') {
        if (result.result.indexOf('會員綁定成功') !== -1) {
          //console.log('會員綁定成功');
          //set token
          thirdPartyLogin(id, channel);
          window.location.href = redirect_uri;
        }
      } else if (result.message.indexOf('該帳號已綁定') !== -1) {
        //console.log('該帳號已綁定');
        thirdPartyLogin(id, channel);
        window.location.href = redirect_uri;
      } else {
        if (channel === 'MRAPP') {
          let url = '';
          if (window.location.hostname === 'www.ezding.com.tw') {
            url = encodeURI(
              `https://static.oopocket.com/3rd/ezding/stable/index.html??result=ERROR&order_id=&error_code=2`,
            );
          } else {
            url = encodeURI(
              `https://at-uat-static.oopocket-dev.com/3rd/ezding/latest/index.html??result=ERROR&order_id=&error_code=2`,
            );
          }
          window.location.href = url;
        }
      }
    })
    .catch((error) => console.log('error', error));
}

export function thirdPartyLogin(id, channel) {
  //const redirect_uri = localStorage.getItem('redirect_uri');
  const loginUserData = {
    login_id: id,
    login_type: channel,
    password: '',
    sid: 'ezding',
  };
  memberThirdPartyLogin(loginUserData).then((result) => {
    if (result.code === '200') {
      localStorage.setItem('accessToken', result.result.access_token);
      //window.location.href = redirect_uri;
    } else {
      if (channel === 'MRAPP') {
        let url = '';
        if (window.location.hostname === 'www.ezding.com.tw') {
          url = encodeURI(
            `https://static.oopocket.com/3rd/ezding/stable/index.html??result=ERROR&order_id=&error_code=2`,
          );
        } else {
          url = encodeURI(
            `https://at-uat-static.oopocket-dev.com/3rd/ezding/latest/index.html??result=ERROR&order_id=&error_code=2`,
          );
        }
        window.location.href = url;
      }
    }
  });
}
