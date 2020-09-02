import React from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { NavbarWrapper, HamburgerWrapper, MemberPart, HamburgerBtn, RedPointWrapper } from '../../styled/commonStyled';
import BookingDialog from '../bookingDialog/bookingDialog';
import MdChevronRight from 'react-icons/lib/md/chevron-right';
import Info from 'react-icons/lib/fa/info-circle';
import { memberSite } from './memberSite';

// api
import * as memberAPI from '../../actions/memberAPI';

class Navbar extends React.Component {
  constructor(props) {
    super(props);

    this.dialog = this.dialog.bind(this);
    this.hamburger = this.hamburger.bind(this);
    this.memberShow = this.memberShow.bind(this);

    // member
    this.webCodeGetToken = this.webCodeGetToken.bind(this);
    this.memberTokenCheck = this.memberTokenCheck.bind(this);
    this.getMemberDetail = this.getMemberDetail.bind(this);
    this.getMemberNickName = this.getMemberNickName.bind(this);
    this.getMemberPoints = this.getMemberPoints.bind(this);
    this.memberTokenLogOut = this.memberTokenLogOut.bind(this);

    this.state = {
      visible: false, // bookinkDialog
      hamburgerShow: false,
      memberBtnShow: false,

      // member
      isAccessToken: false,
      memberDetail: '',
      location: '/',
      endpoint: '/',
      nickname: '',
      part: this.props.url.query.part || null,
      memberDetailPhotoUrl: '',
      memberPoint: 0,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.url.query.part !== this.state.part) {
      document.getElementById('hamburger').classList.remove('active');

      this.setState({
        hamburgerShow: false,
      });
    }
  }

  componentDidMount() {
    this.setState({
      endpoint: window.location.origin,
      location: memberSite(window.location.host.toLowerCase()),
    });

    // membertoken is existed or not
    if (localStorage.getItem('accessToken')) {
      const accessToken = localStorage.getItem('accessToken');
      this.memberTokenCheck(accessToken);
    }
    // code change token
    if (this.props.url.asPath.match(/code/)) {
      if (this.props.url.query.code) {
        const pathname = this.props.url.asPath.match(/&/)
          ? this.props.url.asPath.split('&').slice(0, -1).join('&')
          : this.props.url.pathname;

        this.webCodeGetToken(this.props.url.query.code);
        Router.replace(pathname, pathname, { shallow: true });
      } else {
        sessionStorage.setItem('campaignCode', this.props.url.query.campaign_code);
      }
    }
    localStorage.setItem('redirect_uri', this.state.endpoint);
  }

  dialog() {
    this.setState({
      visible: !this.state.visible,
    });

    if (this.state.visible) {
      document.body.style.overflow = 'visible';
      document.body.style.position = 'initial';
      document.body.style.height = 'auto';
    }
  }

  hamburger() {
    document.querySelector('.hamburger').classList.toggle('active');

    this.setState({
      hamburgerShow: !this.state.hamburgerShow,
    });
  }

  memberShow() {
    this.setState({
      memberBtnShow: !this.state.memberBtnShow,
    });
  }

  // member token get
  webCodeGetToken(code) {
    memberAPI
      .webCodeGetToken(code)
      .then((result) => {
        this.setState(
          {
            isAccessToken: true,
          },
          () => {
            localStorage.setItem('accessToken', result.result.access_token);
            this.getMemberDetail(result.result.access_token);
            this.getMemberPoints(result.result.access_token);
            if (this.props.bookingFunc) {
              this.props.bookingFunc(true);
            }
          },
        );
      })
      .catch((error) => {});
  }

  // member token check
  memberTokenCheck(token) {
    memberAPI
      .memberTokenCheck(token)
      .then((result) => {
        this.setState(
          {
            isAccessToken: true,
          },
          () => {
            this.getMemberDetail(token);
            this.getMemberPoints(token);
          },
        );
      })
      .catch((error) => {
        localStorage.removeItem('accessToken');
      });
  }

  getMemberDetail(token) {
    memberAPI
      .memberDetail(token)
      .then((result) => {
        this.setState({
          memberDetail: result.result,
          memberDetailPhotoUrl: `https://img.ezding.com.tw${result.result.photo_url}?${Date.now()}`,
        });
        this.getMemberNickName(token);
      })
      .catch((error) => {});
  }

  getMemberNickName(token) {
    memberAPI
      .memberNickName(token)
      .then((result) => {
        this.setState({
          nickname: result.result.inv_data.nick_name,
        });
      })
      .catch((error) => {});
  }

