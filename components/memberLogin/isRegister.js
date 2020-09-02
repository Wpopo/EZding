import React from 'react';
import { connect } from 'react-redux';
import { memberValidationUser } from '../../actions/memberAPI';
import { CheckInput, GrayButton } from '../../styled/memberLoginStyled';
import {
  validateAction,
  showDisplay,
  updateCheck_1,
  updateCheck_2,
  updateCheck_3,
  updateCheck_4,
} from '../../components/Actions/memberActions';

function IsRegister({ ...props }) {
  const { member } = props.member;
  const display = member.display;
  const mobileNumber = member.mobileNumber;
  const Password = member.Password;
  const action = member.action;
  const check_1 = member.check_1;
  const check_2 = member.check_2;
  const check_3 = member.check_3;
  const check_4 = member.check_4;

  const { showDisplay, updateCheck_1, updateCheck_2, updateCheck_3, updateCheck_4 } = props;

  return (
    <>
      {display === 'isRegister' && (
        <>
          <div>
            <p>請輸入驗證碼</p>
            <div className="text">
              我們已經透過簡訊傳送至
              {mobileNumber}
            </div>
          </div>
          <div>
            <div className="wrapCheckInput">
              <CheckInput
                type="tel"
                maxLength="1"
                name="check_1"
                value={check_1}
                onChange={(e) => {
                  updateCheck_1(e.target.value);
                }}
                onKeyDown={() => {
                  setTimeout(() => document.getElementsByName('check_2')[0].focus(), 100);
                }}
              />
              <CheckInput
                type="tel"
                maxLength="1"
                name="check_2"
                value={check_2}
                onChange={(e) => {
                  updateCheck_2(e.target.value);
                }}
                onKeyDown={() => {
                  setTimeout(() => document.getElementsByName('check_3')[0].focus(), 100);
                }}
              />
              <CheckInput
                type="tel"
                maxLength="1"
                name="check_3"
                value={check_3}
                onChange={(e) => {
                  updateCheck_3(e.target.value);
                }}
                onKeyDown={() => {
                  setTimeout(() => document.getElementsByName('check_4')[0].focus(), 100);
                }}
              />
              <CheckInput
                type="tel"
                maxLength="1"
                name="check_4"
                value={check_4}
                onChange={(e) => {
                  updateCheck_4(e.target.value);
                }}
                onKeyDown={(e) => {
                  e.key === 'Enter' && showDisplay('isMember');
                }}
              />
            </div>
          </div>
          <GrayButton>
            <div onClick={() => showDisplay('isMember')}>下一步</div>
            <div className="sms">
              <span
                onClick={() => {
                  alert('驗證碼已重新發送'),
                    memberValidationUser({
                      action: action,
                      login_id: `${mobileNumber}`,
                      login_type: 'Ftc',
                      pwd: `${Password}`,
                      sid: 'ezding',
                      v_type: 'mobile',
                    });
                }}
              >
                未收到驗證碼
              </span>
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
    validateAction: (action) => {
      dispatch(validateAction(action));
    },
    showDisplay: (value) => {
      dispatch(showDisplay(value));
    },
    updateCheck_1: (value) => {
      dispatch(updateCheck_1(value));
    },
    updateCheck_2: (value) => {
      dispatch(updateCheck_2(value));
    },
    updateCheck_3: (value) => {
      dispatch(updateCheck_3(value));
    },
    updateCheck_4: (value) => {
      dispatch(updateCheck_4(value));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(IsRegister);
