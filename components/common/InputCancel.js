import React, { useState } from 'react';
import Helper from 'Lib/helper';
import Palette from 'Styled/palette';
import CancelIcon from '@material-ui/icons/CancelOutlined';
import { withStyles } from '@material-ui/core/styles';

/**
 * @param  {string}} [type=''] Input模式
 * @param  {string}} [placeholder=''] 提醒文字
 * @param  {string} [defaultValue=''] 預設文字
 * @param  {boolean} [Locked=false] 輸入框為唯獨狀態
 * @param  {string} [cusClass=''] 欲加入的className
 * @param  {string} [cusRef=''] Parent參照的值
 * @param  {function} [cusOnChange=''] 客製變更值時執行的動作
 * @param  {Object} [checkItems={}] 正規表達式檢查項目
 * @param  {Object} [classes] materialUI style system
 *
 * type = cancle 取消模式
 *
 * checkItems = {
 *    type=string, 特殊檢核規則
 *    isNum=false, 是否需輸入半形純數字
 *    length: num, 是否限制長度
 * }
 *
 * checkItems.type
 *    phoneCode 電子發票手機條碼
 *    naturalPerson 電子發票自然人憑證
 */
const InputCancel = ({
  type = 'cancle',
  placeholder = '',
  defaultValue = '',
  Locked = false,
  bindIsWaring = null,
  cusClass = '',
  cusRef = null,
  cusOnChange = null,
  checkItems = { isNum: false },
  classes,
  validPrompt = '',
}) => {
  const [value, setValue] = useState(defaultValue);
  const [waring, setWaring] = useState('');
  const [isFocus, setIsFocus] = useState(false);

  const clearValue = () => {
    setValue('');
    setWaring('');
    if (bindIsWaring !== null) bindIsWaring(true);

    // 客製變更值時執行的動作
    if (cusOnChange !== null) cusOnChange({ target: { value: '' } });
  };

  // 客製化檢核
  const checkRegex = e => {
    const nValue = e.target.value;
    let result = true;
    clearValue();
    setValue(nValue);

    if (nValue === '') return;
    if (bindIsWaring !== null) bindIsWaring(false);

    // 客製變更值時執行的動作
    if (cusOnChange !== null) cusOnChange(e);

    if (checkItems.type) {
      if (checkItems.type === 'phoneCode') {
        // 電子發票手機條碼
        if (!Helper.data.isPhoneCode(nValue)) {
          result = false;
          if (bindIsWaring !== null) bindIsWaring(true);
        }
      } else if (checkItems.type === 'naturalPerson') {
        // 電子發票自然人憑證
        if (!Helper.data.isNaturalPerson(nValue)) {
          result = false;
          if (bindIsWaring !== null) bindIsWaring(true);
        }
      }
    }

    if (checkItems.isNum) {
      if (!Helper.data.isNumber(nValue)) {
        result = false;
        if (bindIsWaring !== null) bindIsWaring(true);
      }
    }
    if (checkItems.length) {
      if (!Helper.data.limitLength(nValue, checkItems.length)) {
        result = false;
        if (bindIsWaring !== null) bindIsWaring(true);
      }
    }

    if (!result) setWaring('輸入格式不符合');
  };
  return (
    <div className={`${classes.root} InputCancel`}>
      {validPrompt && <div className={classes.prompt}>{validPrompt}</div>}
      <div className={classes.inputWrap}>
        <input
          className={`InputCommon ${cusClass} ${Locked ? 'locked' : ''}`}
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={e => checkRegex(e)}
          ref={cusRef === undefined || cusRef === null ? null : cusRef}
          readOnly={Locked}
          onFocus={() => setIsFocus(true)}
          // 需延遲150ms，防止CancelIcon未啟動就被關閉
          onBlur={() => setTimeout(() => setIsFocus(false), 150)}
        />
        {/* 取消模式 */}
        {type === 'cancle' ? (
          // 非Focus狀態, 空直, 鎖定狀態, 皆不顯示 CancelIcon
          !isFocus || value === '' || Locked ? null : (
            <CancelIcon className="cancelIcon" onClick={() => clearValue()} />
          )
        ) : null}
      </div>

      {/* 檢核警告訊息 */}
      {waring === '' ? null : <span className="waring">{waring}</span>}
    </div>
  );
};

const styles = theme => ({
  root: {
    display: 'inline-block',

    '& .waring': {
      paddingLeft: '16px',
      color: Palette.Check.Error,
    },
  },
  inputWrap: {
    position: 'relative',
    display: 'flex',
    '& input': {
      fontFamily: 'inherit',
      width: 'calc(288px - 48px)', // 減掉Paddding寬度
      height: '44px',
      padding: '0 32px 0 16px',
      fontSize: '14px',
      color: '#FFFFFF',
      backgroundColor: Palette.primary['black-2'],
      borderRadius: '22px',
      border: 'unset',

      '&.locked': {
        color: Palette.secondary['gray-60'],
      },

      '&:focus': {
        outline: 'unset',
        border: `1px solid ${Palette.primary['pink-1']}`,
      },

      '&.sm': {
        width: 'calc(140px - 48px)', // 減掉Paddding寬度
      },
      '&.md': {
        width: 'calc(230px - 48px)', // 減掉Paddding寬度
      },
    },
    '& .cancelIcon': {
      position: 'absolute',
      right: '5px',
      top: '25%',
      color: Palette.secondary['gray-60'],
      cursor: 'pointer',
    },
    [theme.breakpoints.down('sm')]: {
      '& input': {
        maxWidth: 'calc(288px - 48px)',
        width: '100%',
      },
    },
  },
  prompt: {
    width: '237px',
    fontSize: '14px',
    textAlign: 'center',
    'margin-bottom': '8px',
  },
});

export default withStyles(styles)(InputCancel);
