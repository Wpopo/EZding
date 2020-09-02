import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import domain from '../../actions/domain';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const MGMLanding = ({ classes }) => {
  const [link, setLink] = useState('https://www.ezding.com.tw/inviteFriends?ref_id=mgm_code');
  const [doing, setDoing] = useState(0);
  const [finish, setFinish] = useState(0);
  const [text, setText] = useState('');

  useEffect(() => {
    let token = localStorage.getItem('accessToken');
    if (token !== null) {
      fetch(`${domain.ROOT_URL}new_ezding/MGM/code`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Ftc-Authorization': `${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setLink(`${data.result.link}ref_id=${data.result.mgm_code}`),
            setDoing(data.result.registered),
            setFinish(data.result.purchased),
            setText(data.result.text);
        });
    } else {
      //member登入
      localStorage.setItem('redirect_uri', '/inviteFriends');
      window.location.href = `${domain.ROOT_URL}member`;
    }
  }, []);

  //參考https://pjchender.blogspot.com/2019/11/webapis-web-share-api-navigatorshare.html?m=1
  const inviteFriends = () => {
    // 當使用者點擊分享時要帶入的資訊
    const shareData = {
      url: link, // 要分享的 URL
      title: 'EzDing', // 要分享的標題
      text: text, // 要分享的文字內容
    };

    // 當瀏覽器支援 Web Share API 時
    const handleNavigatorShare = () => {
      navigator.share(shareData);
    };
    navigator.share && handleNavigatorShare();
  };

  //TODO call api https://app.gitbook.com/@ftcgroup/s/ezding/yi-ez-ding-huo-dong/1.3-tui-jian-huo-dong-mgm/1.3-mgm-cha-xun
  //1.3.1 會員活動-MGM查詢及新增推薦人資料
  //{endpoint}/new_ezding/MGM/code

  return (
    <div className={`${classes.root}`}>
      <div className="lTop">
        <img src="./static/landing/landing-top.png" />
      </div>
      <div>
        <div className="topChange1">
          <div className="topP top1">
            <img src="./static/landing/landing-top1.png" />
          </div>

          <div className="topP top2">
            <img src="./static/landing/landing-top2.png" />
          </div>

          <div className="topP top3">
            <img src="./static/landing/landing-top3.png" />
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
            <img src="./static/landing/landing-top1.png" />
          </div>
          <div className="tScale">
            <img src="./static/landing/landing-top2.png" />
          </div>
          <div className="tScale">
            <img src="./static/landing/landing-top3.png" />
          </div>
        </div>
      </div>

      <div className="blue">
        <div className="blueContent0">
          <img src="./static/landing/66-coupon.png" />
        </div>
        <div className="blueContent1"> 馬上發送2張66折券給好友， 也替自己獲得66折券</div>
        <div className="blueContent2">分享邀請連結</div>
        <div className="blueContent3">
          <div className="linkB"></div>
          <CopyToClipboard text={link} onCopy={() => alert('複製成功')}>
            <div className="linkButton" onClick={() => localStorage.setItem('MGMCode', link)}>
              <img src="./static/landing/link-button.png" />
            </div>
          </CopyToClipboard>
          <div
            className="fbLink"
            onClick={() => {
              window.open('https://www.facebook.com/share.php?u=' + link + '&quote=' + text);
            }}
          >
            <img src="./static/landing/fb.png" />
          </div>
          <div
            className="lineLink"
            onClick={() => {
              window.open(
                'https://social-plugins.line.me/lineit/share?url=' + link + '&text=' + text + '&from=line_scheme',
              );
            }}
          >
            <img src="./static/landing/line.png" />
          </div>
        </div>
      </div>
      <div className="linkContent">{link}</div>
      <div className="bottomContent">
        <div className="topP top4 friend">
          <img src="./static/landing/friend.png" />
        </div>
        <div className="t7">
          <div className="topP top7">
            <img src="./static/landing/process4.png" />
          </div>
        </div>
        <div className="topP top8">
          <img src="./static/landing/success.png" />
        </div>
        <div className="doingContent">{doing}</div>
        <div className="finishContent">{finish}</div>
        <div className="star">
          <img src="./static/landing/landing-Bbg2-1.png" />
        </div>
      </div>
      <div>
        <div className="topP top5 qa">
          <img src="./static/landing/qa-S.png" />
        </div>
        <div className="qaRoot">
          <div className="qaContent">
            <div className="qai">
              <div>
                <img src="./static/landing/q.png" />
              </div>
              <div className="qaContent1">我是推薦人，什麼時候拿到推薦好禮？</div> <br />
            </div>
            <div className="qai">
              <div>
                <img src="./static/landing/a.png" />
              </div>
              <div className="qaContent2">
                好友進行新會員註冊，並完成首購電影票2張以上(含)，且未取消訂票，推薦好友禮將於好友首購之場次開演後14個工作天內，發送至你的會員帳戶
              </div>
            </div>
            <br />
            <div className="qai">
              <div>
                <img src="./static/landing/q.png" />
              </div>
              <div className="qaContent1">為什麼邀請好友，好友卻沒拿到推薦好禮？</div> <br />
            </div>
            <div className="qai">
              <div>
                <img src="./static/landing/a.png" />
              </div>
              <div className="qaContent2">好友可能不是新註冊會員，或是好友未依邀請連結完成註冊</div> <br />
            </div>
            <div className="qai">
              <div>
                <img src="./static/landing/q.png" />
              </div>
              <div className="qaContent1">邀請好友有人數限制嗎？</div> <br />
            </div>
            <div className="qai">
              <div>
                <img src="./static/landing/a.png" />
              </div>
              <div className="qaContent2">邀請沒有人數限制，邀請人數越多，獲得越多66折券，快邀請好友加入喔！</div>
              <br />
            </div>
          </div>
        </div>
        <div className="bonbon">
          <img src="./static/landing/bon2.png" />
        </div>
        <div className="landingBg3">
          <img src="./static/landing/landing-Bbg3.png" />
        </div>
      </div>

      <div className="bottomContent">
        <div className="qa">
          <img src="./static/landing/precautions-B.png" />
        </div>
        <div className="margin20 ">
          <ol>
            <li>
              活動期間，由推薦人分享邀請連結給予被推薦人，被推薦人經由邀請連結，完成會員註冊、驗證，可獲得推薦好禮，被推薦人於註冊後3個月內，完成首購電影票2張(含)以上，且未取消訂票，推薦人將於被推薦人首購之電影場次開演後14個工作天內，於會員帳戶中收到推薦好禮。
            </li>
            <br />
            <li> 推薦人資格：ez訂有效會員。</li> <br />
            <li>被推薦人資格：尚未註冊申請ez訂會員者。</li> <br />
            <li>
              若被推薦人未依邀請連結註冊會員，則無法領取推薦好禮，且無法要求註冊後補償，推薦成功與否之認定將依ez訂系統顯示內容為準，推薦人及被推薦人均不得異議。
            </li>
            <br />
            <li>
              若被推薦者未於註冊3個月內，完成首購電影票2張(含)以上，則推薦人將無法獲得推薦好禮，完成首購成功與否之認定將依ez訂系統顯示內容為準，推薦人及被推薦人均不得異議。
            </li>
            <br />
            <li>
              推薦邀請無人數限制，若ez訂發現有惡意邀請註冊、資料不實等行為，將取消參加及領獎資格，ez訂保留審核參加者參加之資格。
            </li>
            <br />
            <li> 推薦好禮核發之優惠序號，具使用期限，詳細使用期限請見會員中心>優惠券管理，過期未使用將不予補發</li>
            <br />
            <li> 推薦好禮核發之優惠序號，詳細使用方式、規定請見： https://www.ezding.com.tw/faq</li>
            <br />
            <li>
              其他有關該活動未盡事宜，依ez訂網站公告為準，本公司保留隨時修正、暫停、或終止本回饋辦法的權利，並於變動前公布於ez訂網站相關頁面。
            </li>
            <br />
          </ol>
        </div>
      </div>
      <CopyToClipboard text={link} onCopy={() => {}}>
        <div className="couponButton" onClick={() => inviteFriends()}>
          <img src="./static/landing/66couponButton.png" />
          <span className=".result"></span>
        </div>
      </CopyToClipboard>
    </div>
  );
};

