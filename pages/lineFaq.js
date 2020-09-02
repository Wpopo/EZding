import React from 'react';
import Link from 'next/link';
import Router from 'next/router';
import 'isomorphic-unfetch';
import HeadMeta from 'Components/headMeta';
import UrlChange from 'Components/common/urlChange';
import { LineFaqWrapper, MenuWrapper } from 'Styled/lineBonusFaqStyled';
import { HamburgerBtn } from 'Styled/commonStyled';

class LineFaq extends React.Component {
  constructor(props) {
    super(props);
    this.scrollToTop = this.scrollToTop.bind(this);
    this.hamburger = this.hamburger.bind(this);
    this.clickQuestion = this.clickQuestion.bind(this);
    this.debounce = this.debounce.bind(this);

    this.state = {
      visible: false,
      hide: false,
    };
  }

  componentDidMount() {
    this.scrollToTop(1);
    Router.onRouteChangeStart = url => {
      this.setState({
        visible: true,
      });
    };
    Router.onRouteChangeComplete = url => {
      this.setState({
        visible: false,
      });
    };

    window.addEventListener('scroll', this.debounce);
  }

  debounce() {
    let wait = 20,
      immediate = true;

    const sliderImages = document.querySelectorAll('.slide-in');

    let func = () => {
      sliderImages.forEach(sliderImage => {
        // half way through the image
        const slideInAt = window.scrollY + window.innerHeight - sliderImage.height / 2;
        // bottom of the image
        const imageBottom = sliderImage.offsetTop + sliderImage.height;
        const isHalfShown = slideInAt > sliderImage.offsetTop;
        const isNotScrolledPast = window.scrollY < imageBottom;
        if (isHalfShown && isNotScrolledPast) {
          sliderImage.classList.add('active');
        } else {
          sliderImage.classList.remove('active');
        }
      });
    };

    var timeout;
    var context = this,
      args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) {
        func.apply(context, args);
      }
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) {
      func.apply(context, args);
    }
  }

  scrollToTop(scrollDuration) {
    var scrollStep = -window.scrollY / (scrollDuration / 15),
      scrollInterval = setInterval(function() {
        if (window.scrollY != 0) {
          window.scrollBy(0, scrollStep);
        } else clearInterval(scrollInterval);
      }, 15);
  }

  hamburger() {
    document.querySelector('.hamburger').classList.toggle('active');
    this.setState({
      hamburgerShow: !this.state.hamburgerShow,
    });
  }

  clickQuestion(value) {
    let items = document.getElementsByClassName('answerBox');
    let itemsArrow = document.getElementsByClassName('arrow');

    if (items[value].classList.contains('active')) {
      items[value].classList.remove('active');
    } else {
      for (let i = 0; i < 5; i++) {
        items[i].classList.remove('active');
      }
      items[value].classList.add('active');
    }

    if (itemsArrow[value].classList.contains('active')) {
      itemsArrow[value].classList.remove('active');
    } else {
      for (let i = 0; i < 5; i++) {
        itemsArrow[i].classList.remove('active');
      }
      itemsArrow[value].classList.add('active');
    }
  }

  render() {
    return (
      <div>
        {this.state.visible ? <UrlChange /> : null}
        <HeadMeta LineBonus={true} />
        <LineFaqWrapper>
          <HamburgerBtn onClick={this.hamburger} lineToday={true}>
            <div id="hamburger" className="hamburger hamburger-plus">
              <div className="icon"></div>
            </div>
          </HamburgerBtn>

          <MenuWrapper hamburgerShow={this.state.hamburgerShow}>
            <Link prefetch href="/lineBonus">
              <div className="text">電影紅利查詢</div>
            </Link>
            <Link prefetch href="/lineFaq">
              <div className="text">票務FAQ</div>
            </Link>
          </MenuWrapper>
          <div className="gotoTop" onClick={() => this.scrollToTop(300)}></div>
          <div className="mask"></div>
          <div className="header">
            <div className="logo"></div>
          </div>
          <div className="spaceBox"></div>
          <div className="banner">
            <div className="mainBox"></div>
            <div className="mainText">LINE TODAY</div>
            <div className="subText">如何訂購電影票？</div>
            <div className="startWrap">
              <img src="/static/lineBonusFaq/start.png" id="start01" className="slide-in" />
              <img src="/static/lineBonusFaq/start.png" id="start02" className="slide-in" />
              <img src="/static/lineBonusFaq/start.png" id="start03" className="slide-in" />
              <img src="/static/lineBonusFaq/start.png" id="start04" className="slide-in" />
              <img src="/static/lineBonusFaq/film.png" id="actionImg02" className="slide-in" />
            </div>
            <img src="/static/lineBonusFaq/money.png" id="actionImg01" className="align-left slide-in" />
            <img src="/static/lineBonusFaq/money-right.png" id="actionImg03" className="align-right slide-in" />
          </div>
          <div className="step">
            <div className="box">
              <div className="num one"></div>
              <div className="text">
                選擇想看的
                <br />
                <span>電影、日期、場次及數量</span>
              </div>
              <img id="imgOne" src="/static/lineBonusFaq/faqStep-01.png" className="slide-in"></img>
            </div>
            <div className="box">
              <div className="num two"></div>
              <div className="text">
                進入ez訂選擇
                <br />
                喜歡的<span>座位</span>
              </div>
              <div className="subText">
                *第一次使用需完成<span>手機驗證</span>唷!
              </div>
              <img id="imgOne" src="/static/lineBonusFaq/faqStep-02.png" className="slide-in"></img>
            </div>
            <div className="box">
              <div className="num three"></div>
              <div className="text">
                選擇付款方式
                <br />
                <span>訂票輕鬆省</span>
              </div>
              <img id="imgOne" src="/static/lineBonusFaq/faqStep-03.png" className="slide-in"></img>
            </div>
            <div className="box">
              <div className="num fore"></div>
              <div className="text">
                完成付款憑<span>取票序號</span>
                <br />
                至影城取票
              </div>
              <img id="imgFore" src="/static/lineBonusFaq/faqStep-04.png" className="slide-in"></img>
            </div>
          </div>
          <div className="subStep">
            <div className="title">如何查詢訂票記錄？</div>
            <div className="subTitle">
              <span>左上角選單</span>訂票記錄輕鬆查
            </div>
            <img id="mainImg" src="/static/lineBonusFaq/faqStep-05.png" className="slide-in"></img>
          </div>
          <div className="faqArea">
            <div className="title">其他票務FAQ</div>
            <div className="wrap">
              <div className="question" onClick={() => this.clickQuestion(0)}>
                <div className="icon">Q</div>
                <div className="text">訂票如何付款？</div>
                <div className="arrow active"></div>
              </div>
              <div className="answerBox active">
                <div className="icon">A</div>
                <div className="text">
                  於LINE TODAY訂購電影票，所有票款（包含手續費、餐費、加購及上述之票價差額）
                  <span>皆需要線上以信用卡/LINE Pay完成刷卡付款</span>
                  。每張票均收取20元訂票手續費。【威秀、新光、喜滿客、喜樂時代、凱擘影城、大直美麗華影城】需於線上支付20元訂票手續費，其他影城之訂票手續費於影城現場支付。訂購3D、IMAX3D場次或片長超過2小時30分鐘之影片，須依頁面顯示金額支付票價差額。
                </div>
              </div>
            </div>
            <div className="wrap">
              <div className="question" onClick={() => this.clickQuestion(1)}>
                <div className="icon">Q</div>
                <div className="text">如何取消訂票？</div>
                <div className="arrow"></div>
              </div>
              <div className="answerBox">
                <div className="icon">A</div>
                <div className="text">
                  請至左上角選單中，點選『我的電影票』查詢訂票記錄。找到相對應的訂單進行取消，系統跳出『取消成功』提示，即完成訂單取消。
                  <span>
                    （訂票手續費依影城規定恕不退還，部分影城規定之時限內未完成退票或逾時未取票，將不退還該筆交易金額，恕不得要求退款或更改其他場次時間。）
                  </span>
                  。【威秀影城】最晚於場次開演前2小時前，皆可於線上取消訂票；超過此時限，則需最晚於場次開演前30分鐘前，親至威秀影城現場櫃台辦理退票；【新光影城】、【喜滿客影城】、【大直美麗華影城】最晚於場次開演前40分鐘前，可於線上或影城現場櫃檯辦理取消訂票。【喜樂時代影城】最晚於場次開演前30分鐘前，可於線上或影城現場櫃檯辦理取消訂票。【凱擘影城】最晚於場次開演前20分鐘前，可於線上或影城現場櫃檯辦理取消訂票。
                  <span>
                    （*部分影城規定之時限內未完成退票或逾時未取票，將不退還該筆交易金額，恕不得要求退款或更改其他場次時間。
                  </span>
                  詳細取消及退票規定請上<a href="https://www.ezding.com.tw/faq">ez訂網站</a>
                  查詢，並依影城實際公告為準。）
                </div>
              </div>
            </div>
            <div className="wrap">
              <div className="question" onClick={() => this.clickQuestion(2)}>
                <div className="icon">Q</div>
                <div className="text">如何辦理退款作業？</div>
                <div className="arrow"></div>
              </div>
              <div className="answerBox">
                <div className="icon">A</div>
                <div className="text">
                  線上完成辦理全數退票及全數取消訂票者，系統將於退票後<span>1~3個工作天</span>
                  （不含國定假日）退還您的消費款項及點數（訂票手續費依影城規定恕不退還）（註：使用中信、台新及HappyGo卡片交易者，因配合銀行作業，將於場次開演當月底統一退款、退點)；部分退票者（如：訂三張取一張），ez訂的退票作業將依照刷卡銀行之規定辦理（如刷卡銀行規定不得部分退票者，則ez訂恕難配合部分退票）。又為配合銀行及影城作業時間，部分退票部分，將於電影場次開演當月底統一進行退款、退點（訂票手續費依影城規定恕不退還）。詳細退款規定請上
                  <a href="https://www.ezding.com.tw/faq">ez訂網站</a>查詢或電洽客服專線：(02)8912-6600
                </div>
              </div>
            </div>
            <div className="wrap">
              <div className="question" onClick={() => this.clickQuestion(3)}>
                <div className="icon">Q</div>
                <div className="text">LINE TODAY電影紅利是否可與ez訂會員紅利合併計算？</div>
                <div className="arrow"></div>
              </div>
              <div className="answerBox">
                <div className="icon">A</div>
                <div className="text">由於訂票登入方式不同，電影紅利點數恕不合併計算。</div>
              </div>
            </div>
            <div className="wrap">
              <div className="question" onClick={() => this.clickQuestion(4)}>
                <div className="icon">Q</div>
                <div className="text">想了解其他票務問題？</div>
                <div className="arrow"></div>
              </div>
              <div className="answerBox">
                <div className="icon">A</div>
                <div className="text">
                  請上<a href="https://www.ezding.com.tw/faq">ez訂網站</a>查詢或電洽客服專線：(02)8912-6600
                </div>
              </div>
            </div>
          </div>
          <div className="footer">© 2020 富爾特科技股份有限公司 版權所有。轉載必究</div>
        </LineFaqWrapper>
      </div>
    );
  }
}

export default LineFaq;
