import React, { useState } from 'react';
import { connect } from 'react-redux';
import Helper from 'Lib/helper';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import Drawer from '@material-ui/core/Drawer';
import { setView, setPopcornFlag, setPopcornText } from 'Actions/mainActions';
import Palette from 'Styled/palette';
import { withStyles } from '@material-ui/core/styles';

let productList = null;
const Information = ({ ...props }) => {
  productList = Helper.payment.getInformatData();

  const totalMoney = productList[0];
  const [open, setOpen] = useState(false);
  const [showPopcorn, setShowPopcorn] = useState(false);
  const [popcornText, setPopcornText] = useState('');

  // 爆米花控制項
  const PopcornControll = () => {
    Helper.payment.processPopcorn(showPopcorn, setShowPopcorn, popcornText, setPopcornText, props);
  };

  const toggleDrawer = event => {
    if (event.type === 'keydown') return;
    // if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
    //   return;
    // }
    setOpen(false);
  };

  if (productList === null) return null;
  PopcornControll();

  return (
    <div className="right">
      <IconButton className={`popcornIcon ${open ? 'active' : ''}`} onClick={() => setOpen(!open)}>
        {showPopcorn ? (
          <div>
            <div className="popcornText">{popcornText}</div>
            <div className="arrow" />
          </div>
        ) : null}
      </IconButton>
      {/* Web 1024 以上 */}
      <Hidden mdDown>
        <div className="markpoint">
          <Content money={totalMoney} {...props} />
        </div>
      </Hidden>
      {/* Mobile 1024 以下 */}
      <Hidden lgUp>
        <Drawer className="markpoint" anchor="right" open={open} onClick={e => toggleDrawer(e)}>
          {/* <Drawer className="markpoint" anchor="right" open={open}> */}
          <Content money={totalMoney} {...props} />
        </Drawer>
      </Hidden>

      {/* Mobile 768 以下 下方列 */}
      <Hidden mdUp>
        <Footer money={totalMoney} {...props} />
      </Hidden>
    </div>
  );
};

const Content = ({ money = 0, ...props }) => {
  const { movieInfo, classes } = props;
  return (
    <React.Fragment>
      <div className={classes.topWrap}>
        <MovieInfoUI info={movieInfo} />
      </div>
      <div className={classes.bottomWrap}>
        <span className="title">訂單明細</span>
        <div className="line" />
        {/* 電影票 */}
        <MovieTicket classes={classes} />
        {/* 加購餐 */}
        <Food classes={classes} />
        {/* 總金額計算 */}
        <MoneyContent classes={classes} money={money} {...props} />
      </div>
    </React.Fragment>
  );
};

