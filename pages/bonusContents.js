import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import HeadMeta from 'Components/headMeta';
import Navbar from 'Components/common/navbar';
import CinemaEntry from 'Components/common/cinemaEntry';
import Footer from 'Components/common/footer';
import { BonusWrapper } from 'Styled/bonusContentStyled';

const warningText = [
  '會員紅利點數是無償取得的有價贈品；不得贈予與轉售，或進行與使用規則無關的行為。',
  '使用免費優惠券恕不得累積會員紅利點數。(含免費特映票、免費首映票、免費團票、免費餐券等等) ',
  '會員紅利點數依實際訂票頁面所顯示之自付額計算(訂票手續費恕不累計)。線上退票/取消訂單時，該筆消費所獲得的會員紅利會自動扣除或退點；影城現場退票（含部分及全退）皆不另外給點、退點，按原線上訂購的之自付金額計算。',
  '消費所累積之會員紅利點數，統一於電影開演後3天自動入點至會員帳戶。',
  '會員所累積之會員紅利將於紅利入帳日的次年12/31到期，期滿將無法使用。例如：2018/1/1~2018/12/31期間所入帳之點數，將全部於2019/12/31到期。',
  '由於登入方式不同，於LINE TODAY消費所累計之電影紅利，恕不得要求與原ez訂會員帳號累計之紅利合併。',
  '天災或其他不可抗力因素，致使電影紅利資料流失時，本公司不負補償之責。',
  '其他有關電影紅利未盡事宜，依ez訂網站公告為準。本公司保留得隨時修正、暫停、或終止本回饋辦法的權利，並於變動前公佈於ez訂網站相關頁面。 ',
];

const bonusContents = ({ ...props }) => {
  const [isShow, setIsShow] = useState(false);
  const { url } = props;
  useEffect(() => {
    if (Router.router.query.comeFromApp !== 'true') setIsShow(true);
  }, []);
  const searchFn = () => {
    const userToken = localStorage.getItem('accessToken');
    if (userToken) {
      Router.push({
        pathname: '/memberCenter',
        query: {
          part: 'bonus',
        },
      });
    } else {
      const endpoint = window.location.origin;
      Router.push({
        pathname: `${endpoint}/MemberUI/login`,
        query: {
          sid: 'ezding',
          redirect_uri: `${endpoint}${url.asPath}`,
          v_type: 'mobile',
        },
      });
    }
  };
  return (
    <div>
      <HeadMeta bonusContents />
      {isShow ? <Navbar url={url} /> : null}
      <BonusWrapper>
        <div className="header">
          <div className="banner" />
          <div className="left_logo" />
          <div className="right_logo" />
          <div className="search" onClick={() => searchFn()} />
        </div>
        <div className="content_buy">
          {/* 大螢幕 */}
          <div className="title lg">如何訂購會員紅利票？</div>
          <div className="title_bg lg" />
          {/* 小螢幕 */}
          <div className="title title_1 xs">如何訂購</div>
          <div className="title_bg title_bg_1 xs" />
          <div className="title title_2 xs">會員紅利票？</div>
          <div className="title_bg title_bg_2 xs" />

          <div className="content">
            <div className="box box1">
              <div className="box_body">
                <div className="box_title">
                  <div className="icon icon1" />
                  <span>
                    選擇想看的
                    <br />
                    電影/影城/座位
                  </span>
                </div>
                <div className="img" />
              </div>
              <div className="desc">
                找影城：適合愛去特定影城的你
                <br />
                找空位：適合強片可快速找空位
              </div>
            </div>
            <div className="box box2">
              <div className="box_body">
                <div className="box_title">
                  <div className="icon" />
                  <span>
                    點選
                    <br />
                    『全票』張數
                  </span>
                </div>
                <div className="img" />
              </div>
              <div className="desc">
                會員紅利限搭配『全票』使用
                <br />
                無法與其他優惠合併使用
              </div>
            </div>
            <div className="box box3">
              <div className="box_body">
                <div className="box_title">
                  <div className="icon icon1" />
                  <span>
                    點選
                    <br />
                    『會員紅利』優惠
                  </span>
                </div>
                <div className="img" />
              </div>
              <div className="desc">
                於選優惠頁面
                <br />
                選取欲搭配會員紅利的張數
              </div>
            </div>
          </div>
        </div>
        <div className="content_QA">
          <div className="title">
            會員紅利Q
            <span className="small">&</span>A
          </div>
          <div className="title_bg sm" />
          <div className="content">
            <div className="box box1">
              <div className="icon" />
              <div className="text">
                <div className="main">會員紅利點數怎麼獲得？</div>
                <div className="sub">消費1元累1點</div>
                <div className="desc">
                  <li>累點超迅速！每筆消費都可以成為會員紅利回饋</li>
                  <li>訂票手費恕不累計</li>
                </div>
              </div>
            </div>
            <div className="box box2">
              <div className="icon" />
              <div className="text">
                <div className="main">會員紅利點數怎麼使用？</div>
                <div className="sub">累積滿500點</div>
                <div className="desc">
                  <li>即可訂會員紅利優惠票1張</li>
                  <li>累滿1000點可訂2張...依此類推</li>
                </div>
              </div>
            </div>
            <div className="box box3">
              <div className="icon" />
              <div className="text">
                <div className="main">會員紅利票有什麼優惠？</div>
                <div className="sub">每張票最高省100元</div>
                <div className="desc">
                  <li>優惠依各影城不同</li>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer">
          <div className="title">注意事項</div>
          <div className="title_bg sm" />
          {/* 注意事項 */}
          <div className="notice">
            {warningText.map((txt, i) => (
              <li key={i}>
                <span>{txt}</span>
              </li>
            ))}
          </div>
        </div>
      </BonusWrapper>
      {isShow ? <CinemaEntry /> : null}
      {isShow ? <Footer /> : null}
    </div>
  );
};

export default bonusContents;