  getMemberPoints(token) {
    memberAPI
      .getMemberPoints(token, 'ez_member_point')
      .then((result) => {
        if (result.code === '200') {
          this.setState({
            memberPoint: result.result.point_sum,
          });
        }
      })
      .catch((error) => {});
  }

  memberTokenLogOut() {
    const token = localStorage.getItem('accessToken');
    memberAPI
      .memberTokenLogOut(token)
      .then((result) => {
        this.setState(
          {
            isAccessToken: false,
            memberDetail: '',
            memberBtnShow: false,
            hamburgerShow: false,
          },
          () => {
            localStorage.removeItem('accessToken');
            Router.push('/');
          },
        );
      })
      .catch((error) => {
        Router.push('/');
      });
  }

  render() {
    const endpoint = this.state.location;
    const memberLoginUrl = `${endpoint}/MemberUI/login?sid=ezding&redirect_uri=${encodeURIComponent(
      `${this.state.endpoint}${this.props.url.asPath}`,
    )}&v_type=mobile`;
    const photoUrl = this.state.memberDetail.photo_url
      ? this.state.memberDetailPhotoUrl
      : './static/member/default-avatar.png';

    return (
      <div>
        {
          // 判斷漢堡包是否要開啟
          this.state.hamburgerShow ? (
            <HamburgerWrapper show={this.state.hamburgerShow} member={this.state.isAccessToken}>
              {this.state.memberDetail ? (
                <React.Fragment>
                  <div className="ham-nav">
                    <Link prefetch href="/memberCenter?part=information">
                      <div className="photo" style={{ backgroundImage: `url(${photoUrl})` }} />
                    </Link>
                    <div className="name">{this.state.nickname}</div>
                  </div>
                  <RedPoint point={this.state.memberPoint} />
                </React.Fragment>
              ) : (
                <Link href="/member">
                  <div className="ham-nav">
                    {' '}
                    <span>登入</span>
                    {' / '}
                    <span>註冊</span>
                  </div>
                </Link>
              )}
              <Link prefetch href="/preferential">
                <div className="ham-nav option">優惠查詢</div>
              </Link>
              <Link prefetch href="/article?type=0&page=1">
                <div className="ham-nav option">影評文章</div>
              </Link>
              <Link prefetch href="/movieInfoIndex">
                <div className="ham-nav option">電影時刻</div>
              </Link>
              <Link prefetch href="/guide">
                <div className="ham-nav option">使用攻略</div>
              </Link>
              <Link prefetch href="/faq">
                <div className="ham-nav option">客服中心</div>
              </Link>

              {
                // 判斷是否有會員權限 有則顯示會員中心與登出
                this.state.isAccessToken ? (
                  <div>
                    <div className="ham-nav member">會員中心</div>
                    <Link prefetch href="/memberCenter?part=records">
                      <div className="ham-nav option memberBtn">
                        <MdChevronRight className="icon" />
                        訂票紀錄
                      </div>
                    </Link>
                    <Link prefetch href="/memberCenter?part=bonus">
                      <div className="ham-nav option memberBtn">
                        <MdChevronRight className="icon" />
                        紅利點數
                      </div>
                    </Link>
                    <Link prefetch href="/memberCenter?part=ticket">
                      <div className="ham-nav option memberBtn">
                        <MdChevronRight className="icon" />
                        優惠券管理
                      </div>
                    </Link>
                    <Link prefetch href="/memberCenter?part=information">
                      <div className="ham-nav option memberBtn">
                        <MdChevronRight className="icon" />
                        會員資訊
                      </div>
                    </Link>
                    <Link prefetch href="/inviteFriends">
                      <div className="ham-nav option memberBtn">
                        <MdChevronRight className="icon" />
                        邀請好友賺優惠
                      </div>
                    </Link>

                    <div className="ham-nav option memberBtn" onClick={this.memberTokenLogOut}>
                      <MdChevronRight className="icon" />
                      登出
                    </div>
                  </div>
                ) : null
              }
              <a href="https://www.facebook.com/sofunezding/">
                <img src="/static/common/nav-fb.svg" className="fb-icon" />
              </a>
            </HamburgerWrapper>
          ) : (
            <HamburgerWrapper show={this.state.hamburgerShow} />
          )
        }
        {
          // 顯示快速購票
          this.state.visible ? <BookingDialog dialog={this.dialog} /> : null
        }

        <NavbarWrapper showTips={this.state.appTips} member={this.state.memberBtnShow}>
          {/* {Cookies.get('ezdingCookie') === 'ezding' ? <div /> : <Privacy />} */}
          <div className="root-1">
            <Link prefetch href="/">
              <img className="navbar-icon2 logo" src={'/static/common/ezDinglogo.png'} />
            </Link>
          </div>

          <div className="wrapper">
            <Link prefetch href="/preferential">
              <div className="nav-btn">優惠查詢</div>
            </Link>

            <Link prefetch href="/article?type=0&page=1">
              <div className="nav-btn">影評文章</div>
            </Link>

            <div className="booking" onClick={this.dialog}>
              <img src={'/static/common/tickets.svg'} />
              <div className="name">快速購票</div>
            </div>

            <Link prefetch href="/movieInfoIndex">
              <div className="nav-btn">電影時刻</div>
            </Link>

            <Link prefetch href="/guide">
              <div className="nav-btn">使用攻略</div>
            </Link>
          </div>

          <div className="root-1">
            <Link prefetch href="/faq">
              <div className="navbar-icon faq">
                <img className="qaIcon" src={'/static/common/qa.png'} />
                <img className="qaIcon qaHoverShow" src={'/static/common/qa_hover.png'} />
              </div>
            </Link>
            {this.state.memberDetail ? (
              <div>
                <div className="navbar-icon member photo" style={{ backgroundImage: `url(${photoUrl})` }} />
                <div className="navbar-icon member photoClick" onClick={this.memberShow} />
              </div>
            ) : (
              <div onClick={this.memberShow} className="navbar-icon member">
                <img className="memberIcon" src={'/static/common/member.png'} />
                <img className="memberIcon memberHoverShow" src={'/static/common/member_hover.png'} />
              </div>
            )}
          </div>

          {
            // memberPart show or not
            <MemberPart member={this.state.isAccessToken} showSlow={this.state.memberBtnShow}>
              {this.state.isAccessToken ? (
                <React.Fragment>
                  <div className="text">{this.state.nickname}</div>
                  <RedPoint point={this.state.memberPoint} />
                </React.Fragment>
              ) : (
                <Link href="/member">
                  <div className="text_notlogin">會員登入 / 註冊</div>
                </Link>
              )}
              <div className="logining">
                <div className="name title">會員中心</div>
                <Link prefetch href="/memberCenter?part=records">
                  <div className="name btn">
                    <MdChevronRight className="icon" />
                    訂票紀錄
                  </div>
                </Link>
                <Link prefetch href="/memberCenter?part=bonus">
                  <div className="name btn">
                    <MdChevronRight className="icon" />
                    紅利點數
                  </div>
                </Link>
                <Link prefetch href="/memberCenter?part=ticket">
                  <div className="name btn">
                    <MdChevronRight className="icon" />
                    優惠券管理
                  </div>
                </Link>
                <Link prefetch href="/memberCenter?part=records">
                  <div className="name btn">
                    <MdChevronRight className="icon" />
                    會員資訊
                  </div>
                </Link>
                <Link prefetch href="/inviteFriends">
                  <div className="name btn">
                    <MdChevronRight className="icon" />
                    邀請好友賺優惠
                  </div>
                </Link>
                <div className="name btn" onClick={this.memberTokenLogOut}>
                  <div className="icon_padding" />
                  登出
                </div>
              </div>
              <img
                src="/static/common/nav-fb.svg"
                className="fb-icon"
                onClick={() => {
                  window.location.href = 'https://www.facebook.com/sofunezding/';
                }}
              />
            </MemberPart>
          }
        </NavbarWrapper>

        <HamburgerBtn onClick={this.hamburger}>
          <div id="hamburger" className="hamburger hamburger-plus">
            <div className="icon" />
          </div>
        </HamburgerBtn>
      </div>
    );
  }
}

const RedPoint = ({ point = 0 }) => (
  <RedPointWrapper>
    <img className="logo" />
    <div>
      <span>會員紅利點數</span>
      <div className="tooltip" onClick={() => window.open('bonusContents', '_self')}>
        <Info />
        <div className="tipText">
          ＊滿500點，每張票最高折$90，
          <br />
          點擊了解更多
        </div>
      </div>
      <br />
      <span className="point">{point}</span>
      <span>點</span>
    </div>
  </RedPointWrapper>
);

export default Navbar;
