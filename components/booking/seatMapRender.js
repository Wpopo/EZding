import React from 'react';
import Router from 'next/router';
import timeFormat from '../common/timeFormat';
import { SeatMapWrapper, Dot, SeatMapErrorWrapper } from '../../styled/bookingStyled';
import FaAngleRight from 'react-icons/lib/fa/angle-right';
import LoadingCircle from '../common/loading';
import { memberSite } from '../common/memberSite';
import * as movieAPI from '../../actions/movieAPI';
import * as memberAPI from '../../actions/memberAPI';

class SeatMapRender extends React.Component {
  constructor(props) {
    super(props);

    this.getSessionSeatMapInfo = this.getSessionSeatMapInfo.bind(this);
    this.seatClick = this.seatClick.bind(this);
    this.pageBackClick = this.pageBackClick.bind(this);
    this.checkBeforePayment = this.checkBeforePayment.bind(this);
    this.goToPayment = this.goToPayment.bind(this);
    this.cancelSeats = this.cancelSeats.bind(this);
    this.checkToken = this.checkToken.bind(this);
    this.noToken = this.noToken.bind(this);

    this.state = {
      isLoading: true,
      isError: false,
      seatMapArr: '',
      bookingInfo: '',
      date: '',
      time: '',
      seatArr: [],
      location: 'http://localhost:3000',
      session_id: '',
      transaction_id: '',
      hall_id: '',
      area_num: '',
      area_category_code: '',
      cinema_trans_id: '',
      sales_system: '',
      cinemaTransId: '',
      dotSize: false,
      lineHideButton: false,
      thirdParty: '',
    };
  }

  componentDidMount() {
    // third party URL
    const index = this.props.url.asPath.indexOf('?') + 1;
    const urlPath = this.props.url.asPath.slice(index).split('&');
    let optionsURL = urlPath
      .filter((item) => {
        return (
          !item.includes('session_id') &&
          !item.includes('tickets') &&
          !item.includes('campaignCode') &&
          !item.includes('channel')
        );
      })
      .map((item) => {
        return item.replace('=', ':');
      })
      .join('@@');

    if (optionsURL == 'undefined') {
      optionsURL = '';
    }
    // shopback首頁進入url取下的參數
    if (sessionStorage.getItem('thirdPartyQuery')) {
      const obj = JSON.parse(sessionStorage.thirdPartyQuery);

      if (obj.campaignCode) {
        sessionStorage.setItem('campaignCode', obj.campaignCode);
        sessionStorage.setItem('channel', obj.channel);
      }

      const str = Object.keys(obj)
        .map((key) => {
          return `${key}:${obj[key]}`;
        })
        .join('@@');

      optionsURL == '' ? (optionsURL = str) : (optionsURL = `${optionsURL}@@${str}`);
    }

    this.setState({
      location: window.location.href,
      thirdParty: optionsURL,
    });
    this.cancelSeats();

    const { campaignCode, channel, cinemaId, movieId, is_hide, sbid, is_back } = this.props.url.query;

    // iframe導入，存下參數
    if (campaignCode || channel) {
      // console.log(this.props.url);
      sessionStorage.setItem('campaignCode', campaignCode);
      sessionStorage.setItem('cinemaid', cinemaId);
      sessionStorage.setItem('movieid', movieId);
      sessionStorage.setItem('isHide', is_hide);
    } else {
      sessionStorage.setItem('campaignCode', 'rwdweb');
      sessionStorage.setItem('channel', 'ezding');
    }

    // SHOPBACK
    if (sbid) {
      sessionStorage.setItem('sbid', sbid);
      if (is_back == '1') {
        this.setState({
          lineHideButton: true,
        });
      }
    }

    // line導入，存下參數
    if (channel) {
      sessionStorage.setItem('channel', channel);
      if (channel == 'line' || channel == 'MRAPP') {
        this.setState({
          lineHideButton: true,
        });
      }
    }
  }

  cancelSeats() {
    if (sessionStorage.getItem('transId') || sessionStorage.getItem('cinemaTransId')) {
      const data = {
        cinema_trans_id: sessionStorage.getItem('cinemaTransId'),
        transaction_id: sessionStorage.getItem('transId'),
        cinema_id: sessionStorage.getItem('cinemaid'),
      };
      movieAPI
        .cancelSeats(JSON.stringify(data))
        .then(() => {
          sessionStorage.removeItem('transId');
          sessionStorage.removeItem('cinemaTransId');
          this.getSessionSeatMapInfo();
        })
        .catch(() => {
          this.getSessionSeatMapInfo();
        });
    } else {
      this.getSessionSeatMapInfo();
    }
  }

