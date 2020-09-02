import React from 'react';
import Link from 'next/link';
import Router from 'next/router';
import 'isomorphic-unfetch';
import HeadMeta from 'Components/headMeta';
import UrlChange from 'Components/common/urlChange';
import { LineBonusWrapper, BonusListWrapper, MenuWrapper } from 'Styled/lineBonusFaqStyled';
import { HamburgerBtn } from 'Styled/commonStyled';
import DatePicker from 'react-datepicker';
import MemberBonusDetail from 'Components/member/memberBonusDetail';
import { memberSite } from 'Components/common/memberSite';
import moment from 'moment';
import IoMore from 'react-icons/lib/io/more';
import IoLoadA from 'react-icons/lib/io/load-a';
import * as memberAPI from '../actions/memberAPI';

class LineBonus extends React.Component {
  constructor(props) {
    super(props);
    this.scrollToTop = this.scrollToTop.bind(this);
    this.checkToken = this.checkToken.bind(this);
    this.noToken = this.noToken.bind(this);
    this.getMemberPointsList = this.getMemberPointsList.bind(this);
    this.getDayNum = this.getDayNum.bind(this);
    this.webCodeGetToken = this.webCodeGetToken.bind(this);
    this.startOnChange = this.startOnChange.bind(this);
    this.endOnChange = this.endOnChange.bind(this);
    this.searchClick = this.searchClick.bind(this);
    this.getMemberPoints = this.getMemberPoints.bind(this);
    this.phoneScrollFetch = this.phoneScrollFetch.bind(this);
    this.searchPoint = this.searchPoint.bind(this);
    this.hamburger = this.hamburger.bind(this);
    this.debounce = this.debounce.bind(this);
    this.tipsClick = this.tipsClick.bind(this);
    this.eventShow = this.eventShow.bind(this);

    this.state = {
      visible: false,
      isLoadingImg: true,
      isEmpty: false,
      isError: false,
      isResult: false,
      isList: false,
      isScrollLoading: false,
      start: '', // API用
      end: '', // API用
      startDate: null, // 套件用
      endDate: null, // 套件用
      total: 1,
      nowIndex: 1,
      isScrollEmpty: false,
      location: 'http://localhost:3000',
      memberPointListRWD: [],
      memberPointList: '',
      memberPoint: '',
      hamburgerShow: false,
      isTipsShow: false,
      isEventShow: false,
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.debounce);

    Router.onRouteChangeStart = () => {
      this.setState({
        visible: true,
      });
    };
    Router.onRouteChangeComplete = () => {
      this.setState({
        visible: false,
      });
    };

    this.scrollToTop(1);

    this.setState(
      {
        location: window.location.host,
      },
      () => {
        document.getElementById('picker').readOnly = true;
        document.getElementById('picker1').readOnly = true;
      },
    );

    // 是否為登入回來
    if (this.props.url.asPath.match(/code/)) {
      const pathname = this.props.url.pathname;
      this.webCodeGetToken(this.props.url.query.code);

      Router.replace(pathname, pathname, { shallow: true });
    } else {
      // 確認有沒有token
      if (localStorage.getItem('accessToken')) {
        // 有token 檢查toekn
        this.checkToken(localStorage.getItem('accessToken'));
      } else {
        // 沒token 導頁
        this.noToken();
      }
    }
  }

