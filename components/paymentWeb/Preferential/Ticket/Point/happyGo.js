import React, { Component, useState, useRef } from 'react';
import Helper from 'Lib/helper';
import API from 'CONSTANTS/api';
import InputCancel from 'Components/common/InputCancel';
import Expansion from 'Components/paymentWeb/Expansion';
import Button from '@material-ui/core/Button';

class HappyGo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expandedID: null,
      happyGoResult: {
        isFirstLock: false,
        isErrorText: false,
        msg: '',
        status: 0,
        phone: 0,
        iden: 0,
        accID: 0,
      },
    };
  }

  // 呼叫登入HayypGo
  handleLoginHappyGo = (phone, iden) => {
    const { setCheckInfo } = this.props;

    Helper.axios.fetch(
      API.PRODUCT.LOGIN_HAPPY_GO(phone, iden),
      cb => {
        if (cb !== undefined) {
          const { msg, check_status, quantity, case_id, trans_info } = cb;
          const { enc_idnompid, chk_sum, token } = trans_info;
          let result = {};
          let nMsg = '';
          // 已綁定，並登入成功
          if (check_status === 1 && msg.length <= 0) {
            nMsg = `你可選擇${quantity}張，請在上面選擇張數`;
            result = {
              ...this.state.happyGoResult,
              isErrorText: false,
              isFirstLock: true,
              msg: nMsg,
            };
            // 紀錄帳號資訊
            setCheckInfo({ phone, iden, msg: nMsg, maxQty: quantity, enc_idnompid, chk_sum, token });
            // 未綁定情況
          } else if (check_status === 2) {
            result = {
              ...this.state.happyGoResult,
              isFirstLock: true,
              isErrorText: false,
              msg: `驗證碼已傳送至${phone.substring(0, 4)}***${phone.substring(7, 10)}`,
              status: check_status,
              phone,
              iden,
              accID: case_id,
            };
            // 錯誤
          } else {
            result = {
              ...this.state.happyGoResult,
              isErrorText: true,
              msg,
            };
          }
          this.setState({ happyGoResult: result });
        }
      },
      () => {},
    );
  };

  // 綁定HappyGo
  handleBindHappyGo = (OTP = 0) => {
    const { happyGoResult } = this.state;
    const { setCheckInfo } = this.props;
    const { phone, iden, accID } = happyGoResult;
    // add={() => setCheckInfo({ test: 'test' })}
    Helper.axios.fetch(API.PRODUCT.BIND_HAPPY_GO(phone, iden, accID, OTP), cb => {
      if (cb !== undefined) {
        const { msg, check_status, quantity } = cb;
        let result = {};
        let nMsg = '';
        // 綁定成功
        if (check_status === 1) {
          const { trans_info } = cb;
          const { enc_idnompid, chk_sum, token } = trans_info;
          nMsg = `你可選擇${quantity}張，請在上面選擇張數`;
          result = {
            ...this.state.happyGoResult,
            isErrorText: false,
            msg: nMsg,
          };
          // 紀錄帳號資訊
          setCheckInfo({ phone, iden, msg: nMsg, maxQty: quantity, enc_idnompid, chk_sum, token });
        } else {
          // 錯誤
          result = {
            ...this.state.happyGoResult,
            isErrorText: true,
            msg,
          };
        }

        this.setState({ happyGoResult: result });
      }
      () => {};
    });
  };

  // 處理數量加減控制項
  handlePoint = (move = '', maxQty = 0, isLogIn) => {
    const { addPoint, reducePoint } = this.props;

    if (move === 'add') {
      addPoint(maxQty, isLogIn);
    }
    if (move === 'reduce') {
      reducePoint();
    }
  };

  // 設定應目前應 展開 或 關閉 的物件
  handleChangeExpandID = id => {
    const expandedID = id === this.state.expandedID ? null : id;
    this.setState({ expandedID });
  };

  render() {
    const { happyGoResult, expandedID } = this.state;
    const { Info } = this.props;

    // 確認是否已成功登入
    const isLogIn = Info.trans_info !== undefined;

    return (
      <Expansion
        key={Info.id}
        item={Info}
        selectID={expandedID}
        children={
          <div className="checkWrap">
            {/* 區分 成功登入 與 未成功登入 UI */}
            {isLogIn ? (
              <LoginContent phone={Info.trans_info.phone} iden={Info.trans_info.iden} msg={Info.trans_info.msg} />
            ) : (
              <CheckContent
                data={happyGoResult}
                handleLogin={this.handleLoginHappyGo}
                handleBind={this.handleBindHappyGo}
              />
            )}
            <div dangerouslySetInnerHTML={Helper.data.createMarkup(Info.desc)} />
          </div>
        }
        handleChange={() => this.handleChangeExpandID(Info.id + Info.code)}
        add={() => this.handlePoint('add', isLogIn ? Info.trans_info.maxQty : 0, isLogIn)}
        reduce={() => this.handlePoint('reduce')}
      />
    );
  }
}

// 已登入成功情況 預設帶值
const LoginContent = ({ phone = 0, iden = 0, msg = '' }) => (
  <div className="check">
    <div className="check-input">
      <InputCancel cusClass="sm" defaultValue={phone} Locked />
      <InputCancel cusClass="sm" defaultValue={iden} Locked />
    </div>
    <span className="check-text check_OK">{msg}</span>
  </div>
);

// 尚未登入情況 檢核內容
const CheckContent = ({ data, handleLogin, handleBind }) => {
  const phoneRef = useRef(null);
  const idenRef = useRef(null);
  const OTPRef = useRef(null);
  const [isWaring, setIsWaring] = useState(true);
  const [isWaring2, setIsWaring2] = useState(true);
  const [isWaring3, setIsWaring3] = useState(true);
  const { isFirstLock, isErrorText, msg, status } = data;

  return (
    <div className="check">
      <div className="check-input">
        <InputCancel
          cusClass="sm"
          placeholder="手機號碼"
          checkItems={{ isNum: true, length: 10 }}
          cusRef={phoneRef}
          bindIsWaring={setIsWaring}
          Locked={isFirstLock}
        />
        <InputCancel
          cusClass="sm"
          placeholder="身分證末四碼"
          checkItems={{ isNum: true, length: 4 }}
          cusRef={idenRef}
          bindIsWaring={setIsWaring2}
          Locked={isFirstLock}
        />
      </div>
      {/* 綁定OTP流程 */}
      {status === 2 ? (
        <div className="check-input OTP no_copy">
          <InputCancel
            placeholder="請輸入驗證碼"
            checkItems={{ isNum: true }}
            cusRef={OTPRef}
            bindIsWaring={setIsWaring3}
          />
          <div className="OTP-button" onClick={() => handleLogin(phoneRef.current.value, idenRef.current.value)}>
            重新發送
          </div>
        </div>
      ) : null}

      {/* 檢核通過與沒通過情況 */}
      {!isFirstLock || status === 2 ? (
        <CheckBtn
          checkFn={() =>
            status !== 2 ? handleLogin(phoneRef.current.value, idenRef.current.value) : handleBind(OTPRef.current.value)
          }
          Locked={status !== 2 ? isWaring || isWaring2 : isWaring3}
        />
      ) : null}
      <span className={`check-text ${isErrorText ? 'check_Error' : 'check_OK'}`}>{msg}</span>
    </div>
  );
};

// 確認按鈕
const CheckBtn = ({ checkFn, Locked }) => {
  let isLock = Locked || false;
  return (
    <Button className="check-btn" onClick={() => checkFn()} variant={Locked ? null : 'contained'} disabled={Locked}>
      確認
    </Button>
  );
};

export default HappyGo;
