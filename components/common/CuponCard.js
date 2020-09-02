import React, { useState } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Helper from 'Lib/helper';
import CheckCircle from 'Components/common/CheckCircle';
import Palette from 'Styled/palette';
import { setSelectedCoupon, delTempCoupon } from 'Actions/preferentialActions';
import CancelIcon from '@material-ui/icons/CancelOutlined';
import { withStyles } from '@material-ui/core/styles';

const CuponCard = props => {
  const [couponText, setCouponText] = useState('');
  const [waringText, setWaringText] = useState('');
  const [checkLock, setCheckLock] = useState(true);

  const {
    styleView,
    data = [],
    type,
    handleCheckCoupon,
    tempCouponCode,
    setSelectedCoupon,
    delTempCoupon,
    classes,
  } = props;

  const handleChangeText = e => {
    setCouponText(e.target.value);
    if (e.target.value.length >= 8) {
      setCheckLock(false);
    } else {
      setCheckLock(true);
    }
  };

  const handleCheck = () => {
    setWaringText('');
    if (couponText.length !== 8 && couponText.length !== 10) {
      setWaringText('序號長度應為8碼或10碼');
      return;
    }
    if (tempCouponCode === undefined) return;
    if (tempCouponCode.includes(couponText)) {
      setWaringText('輸入重複的優惠序號');
      return;
    }
    handleCheckCoupon(couponText, e => setWaringText(e));
  };

  return (
    <div className={classes.root}>
      {(() => {
        switch (styleView) {
          // 待手動輸入 樣式
          case 'inputCard':
            return (
              <div className="inputCard">
                <div>
                  <input type="text" placeholder="輸入優惠序號" onChange={e => handleChangeText(e)} />
                  <Button
                    className="cupon-btn"
                    onClick={() => handleCheck()}
                    variant={checkLock ? null : 'contained'}
                    disabled={checkLock}
                  >
                    確認
                  </Button>
                </div>
                <div className="waring">{waringText}</div>
              </div>
            );

          // 添加卡片 模式
          case 'addCard':
            return (
              <div className="addCard">
                <span>+</span>
              </div>
            );

          // 一般卡片 模式
          case 'commonCard':
            return data === [] ? null : (
              <div
                className={`commonCard ${data.selected ? 'selected' : ''}`}
                onClick={e => {
                  setSelectedCoupon(data.selectID);
                  e.stopPropagation();
                }}
              >
                {type === 'temp' ? (
                  <CancelIcon
                    className="cancelIcon"
                    onClick={e => {
                      delTempCoupon(data.selectID);
                      e.stopPropagation();
                    }}
                  />
                ) : null}

                <div className="info">
                  <div className="title">{data.title}</div>
                  <div className="price">{Helper.data.formatCouponPrice(data.price, data.mode)}</div>
                  <div className="code">{data.code}</div>
                  <div className="date">{data.date}</div>
                </div>
                <div className="control">
                  <CheckCircle
                    id={data.selectID}
                    isChecked={data.selected}
                    onClick={() => setSelectedCoupon(data.selectID)}
                  />
                </div>
              </div>
            );
          default:
            return null;
        }
      })()}
    </div>
  );
};

const styles = {
  root: {
    display: 'flex',
    width: '166px',
    height: '200px',
    padding: '0 5px 5px 5px',

    '& > div': {
      display: 'flex',
      alignItems: 'center',
      'justify-content': 'center',
      flex: '1 1 100%',
      borderRadius: '8px',
      textAlign: 'center',
    },

    '& .inputCard': {
      fontSize: '14px',
      backgroundColor: '#2b2b2b',
      flexDirection: 'column',
      position: 'relative',

      '& .waring': {
        position: 'absolute',
        bottom: '16px',
        padding: '0 16px',
        color: Palette.Check.Error,
        fontSize: '12px',
        width: 'calc(100% - 32px)', // 扣除padding
      },
      '& input': {
        fontSize: '14px',
        width: '80%',
        color: Palette.primary['white-1'],
        border: '0px',
        borderBottom: `1px solid ${Palette.secondary['gray-70']}`,
        paddingBottom: '4px',
        marginBottom: '15px',
        backgroundColor: 'unset',
        outline: 'unset',
        '&::-webkit-input-placeholder': {
          color: Palette.secondary['gray-60'],
          textAlign: 'center',
        },
        ':-moz-placeholder': {
          /* Firefox 18- */
          textAlign: 'center',
        },
        '::-moz-placeholder': {
          /* Firefox 19+ */
          textAlign: 'center',
        },
        ':-ms-input-placeholder': {
          textAlign: 'center',
        },
      },
    },

    '& .addCard': {
      border: `solid 1px ${Palette.secondary['gray-70']}`,
      cursor: 'pointer',

      '& span': {
        width: '40px',
        height: '40px',
        fontSize: '40px',
        lineHeight: '34px',
        backgroundColor: Palette.secondary['gray-70'],
        color: '#2b2b2b',
        borderRadius: '50%',
        '-moz-border-radius': '50%',
        '-webkit-border-radius': '50%',
        cursor: 'pointer',
      },
    },

    '& .commonCard': {
      position: 'relative',
      flexDirection: 'column',
      alignItems: 'center',
      'justify-content': 'center',
      border: `solid 1px ${Palette.primary['gray-1']}`,
      color: Palette.primary['white-1'],
      backgroundColor: Palette.secondary['gray-80'],
      cursor: 'pointer',

      '& .cancelIcon': {
        position: 'absolute',
        top: '3px',
        right: '3px',
        width: '16px',
        height: '16px',
        color: Palette.secondary['gray-60'],
      },

      '& .info': {
        borderBottom: `dashed 1px ${Palette.primary['gray-1']}`,
        margin: '0 10px',
        padding: '10px 0',
        height: 'calc(150px - 20px)', // 扣除上下padding
        '& .title': {
          fontSize: '12px',
          height: '35px',
          color: Palette.secondary['gray-60'],
          'word-break': 'break-all',
          overflow: 'hidden',
          'text-overflow': 'ellipsis',
          display: '-webkit-box',
          '-webkit-line-clamp': 2, // 選擇行數
          '-webkit-box-orient': 'vertical',
        },
        '& .price': { fontSize: '28px' },
        '& .code ': { fontSize: '12px' },
        '& .date': { fontSize: '12px', paddingTop: '29px', color: Palette.secondary['gray-60'] },
      },

      '& .control': { marginTop: '8px' },

      '&.selected': {
        border: `solid 1px ${Palette.primary['pink-1']}`,
        '& .price': { color: Palette.primary['pink-1'] },
      },
    },
  },
};

export default connect(
  state => ({
    tempCouponCode: state.getIn(['preferential', 'serialNum', 'tempCouponCode']),
  }),
  dispatch => ({
    setSelectedCoupon(selectID) {
      dispatch(setSelectedCoupon({ selectID }));
    },
    delTempCoupon(selectID) {
      dispatch(delTempCoupon({ selectID }));
    },
  }),
)(withStyles(styles)(CuponCard));
