import React, { Component, Fragment, useState, useRef } from 'react';
import Helper from 'Lib/helper';
import CONSTANTS from 'CONSTANTS';
import AddressCode from 'CONSTANTS/addressCode';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import Hidden from '@material-ui/core/Hidden';
import MenuItem from '@material-ui/core/MenuItem';
import Tooltip from 'Components/common/Tooltip';
import InputCancel from 'Components/common/InputCancel';
import { KeyboardArrowDown } from '@material-ui/icons';
import Palette from 'Styled/palette';
import { withStyles } from '@material-ui/core/styles';

const cityMenu = () => {
  const obj = [];

  obj.push(
    <MenuItem key={0} value={null} disabled>
      縣市
    </MenuItem>,
  );
  // 依照CityCode排序
  AddressCode.sort((a, b) => parseInt(a.CityCode, 10) - parseInt(b.CityCode, 10)).map((item, idx) =>
    obj.push(
      <MenuItem key={item.CityCode + item.CityName} value={item}>
        {item.CityName}
      </MenuItem>,
    ),
  );

  return obj;
};

const AreaMenu = (list) => {
  const obj = [];

  obj.push(
    <MenuItem key={0} value={null} disabled>
      鄉鎮地區
    </MenuItem>,
  );
  // 依照ZipCode排序
  list
    .sort((a, b) => parseInt(a.ZipCode, 10) - parseInt(b.ZipCode, 10))
    .map((item) =>
      obj.push(
        <MenuItem key={item.ZipCode} value={item}>
          {item.AreaName}
        </MenuItem>,
      ),
    );

  return obj;
};

class CheckoutUI extends Component {
  constructor(props) {
    super(props);
    const channel = sessionStorage.getItem('channel');
    if (channel !== null && channel === 'MRAPP') {
      this.paymentTool = [{ id: 1, title: '信用卡' }];
    } else {
      this.paymentTool = [
        { id: 1, title: '信用卡' },
        { id: 2, title: 'LINE PAY' },
        { id: 3, title: '遠傳電信帳單' },
        { id: 4, title: '', icon: 'applepay' },
        { id: 5, title: 'AFTEE' },
      ];
    }

    this.invoiceType = [
      {
        id: 0,
        first: '捐贈',
        second: [
          { sid: 0, title: '創世基金會' },
          { sid: 1, title: '其他' },
        ],
        detailComponent: (sid) => <Donation sid={sid} changeData={this.props.changeData} />,
      },
      {
        id: 1,
        first: '個人戶',
        second: [
          {
            sid: 0,
            title: '會員載具',
            tooltip:
              '以會員帳號為載具，由本網站進行對獎、通知；若已歸戶則由財政部進行對獎、通知、匯入獎金。(歸戶請至財政部－電子發票整合服務平台)',
          },
          {
            sid: 1,
            title: '手機條碼',
            tooltip: '需先完成申請方可使用，由財政部進行對獎、通知、匯入獎金。(申請請至財政部－電子發票整合服務平台)',
          },
          {
            sid: 2,
            title: '自然人憑證',
            tooltip: '需先完成歸戶方可使用，由財政部進行對獎、通知、匯入獎金。(歸戶請至財政部－電子發票整合服務平台)',
          },
        ],
        detailComponent: (sid) => <Individual sid={sid} changeData={this.props.changeData} />,
      },
      {
        id: 2,
        first: '公司戶',
        second: null,
        detailComponent: () => <Corporate changeData={this.props.changeData} />,
      },
    ];
    this.state = { finv_sub_type: 0 };
  }

