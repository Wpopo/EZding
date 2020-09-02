import React from 'react';
import 'isomorphic-unfetch';
import Router from 'next/router';
import { EndingPageWrapper, Banner } from '../../styled/paymentStyled';
import timeFormat from '../common/timeFormat';
import * as memberAPI from '../../actions/memberAPI';
import * as activityAPI from '../../actions/activityAPI';
import * as gtag from '../common/gtag';

class PaymentEndingPage extends React.Component {
  constructor(props) {
    super(props);

    this.getData = this.getData.bind(this);
    this.getBanner = this.getBanner.bind(this);

    this.state = {
      isLoading: true,
      seatsArray: [],
      snackArray: [],
      booking_num: '',
      cinema_name: '',
      movie_title: '',
      seats: '',
      bannerList: '',
      imgSize: '',
      nextTicket: '',
      discount: '',
      salesSystem: '',
      items: [],
    };
  }

  componentDidMount() {
    if (!sessionStorage.getItem('orderID')) {
      Router.push('/');
    } else {
      this.getData(sessionStorage.getItem('orderID'));
      this.getBanner(1);
    }
  }

  // 取出payment訂單詳細資訊
  getData(value) {
    const userToken = localStorage.getItem('accessToken');

    memberAPI
      .getPaymentBookingInfo(value, userToken)
      .then(result => {
        if (result.code == 200) {
          // if (result.result.movie_id == '59d7e8fb2be8495c8eb1d148c59f8b52') {
          //   gtag.event('DC-8209718/wb_to0/wb_ez0+standard');
          //   gtag.event('DC-8388319/invmedia/wb_ez0+standard');
          //   fbq('track', 'Purchase');
          // }

          this.setState(
            {
              isLoading: false,
              booking_num: result.result.booking_num,
              cinema_name: result.result.cinema_name.zh_tw,
              movie_title: result.result.movie_title.zh_tw,
              time: result.result.show_time,
              seats: result.result.seats,
              booking_detail: result.result.booking_detail,
              ezPoint: result.result.ez_member_point_expect,
              asiaPoint: result.result.asiamiles_expect,
              nextTicket: result.result.next_tickets,
              discount: result.result.discount,
              salesSystem: result.result.sales_system,
            },
            () => {
              sessionStorage.removeItem('orderID');

              let seatsArray = [];

              if (parseInt(this.state.salesSystem) >= 9) {
                const seats = this.state.seats;
                seatsArray = seats.split(',');
              } else {
                const seats = this.state.seats;
                const splitSeats = seats.split(',');

                for (let i = 0; i < splitSeats.length; i++) {
                  const seatOne = splitSeats[i].split('-');
                  seatsArray.push(`${seatOne[0]}排${seatOne[1]}號`);
                }
              }
              const booking_detail = this.state.booking_detail;
              const snackGroup = booking_detail.filter(item => {
                return item.ez_product_type == '加購餐飲';
              });

              const snack = [];

              for (let i = 0; i < snackGroup.length; i++) {
                const snackList = {};
                const snackListKey = snackGroup[i].ez_product_name;
                const snackListValue = snackGroup[i].quantity;
                snackList[snackListKey] = snackListValue;
                snack.push(snackList);
              }

              this.setState({
                snackArray: snack,
                seatsArray,
              });
            },
          );
        }
      })
      .catch(error => {
        // 401 invaild access token
        if (error.status == 401) {
          alert('請重新登入！');
          localStorage.removeItem('accessToken');
          Router.push('/');
        }
      });
  }

