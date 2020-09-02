import React from 'react';
import Router from 'next/router';
import {
  BookingDialogWrapper,
  FindBtn,
  ChoiceFindBtn,
  Clearfix,
  ChoiceLocationCinema,
  ChoiceSeatCinema,
  MobileBtn,
} from '../../styled/bookingDialogStyled';
import FaAngleDown from 'react-icons/lib/fa/angle-down';
import GoPlus from 'react-icons/lib/go/plus';
import GoDash from 'react-icons/lib/go/dash';
import Empty from '../common/empty';
import * as movieAPI from '../../actions/movieAPI';

class BookingDialogGoToWhere extends React.Component {
  constructor(props) {
    super(props);

    this.cinemaClick = this.cinemaClick.bind(this);
    this.seatClick = this.seatClick.bind(this);
    this.getCinemaCheck = this.getCinemaCheck.bind(this);
    this.choiceCinema = this.choiceCinema.bind(this);
    this.rwdMovieCinema = this.rwdMovieCinema.bind(this);
    this.choiceLocation = this.choiceLocation.bind(this);
    this.mobileClickCinema = this.mobileClickCinema.bind(this);
    this.mobileClickSeat = this.mobileClickSeat.bind(this);

    this.state = {
      isEmpty: false,
      isLoading: true,
      isError: false,
      isCinemaShow: true,
      isSeatShow: false,
      isMobileCinemaShow: false,
      isMobileSeatShow: false,
      movieid: sessionStorage.getItem('movieid'),
      moviename: sessionStorage.getItem('moviename'),
      movieToCinemas: [],
      cinemasArea: [],
      isRwdCinemaShow: [false, false, false, false],
      isRwdBottonShow: [false, false],

      emptyPartList: [],
      emptyPart: [
        { location: '台北', num: 1 },
        { location: '桃園', num: 2 },
        { location: '新竹', num: 3 },
        { location: '台中', num: 4 },
        { location: '台南', num: 5 },
        { location: '高雄', num: 6 },
        { location: '屏東', num: 7 },
        { location: '宜蘭', num: 8 },
        { location: '苗栗', num: 9 },
        { location: '澎湖', num: 10 },
        { location: '花蓮', num: 11 },
      ],
    };
  }

  componentDidMount() {
    this.getCinemaCheck();
  }