  getSessionSeatMapInfo() {
    this.setState({
      isLoading: true,
    });
    const session_id = this.props.url.query.session_id;
    const tickets = this.props.url.query.tickets;

    movieAPI
      .getSessionSeatMapInfo(session_id, tickets)
      .then((result) => {
        if (result.code == '200') {
          const data = result.result;
          const seatArr = [];
          data.seat_table.map((item) => {
            item.map((seat) => {
              if (seat.seat === 'selected') {
                return seatArr.push(seat.tag);
              }
            });
          });

          // 存trancation id 跟 cinema_trans_id 到 sessionStorage
          sessionStorage.setItem('transId', data.transaction_id);
          sessionStorage.setItem('cinemaTransId', data.cinema_trans_id);
          sessionStorage.setItem('movieid', data.booking_info.movie_id);
          sessionStorage.setItem('cinemaid', data.booking_info.cinema_id);

          // 判斷位置的點大小
          const totalSeats = parseInt(sessionStorage.getItem('totalSeats'), 10);

          if (totalSeats > 1 && totalSeats < 260 && data.seat_table[0].length < 28) {
            this.setState({
              dotSize: true,
            });
          }
          if (data.seat_table.length < 11 && data.seat_table.length > 0) {
            this.setState({
              dotSize: true,
            });
          }

          this.setState({
            isLoading: false,
            seatMapArr: data.seat_table,
            bookingInfo: data.booking_info,
            session_id: this.props.url.query.session_id,
            transaction_id: data.transaction_id,
            hall_id: data.seat_data.hall_id,
            area_num: data.seat_data.area_num,
            area_category_code: data.seat_data.area_category_code,
            cinema_trans_id: data.cinema_trans_id,
            sales_system: data.sales_system,
            cinemaTransId: data.cinema_trans_id,
            seatArr,
            date: timeFormat.seatMapDate(parseInt(data.booking_info.show_time, 10)),
            time: timeFormat.sessionTime(parseInt(data.booking_info.show_time, 10)),
          });
        } else {
          this.setState({
            isLoading: false,
            isError: true,
          });
        }
      })
      .catch(() => {});
  }

  // 選位子
  seatClick(e) {
    const seat = e.target.classList;
    let seatArr = this.state.seatArr;

    if (seat.contains('selected')) {
      seat.remove('selected');
      seatArr = seatArr.filter((item) => {
        return item !== e.target.getAttribute('data');
      });
      this.setState({
        seatArr,
      });
    } else {
      if (seatArr.length == this.props.url.query.tickets) {
        const nodeArr = document.querySelectorAll('.dot.selected');
        nodeArr.forEach((item) => {
          if (item.attributes.data.textContent == seatArr[0]) {
            item.classList.remove('selected');
          }
        });

        seatArr.splice(0, 1);
      }
      seat.add('selected');
      seatArr.push(e.target.getAttribute('data'));
      this.setState({
        seatArr,
      });
    }
  }

  pageBackClick() {
    // api成功時才執行以下跳轉
    // 來自於時刻表的話的重設場次要回快速購票的路線
    if (this.props.url.query.movieInfo || this.props.url.query.campaignCode) {
      Router.push({
        pathname: '/booking',
        query: {
          movieid: this.state.bookingInfo.movie_id,
          cinemaid: sessionStorage.getItem('cinemaid'),
        },
      });
    } else {
      window.history.back();
    }
  }

  // 進入payment之前的確認人數
  checkBeforePayment() {
    const tickets = this.props.url.query.tickets;
    sessionStorage.setItem('people', tickets);

    if (this.state.seatArr.length !== parseInt(tickets)) {
      alert('選擇的座位數與訂票張數不同!!');
    } else {
      this.goToPayment();
    }
  }

  // 前往payment需要的資料
  goToPayment() {
    const {
      session_id,
      area_num,
      area_category_code,
      cinemaTransId,
      thirdParty,
      sales_system,
      seatArr,
      cinema_trans_id,
      hall_id,
      transaction_id,
    } = this.state;
    let seatIdxList = [];
    let seatInfo = [];
    let tmp;
    const obj = {};
    const people = sessionStorage.getItem('people');
    const channelCode = sessionStorage.getItem('channel') || 'ezding';

    // 取得seat_idx_list的值
    seatArr.forEach((arr) => {
      tmp = arr.split(';');
      seatInfo = seatInfo.concat(arr);

      if (parseInt(sales_system, 10) >= 9) {
        seatIdxList = seatIdxList.concat(arr);
      } else {
        seatIdxList = seatIdxList.concat(tmp[0]);
      }
    });

    obj.seatInfo = seatInfo.join();
    obj.seatIdxList = seatIdxList.join();

    const movieId = sessionStorage.getItem('movieid');
    const cinemaId = sessionStorage.getItem('cinemaid');
    const campaignCodeText = sessionStorage.getItem('campaignCode') || 'rwdweb';

    // 組給 payment 的參數
    const bodyData = {
      cinema_id: cinemaId,
      movie_id: movieId,
      seat_idx_list: obj.seatIdxList,
      sessionId: session_id,
      ticketQuantity: people,
      campaignCode: campaignCodeText,
      seatsInfo: obj.seatInfo,
      options: thirdParty,
      cinemaTransId,
      transaction_id,
      hall_id,
      area_num,
      area_category_code,
      cinema_trans_id,
      channelCode,
    };

    if (sessionStorage.getItem('channel') == 'MRAPP') {
      bodyData.options = sessionStorage.getItem('3rdUserToken');
    }

    sessionStorage.setItem('bodyData', JSON.stringify(bodyData));
    sessionStorage.setItem('paymentInit', true);

    const userToken = localStorage.getItem('accessToken');
    this.setState({}, () => {
      if (userToken) {
        this.checkToken(userToken);
      } else {
        this.noToken();
      }
    });
  }

