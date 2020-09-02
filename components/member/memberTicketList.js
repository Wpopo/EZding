import React from 'react';
import { MemberTicketListWrapper, Clearfix } from '../../styled/memberStyled';
import MemberTicketDetail from './memberTicketDetail';
import ChangePages from '../common/changePages';
import IoMore from 'react-icons/lib/io/more';
import IoLoadA from 'react-icons/lib/io/load-a';
import IoIosArrowUp from 'react-icons/lib/io/ios-arrow-up';

// api
import * as memberAPI from '../../actions/memberAPI';

class MemberTicketList extends React.Component {
  constructor(props) {
    super(props);

    this.getCouponList = this.getCouponList.bind(this);
    this.tabClick = this.tabClick.bind(this);
    this.alertShow = this.alertShow.bind(this);

    this.pageChange = this.pageChange.bind(this);
    this.phoneScrollFetch = this.phoneScrollFetch.bind(this);
    this.scrollToTop = this.scrollToTop.bind(this);

    this.state = {
      isLoading: true,
      isScrollLoading: false,
      isScrollEmpty: false,
      isResult: false,
      isEmpty: false,
      part: this.props.part,
      total: 1,
      nowIndex: 1,
      useStatus: 0,
      couponList: [],
      couponListRWD: [],
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.part !== this.state.part) {
      this.setState({
        part: nextProps.part,
      });
    }
  }

  componentDidMount() {
    this.tabClick(0, 4);
  }

  tabClick(index, useStatus) {
    const items = document.getElementsByClassName('ticketTab');
    for (let i = 0; i < items.length; i++) {
      items[i].classList.remove('active');
    }
    items[index].classList.add('active');

    this.setState({
      useStatus,
    });

    this.getCouponList(1, useStatus);
  }

  getCouponList(page, useStatus) {
    const token = localStorage.getItem('accessToken');
    const use_status = `${useStatus}`;
    const page_size = 10;

    if (page <= this.state.total) {
      this.setState({
        isScrollEmpty: false,
      });

      memberAPI
        .getCouponList(token, use_status, page, page_size)
        .then(result => {
          if (result.code === '401.103') {
            this.props.alertShow(true);
          } else if (result.code === '200') {
            if (result.result.list.length == 0) {
              this.setState({
                isEmpty: true,
                isLoading: false,
                isResult: false,
                couponList: [],
                couponListRWD: [],
              });
            } else {
              const couponListRWD = page == 1 ? [] : this.state.couponListRWD;

              result.result.list.map((item, index) => {
                couponListRWD.push(item);
              });

              this.setState({
                isLoading: false,
                isResult: true,
                couponList: result.result.list,
                total: result.result.total_pages,
                couponListRWD,
              });
            }
          }
        })
        .catch(error => {
          this.setState({
            isLoading: false,
            isError: true,
          });
          this.props.alertShow(true);
        });
    } else {
      this.setState({
        isScrollEmpty: true,
      });
    }
  }

  pageChange(nowIndex) {
    if (nowIndex !== this.state.nowIndex) {
      this.setState(
        {
          nowIndex,
        },
        () => {
          this.getCouponList(this.state.nowIndex, this.state.useStatus);
        },
      );
    }
  }

  phoneScrollFetch() {
    this.setState(
      {
        nowIndex: this.state.nowIndex + 1,
      },
      () => {
        this.getCouponList(this.state.nowIndex, this.state.useStatus);
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

  alertShow(boolean) {
    this.props.alertShow(boolean);
  }

  render() {
    if (this.state.isLoading) {
      return (
        <MemberTicketListWrapper part={this.props.part}>
          <div className="title">優惠券列表</div>
          <div className="tabBox">
            <div className="ticketTab" onClick={() => this.tabClick(0, 4)}>
              未兌換
            </div>
            <div className="ticketTab" onClick={() => this.tabClick(1, 1)}>
              已兌換
            </div>
            <div className="ticketTab" onClick={() => this.tabClick(2, 999)}>
              已過期
            </div>
          </div>
        </MemberTicketListWrapper>
      );
    }
    if (this.state.isResult) {
      return (
        <MemberTicketListWrapper part={this.props.part}>
          <div className="title">優惠券列表</div>
          <div className="tabBox">
            <div className="ticketTab" onClick={() => this.tabClick(0, 4)}>
              未兌換
            </div>
            <div className="ticketTab" onClick={() => this.tabClick(1, 1)}>
              已兌換
            </div>
            <div className="ticketTab" onClick={() => this.tabClick(2, 999)}>
              已過期
            </div>
          </div>

          <MemberTicketDetail
            result={this.state.couponList}
            rwdResult={this.state.couponListRWD}
            alertShow={this.alertShow}
          />

          <div className="pages">
            <ChangePages pages={this.state.total} fetchFunc={this.pageChange} />
          </div>

          {this.state.isScrollEmpty ? null : (
            <div className="scroll" onClick={this.phoneScrollFetch}>
              {this.state.isScrollLoading ? <IoLoadA className="load" /> : <IoMore className="icon" />}
            </div>
          )}

          <div className="onTop" onClick={() => this.scrollToTop(300)}>
            <IoIosArrowUp className="icon" />
          </div>
        </MemberTicketListWrapper>
      );
    }
    if (this.state.isError || this.state.isEmpty) {
      return (
        <MemberTicketListWrapper part={this.props.part}>
          <div className="title">優惠券列表</div>
          <div className="tabBox">
            <div className="ticketTab" onClick={() => this.tabClick(0, 4)}>
              未兌換
            </div>
            <div className="ticketTab" onClick={() => this.tabClick(1, 1)}>
              已兌換
            </div>
            <div className="ticketTab" onClick={() => this.tabClick(2, 999)}>
              已過期
            </div>
          </div>
          <div className="empty">
            <img src="../../static/member/ticket.svg" />
            目前沒有優惠券資料
          </div>
        </MemberTicketListWrapper>
      );
    }
  }
}

export default MemberTicketList;