  render() {
    const { finv_sub_type } = this.state;
    const { useTool, UIData, changeData, classes } = this.props;
    // use_method 支付方式 1:信用卡 2:LINE PAY 3:遠傳電信帳單 4:APPLY PAY 5:AFTEE
    // finv_type 發票種類 0:捐贈 1:個人戶 2:公司戶
    const { use_method, finv_type, mobile, email, asiamiles_no } = UIData;

    return (
      <div className={`fullWrap expansionWrap ${classes.root}`}>
        {/* 付款工具 */}
        <div className="wrap">
          <div className="title">付款工具</div>
          <div className="toolWrap">
            {this.paymentTool.map((tool) => {
              const { id, title, icon } = tool;
              return (
                <Fragment key={id}>
                  <Button
                    className="checkout-btn"
                    variant={use_method === id ? 'contained' : null}
                    onClick={() => changeData('use_method', id)}
                    disabled={!useTool.includes(id)}
                  >
                    {icon !== undefined ? <img className={icon} /> : title}
                  </Button>
                  {/* Mobile 768 以下 */}
                  <Hidden mdUp>{use_method === id ? <PayTool toolID={id} changeData={changeData} /> : null}</Hidden>
                </Fragment>
              );
            })}
          </div>
          {/* Web 768 以上 */}
          <Hidden smDown>
            <PayTool toolID={use_method} changeData={changeData} />
          </Hidden>
          {/* <PayTool toolID={use_method} changeData={changeData} /> */}
        </div>

        {/* 電子發票 */}
        <div className="wrap">
          <div className="title">電子發票</div>
          {/* invoiceType-First */}
          <Select
            IconComponent={(props) => (
              <i {...props}>
                <KeyboardArrowDown />
              </i>
            )}
            value={this.invoiceType[finv_type].first}
            renderValue={(value) => `${value}`}
            className="checkout-select sm"
            onChange={(e) => {
              changeData('finv_type', e.target.value);
              this.setState({ finv_sub_type: 0 });
            }}
          >
            {this.invoiceType.map((invoice) => (
              <MenuItem key={invoice.id} value={invoice.id}>
                {invoice.first}
              </MenuItem>
            ))}
          </Select>

          {/* invoiceType-Second */}
          {this.invoiceType[finv_type].second !== null ? (
            <Fragment>
              {/* tooltip */}
              {this.invoiceType[finv_type].second[finv_sub_type].tooltip !== undefined ? (
                <Tooltip cusClass="checkout-tooltip" text={this.invoiceType[finv_type].second[finv_sub_type].tooltip} />
              ) : null}

              {/* invoiceType-Second */}
              <Select
                IconComponent={(props) => (
                  <i {...props}>
                    <KeyboardArrowDown />
                  </i>
                )}
                value={this.invoiceType[finv_type].second[finv_sub_type].title}
                renderValue={(value) => `${value}`}
                onChange={(e) => {
                  changeData('finv_device', e.target.value);
                  this.setState({ finv_sub_type: e.target.value });
                }}
              >
                {this.invoiceType[finv_type].second.map((type) => (
                  <MenuItem key={type.sid} value={type.sid}>
                    {type.title}
                  </MenuItem>
                ))}
              </Select>
            </Fragment>
          ) : null}

          {/* 子項目資料 */}
          {this.invoiceType[finv_type].detailComponent(finv_sub_type)}
        </div>

        {/* 訂購人資料 */}
        <div className="wrap">
          <div className="title">訂購人資料</div>
          <div className="textWrap">
            <span>電話</span>
            <InputCancel defaultValue={mobile} Locked />
          </div>
          <div className="textWrap">
            <span>Email</span>
            <InputCancel defaultValue={email} cusOnChange={(e) => changeData('email', e.target.value)} />
          </div>
          <div className="textWrap">
            <span>亞洲萬里通</span>
            <InputCancel
              defaultValue={asiamiles_no}
              placeholder={'亞洲萬里通會員號碼(選填)'}
              cusOnChange={(e) => changeData('asiamiles_no', e.target.value)}
            />
          </div>
        </div>
      </div>
    );
  }
}