  getCinemaCheck() {
    this.setState({
      isLoading: true,
    });

    const movie_id = this.state.movieid;

    movieAPI
      .getMovieCinemasList(movie_id)
      .then(result => {
        if (result.result.length == 0) {
          this.setState({
            isEmpty: true,
            isLoading: false,
            isError: false,
          });
        } else {
          const movieToCinemas = [];
          const movieToCinemaPart_N = [];
          const movieToCinemaPart_T = [];
          const movieToCinemaPart_C = [];
          const movieToCinemaPart_S = [];

          const cinemasArea = [];

          result.result.map((item, index) => {
            if (item.location === 1 || item.location === 8 || item.location === 11) {
              item.cinema_list.map((sigle, key) => {
                return movieToCinemaPart_N.push({ id: sigle.cinema_id, name: sigle.cinema_name.zh_tw });
              });
            } else if (item.location === 2 || item.location === 3 || item.location === 9) {
              item.cinema_list.map((sigle, key) => {
                return movieToCinemaPart_T.push({ id: sigle.cinema_id, name: sigle.cinema_name.zh_tw });
              });
            } else if (item.location === 4) {
              item.cinema_list.map((sigle, key) => {
                return movieToCinemaPart_C.push({ id: sigle.cinema_id, name: sigle.cinema_name.zh_tw });
              });
            } else if (item.location === 5 || item.location === 6 || item.location === 7 || item.location === 10) {
              item.cinema_list.map((sigle, key) => {
                return movieToCinemaPart_S.push({ id: sigle.cinema_id, name: sigle.cinema_name.zh_tw });
              });
            }
          });

          if (movieToCinemaPart_N.length !== 0) {
            movieToCinemas.push(movieToCinemaPart_N);
            cinemasArea.push('北區');
          }

          if (movieToCinemaPart_T.length !== 0) {
            movieToCinemas.push(movieToCinemaPart_T);
            cinemasArea.push('桃竹苗');
          }

          if (movieToCinemaPart_C.length !== 0) {
            movieToCinemas.push(movieToCinemaPart_C);
            cinemasArea.push('中區');
          }

          if (movieToCinemaPart_S.length !== 0) {
            movieToCinemas.push(movieToCinemaPart_S);
            cinemasArea.push('南區及離島');
          }

          this.setState({
            isLoading: false,
            emptyPartList: result.result,
            cinemasArea,
            movieToCinemas,
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

  choiceCinema(data) {
    const movieid = sessionStorage.getItem('movieid');
    sessionStorage.setItem('cinemaname', data.name);
    sessionStorage.setItem('cinemaid', data.id);
    Router.push({
      pathname: '/booking',
      query: {
        movieid,
        cinemaid: data.id,
      },
    });
    document.body.style.overflow = 'visible';
    document.body.style.position = 'initial';
    document.body.style.height = 'auto';
    this.props.dialog();
  }

  choiceLocation(num) {
    const movieid = sessionStorage.getItem('movieid');

    Router.push({
      pathname: '/locationbooking',
      query: {
        movieid,
        location: num,
      },
    });
    document.body.style.overflow = 'visible';
    document.body.style.position = 'initial';
    document.body.style.height = 'auto';
    this.props.dialog();
  }

  rwdMovieCinema(index) {
    const cinemaBox = document.getElementsByClassName('box')[index].classList;
    const title = document.getElementsByClassName('rwd-title')[index].classList;
    const isRwdCinemaShow = this.state.isRwdCinemaShow;
    if (cinemaBox.contains('box-hide')) {
      cinemaBox.remove('box-hide');
      title.add('rwd-title-color');
      isRwdCinemaShow[index] = true;

      this.setState({
        isRwdCinemaShow,
      });
    } else {
      cinemaBox.add('box-hide');
      title.remove('rwd-title-color');
      isRwdCinemaShow[index] = false;
      this.setState({
        isRwdCinemaShow,
      });
    }
  }

  cinemaClick() {
    this.setState({
      isCinemaShow: true,
      isSeatShow: false,
      isMobileCinemaShow: true,
      isMobileSeatShow: false,
    });
    document.getElementsByClassName('mobileCinema')[0].style.display = 'block';
    document.getElementsByClassName('mobileEmptySeat')[0].style.display = 'none';
  }

  seatClick() {
    this.setState({
      isCinemaShow: false,
      isSeatShow: true,
      isMobileSeatShow: true,
      isMobileCinemaShow: false,
    });
    document.getElementsByClassName('mobileEmptySeat')[0].style.display = 'block';
    document.getElementsByClassName('mobileCinema')[0].style.display = 'none';
  }

  mobileClickCinema() {
    if (this.state.isMobileCinemaShow == false) {
      document.getElementsByClassName('mobileCinema')[0].style.display = 'block';
      document.getElementsByClassName('mobileEmptySeat')[0].style.display = 'none';
      this.setState({
        isMobileCinemaShow: true,
        isMobileSeatShow: false,
        isCinemaShow: true,
        isSeatShow: false,
      });
    } else {
      document.getElementsByClassName('mobileCinema')[0].style.display = 'none';
      this.setState({
        isMobileCinemaShow: false,
      });
    }
  }

  mobileClickSeat() {
    if (this.state.isMobileSeatShow == false) {
      document.getElementsByClassName('mobileEmptySeat')[0].style.display = 'block';
      document.getElementsByClassName('mobileCinema')[0].style.display = 'none';
      this.setState({
        isMobileSeatShow: true,
        isMobileCinemaShow: false,
        isSeatShow: true,
        isCinemaShow: false,
      });
    } else {
      document.getElementsByClassName('mobileEmptySeat')[0].style.display = 'none';
      this.setState({
        isMobileSeatShow: false,
      });
    }
  }

  render() {
    if (this.state.isLoading) {
      return (
        <BookingDialogWrapper loc>
          <div className="wrapper">
            <div className="cancel-icon" onClick={this.props.dialog}>
              <span className="cancel1" />
              <span />
            </div>

            <div className="movie-name">
              <h1 className="title" onClick={this.props.gotowhere} title={this.state.moviename}>
                {this.state.moviename}
              </h1>
              <FaAngleDown className="movie-icon" />
            </div>

            <Clearfix />

            <div className="find-part">
              <FindBtn onClick={this.cinemaClick} choice={this.state.isCinemaShow}>
                找影城
              </FindBtn>
              <FindBtn onClick={this.seatClick} choice={!this.state.isCinemaShow}>
                找空位
              </FindBtn>
            </div>
            <ChoiceFindBtn choice={this.state.isCinemaShow}>
              <div className="choice-right" />
            </ChoiceFindBtn>

            <ChoiceLocationCinema>
              <MobileBtn onClick={this.mobileClickCinema}>
                找影城
                {this.state.isMobileCinemaShow ? <GoDash className="icon" /> : <GoPlus className="icon" />}
              </MobileBtn>
              {this.state.isCinemaShow ? (
                <div className="wrapper">
                  {this.state.cinemasArea.map((item, index) => {
                    return (
                      <div className="loc-part" key={index}>
                        <h3 className="big-title">{item}</h3>
                        <Clearfix />
                      </div>
                    );
                  })}
                  {this.state.cinemasArea.map((item, index) => {
                    return (
                      <div className="rwd-loc-part" key={index}>
                        <h3 className="rwd-title" onClick={() => this.rwdMovieCinema(index)}>
                          {item}
                        </h3>
                        <div className="box box-hide" />
                      </div>
                    );
                  })}
                  <Clearfix />
                </div>
              ) : null}
            </ChoiceLocationCinema>
            <ChoiceSeatCinema>
              <MobileBtn onClick={this.mobileClickSeat} seat>
                找空位
                {this.state.isMobileSeatShow ? <GoDash className="icon" /> : <GoPlus className="icon" />}
              </MobileBtn>
            </ChoiceSeatCinema>
          </div>
        </BookingDialogWrapper>
      );
	}
	if (this.state.movieToCinemas.length > 0) {
      return (
        <BookingDialogWrapper loc>
          <div className="wrapper">
            <div className="cancel-icon" onClick={this.props.dialog}>
              <span className="cancel1" />
              <span />
            </div>

            <div className="movie-name">
              <h1 className="title" onClick={this.props.gotowhere} title={this.state.moviename}>
                {this.state.moviename}
              </h1>
              <FaAngleDown className="movie-icon" />
            </div>

            <Clearfix />

            <div className="find-part">
              <FindBtn onClick={this.cinemaClick} choice={this.state.isCinemaShow}>
                找影城
              </FindBtn>
              <FindBtn onClick={this.seatClick} choice={!this.state.isCinemaShow}>
                找空位
              </FindBtn>
            </div>
            <ChoiceFindBtn choice={this.state.isCinemaShow}>
              <div className="choice-right" />
            </ChoiceFindBtn>

            <div className="mobileGroup">
              <MobileBtn onClick={this.mobileClickCinema} mobileShow={this.state.isMobileCinemaShow}>
                找影城
                {this.state.isMobileCinemaShow ? <GoDash className="icon" /> : <GoPlus className="icon" />}
              </MobileBtn>
              <div className="mobileCinema">
                <ChoiceLocationCinema>
                  {
                    <div className="wrapper">
                      {this.state.cinemasArea.map((item, index) => {
                        return (
                          <div className="rwd-loc-part" key={index}>
                            <h3 className="rwd-title" onClick={() => this.rwdMovieCinema(index)}>
                              {item}
                              {this.state.isRwdCinemaShow[index] ? (
                                <GoDash className="icon" />
                              ) : (
                                <GoPlus className="icon" />
                              )}
                            </h3>

                            <div className="box box-hide">
                              {this.state.movieToCinemas[index].map((cinema, key) => {
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
                  }
                </ChoiceLocationCinema>
              </div>

              <MobileBtn onClick={this.mobileClickSeat} mobileShow={this.state.isMobileSeatShow} seat>
                找空位
                {this.state.isMobileSeatShow ? <GoDash className="icon" /> : <GoPlus className="icon" />}
              </MobileBtn>
              <div className="mobileEmptySeat">
                <ChoiceSeatCinema>
                  {
                    <div className="area">
                      {this.state.emptyPartList.map((item, index) => {
                        return this.state.emptyPart.map((loc, key) => {
                          if (item.location == loc.num) {
                            return (
                              <div className="rwd-location" key={key} onClick={() => this.choiceLocation(loc.num)}>
                                {loc.location}
                              </div>
                            );
                          }
                        });
                      })}
                    </div>
                  }
                </ChoiceSeatCinema>
              </div>
              <div className="mobileSpace" />
            </div>
            <ChoiceLocationCinema>
              {this.state.isCinemaShow ? (
                <div className="wrapper ">
                  {this.state.cinemasArea.map((item, index) => {
                    return (
                      <div className="loc-part" key={index}>
                        <h3 className="big-title">{item}</h3>
                        <Clearfix />
                        {this.state.movieToCinemas[index].map((cinema, key) => {
                          return (
                            <div className="cinema" key={key} onClick={() => this.choiceCinema(cinema)}>
                              {cinema.name}
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}
                  <Clearfix />
                </div>
              ) : null}
            </ChoiceLocationCinema>

            <ChoiceSeatCinema>
              {this.state.isSeatShow ? (
                <div className="area">
                  {this.state.emptyPartList.map((item, index) => {
                    return this.state.emptyPart.map((loc, key) => {
                      if (item.location == loc.num) {
                        return (
                          <div className="location" key={key} onClick={() => this.choiceLocation(loc.num)}>
                            {loc.location}
                          </div>
                        );
                      }
                    });
                  })}
                </div>
              ) : null}
            </ChoiceSeatCinema>
          </div>
        </BookingDialogWrapper>
      );
	}
	if (this.state.isError) {
      return (
        <BookingDialogWrapper loc>
          <div className="wrapper">
            <div className="cancel-icon" onClick={this.props.dialog}>
              <span className="cancel1" />
              <span />
            </div>

            <div className="movie-name">
              <h1 className="title" onClick={this.props.gotowhere} title={this.state.moviename}>
                {this.state.moviename}
              </h1>
              <FaAngleDown className="movie-icon" />
            </div>

            <Clearfix />

            <div className="find-part">
              <FindBtn onClick={this.cinemaClick} choice={this.state.isCinemaShow}>
                找影城
              </FindBtn>
              <FindBtn onClick={this.seatClick} choice={!this.state.isCinemaShow}>
                找空位
              </FindBtn>
            </div>
            <ChoiceFindBtn choice={this.state.isCinemaShow}>
              <div className="choice-right" />
            </ChoiceFindBtn>

            <ChoiceLocationCinema>
              <MobileBtn onClick={this.mobileClickCinema}>
                找影城
                {this.state.isMobileCinemaShow ? <GoDash className="icon" /> : <GoPlus className="icon" />}
              </MobileBtn>
              {this.state.isCinemaShow ? (
                <div className="wrapper ">
                  <Empty height={'100vh'} />
                </div>
              ) : (
                <div className="wrapper" style={{ display: 'none' }} />
              )}
            </ChoiceLocationCinema>

            <ChoiceSeatCinema>
              {this.state.isSeatShow ? (
                <div className="area">
                  <Empty height={'100vh'} />
                </div>
              ) : (
                <div className="area" style={{ display: 'none' }} />
              )}
            </ChoiceSeatCinema>
          </div>
        </BookingDialogWrapper>
      );
	}
	if (this.state.isEmpty) {
      return (
        <BookingDialogWrapper loc>
          <div className="wrapper">
            <div className="cancel-icon" onClick={this.props.dialog}>
              <span className="cancel1" />
              <span />
            </div>

            <div className="movie-name">
              <h1 className="title" onClick={this.props.gotowhere} title={this.state.moviename}>
                {this.state.moviename}
              </h1>
              <FaAngleDown className="movie-icon" />
            </div>

            <Clearfix />

            <div className="find-part">
              <FindBtn onClick={this.cinemaClick} choice={this.state.isCinemaShow}>
                找影城
              </FindBtn>
              <FindBtn onClick={this.seatClick} choice={!this.state.isCinemaShow}>
                找空位
              </FindBtn>
            </div>
            <ChoiceFindBtn choice={this.state.isCinemaShow}>
              <div className="choice-right" />
            </ChoiceFindBtn>

            <ChoiceLocationCinema>
              <MobileBtn onClick={this.mobileClickCinema}>
                找影城
                {this.state.isMobileCinemaShow ? <GoDash className="icon" /> : <GoPlus className="icon" />}
              </MobileBtn>
              {this.state.isCinemaShow ? (
                <div className="wrapper ">
                  <Empty height={'60vh'} />
                </div>
              ) : (
                <div className="wrapper" style={{ display: 'none' }} />
              )}
            </ChoiceLocationCinema>

            <ChoiceSeatCinema>
              <MobileBtn onClick={this.mobileClickSeat}>
                找空位
                {this.state.isMobileSeatShow ? <GoDash className="icon" /> : <GoPlus className="icon" />}
              </MobileBtn>
              {this.state.isSeatShow ? (
                <div className="area">
                  <Empty height={'60vh'} />
                </div>
              ) : (
                <div className="area" style={{ display: 'none' }} />
              )}
            </ChoiceSeatCinema>
          </div>
        </BookingDialogWrapper>
      );
    }
  }
}

export default BookingDialogGoToWhere;
