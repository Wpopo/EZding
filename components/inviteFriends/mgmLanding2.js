import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import CinemaEntry from '../common/cinemaEntry';
import domain from '../../actions/domain';

const MGMLanding2 = ({ classes }) => {
  return (
    <div className={`${classes.root}`}>
      <div className="lTop">
        <img src="./static/landing/66coupon.png" />
      </div>
      <div>
        <div className="topChange1">
          <div className="topP top1">
            <img style={{ width: '100%' }} src="./static/landing/fromFriend1.png" />
          </div>

          <div className="topP top2">
            <img style={{ width: '100%' }} src="./static/landing/fromFriend2.png" />
          </div>

          <div className="topP top3">
            <img style={{ width: '100%' }} src="./static/landing/fromFriend3.png" />
          </div>

          <div className="bg1">
            <img src="./static/landing/landing-bg1.png" />
          </div>
        </div>
        <div className="topChange2">
          <div className="Bbg1">
            <img src="./static/landing/landing-Bbg1.png" />
          </div>
        </div>
        <div className="bEgg topP">
          <div className="tScale">
            <img src="./static/landing/fromFriend1.png" />
          </div>
          <div className="tScale">
            <img src="./static/landing/fromFriend2.png" />
          </div>
          <div className="tScale">
            <img src="./static/landing/fromFriend3.png" />
          </div>
        </div>
      </div>
      <div>
        <div className="inviteMyFriendsPopcorn">
          {/* desktop */}
          <div>
            <div className="qa">
              <img src="./static/landing/howToUseCoupon.png" />
            </div>
          </div>
          <div>
            <div className="qa" style={{ width: '500px', height: '500px' }}>
              <img src="./static/landing/couponUseStep.png" />
            </div>
          </div>
          <div>
            <img src="./static/landing/inviteMyFriendsPopcornBg.png" />
          </div>
          {/* mobile */}
          <div>
            <div className="qa-m">
              <img src="./static/landing/howToUseCoupon.png" />
            </div>
            <div className="qa-m">
              <img src="./static/landing/couponUseStep-s.png" />
            </div>
          </div>
          {/* ************* */}
        </div>
      </div>
      <div className="yellow">
        <div onClick={() => (window.location.href = `${domain.ROOT_URL}member`)}>註冊領優惠 ></div>
      </div>
      {/* QQQQQQQQQQQQQQQQQQQQQQQQ */}
      <div className="yellowBon">
        <div onClick={() => (window.location.href = `${domain.ROOT_URL}member`)}>
          <img src="./static/landing/mgm66.png" />
        </div>
      </div>
      <CinemaEntry />
    </div>
  );
};