// 付款工具
const PayTool = ({ toolID = 1, changeData }) => {
  // 今年年份
  const nYear = new Date().getFullYear();
  // 選到的月份 / 年份
  const defaultYear = '到期年';
  const defaultMonth = '到期月';
  const [sYear, setYear] = useState(defaultYear);
  const [sMonth, setMonth] = useState(defaultMonth);

  // 信用卡
  if (toolID === 1) {
    // 到期月
    const monthItems = () => {
      const months = [];
      for (let month = 1; month <= 12; month++) {
        months.push(
          <MenuItem key={month} value={Helper.data.formatNumber(month)} className="list-mid">
            {Helper.data.formatNumber(month)}
          </MenuItem>,
        );
      }
      return months;
    };

    // 到期年
    const yearItems = () => {
      const years = [];

      for (let year = nYear; year < nYear + 50; year++) {
        years.push(
          <MenuItem key={year} value={year} className="list-mid">
            {year}
          </MenuItem>,
        );
      }
      return years;
    };

    return (
      <div className="detailWrap paytool">
        <InputCancel
          placeholder="請輸入信用卡卡號"
          checkItems={{ isNum: true, length: 20 }}
          cusOnChange={(e) => changeData('pan', e.target.value)}
        />
        <br />
        <Select
          IconComponent={(props) => (
            <i {...props}>
              <KeyboardArrowDown />
            </i>
          )}
          className={`sm-fix first${defaultYear === sYear ? ' default' : ''}`}
          value={sYear}
          renderValue={(value) => `${value}`}
          onChange={(e) => {
            changeData('expire_year', e.target.value);
            setYear(e.target.value);
          }}
        >
          {yearItems()}
        </Select>
        <Select
          IconComponent={(props) => (
            <i {...props}>
              <KeyboardArrowDown />
            </i>
          )}
          className={`sm-fix${defaultMonth === sMonth ? ' default' : ''}`}
          value={sMonth}
          renderValue={(value) => `${value}`}
          onChange={(e) => {
            changeData('expire_month', e.target.value);
            setMonth(e.target.value);
          }}
        >
          {monthItems()}
        </Select>
        <br />
        <InputCancel
          placeholder="卡片背後末三碼"
          checkItems={{ isNum: true, length: 3 }}
          cusOnChange={(e) => changeData('cvv2', e.target.value)}
        />
      </div>
    );
  }
  // if (toolID === 5) {
  //   return (
  //     <div>
  //       <form
  //         method="POST"
  //         action="http://alpha-new-payment-local.fullerton.com.tw/new_payment/v3/transaction/auth_external"
  //       >
  //         <input type="text" name="temporary_trans_id" value="c92a5d0ede0e49f2a4bac0b3959c3a84" />
  //         <input type="submit" value="go go go " />
  //       </form>
  //     </div>
  //   );
  // }

  return null;
};
// 捐贈
const Donation = ({ sid, changeData }) => {
  // 創世基金會
  if (sid === 0) return null;

  // 其他
  if (sid === 1) {
    return (
      <div className="detailWrap">
        <InputCancel
          placeholder="請輸入捐贈碼"
          checkItems={{ isNum: true, length: 7 }}
          cusOnChange={(e) => changeData('finv_donate_code', e.target.value)}
        />
        <div className="loveSearch" onClick={() => window.open(CONSTANTS.LoveCode)}>
          愛心碼查詢
        </div>
      </div>
    );
  }

  return null;
};

