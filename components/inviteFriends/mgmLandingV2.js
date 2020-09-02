import React, { useState, useEffect } from 'react';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import styled from 'styled-components';
import domain from '../../actions/domain';
import { CopyToClipboard } from 'react-copy-to-clipboard';

function MgmLandingV2(props) {
  const [link, setLink] = useState('https://www.ezding.com.tw/inviteFriends?ref_id=mgm_code');
  const [doing, setDoing] = useState(0);
  const [finish, setFinish] = useState(0);
  const [text, setText] = useState('');

  const { width } = props;

  const section = [
    {
      title: './static/landing/landing-top.png',
      bgImg: './static/landing/landing-Bbg1.png',
      egg: [
        './static/landing/landing-top1.png',
        './static/landing/landing-top2.png',
        './static/landing/landing-top3.png',
      ],
    },
    { title: './static/landing/66-coupon.png', bgImg: '' },
    { title: './static/landing/friend.png', bgImg: './static/landing/landing-Bbg2.png' },
    { title: './static/landing/qa-S.png', bgImg: './static/landing/landing-Bbg3.png' },
    { title: './static/landing/precautions-B.png', bgImg: '' },
  ];

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

  return section.map((data, index) => {
    return (
      <Wrap width={isWidthUp('sm', width)}>
        {!isWidthUp('lg', width) && (
          <FixedBottom width={isWidthUp('lg', width)} onClick={() => inviteFriends()}>
            發66折券給好友 >
          </FixedBottom>
        )}
        <WrapMGM index={index} bgImg={data.bgImg} width={isWidthUp('sm', width)}>
          <WrapContent width={isWidthUp('lg', width)}>
            <Title index={index} width={isWidthUp('lg', width)}>
              {isWidthUp('lg', width) ? <img src={data.title} /> : index !== 1 && <img src={data.title} />}
            </Title>
            {index === 0 && (
              <EggWrapContent bgImg={data.bgImg} width={isWidthUp('sm', width)}>
                <div>
                  {data.egg.map((egg, index) => (
                    <div key={index}>
                      <img src={egg} alt="" />
                    </div>
                  ))}
                </div>
              </EggWrapContent>
            )}
            {index === 1 && isWidthUp('lg', width) && (
              <>
                <h3>
                  馬上發送2張66折券給好友， <br />
                  也替自己獲得66折券
                </h3>
                <CopyLink>
                  <div>分享邀請連結</div>
                  <div className="box">
                    <div className="copyText">
                      <div>{link}</div>
                    </div>
                    <CopyToClipboard text={link} onCopy={() => alert('複製成功')}>
                      <p className="cpbtn">複製連結</p>
                    </CopyToClipboard>
                    <div
                      className="icon"
                      onClick={() => {
                        window.open('https://www.facebook.com/share.php?u=' + link + '&quote=' + text);
                      }}
                    >
                      <img src="./static/landing/fb.png" alt="FB" />
                    </div>
                    <div
                      className="icon"
                      onClick={() => {
                        window.open(
                          'https://social-plugins.line.me/lineit/share?url=' +
                            link +
                            '&text=' +
                            text +
                            '&from=line_scheme',
                        );
                      }}
                    >
                      <img src="./static/landing/line.png" alt="Line" />
                    </div>
                  </div>
                </CopyLink>
              </>
            )}
            {index === 2 && (
              <Counter width={isWidthUp('sm', width)}>
                <img className="bon" src="./static/landing/bon1.png" alt="" />
                <div className="whiteBg">
                  <div className="imgTitle">
                    <div className="icon">
                      <img className="icon" src="./static/landing/icon1.png" alt="" />
                    </div>
                    <div className="">
                      進行中<span>{doing}</span>位
                    </div>
                  </div>
                  <div className="imgContent">
                    好友已領取兩張66折優惠券，但還沒完成購票任務，提醒他們你才可以獲得獎勵
                  </div>
                </div>
                <div className="whiteBg">
                  <div className="imgTitle">
                    <div className="icon">
                      <img src="./static/landing/icon2.png" alt="" />
                    </div>
                    <div>
                      已完成<span>{finish}</span>位
                    </div>
                  </div>
                  <div className="imgContent">好友已完成任務，到會員中心查詢你的優惠券</div>
                </div>
              </Counter>
            )}
            {index === 3 && (
              <Qa width={isWidthUp('sm', width)}>
                {isWidthUp('sm', width) ? (
                  <>
                    <img src="./static/landing/qalist.png" />
                    <img className="boom" src="./static/landing/bon2.png" />
                  </>
                ) : (
                  <img src="./static/landing/qalist-s.png" />
                )}
              </Qa>
            )}
            {index === 4 && (
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
                  若被推薦者未於註冊3個月內，完成首購電影票2張以上(含)，則推薦人將無法獲得推薦好禮，完成首購成功與否之認定將依ez訂系統顯示內容為準，推薦人及被推薦人均不得異議。
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
            )}
          </WrapContent>
        </WrapMGM>
      </Wrap>
    );
  });
}

export default withWidth()(MgmLandingV2);

const Wrap = styled.div`
  box-sizing: border-box;
  width: 100vw;
`;