const styles = (theme) => ({
  root: {
    frontFamily:
      'system, -apple-system, BlinkMacSystemFont,"PingFang SC",Microsoft JhengHei,Helvetica,Arial,sans-serif',
    display: 'flex',
    backgroundColor: '#333333',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    overflow: 'hidden',
    width: '100%',
    margin: '80px, 0 0 0',
    '& .yellowBon': {
      width: '20%',
      position: 'fixed',
      bottom: '4rem',
      right: '9rem',
      [theme.breakpoints.down('sm')]: { display: 'none' },
      '& div': {
        width: '14rem',
        textAlign: 'end',
        '& img': {
          width: '100%',
        },
      },
    },
    '& .yellow': {
      width: '100%',
      background: '#ffc003',
      position: 'fixed',
      bottom: '0',
      zIndex: '999',
      [theme.breakpoints.up('md')]: { display: 'none' },
      '& div': {
        width: '30%',
        color: 'white',
        margin: '0 auto',
        padding: '0.8rem 0.8rem',
        textAlign: 'center',
      },
    },
    '& .lTop': {
      margin: '100px 0 0 0',
      '& img': {
        width: '100%',
        height: '100%',
      },
      [theme.breakpoints.down('md')]: { width: '360px', height: '198px' },
      [theme.breakpoints.down('sm')]: { width: '250px', height: '138px' },
    },
    '& .bEgg': {
      display: 'flex',
      top: '443px',
      '& img': { width: '100%', height: '100%' },
      [theme.breakpoints.down('md')]: {
        top: '300px',
        '& img': {},
      },
      [theme.breakpoints.down('sm')]: { display: 'none' },
    },
    '& .linkB': {
      width: '404px',
      height: '56px',
      backgroundColor: '#333333',
      borderRadius: '10px',
      border: '2px #e7008c solid',
      margin: '0 10px',
    },
    '& .linkButton': { width: '181px', height: '56px', margin: '0 10px', cursor: 'pointer' },
    '& .blueContent0': { margin: '20px' },
    '& .fbLink': { margin: '10px', cursor: 'pointer' },
    '& .lineLink': { margin: '10px', cursor: 'pointer' },
    '& .blueContent1': {
      width: '308px',
      height: '66px',
      fontSize: '24px',
      color: '#ffffff',
      textAlign: 'center',
      margin: '10px',
    },
    '& .blueContent2': { width: '761px', height: '29px', fontSize: '21px', color: '#ffffff', margin: '10px' },
    '& .blueContent3': { display: 'flex', margin: '10px', alignItems: 'center' },
    '& .tScale': {
      margin: '0px 15px 0px 15px',
      transform: 'scale(1.1)',
      [theme.breakpoints.down('md')]: { transform: 'scale(1)', margin: '0px 10px 0px 10px' },
    },
    '& .bg1': { margin: '50px 0px 50px 0px' },
    '& .Bbg1': {
      '& img': {
        width: '100%',
        height: '100%',
      },
      [theme.breakpoints.down('md')]: {
        width: '768px',
        height: '279px',
      },
    },
    '& .topChange1': { display: 'none', [theme.breakpoints.down('sm')]: { display: 'block' } },
    '& .topChange2': {
      marginBottom: '130px',
      [theme.breakpoints.down('md')]: { marginBottom: '116px' },
      [theme.breakpoints.down('sm')]: { display: 'none' },
    },
    '& .topP': { position: 'absolute', left: '50%', transform: 'translate(-50%)' },
    '& .top1': { top: '247px', width: '154px' },
    '& .top2': { top: '534px', width: '154px' },
    '& .top3': { top: '814px', width: '154px' },
    '& .top4': {
      top: '1550px',
      [theme.breakpoints.down('md')]: { top: '729px' },
      [theme.breakpoints.down('sm')]: { top: '1141px' },
    },
    '& .qa': {
      margin: '40px 0 0 0 ',
      width: '318px',
      height: '180px',
      '& .img': {
        width: '100%',
        height: '100%',
      },
      [theme.breakpoints.down('md')]: {
        width: '180px',
        height: '99px',
        '& img': {
          width: '100%',
          height: '100%',
        },
      },
      [theme.breakpoints.down('sm')]: {
        width: '134px',
        height: '76px',
        '& img': {
          width: '100%',
          height: '100%',
        },
      },
    },
    '& .qai': { display: 'flex', alignItems: 'center' },
    '& .qaContent1': {
      width: '405px',
      height: '32px',
      color: '#f300b3',
      margin: '0 10px',
      [theme.breakpoints.down('sm')]: { width: '272px', height: '100%' },
    },
    '& .qaContent2': {
      width: '662px',
      height: '56px',
      color: '#ffffff',
      margin: '0 10px',
      [theme.breakpoints.down('sm')]: { width: '272px', height: '100%' },
    },
    '& .qaContent': {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
    '& .linkContent': {
      color: '#ffffff',
      position: 'absolute',
      top: '1387px',
      left: '50%',
      transform: 'translate(-98%)',
      wordBreak: 'break-all',
      width: '361px',
      [theme.breakpoints.down('md')]: { display: 'none' },
    },
    '& .doingContent': {
      color: '#e7008c',
      position: 'absolute',
      left: '50%',
      transform: 'translate(-50%)',
      top: '1900px',
      margin: '0 0 0 74px',
      fontSize: '24px',
      [theme.breakpoints.down('md')]: { top: '931px', margin: '0 0 0 55px' },
      [theme.breakpoints.down('sm')]: { top: '1328px', margin: '0 0 0 46px' },
    },
    '& .bottomContent': {
      backgroundColor: '#333333',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
      alignItems: 'center',
      overflow: 'hidden',
    },
    '& .couponButton': {
      width: '200px',
      zIndex: 220,
      position: 'fixed',
      bottom: '5px',
      marginRight: '2rem',
      '& img': { width: '100%' },
    },
    '& .inviteMyFriendsPopcorn': {
      minWidth: '100vw',
      backgroundColor: '#1e1e1e;',
      paddingTop: '8rem',
      [theme.breakpoints.down('sm')]: { paddingTop: '3rem' },
      '& div': {
        margin: '0 auto ',
        '&  .qa': {
          [theme.breakpoints.down('sm')]: { display: 'none' },
          width: '450px',
          height: '180px',
          '& img': {
            width: '100%',
          },
        },
        '& .qa-m': {
          display: 'none',
          [theme.breakpoints.down('sm')]: { display: 'block', width: '320px' },
          '& img': {
            display: 'none',
            [theme.breakpoints.down('sm')]: {
              display: 'block',
              margin: '0 auto ',
              width: '80%',
              paddingBottom: '2rem',
            },
          },
        },
        '& img': {
          width: '100%',
          marginBottom: '-5rem',
          [theme.breakpoints.down('sm')]: { display: 'none' },
        },
      },
    },
  },
});

export default withStyles(styles)(MGMLanding2);
