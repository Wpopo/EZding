import React from 'react';
import 'isomorphic-unfetch';
import Router from 'next/router';
import HeadMeta from '../components/headMeta';
import Navbar from '../components/common/navbar';
import SeatMapRender from '../components/booking/seatMapRender';
import CinemaEntry from '../components/common/cinemaEntry';
import Footer from '../components/common/footer';
import UrlChange from '../components/common/urlChange';

class SeatMap extends React.Component {
  constructor(props) {
    super(props);
    this.scrollToTop = this.scrollToTop.bind(this);
    this.state = {
      visible: false,
      isShow: false,
    };
  }

  componentDidMount() {
    this.scrollToTop(1);
    const channel = sessionStorage.getItem('channel');

    if (
      Router.router.query.channel !== 'line' &&
      channel !== 'line' &&
      Router.router.query.channel !== 'MRAPP' &&
      channel !== 'MRAPP' &&
      Router.router.query.is_hide !== '1'
    ) {
      this.setState({
        isShow: true,
      });

      const thirdUserId = sessionStorage.getItem('3rdUserId');
      const thirdHide = sessionStorage.getItem('3rdHide');
      if (thirdUserId !== null) {
        sessionStorage.removeItem('3rdUserId');
      }
      if (thirdHide !== null) {
        sessionStorage.removeItem('3rdHide');
      }
    }

    if (Router.router.query.is_hide === '1') {
      sessionStorage.setItem('isHide', '1');
    }

    Router.onRouteChangeStart = (url) => {
      // 非會員登入或payment的url 則執行cancel_seat
      // 把session clear

      this.setState({
        visible: true,
      });
    };
    Router.onRouteChangeComplete = (url) => {
      this.setState({
        visible: false,
      });
    };
  }

  scrollToTop(scrollDuration) {
    const scrollStep = -window.scrollY / (scrollDuration / 15);
    var scrollInterval = setInterval(() => {
      if (window.scrollY != 0) {
        window.scrollBy(0, scrollStep);
      } else clearInterval(scrollInterval);
    }, 15);
  }

  render() {
    return (
      <div style={{ height: '100vh', backgroundColor: '#3f3f3f' }}>
        {this.state.visible ? <UrlChange /> : null}
        <HeadMeta seatMap />
        {this.state.isShow ? <Navbar url={this.props.url} /> : null}
        <SeatMapRender {...this.props} lineShow={!this.state.isShow} />
        {this.state.isShow ? <CinemaEntry /> : null}
        {this.state.isShow ? <Footer /> : null}
      </div>
    );
  }
}

export default SeatMap;
