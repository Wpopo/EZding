import React, { useState } from 'react';
import { connect } from 'react-redux';
import { myPassword, showDisplay, validateAction } from '../../components/Actions/memberActions';
import { PhoneInput, GrayButton, Eye, Policy } from '../../styled/memberLoginStyled';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import CheckBoxOutlineBlankOutlinedIcon from '@material-ui/icons/CheckBoxOutlineBlankOutlined';
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';
import { memberLogin, memberValidationUser, inviteFromFriendCoupon } from '../../actions/memberAPI';
import { bindThirdParty } from '../../components/memberLogin/thirdPartyAction';

function IsPassword({ ...props }) {
  const { member } = props.member;
  const { myPassword, showDisplay, validateAction ,newMemberWithMGMcode} = props;
  const mobileNumber = member.mobileNumber;
  const Password = member.myPassword;
  const display = member.display;
  const action = member.action;
  const check_1 = member.validation.check_1;
  const check_2 = member.validation.check_2;
  const check_3 = member.validation.check_3;
  const check_4 = member.validation.check_4;

  const [showError, setShowError] = useState(false);
  const [passwordType, setPasswordType] = useState('password');
  const [policy, setPolicy] = useState(false);

  const checkPassword = () => {
    const validNumber = `${check_1}${check_2}${check_3}${check_4}`;
    const validateUserDate = {
      action: action + 1,
      login_id: `${mobileNumber}`,
      login_type: 'Ftc',
      pwd: `${Password}`,
      sid: 'ezding',
      v_type: 'mobile',
      validation_link: validNumber,
    };
    const isPassPasswordUserData = {
      login_id: `${mobileNumber}`,
      login_type: 'Ftc',
      password: `${Password}`,
      sid: 'ezding',
      v_type: 'mobile',
    };
    const doMemberLogin = () => {
      memberLogin(isPassPasswordUserData).then((result) => {
        const redirect_uri = localStorage.getItem('redirect_uri');
        if (result.code === '200') {
          localStorage.setItem('accessToken', result.result.access_token);
          //第三方國泰
          if (sessionStorage.getItem('3rdUserId') !== null && sessionStorage.getItem('channel') !== null) {
            bindThirdParty(
              result.result.access_token,
              sessionStorage.getItem('3rdUserId'),
              sessionStorage.getItem('channel'),
            );
          } else {
            //有MGMcode而且是新會員
            if (localStorage.getItem('MGM_Code') !== undefined && newMemberWithMGMcode === true) {
              inviteFromFriendCoupon(localStorage.getItem('accessToken'), localStorage.getItem('MGM_Code')).then(
                (result) => console.log('mgm', result),
                localStorage.removeItem('MGM_Code'),//清除MGMcode
                window.location.href = redirect_uri
              );
            }else{
              window.location.href = redirect_uri;
            }
          }
        } else {
          //show密碼錯誤
          setShowError(true);
        }
      });
    };

    if (action === 2) {
      doMemberLogin();
    } else if (action === 1) {
      //新用戶登入
      memberValidationUser(validateUserDate).then((result) => {
        if (result.result === '密碼更新成功') {
          doMemberLogin();
        } else {
          //showDialog
          myPassword(''),
            alert('驗證碼錯誤'),
            // memberValidationUser({
            //   action: action,
            //   login_id: `${mobileNumber}`,
            //   login_type: 'Ftc',
            //   sid: 'ezding',
            //   v_type: 'mobile',
            // }),
            showDisplay('isRegister');
        }
      });
    } else {
      alert('驗證錯誤');
    }
  };
  return (
    <>
      {display === 'isMember' && (
        <>
          <p>請輸入密碼</p>
          <div>
            <PhoneInput
              type={passwordType}
              maxLength="12"
              name="myPassword"
              value={Password}
              onChange={(e) => {
                setShowError(false), myPassword(e.target.value);
              }}
              placeholder="輸入至少8位英文數字"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  Array.from(Password).length >= 8 && /^[A-Za-z0-9]+$/.test(Password)
                    ? checkPassword()
                    : setShowError(true);
                }
              }}
            />
            <Eye onClick={() => (passwordType === 'password' ? setPasswordType('text') : setPasswordType('password'))}>
              {passwordType !== 'password' ? (
                <VisibilityIcon fontSize="small" />
              ) : (
                <VisibilityOffIcon fontSize="small" />
              )}
            </Eye>
          </div>
          {showError && Password !== '' && (
            <div>
              <div className="warningText">
                <span>密碼錯誤，請確認是否為正確密碼，規則為8-12位半形英文或數字</span>
              </div>
            </div>
          )}
          {/* 新會員顯示會員條款, */}
          {action === 1 && (
            <div>
              <Policy>
                <div onClick={() => setPolicy(!policy)}>
                  {policy ? <CheckBoxOutlinedIcon size="small" /> : <CheckBoxOutlineBlankOutlinedIcon size="small" />}
                </div>
                <div>
                  <label htmlFor="policy">
                    <input type="checkbox" id="policy" />
                    我已詳閱並同意<span onClick={() => props.handleClickOpen()}>會員服務條款</span>及
                    <span onClick={() => props.handleClickOpen()}>隱私權條款</span>
                    之內容
                  </label>
                </div>
              </Policy>
            </div>
          )}
          <GrayButton>
            <div
              onClick={() => {
                if (action === 2) {
                  Array.from(Password).length >= 8 && /^[A-Za-z0-9]+$/.test(Password)
                    ? checkPassword()
                    : setShowError(true);
                } else if (action === 1) {
                  if (policy === true) {
                    //檢查請輸入至少8位大小寫半形英文或半形數字
                    Array.from(Password).length >= 8 && /^[A-Za-z0-9]+$/.test(Password)
                      ? checkPassword()
                      : setShowError(true);
                  } else {
                    alert('請同意會員條款');
                  }
                }
              }}
            >
              立即登入
            </div>
            {action === 2 && (
              <div
                onClick={() => {
                  validateAction(1),
                    myPassword(''),
                    memberValidationUser({
                      action: action - 1,
                      login_id: `${mobileNumber}`,
                      login_type: 'Ftc',
                      sid: 'ezding',
                      v_type: 'mobile',
                    }),
                    showDisplay('isRegister');
                }}
              >
                <span className="sms">忘記密碼?</span>
              </div>
            )}
          </GrayButton>
        </>
      )}
    </>
  );
}
const mapStateToProps = (state) => {
  return {
    member: state.getIn(['member']),
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    myPassword: (value) => {
      dispatch(myPassword(value));
    },
    showDisplay: (value) => {
      dispatch(showDisplay(value));
    },
    validateAction: (action) => {
      dispatch(validateAction(action));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(IsPassword);
