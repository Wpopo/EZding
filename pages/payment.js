import React from 'react';
import 'isomorphic-unfetch';
import Router from 'next/router';
import HeadMeta from '../components/headMeta';
import Navbar from '../components/common/navbar';
import PaymentContent from '../components/payment/paymentContent';
import CinemaEntry from '../components/common/cinemaEntry';
import Footer from '../components/common/footer';
import UrlChange from '../components/common/urlChange';

class Payment extends React.Component {
  constructor(props) {
    super(props);
    this.scrollToTop = this.scrollToTop.bind(this);
    this.bookingFunc = this.bookingFunc.bind(this);

    this.state = {
      isToken: false,
      hide: false,
    };
  }

  componentDidMount() {
    this.scrollToTop(1);
    let channel = sessionStorage.getItem('channel');

    if (
      Router.router.query.channel !== 'line' &&
      channel !== 'line' &&
      Router.router.query.channel !== 'MRAPP' &&
      channel !== 'MRAPP' &&
      channel !== 'shopback'
    ) {
      this.setState({
        hide: true,
      });
    }
  }
  scrollToTop(scrollDuration) {
    var scrollStep = -window.scrollY / (scrollDuration / 15),
      scrollInterval = setInterval(function () {
        if (window.scrollY != 0) {
          window.scrollBy(0, scrollStep);
        } else clearInterval(scrollInterval);
      }, 15);
  }

  bookingFunc(value) {
    this.setState({
      isToken: value,
    });
  }

  render() {
    return (
      <div style={{ height: '100vh', backgroundColor: '#3f3f3f' }}>
        <HeadMeta />
        {this.state.hide ? <Navbar url={this.props.url} bookingFunc={this.bookingFunc} /> : null}
        <PaymentContent isToken={this.state.isToken} url={this.props.url} />
        {this.state.hide ? <CinemaEntry /> : null}
        {this.state.hide ? <Footer /> : null}
      </div>
    );
  }
}

export default Payment;