const styles = (theme) => ({
  root: {
    frontFamily:
      'system, -apple-system, BlinkMacSystemFont,"PingFang SC",Microsoft JhengHei,Helvetica,Arial,sans-serif',
    display: 'flex',
    backgroundColor: '#1e1e1e',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    overflow: 'hidden',
    width: '100%',
    margin: '80px, 0 0 0',
    '& .lTop': {
      margin: '80px 0 0 0',
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
    '& .blue': {
      height: '604px',
      width: '10000px',
      backgroundColor: '#382775',
      [theme.breakpoints.down('md')]: { display: 'none' },
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
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
    '& .top1': { top: '247px' },
    '& .top2': { top: '534px' },
    '& .top3': { top: '814px' },
    '& .top4': {
      top: '1550px',
      [theme.breakpoints.down('md')]: { top: '729px' },
      [theme.breakpoints.down('sm')]: { top: '1141px' },
    },
    '& .top5': {
      top: '2275px',
      [theme.breakpoints.down('md')]: { top: '1200px' },
      [theme.breakpoints.down('sm')]: { top: '1570px' },
    },

    '& .t7': {
      position: 'relative',
      top: '195px',
      [theme.breakpoints.down('md')]: { top: '127px' },
    },
    '& .top7': {
      //top: '1652px',
      width: '778px',
      '& img': {
        width: '100%',
        height: '100%',
      },
      [theme.breakpoints.down('md')]: {
        //top: '708px',
        width: '621px',
        height: '221px',
      },
      [theme.breakpoints.down('sm')]: {
        // top: '1123px',
        width: '564px',
        height: '200px',
      },
    },
    '& .top8': {
      top: '2064px',
      '& img': {
        width: '100%',
        height: '100%',
      },
      [theme.breakpoints.down('md')]: {
        top: '1049px',
        width: '287px',
        height: '102px',
      },
      [theme.breakpoints.down('sm')]: {
        top: '1428px',
        width: '260px',
        height: '92px',
      },
    },
    '& .grayContent': { backgroundColor: '#333333' },
    '& .margin20': {
      margin: '20px 10px 20px 10px',
      width: '748px',
      height: '916px',
      fontSize: '20.5px',
      color: '#ffffff',
      [theme.breakpoints.down('md')]: {
        width: '548px',
        height: '658px',
        fontSize: '15px',
      },
      [theme.breakpoints.down('sm')]: {
        width: '256px',
        height: '1083px',
        fontSize: '15px',
      },
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
    '& .star': {
      width: '1920px',
      height: '735px',
      '& .img': {
        width: '100%',
        height: '100%',
      },
      [theme.breakpoints.down('md')]: {
        height: '550px',
        '& img': {
          width: '100%',
          height: '100%',
        },
      },
      [theme.breakpoints.down('sm')]: {
        height: '500px',
        '& img': {
          width: '100%',
          height: '100%',
        },
      },
    },
    '& .friend': {
      width: '408px',
      height: '180px',
      '& .img': {
        width: '100%',
        height: '100%',
      },
      [theme.breakpoints.down('md')]: {
        width: '234px',
        height: '99px',
        '& img': {
          width: '100%',
          height: '100%',
        },
      },
      [theme.breakpoints.down('sm')]: {
        width: '172px',
        height: '76px',
        '& img': {
          width: '100%',
          height: '100%',
        },
      },
    },
    '& .landingBg3': {
      width: '100%',
      height: '792px',
      [theme.breakpoints.down('md')]: {
        height: '600px',
      },
      [theme.breakpoints.down('sm')]: {
        height: '661px',
      },
    },
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
    '& .qaRoot': {
      position: 'absolute',
      left: '50%',
      transform: 'translate(-50%)',
      top: '2600px',
      [theme.breakpoints.down('md')]: { top: '1350px' },
      [theme.breakpoints.down('sm')]: { top: '1700px' },
    },
    '& .bonbon': {
      //position: 'fixed',
      position: 'absolute',
      top: '2602px',
      right: '30px',
      [theme.breakpoints.down('md')]: { top: '1500px', right: '20px' },
      [theme.breakpoints.down('sm')]: { top: '2022px', right: '20px', transform: 'scale(0.5)' },
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
    '& .finishContent': {
      color: '#e7008c',
      position: 'absolute',
      left: '50%',
      transform: 'translate(-50%)',
      top: '2095px',
      margin: '0 0 0 74px',
      fontSize: '24px',
      [theme.breakpoints.down('md')]: { top: '1072px', margin: '0 0 0 55px' },
      [theme.breakpoints.down('sm')]: { top: '1447px', margin: '0 0 0 46px' },
    },
    '& .couponButton': {
      zIndex: 220,
      position: 'fixed',
      bottom: '0px',
      display: 'none',
      [theme.breakpoints.down('md')]: { display: 'block' },
    },
  },
});

export default withStyles(styles)(MGMLanding);