// 個人戶
const Individual = ({ sid, changeData }) => {
  const defaultCity = '縣市';
  const defaultArea = '鄉鎮地區';
  const [city, setCity] = useState(defaultCity);
  const [area, setArea] = useState(defaultArea);
  const [areaList, setAreaList] = useState([]);

  // 會員載具
  if (sid === 0) {
    return (
      <div className="detailWrap">
        <InputCancel placeholder="發票收件人" cusOnChange={(e) => changeData('finv_receiver', e.target.value)} />
        <br />
        <Select
          IconComponent={(props) => (
            <i {...props}>
              <KeyboardArrowDown />
            </i>
          )}
          className={`sm ${defaultCity === city ? ' default' : ''}`}
          value={city}
          renderValue={(value) => (value.CityName === undefined ? city : value.CityName)}
          onChange={(e) => {
            const { CityName, CityCode, AreaList } = e.target.value;
            if (CityName === city) return;

            setCity(CityName);
            setAreaList(AreaList);
            setArea(defaultArea);
            changeData('finv_county_id', CityCode);
            changeData('finv_zip', '');
            changeData('finv_town_id', '');
          }}
        >
          {cityMenu()}
        </Select>

        <Select
          IconComponent={(props) => (
            <i {...props}>
              <KeyboardArrowDown />
            </i>
          )}
          className={defaultArea === area ? ' default' : ''}
          value={area}
          renderValue={(value) => (value.AreaName === undefined ? area : value.AreaName)}
          onChange={(e) => {
            const { ZipCode, AreaName } = e.target.value;
            setArea(AreaName);
            changeData('finv_zip', ZipCode);
            changeData('finv_town_id', ZipCode);
          }}
        >
          {AreaMenu(areaList)}
        </Select>
        <InputCancel placeholder="發票收件地址" cusOnChange={(e) => changeData('finv_address', e.target.value)} />
      </div>
    );
  }

  // 手機條碼
  if (sid === 1) {
    return (
      <div className="detailWrap">
        <InputCancel
          placeholder="請輸入載具條碼"
          checkItems={{ type: 'phoneCode' }}
          cusOnChange={(e) => {
            changeData('finv_device_show_id', e.target.value);
            changeData('finv_device_hide_id', e.target.value);
          }}
        />
      </div>
    );
  }

  // 自然人憑證
  if (sid === 2) {
    return (
      <div className="detailWrap">
        <InputCancel
          placeholder="請輸入自然人憑證"
          checkItems={{ type: 'naturalPerson' }}
          cusOnChange={(e) => {
            changeData('finv_device_show_id', e.target.value);
            changeData('finv_device_hide_id', e.target.value);
          }}
        />
      </div>
    );
  }
  return null;
};

// 公司戶
const Corporate = ({ changeData }) => {
  const defaultCity = '縣市';
  const defaultArea = '鄉鎮地區';
  const [city, setCity] = useState(defaultCity);
  const [area, setArea] = useState(defaultArea);
  const [areaList, setAreaList] = useState([]);

  return (
    <div className="detailWrap">
      <InputCancel
        placeholder="統一編號"
        cusClass="sm"
        checkItems={{ isNum: true, length: 8 }}
        cusOnChange={(e) => changeData('finv_tax_no', e.target.value)}
      />
      <InputCancel placeholder="統一抬頭" cusOnChange={(e) => changeData('finv_title', e.target.value)} />
      <InputCancel placeholder="發票收件人" cusOnChange={(e) => changeData('finv_receiver', e.target.value)} />
      <br />
      <Select
        IconComponent={(props) => (
          <i {...props}>
            <KeyboardArrowDown />
          </i>
        )}
        className={`sm ${defaultCity === city ? ' default' : ''}`}
        value={city}
        renderValue={(value) => (value.CityName === undefined ? city : value.CityName)}
        onChange={(e) => {
          const { CityName, CityCode, AreaList } = e.target.value;
          if (CityName === city) return;

          setCity(CityName);
          setAreaList(AreaList);
          setArea(defaultArea);
          changeData('finv_county_id', CityCode);
          changeData('finv_zip', '');
          changeData('finv_town_id', '');
        }}
      >
        {cityMenu()}
      </Select>

      <Select
        IconComponent={(props) => (
          <i {...props}>
            <KeyboardArrowDown />
          </i>
        )}
        className={defaultArea === area ? ' default' : ''}
        value={area}
        renderValue={(value) => (value.AreaName === undefined ? area : value.AreaName)}
        onChange={(e) => {
          const { ZipCode, AreaName } = e.target.value;
          setArea(AreaName);
          changeData('finv_zip', ZipCode);
          changeData('finv_town_id', ZipCode);
        }}
      >
        {AreaMenu(areaList)}
      </Select>

      <InputCancel placeholder="發票收件地址" cusOnChange={(e) => changeData('finv_address', e.target.value)} />
    </div>
  );
};

