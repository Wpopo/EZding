import React from 'react';
import Router from 'next/router';
import Helper from 'Lib/helper';
import { Clearfix, BookingPersonWrapper } from 'Styled/bookingStyled';

class BookingChoicePerson extends React.Component {
  constructor(props) {
    super(props);
    this.checkperson = this.checkperson.bind(this);
    this.gotocheckSeatMap = this.gotocheckSeatMap.bind(this);

    this.state = {
      session: this.props.session,
      person: 0,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.session !== this.state.session) {
      this.setState(
        {
          session: nextProps.session,
          person: 0,
        },
        () => {
          document.getElementsByClassName('submit')[0].classList.remove('addSubmit');
          const items = document.getElementsByClassName('num');
          for (let i = 0; i < items.length; i++) {
            items[i].classList.remove('checked');
          }
        },
      );
    }
  }

  checkperson(index) {
    const items = document.getElementsByClassName('num');

    for (let i = 0; i < items.length; i++) {
      items[i].classList.remove('checked');
    }

    items[index].classList.add('checked');

    if (this.state.session !== null) {
      document.getElementsByClassName('submit')[0].classList.add('addSubmit');
    }

    this.setState({
      person: index + 1,
    });
  }

  gotocheckSeatMap() {
    if (this.props.cinemainfo) {
      sessionStorage.setItem('cinemaid', this.props.cinemainfo.cinema_id);
    }

    if (this.state.person === 0) {
      window.alert('請選擇人數');
    } else if (this.state.session === null) {
      window.alert('請選擇場次');
    } else {
      const channel = Helper.data.getUrlParam(window.location.href).channel;
      sessionStorage.setItem('totalSeats', this.state.session.total_seats);
      if (channel !== undefined) sessionStorage.setItem('channel', channel);

      Router.push({
        pathname: '/seatMap',
        query: {
          session_id: this.state.session.session_id,
          tickets: this.state.person,
        },
      });
    }
  }

  render() {
    const dots = [];
    for (let i = 1; i < 7; i++) {
      dots.push(
        <div className="dot" key={i} onClick={() => this.checkperson(i - 1)}>
          <div className="num">{i}</div>
        </div>,
      );
    }

    return (
      <BookingPersonWrapper person>
        <div className="wrapper">
          <div className="people">人數</div>

          {dots}

          <div className="submit" onClick={this.gotocheckSeatMap}>
            下一步
          </div>
        </div>
        <Clearfix />
      </BookingPersonWrapper>
    );
  }
}

export default BookingChoicePerson;