// 上方電影資訊
const MovieInfoUI = ({ info = {} }) => {
  if (info.size <= 0) return null;
  // info = {
  //   cinema_name: '台北日新威秀影城',
  //   ecd_id: '40288eb0050f542401050f551a8a48c3',
  //   ecm_id: '6d4546f78d574a5bb9a3f3b3eeb2a4e4',
  //   erp_product_code: [('301112007', '301112003', '301111012', '301111011')],
  //   ez_trans_master_id: '1033f0e447974348bb6c08a5d72332c6',
  //   hall_name: '第廳第廳',
  //   movie_id: '6a881b0d57fe4618bd57feb1302b75ba',
  //   movie_name: '(數位)返校',
  //   poster_url: 'http://l10l010l3322ll.photos.atmovies.com.tw:8080/2019/B/fbcn27931333/poster/px_fbcn27931333_0004.jpg',
  //   // seats:
  //   //   '0000000001;1;1;9@@J排3號,0000000001;1;1;8@@J排4號,0000000001;1;1;9@@J排5號,0000000001;1;1;8@@J排6號,0000000001;1;1;9@@J排7號,0000000001;1;1;8@@J排8號',
  //   seats: '1-7@@10-7,1-6@@10-6,1-5@@10-5',
  //   show_date: 1572364800000,
  //   show_time: 1572405600000,
  // };
  return (
    <React.Fragment>
      <div className="img" style={{ backgroundImage: `url(${info.poster_url})` }} />
      <div>
        <div className="box">
          <div className="title">電影</div>
          <div className="movie_name">{info.movie_name}</div>
        </div>
        <div className="box">
          <div className="title">影城</div>
          <div>{info.cinema_name}</div>
        </div>
        <div className="box col-two">
          <div>
            <span className="title">日期</span>
            <span>{Helper.datetime.MsToformat(info.show_date, 'MM.DD')}</span>
          </div>
          <div>
            <span className="title">時間</span>
            <span>{Helper.datetime.MsToformat(info.show_time, 'HH:mm')}</span>
          </div>
        </div>

        <div className="box col-two">
          <div>
            <span className="title">張數</span>
            <span>{info.seats.split(',').length}</span>
          </div>
          <div>
            <span className="title">廳</span>
            <span>{info.hall_name}</span>
          </div>
        </div>

        <div className="box">
          <div>
            <span className="title">座位</span>
            <br />
            <span className="title">(排 . 號)</span>
          </div>
          <div className="chips">
            {info.seats.split(',').map(seat => (
              <span className="chip" key={seat}>
                {seat.split('@@')[1]}
              </span>
            ))}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

// 電影票
const MovieTicket = ({ classes }) => {
  const list = productList[1];
  // 無選擇商品，則跳出
  if (list.length <= 0) return null;

  return list.map((group, idx) => (
    <div key={idx}>
      {group.map(ticket => (
        <React.Fragment key={ticket.id + ticket.code}>
          <div className={classes.ticketWrap}>
            <div className="subTitle">
              <span>{ticket.name}</span>
              <br />
              <span className="summary">{ticket.summary}</span>
            </div>
            <div className="info">
              <span>{`${ticket.price}元`}</span>
              <span className="quantity">{`x ${ticket.quantity}`}</span>
            </div>
          </div>
          {ticket.preferential === undefined
            ? null
            : ticket.preferential.map(item => (
                <div className={classes.ticketWrap} key={item.id + item.code}>
                  <div className="subTitle list">{item.name}</div>

                  {item.couponList !== undefined ? (
                    // 優惠序號 - coupon
                    <div className="couponList">
                      {item.couponList.map(coupon => (
                        <React.Fragment key={coupon.id}>
                          <div className="coupon">
                            <div className="subTitle">{coupon.code}</div>
                            <div className="info">
                              {coupon.discount}
元
<span className="quantity">x 1</span>
                            </div>
                          </div>
                        </React.Fragment>
                      ))}
                    </div>
                  ) : (
                    // 其他優惠
                    <div className="info">
                      <span>
                        {`${item.point > 0 ? `${item.point}點` : ''}
                          ${item.point > 0 && item.price > 0 ? '+' : ''}
                          ${item.price > 0 ? `${item.price}元` : ''}`}
                      </span>
                      <span className="quantity">{`x ${item.quantity}`}</span>
                    </div>
                  )}
                </div>
              ))}
        </React.Fragment>
      ))}
      <div className="line" />
    </div>
  ));
};

// 加購餐
const Food = ({ classes }) => {
  const list = productList[2];
  // 無選擇商品，則跳出
  if (list.length <= 0) return null;

  return (
    <React.Fragment>
      {list.map(food => (
        <div key={food.code} className={classes.ticketWrap}>
          <div className="subTitle">
            <span>{food.name}</span>
          </div>
          <div className="info">
            <span>{`${food.price}元`}</span>
            <span className="quantity">{`x ${food.quantity}`}</span>
          </div>
        </div>
      ))}
      <div className="line" />
    </React.Fragment>
  );
};

// 資訊欄 下方自付額總覽
const MoneyContent = ({ money = 0, classes, ...props }) => (
  <div className={`${classes.footer} normal`}>
    <p className="priceWrap">
      自付額
      <span className="price">{money}</span>
元
</p>
    <p className="notice">注意！已包含訂票手續費(20元/張)</p>

    {/* 過場按鈕 */}
    {Helper.payment.createInformationButon(props)}
  </div>
);

const Footer = ({ money = 0, classes, ...props }) => (
  <div className={`${classes.footer} mobile`}>
    <span>
      自付額
      <span className="price">{money}</span>
元
</span>
    {/* 過場按鈕 */}
    {Helper.payment.createInformationButon(props)}
  </div>
);

const styles = theme => ({
  topWrap: {
    display: 'flex',
    marginBottom: '40px',
    '& .img': {
      minWidth: '80px',
      maxWidth: '80px',
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
    },
    '& .box': {
      display: 'flex',
      marginBottom: '8px',
      '&.col-two': {
        display: 'flex',
        flexWrap: 'wrap',
        '& div': {
          textAlign: 'left',
        },
        '& div:nth-child(1)': { width: '95px' },
        '& div:nth-child(2)': { width: 'auto' },
      },
      '& div:nth-child(2)': {
        width: 'calc(100% - 50px)',
      },
      '& .title': {
        minWidth: '48px',
        maxWidth: '48px',
        display: 'inline-block',
        textAlign: 'right',
        color: Palette.secondary['gray-60'],
        padding: '0 8px 0 0px',
        whiteSpace: 'nowrap',
      },

      '& .movie_name': {
        fontSize: '16px',
      },
      '& .chips': {
        display: 'flex',
        flexWrap: 'wrap',
        '& .chip': {
          padding: '0px 4px',
          margin: '0px 8px 8px 0',
          height: '20px',
          borderRadius: '20px',
          border: `1px solid ${Palette.secondary['gray-80']}`,
          backgroundColor: Palette.secondary['gray-80'],
        },
      },
    },
  },

  bottomWrap: {
    '& .title': { fontSize: '16px', color: Palette.support['pink-1'] },
    '& .line': { border: `solid 1px ${Palette.secondary['gray-80']}`, opacity: '0.2', margin: '15px 0' },
  },
  ticketWrap: {
    fontSize: '14px',
    margin: '5px 0',
    display: 'flex',
    flexWrap: 'wrap',
    'justify-content': 'space-between',
    '& .subTitle': {
      width: 'calc(100% - 125px)',
      '& .summary': {
        color: Palette.secondary['gray-60'],
        fontSize: '12px',
        'word-break': 'break-all',
      },
      '&.list': {
        paddingLeft: '15px',
        width: 'calc(100% - 150px)',
        '&:before': {
          content: '"•"',
          paddingRight: '8px',
        },
      },
    },
    '& .couponList': {
      width: '100%',
      display: 'flex',
      'flex-direction': 'column',
      '& .coupon': {
        display: 'flex',
        'justify-content': 'space-between',
        paddingLeft: '30px',
      },
    },
    '& .info': {
      '& .quantity': { paddingLeft: '10px' },
    },
  },

  footer: {
    color: '#FFFFFF',
    fontSize: '16px',

    '&.normal': {
      textAlign: 'right',
    },
    '&.mobile': {
      display: 'flex',
      alignItems: 'center',
      'justify-content': 'space-between',
      position: 'fixed',
      left: 0,
      bottom: 0,
      width: 'calc(100% - 32px)', // 扣除padding
      height: '72px',
      padding: '0 16px',
      backgroundColor: '#000000',
    },
    '& .notice': {
      color: Palette.secondary['gray-60'],
      fontSize: '12px',
      margin: '0 0 16px 0',
    },
    '& .priceWrap': {
      margin: '0 0 8px 0',
    },
    '& .price': {
      color: Palette.support['pink-1'],
      fontSize: '18px',
      padding: '0 2px 0 8px',
    },
    '& .common-btn': {
      width: '130px',
      height: '44px',
      lineHeight: '32px',
      fontSize: '16px',
      margin: 'unset',
    },
  },
});

export default connect(
  state => ({
    view: state.getIn(['main', 'view']),
    movieInfo: state.getIn(['main', 'movieInfo']),
    preferential: state.getIn(['preferential']),
    ticketList: state.getIn(['product', 'ticketList']),
    foodList: state.getIn(['food', 'foodList']),
    popcornText: state.getIn(['main', 'popcornText']),
    popcornFlag: state.getIn(['main', 'popcornFlag']),
    ticketPopcornText: state.getIn(['product', 'popcornText']),
    ticketPopcornFlag: state.getIn(['product', 'popcornFlag']),
    preferentialPopcornText: state.getIn(['preferential', 'popcornText']),
    preferentialPopcornFlag: state.getIn(['preferential', 'popcornFlag']),
  }),
  dispatch => ({
    setView(view) {
      dispatch(setView(view));
    },
    setPopcornFlag() {
      dispatch(setPopcornFlag(true));
    },
    setPopcornText(text) {
      dispatch(setPopcornText(text));
    },
  }),
)(withStyles(styles)(Information));
