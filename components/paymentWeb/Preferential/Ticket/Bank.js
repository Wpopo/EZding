import React, { Component, useState, useRef } from 'react';
import { connect } from 'react-redux';
import Helper from 'Lib/helper';
import API from 'CONSTANTS/api';
import Sort from '@material-ui/icons/Sort';
import Button from '@material-ui/core/Button';
import Expansion from 'Components/paymentWeb/Expansion';
import InputCancel from 'Components/common/InputCancel';
import {
  addBankPoint,
  reduceBankPoint,
  addBankPurchases,
  reduceBankPurchases,
  setBankPurchasesCheckNumber,
} from 'Actions/preferentialActions';

class Bank extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expandedID: null,
      seeMore: [false, false], // 偵測看更多 [紅利折抵, 滿額贈票]
      seeMoreSize: 4, // 看更多隱藏篇數
    };
  }

  // 呼叫檢核API
  handleCheck = (id, number) => {
    const { setBankPurchasesCheckNumber, setAlert } = this.props;

    // 檢核銀行滿額優惠
    Helper.axios.fetch(
      API.PRODUCT.CHECK_BANK_PREFERENTIAL(number, id),
      cb => {
        if (cb !== undefined) {
          const { quantity, msg } = cb;

          // 將結果存進Redux
          setBankPurchasesCheckNumber(
            msg.length === 0
              ? {
                  id,
                  isCheck: true,
                  msg: `你可選擇${quantity}張，請在上面選擇張數`,
                  maxQty: quantity,
                  check_number: number,
                }
              : {
                  id,
                  isCheck: false,
                  msg,
                  quantity: 0,
                },
          );
        }
      },
      {
        cusCode: { 300: msg => setAlert(msg) },
      },
    );
  };

  // 處理滿額贈票加減控制項
  handlePurchases = (data = { isCheck: false, maxQty: 0 }, move = '', idx) => {
    const { isCheck, maxQty } = data;

    const { addBankPurchases, reduceBankPurchases } = this.props;
    if (move === 'add') {
      addBankPurchases(idx, maxQty, isCheck);
    }
    if (move === 'reduce') {
      reduceBankPurchases(idx);
    }
  };

  // 設定應目前應 展開 或 關閉 的物件
  handleChangeExpandID = (id, data) => {
    if (data === null || data === undefined || data === '') return;

    const expandedID = id === this.state.expandedID ? null : id;
    this.setState({ expandedID });
  };

  // 開關看更多功能
  handleSeeMore = id => {
    const { seeMore } = this.state;
    seeMore[id] = !seeMore[id];

    this.setState({ seeMore });
  };

  render() {
    const { expandedID, seeMore, seeMoreSize } = this.state;
    const {
      bank_points,
      bank_purchases,
      addBankPoint,
      reduceBankPoint,
      addBankPurchases,
      reduceBankPurchases,
    } = this.props;
    return (
      <div className="expansionWrap">
        {/* <div className="sortWrap">
          <Sort />
          <span>篩選</span>
        </div> */}

        {/* 紅利折抵 */}
        {bank_points.size <= 0 ? null : (
          <div className="box">
            <div className="titleWrap">
              <span className="title">紅利折抵</span>
              <div className={`more ${seeMore[0] ? 'open' : ''}`} onClick={() => this.handleSeeMore(0)}>
                看更多
              </div>
            </div>
            {bank_points.slice(0, seeMore[0] ? bank_points.size : seeMoreSize).map((point, idx) => (
              <Expansion
                key={point.id}
                item={point}
                selectID={expandedID}
                children={<div dangerouslySetInnerHTML={Helper.data.createMarkup(point.desc)} />}
                handleChange={() => this.handleChangeExpandID(point.id + point.code, point.desc)}
                add={() => {
                  addBankPoint(idx);
                }}
                reduce={() => {
                  reduceBankPoint(idx);
                }}
              />
            ))}
          </div>
        )}
        {/* 滿額贈票 */}
        {bank_purchases.size <= 0 ? null : (
          <div className="box">
            <div className="titleWrap">
              <span className="title">滿額贈票</span>
              <div className={`more ${seeMore[1] ? 'open' : ''}`} onClick={() => this.handleSeeMore(1)}>
                看更多
              </div>
            </div>
            {bank_purchases.slice(0, seeMore[1] ? bank_purchases.size : seeMoreSize).map((purchase, idx) => {
              // 確認是否已檢核
              const isCheck = purchase.checkInfo === undefined ? false : purchase.checkInfo.isCheck;

              return (
                <Expansion
                  key={purchase.id}
                  item={purchase}
                  selectID={expandedID}
                  children={
                    <div className="checkWrap">
                      {/* type=2 銀行滿額優惠(檢核) */}
                      {/* type=10 銀行滿額優惠(不檢核) */}
                      {purchase.type === 2 ? (
                        // 是否已經檢核
                        !isCheck ? (
                          <CheckContent
                            id={purchase.id}
                            msg={purchase.checkInfo !== undefined ? purchase.checkInfo.msg : ''}
                            handleCheck={this.handleCheck}
                            validPrompt={purchase.prompt}
                          />
                        ) : (
                          <LoginContent Info={purchase.checkInfo} />
                        )
                      ) : null}
                      <div dangerouslySetInnerHTML={Helper.data.createMarkup(purchase.desc)} />
                    </div>
                  }
                  handleChange={() => this.handleChangeExpandID(purchase.id + purchase.code, 'data')}
                  add={() => {
                    // type=2 銀行滿額優惠(檢核)
                    if (purchase.type === 2) {
                      this.handlePurchases(purchase.checkInfo, 'add', idx);
                    } else {
                      // type=10 銀行滿額優惠(不檢核)
                      addBankPurchases(idx, 6);
                    }
                  }}
                  reduce={() => {
                    if (purchase.type === 2) {
                      this.handlePurchases(purchase.checkInfo, 'reduce', idx);
                    } else {
                      reduceBankPurchases(idx);
                    }
                  }}
                />
              );
            })}
          </div>
        )}
      </div>
    );
  }
}

