import React from 'react';
import Router from 'next/router';
import HeadMeta from 'Components/headMeta';
import Navbar from 'Components/common/navbar';
import PaymentEndingPage from 'Components/payment/paymentEndingPage';
import CinemaEntry from 'Components/common/cinemaEntry';
import Footer from 'Components/common/footer';
import UrlChange from 'Components/common/urlChange';

class EndingPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      hide: false,
    };
  }

  componentDidMount() {
    const channel = sessionStorage.getItem('channel');
    const thidrdHide = sessionStorage.getItem('3rdHide');
    if (
      Router.router.query.channel !== 'line' &&
      channel !== 'line' &&
      Router.router.query.channel !== 'MRAPP' &&
      channel !== 'MRAPP' &&
      Router.router.query.is_hide !== '1' &&
      thidrdHide !== '1'
    ) {
      this.setState({
        hide: true,
      });
    }

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
  }

  render() {
    const { visible, hide } = this.state;
    const { url } = this.props;
    return (
      <div style={{ height: '100vh', backgroundColor: '#3f3f3f' }}>
        {visible ? <UrlChange /> : null}
        <HeadMeta endingPage />
        {hide ? <Navbar url={url} /> : null}
        <PaymentEndingPage url={url} />
        {hide ? <CinemaEntry /> : null}
        {hide ? <Footer /> : null}
      </div>
    );
  }
}

export default EndingPage;