const styles = (theme) => ({
  root: {
    '& .wrap': { padding: '0 0 40px 0' },
    '& .title': {
      fontSize: '16px!important',
      padding: '0 0 16px 0',
    },
    '& .toolWrap': { margin: '-8px 0 0 0' },
    '& .checkout-btn, .checkout-select': {
      fontSize: '14px',
      '&.Mui-disabled': {
        backgroundColor: Palette.secondary['gray-70'],
        '& span': { color: '#A3A3A3!important' },
      },
    },
    '& .checkout-btn img': {
      '&.applepay': {
        width: '36px',
        height: '15px',
        content: 'url("../static/paymentWeb/applepayIcon.png")',
      },
    },
    '& .checkout-btn.MuiButton-contained img': {
      '&.applepay': { content: 'url("../static/paymentWeb/applepayIcon_focus.png")' },
    },
    '& .checkout-btn.Mui-disabled img': {
      '&.applepay': { content: 'url("../static/paymentWeb/applepayIcon_disabled.png")' },
    },
    '& .checkout-btn': { margin: '8px 8px 0 0' },
    '& .checkout-select': { margin: '0 8px 0 0' },
    '& .Mui-focused': {
      '& .MuiSelect-root': { border: `1px solid ${Palette.primary['pink-1']}` },
    },
    '& .MuiInput-input, .InputCommon': { fontSize: '14px' },
    '& .MuiSelect-icon': {
      color: '#FFFFFF',
      paddingRight: '16px',
      '& svg': { fontSize: '30px' },
    },

    '& .checkout-tooltip': {
      position: 'absolute',
      fill: '#FFFFFF',
      zIndex: '10',
      margin: '13px 0 0 95px',
    },
    '& .textWrap': {
      width: '374px',
      padding: '0 0 8px 0',
      display: 'flex',
      'justify-content': 'space-between',
      alignItems: 'center',
      fontSize: '14px',
    },
    '& .detailWrap': {
      padding: '16px 0 0 0',
      '& .InputCancel': { margin: '0 8px 8px 0' },
      '& div.MuiInputBase-root': { margin: '0 8px 8px 0' },
      '& .loveSearch': {
        display: 'inline-block',
        fontSize: '12px',
        color: '#FFFFFF',
        textDecoration: 'underline',
        cursor: 'pointer',
        verticalAlign: 'bottom',
        paddingBottom: '12px',
      },
    },
  },
  [theme.breakpoints.down('sm')]: {
    root: {
      display: 'flex',
      'flex-direction': 'column',
      alignItems: 'center',

      '& .toolWrap': { margin: 'unset' },
      '& .MuiInput-underline, .checkout-btn': {
        display: 'flex',
        maxWidth: '288px',
        height: '44px',
        margin: '0 0 8px 0',
      },
      '& .checkout-btn, .MuiInput-underline:not(.sm-fix), .MuiInput-input:not(.sm-fix)': {
        width: '100%',
      },
      '& .wrap, .InputCancel': {
        maxWidth: '288px',
        flex: 1,
        width: '100%',
        '& .InputCommon': { width: '100%' },
      },
      '& .textWrap': {
        width: 'unset',
        'flex-direction': 'column',
        'align-items': 'flex-start',
        '& span': { marginBottom: '8px' },
        '& .MuiInput-root': { margin: 'unset' },
      },
      '& .detailWrap': {
        '&.paytool': {
          padding: '0 0 16px 0',
          '& .sm-fix': {
            display: 'inline-flex',
            margin: '0 0 8px 0',
          },
          '& .sm-fix.first': { margin: '0 8px 8px 0' },
        },

        '& .InputCancel': { margin: '0 0px 8px 0' },
        '& .loveSearch': {
          display: 'block',
          verticalAlign: 'unset',
          paddingBottom: 'unset',
          paddingRight: '5px',
          textAlign: 'end',
        },
      },
    },
  },
});

export default withStyles(styles)(CheckoutUI);
