import React from 'react';
import Router from 'next/router';
import { CinemaEntry } from '../../styled/commonStyled';
import footerCinemas from '../constants/footerCinemas';

class cinemaEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isCinemaList: false,
      index: '',
    };
  }

  chooseCinema = (num) => {
    const detector = num != this.state.index ? num : '';
    this.setState({
      isCinemaList: !this.state.isCinemaList,
      index: detector,
    });
  }

  checkCinema = (e) => {
    Router.push({
      pathname: '/cinemabooking',
      query: {
        cinemaid: e.target.getAttribute('cinemaid'),
      },
    });
  }

  render() {
    const MobileArrow = () => (
      <div>
        <img src="/static/common/index-cinema_right.png" className="img-cinema-right" />
        <img src="/static/common/index-cinema_down.png" className="img-cinema-down" />
      </div>
    );

    return (
      <CinemaEntry>
        <div className="phonetitle">
          {'合作影城 '}
          <span>Cooperative Partner</span>
        </div>
        {footerCinemas.map((item) => {
          return (
            <div key={item.groupId} className={this.state.index == item.groupId ? 'active' : ''}>
              <div className="part">
                <a className="title" onClick={() => this.chooseCinema(item.groupId)}>
                  {item.groupName}
                  <span>{item.engName}</span>
                  <MobileArrow />
                </a>
                <ul className="cinemalist">
                  {
                    item.cinemasDate.map((list, key) => {
                      const length = item.cinemasDate.length;
                      return (
                        <li
                          className={length == key + 1 ? 'cinema last' : 'cinema'}
                          key={key}
                          onClick={this.checkCinema}
                          cinemaid={list.id}>
                          {list.name}
                        </li>
                      );
                    })
                  }
                </ul>
              </div>
            </div>
          );
        })}
      </CinemaEntry>
    );
  }
}

export default cinemaEntry;