  // 有 userToken 檢查
  checkToken(userToken) {
    memberAPI
      .memberTokenCheck(userToken)
      .then(() => {
        Router.push({
          pathname: '/paymentWeb',
          query: { pages: 'servicePolicy' },
        });
      })
      .catch(() => {
        localStorage.removeItem('accessToken');
        // token is no vaild
        alert('登入資料已過時，請重新登入');
        this.noToken();
      });
  }

  // 沒有 userToken
  noToken() {
    const lineChannel = sessionStorage.getItem('channel');
    const endpoint = window.location.origin;
    //const member = memberSite(this.state.location.toLowerCase());
    const member = memberSite(window.location.host);
    //console.log('window.location.host', window.location.host);

    if (lineChannel !== 'line') {
      localStorage.setItem('redirect_uri', window.location.href);
      location.href = `/member`;
      //location.href = `${member}/MemberUI/login?sid=ezding&v_type=mobile&redirect_uri=${endpoint}/paymentWeb?pages=servicePolicy`;
    } else {
      location.href = `${member}/MemberUI/login?sid=ezding&v_type=mobile&login_type=line&redirect_uri=${endpoint}/paymentWeb?pages=servicePolicy`;
    }
  }

  render() {
    const { isLoading, seatMapArr, bookingInfo, date, time, dotSize, lineHideButton, isError } = this.state;

    if (isLoading) {
      return (
        <SeatMapWrapper>
          <LoadingCircle height={'60vh'} />
        </SeatMapWrapper>
      );
    }

    if (seatMapArr) {
      return (
        <SeatMapWrapper lineShow={this.props.lineShow}>
          <div className="wrapper">
            <div className="bookinginfo">
              <div className="box">
                <div className="name">片名</div>
                <div className="content">{bookingInfo.movie_title.zh_tw}</div>
              </div>

              <div className="box">
                <div className="name">影城</div>
                <div className="content">{bookingInfo.cinema_name.zh_tw}</div>
              </div>

              <div className="box mid">
                <div className="name">日期</div>
                <div className="content">{date}</div>
              </div>

              <div className="box mid">
                <div className="name">版本</div>
                <div className="content">{bookingInfo.movie_version}</div>
              </div>

              <div className="box mid">
                <div className="name">時間</div>
                <div className="content">{time}</div>
              </div>

              <div className="box small">
                <div className="name">人數</div>
                <div className="content">{this.props.url.query.tickets}</div>
              </div>
            </div>
          </div>

          <div className="seatMapWrapper">
            <div className="seatSample">
              <div className="dot yours" />
              <div className="sampleName">您的座位</div>
              <div className="dot empty" />
              <div className="sampleName">未售出</div>
              <div className="dot saled" />
              <div className="sampleName">已售出</div>
            </div>

            <div className="seatMap">
              <div className="screen">銀幕</div>
              {seatMapArr.map((item, index) => {
                return (
                  <Dot dotSize={dotSize} key={index}>
                    <div className="row">
                      {item.map((seat, key) => {
                        if (seat.seat === 'TRANSPARENT') {
                          return <div className="dot none" key={key} />;
                        }
                        if (seat.seat === 'empty') {
                          return <div className="dot" key={key} data={seat.tag} onClick={this.seatClick} />;
                        }
                        if (seat.seat === 'appointment') {
                          return <div className="dot saled" key={key} />;
                        }
                        return <div className="dot selected" key={key} data={seat.tag} onClick={this.seatClick} />;
                      })}
                    </div>
                  </Dot>
                );
              })}
            </div>
          </div>

          <div className="wrapper">
            {lineHideButton ? (
              <div className="submitSingle" onClick={this.checkBeforePayment}>
                前往付費
                <FaAngleRight className="icon" />
              </div>
            ) : (
              <div>
                <div className="reset" onClick={this.pageBackClick}>
                  重設場次
                </div>
                <div className="submit" onClick={this.checkBeforePayment}>
                  前往付費
                  <FaAngleRight className="icon" />
                </div>
              </div>
            )}
          </div>
        </SeatMapWrapper>
      );
    }

    if (isError) {
      return (
        <SeatMapErrorWrapper>
          <div className="errorBox">
            <div className="errorIcon" />
            <span className="errorText">該場次目前維護中或座位數已滿，請晚點再試或請先選擇其他場次訂票</span>
          </div>
        </SeatMapErrorWrapper>
      );
    }
  }
}

export default SeatMapRender;