const LoginContent = ({ Info }) => {
  const { check_number, msg } = Info;
  return (
    <div className="check">
      <div className="check-input">
        <InputCancel cusClass="md" defaultValue={check_number} Locked />
      </div>
      <span className="check-text check_OK">{msg}</span>
    </div>
  );
};

const CheckContent = ({ id, msg, handleCheck, validPrompt }) => {
  const inputRef = useRef(null);
  const [isWaring, setIsWaring] = useState(true);
  return (
    <div className="check">
      <div className="check-input">
        <InputCancel
          cusClass="md"
          placeholder="請輸入檢核碼"
          checkItems={{ isNum: true }}
          cusRef={inputRef}
          bindIsWaring={setIsWaring}
          validPrompt={validPrompt}
        />
      </div>

      <CheckBtn checkFn={() => handleCheck(id, inputRef.current.value)} Locked={isWaring} />
      <span className="check-text check_Error">{msg}</span>
    </div>
  );
};

const CheckBtn = ({ checkFn, Locked }) => (
  <Button className="check-btn" onClick={() => checkFn()} variant={Locked ? null : 'contained'} disabled={Locked}>
    確認
  </Button>
);

export default connect(
  state => ({
    bank_points: state.getIn(['preferential', 'bank', 'point']),
    bank_purchases: state.getIn(['preferential', 'bank', 'purchase']),
  }),
  dispatch => ({
    addBankPoint(idx) {
      dispatch(addBankPoint({ idx }));
    },
    reduceBankPoint(idx) {
      dispatch(reduceBankPoint({ idx }));
    },
    addBankPurchases(idx, maxQty, check) {
      dispatch(addBankPurchases({ idx, maxQty, check }));
    },
    reduceBankPurchases(idx) {
      dispatch(reduceBankPurchases({ idx }));
    },
    setBankPurchasesCheckNumber(info) {
      dispatch(setBankPurchasesCheckNumber(info));
    },
  }),
)(Bank);
