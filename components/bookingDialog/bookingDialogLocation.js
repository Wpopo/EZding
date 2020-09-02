import React from 'react';
import Router from 'next/router';
import {
  ChoiceLocationCinema,
  Clearfix,
} from '../../styled/bookingDialogStyled';
import GoPlus from 'react-icons/lib/go/plus';
import GoDash from 'react-icons/lib/go/dash';
import LoadingCircle from '../common/loading';
import Empty from '../common/empty';
import * as movieAPI from '../../actions/movieAPI';

// 未選電影 先選影城
class BookingDialogLocation extends React.Component {
  constructor(props) {
    super(props);

    this.getCinemasList = this.getCinemasList.bind(this);
    this.choiceCinema = this.choiceCinema.bind(this);
    this.rwdLoactionOpen = this.rwdLoactionOpen.bind(this);

    this.state = {
      isLoading: true,
      isError: false,
      isEmpty: false,
      location: ['北區', '桃竹苗', '中區', '南區及離島'],
      cinemas: [],
      isRwdCinemaShow: [false, false, false, false],
    };
  }

  componentDidMount() {
    this.getCinemasList();
  }

  choiceCinema(item) {
    Router.push({
      pathname: '/cinemabooking',
      query: {
        cinemaid: item.id,
      },
    });
    document.body.style.overflow = 'visible';
    document.body.style.position = 'initial';
    document.body.style.height = 'auto';
    this.props.dialog();
  }

  getCinemasList() {
    this.setState({
      isLoading: true,
    });

    const location = ' ';
    const valid = '1';

    movieAPI
      .cinemasList(location, valid)
      .then(result => {
        if (result.result.length == 0) {
          this.setState({
            isEmpty: true,
            isLoading: false,
            isError: false,
          });
        } else {
          const cinemas = [];
          const cinemaLocPart_N = [];
          const cinemaLocPart_T = [];
          const cinemaLocPart_C = [];
          const cinemaLocPart_S = [];

          result.result.forEach((item, index) => {
            if (item.location === 1 || item.location === 8 || item.location === 11) {
              return cinemaLocPart_N.push({ id: item.cinema_id, name: item.cinema_name.zh_tw });
            }
            if (item.location === 2 || item.location === 3 || item.location === 9) {
              return cinemaLocPart_T.push({ id: item.cinema_id, name: item.cinema_name.zh_tw });
            }
            if (item.location === 4) {
              return cinemaLocPart_C.push({ id: item.cinema_id, name: item.cinema_name.zh_tw });
            }
            if (item.location === 5 || item.location === 6 || item.location === 7 || item.location === 10) {
              return cinemaLocPart_S.push({ id: item.cinema_id, name: item.cinema_name.zh_tw });
            }
          });

          cinemas.push(cinemaLocPart_N, cinemaLocPart_T, cinemaLocPart_C, cinemaLocPart_S);

          this.setState({
            isLoading: false,
            isError: false,
            cinemas,
          });
        }
      })
      .catch(error => {
        this.setState({
          isLoading: false,
          isError: true,
        });
      });
  }

  rwdLoactionOpen(index) {
    const box = document.getElementsByClassName('box')[index].classList;
    const title = document.getElementsByClassName('rwd-title')[index].classList;
    const isRwdCinemaShow = this.state.isRwdCinemaShow;
    if (box.contains('box-hide')) {
      box.remove('box-hide');
      title.add('rwd-title-color');
      isRwdCinemaShow[index] = true;

      this.setState({
        isRwdCinemaShow,
      });
    } else {
      box.add('box-hide');
      title.remove('rwd-title-color');
      isRwdCinemaShow[index] = false;
      this.setState({
        isRwdCinemaShow,
      });
    }
  }


  render() {
    if (this.state.isLoading) {
      return (
        <ChoiceLocationCinema loc>
          <LoadingCircle height={'100vh'} />
        </ChoiceLocationCinema>
      );
    }
    if (this.state.cinemas.length > 0) {
      return (
        <ChoiceLocationCinema loc>
          <div className="wrapper">
            {this.state.location.map((item, index) => {
              const north = index == 0 ? 'north' : '';
              return (
                <div className={`loc-part ${north}`} key={index}>
                  <h3 className="big-title">{item}</h3>
                  <Clearfix />
                  {this.state.cinemas[index].map((cinema, key) => {
                    return (
                      <div className="cinema" key={key} onClick={() => this.choiceCinema(cinema)}>
                        {cinema.name}
                      </div>
                    );
                  })}
                </div>
              );
            })}

            {this.state.location.map((item, index) => {
              return (
                <div className="rwd-loc-part" key={index}>
                  <h3 className="rwd-title" onClick={() => this.rwdLoactionOpen(index)}>
                    {item}
                    {' '}
                    {this.state.isRwdCinemaShow[index] ? <GoDash className="icon" /> : <GoPlus className="icon" />}
                  </h3>
                  <div className="box box-hide">
                    {this.state.cinemas[index].map((cinema, key) => {
                      return (
                        <div className="rwd-cinema" key={key} onClick={() => this.choiceCinema(cinema)}>
                          {cinema.name}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
            <Clearfix />
          </div>
        </ChoiceLocationCinema>
      );
    }
    if (this.state.isError) {
      return (
        <ChoiceLocationCinema loc>
          <Empty height={'80vh'} />
        </ChoiceLocationCinema>
      );
    }
    if (this.state.isEmpty) {
      return (
        <ChoiceLocationCinema loc>
          <Empty height={'80vh'} />
        </ChoiceLocationCinema>
      );
    }
  }
}

export default BookingDialogLocation;