const WrapMGM = styled.section`
  width: 100％;
  display: flex;
  justify-content: center;
  padding-top: ${(props) => (props.width ? props.index === 0 && '8rem' : '0')};
  padding-bottom: ${(props) => (props.width ? props.index !== 1 && '6rem' : '0')};
  background: ${(props) =>
    (props.index === 0 && `#1e1e1e`) ||
    (props.index === 1 && '#382775') ||
    (props.index === 2 && `repeat center/100% url(${props.bgImg}) #333333`) ||
    (props.index === 3 && `no-repeat bottom/101% url(${props.bgImg}) #1e1e1e`) ||
    (props.index === 4 && '#333333')};
  color: #fff;
  text-align: center;
  ol {
    width: ${(props) => (props.width ? '60%' : '90%')};
    margin: 0 auto;
    padding: 0.9rem 0 0.2rem 0;
    text-align: left;
    li {
      margin-left: 1rem;
    }
  }
`;
const WrapContent = styled.div`
  width: ${(props) => (props.width ? '70%' : '100%')};
  justify-content: center;
`;
const Title = styled.div`
  max-width: 20rem;
  margin: 0 auto;
  padding: ${(props) =>
    props.index === 0
      ? '6rem 1rem 0 1rem'
      : props.width
      ? '8rem 0 0 0'
      : (props.index === 1 && '0') || '1.85rem 1rem 0 1rem'};
  img {
    width: 100%;
  }
`;
const EggWrapContent = styled.div`
  max-width: ${(props) => (props.width ? '50rem' : '50%')};
  max-height: ${(props) => (props.width ? '100%' : '50%')};
  margin: 0 auto;
  margin-bottom: 3rem;
  background: ${(props) => props.width && `no-repeat center/100% url("${props.bgImg}")`};
  div {
    max-width: ${(props) => (props.width ? '60%' : '100%')};
    margin: 0 auto;
    justify-content: space-between;
    display: flex;
    flex-direction: ${(props) => (props.width ? 'row' : 'column')};
    div {
      width: ${(props) => (props.width ? '30%' : '100%')};
      padding: 1rem 0.5rem;
      img {
        margin: 0 auto;
        width: 100%;
        height: 100%;
      }
    }
  }
`;
const CopyLink = styled.div`
  max-width: 60%;
  display: flex;
  flex-direction: column;
  margin: 3rem auto;
  text-align: left;
  .box {
    width: 100%;
    flex-direction: row;
    display: inline-flex;
    align-items: center;
    margin: 0 auto;
    div {
      display: flex;
      margin: 0.5rem 0;
    }
    .copyText {
      width: 26rem;
      padding: 0.5rem 0 0.5rem 1rem;
      border: 1px solid #e7008c;
      border-radius: 10px;
      background: #333333;
      div {
        width: 100%;
      }
    }
    .cpbtn {
      width: 6rem;
      margin: 0.8rem;
      padding: 0.6rem 0;
      border-radius: 50px;
      background: #e7008c;
      text-align: center;
      cursor: pointer;
    }
    .icon {
      cursor: pointer;
      margin-left: 0.8rem;
      width: 2.5rem;
      img {
        width: 100%;
      }
    }
  }
`;

const Counter = styled.div`
  width: ${(props) => (props.width ? '30rem' : '90%')};
  margin: -5rem auto 1rem;
  color: black;
  font-weight: bold;
  .bon {
    width: 25%;
    padding-top: ${(props) => (props.width ? '-5rem' : '1rem')};
    transform: ${(props) => (props.width ? 'translate(-13rem,5rem)' : 'translate(-8rem,2rem)')};
  }
  .whiteBg {
    margin: ${(props) => (props.width ? '3rem  ' : '1rem ')};
    padding: ${(props) => (props.width ? '3rem 2.8rem' : '1.8rem')};
    background: white;
    border: 1px solid white;
    border-radius: 10px;
    text-align: left;
    .imgTitle {
      display: inline-flex;
      width: ${(props) => (props.width ? '85%' : '90%')};
      margin-bottom: 1rem;
      justify-content: space-around;
      font-size: ${(props) => (props.width ? '1.6rem' : '1.2rem')};
      .icon {
        height: ${(props) => (props.width ? '2.5rem' : '2rem')};
        img {
          height: 100%;
        }
      }
      span {
        margin: ${(props) => (props.width ? '0 1.5rem' : '0 1rem')};
        color: #e7008c;
      }
    }
    .imgContent {
      font-size: ${(props) => (props.width ? '0.85rem' : '0.75rem')};
    }
  }
`;

const Qa = styled.div`
  max-width: ${(props) => (props.width ? '60%' : '17rem')};
  max-height: ${(props) => (props.width ? '40rem' : '100%')};
  display: inline-flex;
  margin: ${(props) => (props.width ? '2rem auto' : '1.5rem auto')};
  .boom {
    width: 15%;
    height: 15%;
    transform: translate(0%, 15rem);
  }
  img {
    width: 100%;
    height: 100%;
  }
`;

const FixedBottom = styled.div`
  width: 100%;
  padding: 0.75rem 0;
  position: fixed;
  bottom: 0;
  background: #ffc003;
  text-align: center;
  color: white;
  font-size: 1.25rem;
  cursor: pointer;
`;