  // 取出banner圖片
  getBanner(value) {
    this.setState({
      isLoading: true,
    });

    const ad_type = '1';
    const ad_size = value;
    const ad_category = 'ezding.rwd';
    const ad_channel = '5d5e5ed3184fedf201184fedf6eb0001';
    const page_code = 'booking_finish';
    const area_code = 'finishBooking';

    activityAPI
      .getbanner(ad_type, ad_size, ad_category, ad_channel, page_code, area_code)
      .then(result => {
        // 如果為空值
        if (result.result == null || result.result.length == 0) {
          const adBanner = '../../static/payment/paymentBanner.jpg';
          const adBannerArray = [adBanner, adBanner, adBanner];
          this.setState({
            isLoading: false,
            items: adBannerArray,
          });
        } else {
          const items = this.state.items;

          result.result.map(item => {
            items.push(`https://img.ezding.com.tw${item.ad_content}`);
          });

          this.setState(
            {
              isLoading: false,
              items,
            },
            () => {
              value < 3 ? this.getBanner(value + 1) : null;
            },
          );
        }
      })
      .catch(error => {
        this.setState({
          isLoading: false,
          isError: true,
        });
      });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <EndingPageWrapper>
          <div className="loadingWrap">
            <div className="imgWrap">
              <img src={'/static/common/loading.gif'} alt="" />
            </div>
          </div>
        </EndingPageWrapper>
      );
    }
    if (this.state.booking_num) {
      const date = timeFormat.newsDate(this.state.time);
      const time = timeFormat.sessionTime(this.state.time, 'zh-tw');
      return (
        <EndingPageWrapper>
          <div className="endingPageWrap">
            <div className="endingPageArea">
              <div className="block1">
                <div className="ticketNumber">訂票序號</div>
                <div className="ticketNumberArea">{this.state.booking_num}</div>
              </div>
              <div className="block2">
                <h1>{this.state.movie_title}</h1>
                <ul>
                  <li>
                    <span className="endingPageTitle">日期</span>
                    <span className="endingPageContent">{date}</span>
                  </li>
                  <li>
                    <span className="endingPageTitle">場次</span>
                    <span className="endingPageContent">{time}</span>
                  </li>
                  <li>
                    <span className="endingPageTitle">影城</span>
                    <span className="endingPageContent">{this.state.cinema_name}</span>
                  </li>
                  <li className="seat">
                    <span className="endingPageTitle seat">座位</span>
                    <div className="seatArea">
                      <ul>
                        {this.state.seatsArray
                          ? this.state.seatsArray.map((item, index) => {
                              return <li key={index}>{item}</li>;
                            })
                          : null}
                      </ul>
                    </div>
                  </li>
                  {this.state.snackArray.length > 0 ? (
                    <li className="endingSnackWrap">
                      <span className="endingPageTitle snack">餐點</span>
                      <div className="endingSnackItem">
                        <ul className="endingSnackArea">
                          {this.state.snackArray.map((item, index) => {
                            return <li key={index}>{`${Object.keys(item)}${Object.values(item)}份`}</li>;
                          })}
                        </ul>
                      </div>
                    </li>
                  ) : null}
                </ul>
              </div>
              <div className="block3">
                <div className="circle left" />
                <div className="circle right" />
              </div>
              <div className="block4">
                <h5>本次消費獲得會員獎勵</h5>
                <div className="subBlock prize point">
                  <div className="subWrapPrize">
                    <div className="subPoint">
                      {this.state.ezPoint}
                      <span className="point">點</span>
                    </div>
                    <div className="notice">會員紅利</div>
                    <span>
                      <a target="_blank" href={`${document.location.origin}/bonusContents`}>
                        ［說明］
                      </a>
                    </span>
                  </div>
                  <div className="subWrapPrize">
                    <div className="subPoint">{this.state.asiaPoint}</div>
                    <div className="notice">
                      「亞洲萬里通」里數
                      <span>
                        <a target="_blank" href="https://event.ezding.com.tw/benefit/amevent2017/">
                          ［說明］
                        </a>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="block5">
                <img className="pointTicketImg" src="/static/payment/paymentEndingPage.png" />
                <div className="pointTicketNumber">
                  下次最多可訂
                  <span className="pointTicketNumber num">{this.state.nextTicket}</span>
                  張會員紅利票
                </div>
                <div className="pointTicketPrice">
                  每張票最高
                  <span className="pointTicketPrice price">{`折${this.state.discount}元`}</span>
                </div>
                <div className="pointNotice">本次消費點數將於開演後三日入點,故此次消費尚未列入</div>
              </div>
            </div>
            <div className="endingPagePoster">
              <Banner className="imgLink" imgUrl={this.state.items} />
            </div>
          </div>
        </EndingPageWrapper>
      );
    }
    if (this.state.isError) {
      return (
        <EndingPageWrapper>
          <div className="errorBox">isError</div>
        </EndingPageWrapper>
      );
    }
    return <EndingPageWrapper />;
  }
}
export default PaymentEndingPage;