  debounce() {
    const wait = 20;
    const immediate = true;

    const sliderImages = document.querySelectorAll('.slide-in');

    const func = () => {
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

    let timeout;
    const context = this;
    const args = arguments;
    const later = function() {
      timeout = null;
      if (!immediate) {
        func.apply(context, args);
      }
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) {
      func.apply(context, args);
    }
  }

  // 當月的最後一天和第一天
  getDayNum() {
    const date = new Date();
    const y = date.getFullYear();
    const m = date.getMonth();
    const firstDay = new Date(y, m, 1);
    const lastDay = new Date(y, m + 1, 0);

    const showFirstDay = moment(firstDay);
    const showLastDay = moment(lastDay);

    const apiFirstDay = moment.utc(firstDay).valueOf();
    const apiLastDay = moment.utc(lastDay).valueOf();

    this.setState(
      {
        start: apiFirstDay,
        end: apiLastDay,
        startDate: showFirstDay,
        endDate: showLastDay,
      },
      () => {
        this.getMemberPointsList(1);
      },
    );
  }

  // 登入回來 code 換 token
  webCodeGetToken(code) {
    memberAPI
      .webCodeGetToken(code)
      .then(result => {
        this.setState({}, () => {
          localStorage.setItem('accessToken', result.result.access_token);
          this.getDayNum();
          this.getMemberPoints();
        });
      })
      .catch(error => {});
  }

  // 有 userToken 檢查
  checkToken(userToken) {
    memberAPI
      .memberTokenCheck(userToken)
      .then(result => {
        // 先render靜態圖 進行api fetch
        this.getDayNum();
        this.getMemberPoints();
      })
      .catch(error => {
        localStorage.removeItem('accessToken');
        // token is no vaild
        alert('登入資料已過時，請重新登入');
        this.noToken();
      });
  }

  // 沒有 userToken
  noToken() {
    const endpoint = window.location.origin;
    const member = memberSite(window.location.host.toLowerCase());

    // line
    location.href = `${member}/MemberUI/login?sid=ezding&v_type=mobile&login_type=line&redirect_uri=${endpoint}/lineBonus`;
  }

  getMemberPoints() {
    const token = localStorage.getItem('accessToken');
    const point_type = 'ez_member_point';

    memberAPI
      .getMemberPoints(token, point_type)
      .then(result => {
        if (result.code === '401.103') {
          console.log('X2');
          alert('請重新登入');
          Router.push('/');
        } else if (result.code === '200') {
          this.setState({
            memberPoint: result.result,
          });
        }
      })
      .catch(error => {});
  }

  getMemberPointsList(page) {
    const token = localStorage.getItem('accessToken');
    const point_type = 'ez_member_point';
    const begin_time = this.state.start;
    const end_time = this.state.end;
    const page_size = '10';

    if (page <= this.state.total) {
      this.setState({
        isScrollEmpty: false,
      });

      memberAPI
        .getMemberPointsList(token, point_type, begin_time, end_time, page, page_size)
        .then(result => {
          if (result.code === '401.103') {
            alert('請重新登入');
            Router.push('/');
          } else if (result.code === '200') {
            if (result.result.list.length == 0) {
              this.setState(
                {
                  isEmpty: true,
                  isResult: true,
                  isLoadingImg: false,
                  isScrollEmpty: true,
                  isList: false,
                },
                () => {
                  document.getElementById('picker').readOnly = true;
                  document.getElementById('picker1').readOnly = true;
                },
              );
            } else {
              if (page == 1) {
                var memberPointListRWD = [];
              } else {
                var memberPointListRWD = this.state.memberPointListRWD;
              }

              result.result.list.map((item, index) => {
                memberPointListRWD.push(item);
              });

              this.setState(
                {
                  memberPointList: result.result,
                  memberPointListRWD,
                  isResult: true,
                  isList: true,
                  isEmpty: false,
                  isLoadingImg: false,
                  total: result.result.total_pages,
                },
                () => {
                  document.getElementById('picker').readOnly = true;
                  document.getElementById('picker1').readOnly = true;
                },
              );
            }
          }
        })
        .catch(error => {
          this.setState(
            {
              isLoadingImg: false,
              isResult: false,
              isError: true,
            },
            () => {
              alert('請重新登入');
              Router.push('/');
            },
          );
        });
    } else {
      this.setState({
        isScrollEmpty: true,
      });
    }
  }

  endOnChange(date) {
    this.setState({
      endDate: date,
      end: moment.utc(date).valueOf(),
    });
  }

  startOnChange(date) {
    this.setState({
      startDate: date,
      start: moment.utc(date).valueOf(),
    });
  }

  searchClick() {
    if (this.state.start && this.state.end) {
      this.getMemberPointsList(1);
    } else {
      window.alert('請選擇日期區間');
    }
  }

  phoneScrollFetch() {
    this.setState(
      {
        nowIndex: this.state.nowIndex + 1,
      },
      () => {
        this.getMemberPointsList(this.state.nowIndex);
      },
    );
  }

  scrollToTop(scrollDuration) {
    const scrollStep = -window.scrollY / (scrollDuration / 15);
    var scrollInterval = setInterval(() => {
      if (window.scrollY != 0) {
        window.scrollBy(0, scrollStep);
      } else clearInterval(scrollInterval);
    }, 15);
  }

  searchPoint() {
    document.querySelector('.tag').scrollIntoView({ block: 'start', behavior: 'smooth' });
  }

  hamburger() {
    document.querySelector('.hamburger').classList.toggle('active');
    this.setState({
      hamburgerShow: !this.state.hamburgerShow,
    });
  }

  tipsClick() {
    this.setState({
      isTipsShow: !this.state.isTipsShow,
    });
  }

  eventShow() {
    this.setState({
      isEventShow: !this.state.isEventShow,
    });

    if (!this.state.isEventShow) {
      document.querySelectorAll('body')[0].style.overflowY = 'hidden';
    } else {
      document.querySelectorAll('body')[0].style.overflowY = 'scroll';
    }
  }

  render() {
    if (this.state.isLoadingImg) {
      return (
        <div>
          {this.state.visible ? <UrlChange /> : null}
          <HeadMeta LineBonus />
          <LineBonusWrapper>
            <HamburgerBtn onClick={this.hamburger} lineToday>
              <div id="hamburger" className="hamburger hamburger-plus">
                <div className="icon" />
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

            <div className="search" />
            <div className="mask" />
            <div className="header">
              <div className="logo" />
            </div>
            <div className="spaceBox" />
            <div className="banner">
              <div className="img" />
              <div className="contentWrap">
                <div className="title">電影紅利</div>
                <div className="text">LINE TODAY</div>
                <div className="subText">獨享購票優惠</div>
                <div className="imgTicket" />
                <div className="mainContent">
                  <span>於LINE TODAY 電影消費1元累1點</span>
                  <br />
                  <span>聰明消費 電影購票立即省</span>
                  <br />
                  <span>累滿</span>
                  <span className="pink">500點</span>
                  <span>訂票 每張最高</span>
                  <span className="pink">省100元</span>
                </div>
                <div className="subContent">
                  <ul>
                    <li>
                      凡電影紅利累積滿500點，即可用獨享優惠價訂購1張電影票，累積滿1,000點可訂購2張…依此類推,每人每次購買張數以6張為限。
                    </li>
                    <li>於訂票流程選擇付款方式『會員紅利優惠』訂票即可享會員優惠價，每張票最高可省100元。</li>
                  </ul>
                </div>
              </div>
              <div className="stepText">
                <div className="stepbyStep" />
              </div>
            </div>
            <div className="bonusArea">
              <div className="top">
                <span className="main">我的電影紅利點數</span>
                <br />
                <span className="num" />
                <br />
                <span className="point">點</span>
              </div>
              <div className="content">
                <BonusListWrapper part={this.props.part}>
                  <div className="searchBox">
                    <div className="titleWrap">
                      <div className="title">紅利點數</div>
                      <img src="/static/lineBonusFaq/tip.png" onClick={this.tipsClick} />
                      {this.state.isTipsShow ? (
                        <div className="tipsBox">
                          請於下方點選欲查詢的電影紅利查詢區間以顯示點數累積明細，預設區間為近15天電影紅利累積狀況，謝謝！
                        </div>
                      ) : null}
                    </div>
                    <div className="inputWrap">
                      <DatePicker
                        id="picker"
                        selected={this.state.endDate}
                        onChange={this.endOnChange}
                        className="date"
                        showYearDropdown
                        showMonthDropdown
                        dateFormatCalendar="MMMM"
                        scrollableYearDropdown
                        yearDropdownItemNumber={5}
                        placeholderText="查詢日期"
                        onKeyDown={e => e.preventDefault()}
                      />

                      <div className="to" />

                      <DatePicker
                        id="picker1"
                        selected={this.state.startDate}
                        onChange={this.startOnChange}
                        className="date"
                        showYearDropdown
                        showMonthDropdown
                        dateFormatCalendar="MMMM"
                        scrollableYearDropdown
                        yearDropdownItemNumber={5}
                        placeholderText="查詢日期"
                        onKeyDown={e => e.preventDefault()}
                      />

                      <div className="submit" onClick={this.searchClick}>
                        查詢
                      </div>
                    </div>
                  </div>
                </BonusListWrapper>
              </div>
            </div>
            <div className="importantNote">
              <div className="text">電影紅利</div>
              <div className="text">使用注意事項</div>
              <ol className="list">
                <li> 電影紅利點數是無償取得的有價贈品；不得贈予與轉售，或進行與使用規則無關的行為。</li>
                <li> 使用免費優惠券序號恕不得累計電影紅利點數。</li>
                <li>
                  電影紅利點數依實際訂票頁面所顯示之自付額計算(訂票手續費恕不累計)。線上退票/取消訂單時，該筆消費所獲得的會員紅利會自動扣除或退點；影城現場退票（含部分及全退）皆不另外給點、退點，按原線上訂購的之自付金額計算。
                </li>
                <li> 消費所累積之電影紅利點數，統一於電影開演後1天自動入點至會員帳戶。</li>
                <li>
                  會員所累積之電影紅利將於紅利入帳日的次年12/31到期，期滿將無法使用。例如:2018/1/1~2018/12/31期間所入帳之點數，將全部於2019/12/31到期。
                </li>
                <li> 由於登入方式不同，於LINE TODAY消費所累計之電影紅利，恕不得要求與原ez訂員帳號累計之紅利合併。</li>
                <li> 天災或其他不可抗力因素，致使電影紅利資料流失時，本公司不負補償之責。</li>
                <li>
                  其他有關電影紅利未盡事宜，依ez訂網站公告為準。本公司保留得隨時修正、暫停、或終止本回饋辦法的權利，並於變動前公佈於ez訂網站相關頁面。
                </li>
              </ol>
            </div>
            <div className="footer">© 2020 富爾特科技股份有限公司 版權所有。轉載必究</div>
          </LineBonusWrapper>
        </div>
      );
    }
    if (this.state.isResult) {
      return (
        <div>
          <HeadMeta LineBonus />
          <LineBonusWrapper>
            <HamburgerBtn onClick={this.hamburger} lineToday>
              <div id="hamburger" className="hamburger hamburger-plus">
                <div className="icon" />
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

            <div className="search" onClick={this.searchPoint} />
            <div className="mask" />
            <div className="header">
              <div className="logo" />
            </div>
            <div className="spaceBox" />
            <div className="banner">
              <div className="img" />
              <div className="startWrap">
                <img src="/static/lineBonusFaq/start.png" id="start01" className="slide-in" />
                <img src="/static/lineBonusFaq/start.png" id="start02" className="slide-in" />
                <img src="/static/lineBonusFaq/start.png" id="start03" className="slide-in" />
                <img src="/static/lineBonusFaq/start.png" id="start04" className="slide-in" />
                <img src="/static/lineBonusFaq/film.png" id="actionImg02" className="slide-in" />
              </div>
              <img src="/static/lineBonusFaq/money.png" id="actionImg01" className="align-left slide-in" />
              <img src="/static/lineBonusFaq/money-right.png" id="actionImg03" className="align-right slide-in" />
              <div className="contentWrap">
                <div className="title">電影紅利</div>
                <div className="text">LINE TODAY</div>
                <div className="subText">獨享購票優惠</div>
                <img src="/static/lineBonusFaq/ticket.png" id="imgTicket" className="slide-in" />
                <div className="mainContent">
                  <span>於LINE TODAY 電影消費1元累1點</span>
                  <br />
                  <span>聰明消費 電影購票立即省</span>
                  <br />
                  <span>累滿</span>
                  <span className="pink">500點</span>
                  <span>訂票 每張最高</span>
                  <span className="pink">省100元</span>
                </div>
                <div className="subContent">
                  <ul>
                    <li>
                      凡電影紅利累積滿500點，即可用獨享優惠價訂購1張電影票，累積滿1,000點可訂購2張…依此類推,每人每次購買張數以6張為限。
                    </li>
                    <li>於訂票流程選擇付款方式『會員紅利優惠』訂票即可享會員優惠價，每張票最高可省100元。</li>
                  </ul>
                </div>
              </div>
              <div className="stepText">
                <div className="stepbyStep" />
              </div>
            </div>
            <div className="buttonArea">
              <div
                className="orderBtn"
                onClick={() => (window.location.href = 'https://today.line.me/tw/movies/incinemas/thisweek')}
              />
            </div>
            <div className="bonusArea">
              <div className="tag" />
              <div className="top">
                <span className="main">我的電影紅利點數</span>
                <br />
                <span className="num">{this.state.memberPoint.point_sum}</span>
                <br />
                <span className="point">點</span>
              </div>
              <div className="miniFilmWraper">
                <img src="/static/lineBonusFaq/miniFilm01.png" id="miniFilm01" className="bb-left slide-in" />
                <img src="/static/lineBonusFaq/miniFilm02.png" id="miniFilm02" className="bb-left slide-in" />
                <img src="/static/lineBonusFaq/miniFilm03.png" id="miniFilm03" className="bb-right slide-in" />
              </div>

              <div className="content">
                <BonusListWrapper part={this.props.part}>
                  <div className="searchBox">
                    <div className="titleWrap">
                      <div className="title">紅利點數</div>
                      <img src="/static/lineBonusFaq/tip.png" onClick={this.tipsClick} />
                      {this.state.isTipsShow ? (
                        <div className="tipsBox">
                          請於下方點選欲查詢的電影紅利查詢區間以顯示點數累積明細，預設區間為近15天電影紅利累積狀況，謝謝！
                        </div>
                      ) : null}
                    </div>
                    <div className="inputWrap">
                      <DatePicker
                        id="picker1"
                        selected={this.state.startDate}
                        onChange={this.startOnChange}
                        className="date"
                        showYearDropdown
                        showMonthDropdown
                        dateFormatCalendar="MMMM"
                        scrollableYearDropdown
                        yearDropdownItemNumber={5}
                        placeholderText="查詢日期"
                        onKeyDown={e => e.preventDefault()}
                      />

                      <div className="to" />

                      <DatePicker
                        id="picker"
                        selected={this.state.endDate}
                        onChange={this.endOnChange}
                        className="date"
                        showYearDropdown
                        showMonthDropdown
                        dateFormatCalendar="MMMM"
                        scrollableYearDropdown
                        yearDropdownItemNumber={5}
                        placeholderText="查詢日期"
                        onKeyDown={e => e.preventDefault()}
                      />
                      <div className="submit" onClick={this.searchClick}>
                        查詢
                      </div>
                    </div>
                  </div>
                </BonusListWrapper>
                {this.state.isEmpty ? <div className="respondText">此區間沒有紅利點記錄</div> : null}
                {this.state.isList ? (
                  <div className="resultWrap">
                    <MemberBonusDetail result={this.state.memberPointList} rwdResult={this.state.memberPointListRWD} />
                  </div>
                ) : null}
                {this.state.isScrollEmpty ? null : (
                  <div className="scroll" onClick={this.phoneScrollFetch}>
                    {this.state.isScrollLoading ? <IoLoadA className="load" /> : <IoMore className="icon" />}
                  </div>
                )}
              </div>
            </div>
            <div className="importantNote">
              <div className="text">電影紅利</div>
              <div className="text">使用注意事項</div>
              <ol className="list">
                <li> 電影紅利點數是無償取得的有價贈品；不得贈予與轉售，或進行與使用規則無關的行為。</li>
                <li> 使用免費優惠券序號恕不得累計電影紅利點數。</li>
                <li>
                  電影紅利點數依實際訂票頁面所顯示之自付額計算(訂票手續費恕不累計)。線上退票/取消訂單時，該筆消費所獲得的會員紅利會自動扣除或退點；影城現場退票（含部分及全退）皆不另外給點、退點，按原線上訂購的之自付金額計算。
                </li>
                <li> 消費所累積之電影紅利點數，統一於電影開演後3天自動入點至會員帳戶。</li>
                <li>
                  會員所累積之電影紅利將於紅利入帳日的次年12/31到期，期滿將無法使用。例如:2018/1/1~2018/12/31期間所入帳之點數，將全部於2019/12/31到期。
                </li>
                <li> 由於登入方式不同，於LINE TODAY消費所累計之電影紅利，恕不得要求與原ez訂會員帳號累計之紅利合併。</li>
                <li> 天災或其他不可抗力因素，致使電影紅利資料流失時，本公司不負補償之責。</li>
                <li>
                  其他有關電影紅利未盡事宜，依
                  <a href="https://www.ezding.com.tw/faq">ez訂網站</a>
                  公告為準。本公司保留得隨時修正、暫停、或終止本回饋辦法的權利，並於變動前公佈於
                  <a href="https://www.ezding.com.tw/faq">ez訂網站</a>
                  相關頁面。
                </li>
              </ol>
            </div>
            <div className="footer">© 2020 富爾特科技股份有限公司 版權所有。轉載必究</div>
          </LineBonusWrapper>
        </div>
      );
    }
    if (this.state.isError) {
      return <div>錯誤</div>;
    }
  }
}

export default LineBonus;
