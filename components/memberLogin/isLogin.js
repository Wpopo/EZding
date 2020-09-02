import React, { useState } from 'react';
import { connect } from 'react-redux';
import { mobileNumber, validateAction, showDisplay } from '../../components/Actions/memberActions';
import { PhoneInput, GrayButton } from '../../styled/memberLoginStyled';
import { isExitUser, memberCreateUser, memberValidationUser } from '../../actions/memberAPI';

function IsLogin({ ...props }) {
  const { member } = props.member;
  const { mobileNumber, showDisplay, validateAction, setNewMemberWithMGMcode } = props;

  const mymobileNumber = member.mobileNumber;
  const display = member.display;
  const action = member.action;

  const [showError, setShowError] = useState(false);

  const checkLoginId = () => {
    const creatUserDate = {
      email: 'example@com.tw',
      login_id: `${mymobileNumber}`,
      login_type: 'Ftc',
      mobile: `${mymobileNumber}`,
      sid: 'ezding',
      v_type: 'mobile',
    };
    const validateUserDate = {
      action: action + 1,
      login_id: `${mymobileNumber}`,
      login_type: 'Ftc',
      sid: 'ezding',
      v_type: 'mobile',
    };
    isExitUser(mymobileNumber, 'ftc').then((result) => {
      switch (result.result) {
        case '使用者已註冊此平台':
          validateAction(2);
          //到密碼頁
          showDisplay('isMember');
          break;
        case '使用者未註冊此平台':
          showDisplay('isMember'), validateAction(2);
          // //create_user
          // memberCreateUser(creatUserDate).then((result) => {
          //   switch (result.result) {
          //     case '使用者待驗證':
          //       //發動驗證action1，到驗證頁
          //       memberValidationUser(validateUserDate);
          //       showDisplay('isRegister');
          //       break;
          //     default:
          //       setShowError(true), showDisplay('isLogin');
          //   }
          // });
          break;
        case '使用者已註冊未驗證':
          //MGMcode是不是新用戶
          setNewMemberWithMGMcode(true);
          //發動驗證action1，到驗證頁
          validateAction(1);
          memberValidationUser(validateUserDate);
          showDisplay('isRegister');
          break;
        case '使用者帳號可註冊':
          //MGMcode是不是新用戶
          setNewMemberWithMGMcode(true);
          //發動驗證action1，到驗證頁
          validateAction(1);
          memberCreateUser(creatUserDate).then((result) => {
            console.log(result.result);
            if (result.result === '使用者待驗證') {
              memberValidationUser(validateUserDate), showDisplay('isRegister');
            } else if (result.result.sid_list.indexOf('ezding_app') !== -1) {
              validateAction(2), showDisplay('isMember');
            } else {
              setShowError(true), showDisplay('isLogin');
            }
            // switch (result.result) {
            //   case '使用者待驗證':
            //     //發動驗證action1，到驗證頁
            //     memberValidationUser(validateUserDate);
            //     showDisplay('isRegister');
            //     break;
            //   case result.result.sid_list.indexOf('ezding_app') !== -1:
            //     showDisplay('isMember');
            //     break;
            //   default:
            //     setShowError(true), showDisplay('isLogin');
            // }
          });
          break;
        default:
          alert('手機號碼錯誤');
      }
    });
  };
  return (
    <>
      {display === 'isLogin' && (
        <>
          <p>讓我們開始吧!</p>
          <div>
            <PhoneInput
              type="tel"
              maxLength="10"
              name="mobileNumber"
              value={mymobileNumber}
              onChange={(e) => {
                mobileNumber(e.target.value), setShowError(false);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  /^09\d{8}$/.test(mymobileNumber) ? checkLoginId() : setShowError(true);
                }
              }}
              placeholder="請輸入手機號碼"
            />
          </div>
          <div>
            {showError === true && (
              <div className="warningText">
                <span>{`${mymobileNumber}並非有效的手機號碼`}</span>
              </div>
            )}
          </div>
          <GrayButton>
            <div
              onClick={() => {
                //檢查是否為手機號碼
                /^09\d{8}$/.test(mymobileNumber) ? checkLoginId() : setShowError(true);
              }}
            >
              註冊 / 登入
            </div>
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
    mobileNumber: (value) => {
      dispatch(mobileNumber(value));
    },
    validateAction: (action) => {
      dispatch(validateAction(action));
    },
    showDisplay: (value) => {
      dispatch(showDisplay(value));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(IsLogin);
