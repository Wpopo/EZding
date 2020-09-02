import React from 'react';
import { CinemaEntryMovieWrapper, Clearfix } from '../../styled/bookingStyled';
import FaAngleLeft from 'react-icons/lib/fa/angle-left';
import FaAngleRight from 'react-icons/lib/fa/angle-right';
import FaCircleONotch from 'react-icons/lib/fa/circle-o-notch';
import FaAngleDown from 'react-icons/lib/fa/angle-down';
import FaAngleUp from 'react-icons/lib/fa/angle-up';
import timeFormat from '../common/timeFormat';
import { movieStars } from '../common/scoreStars';
import BookingChoiceSession from './bookingChoiceSession';
import Slider from 'react-slick';
import * as movieGrade from '../common/grade';
import * as movieAPI from '../../actions/movieAPI';

class CinemabookingMovie extends React.Component {
  constructor(props) {
    super(props);

    this.checkMovie = this.checkMovie.bind(this);
    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);
    this.infoboxClick = this.infoboxClick.bind(this);
    this.movieListClick = this.movieListClick.bind(this);
    this.getMovieInfo = this.getMovieInfo.bind(this);
    this.changeSlider = this.changeSlider.bind(this);
    this.changeUpdateCount = this.changeUpdateCount.bind(this);

    this.state = {
      isLoading: true,
      isCheckMovieError: true,
      isNextArrowShow: true,
      isPrevArrowShow: true,
      isFirstCheckMovie: true,
      date: {},
      checked: this.props.date.movie_list[0],
      slider: [],
      slideIndex: 0,
      updateCount: 0,
      settings: {
        dots: false,
        infinite: false,
        slidesToShow: 5,
        slidesToScroll: 1,
        afterChange: this.changeSlider,
        beforeChange: this.changeUpdateCount,
        speed: 500,
        autoplay: false,
        centerMode: true,
        arrows: false,
        responsive: [
          {
            breakpoint: 1200,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
              infinite: false,
              dots: false,
            },
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              infinite: false,
              dots: false,
            },
          },
          {
            breakpoint: 414,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              infinite: false,
              dots: false,
            },
          },
        ],
      },
      isMovieListShow: false,
      isInfoBoxShow: false,
      checkedMovieInfo: '',
    };
  }

  componentWillReceiveProps(nextProps, nextState) {
    if (nextProps.date !== this.state.date) {
      const settings = this.state.settings;

      if (nextProps.date.movie_list.length < 2) {
        settings.slidesToShow = 1;
        this.setState(
          {
            settings,
            date: nextProps.date,
            checked: nextProps.date.movie_list[0],
            isFirstCheckMovie: true,
            slideIndex: 0,
            isLoading: false,
          },
          () => {
            this.checkMovie(this.state.checked, 0);
          },
        );
      } else {
        settings.slidesToShow = 5;
        this.setState(
          {
            settings,
            date: nextProps.date,
            checked: nextProps.date.movie_list[0],
            isFirstCheckMovie: true,
            slideIndex: 0,
            isLoading: false,
          },
          () => {
            this.checkMovie(this.state.checked, 0);
          },
        );
      }
    }
  }

  changeSlider() {
    this.setState({
      slideIndex: this.slider.innerSlider.state.currentSlide,
    });
    const key = parseInt(document.getElementsByClassName('slick-center')[0].getAttribute('data'));

    this.setState(
      {
        checked: this.state.date.movie_list[key],
        isMovieListShow: false,
      },
      () => {
        if (this.state.isInfoBoxShow) {
          this.getMovieInfo();
        }
      },
    );
  }

  changeUpdateCount(e) {
    this.setState({
      updateCount: this.state.updateCount + 1,
    });
  }

  next() {
    let key = parseInt(document.getElementsByClassName('slick-center')[0].getAttribute('data'));

    if (this.state.date.movie_list.length !== key + 1) {
      this.slider.slickNext();
      if (key === this.state.date.movie_list.length - 2) {
        this.setState({
          isPrevArrowShow: true,
          isNextArrowShow: false,
        });
      } else {
        key += 1;
        this.setState({
          isPrevArrowShow: true,
          isNextArrowShow: true,
        });
      }
      this.setState({
        checked: this.state.date.movie_list[key],
        isMovieListShow: false,
      });
    }
  }

  prev() {
    this.slider.slickPrev();
    let key = parseInt(document.getElementsByClassName('slick-center')[0].getAttribute('data'));

    if (key === 0) {
      this.setState({
        isPrevArrowShow: false,
        isNextArrowShow: true,
      });
    } else {
      key += -1;
      this.setState({
        isPrevArrowShow: true,
        isNextArrowShow: true,
      });
    }
    this.setState({
      checked: this.state.date.movie_list[key],
      isMovieListShow: false,
    });
  }

  // click poster to update arrow is show or not
  checkMovie(item, index) {
    if (this.state.date.movie_list.length == index + 1) {
      this.setState({
        isPrevArrowShow: true,
        isNextArrowShow: false,
      });
    } else if (this.state.date.movie_list.length == 1) {
      this.setState({
        isNextArrowShow: false,
        isPrevArrowShow: false,
      });
    } else if (index == 0 && this.state.date.movie_list.length !== 1) {
      this.setState({
        isPrevArrowShow: false,
        isNextArrowShow: true,
      });
    } else {
      this.setState({
        isNextArrowShow: true,
        isPrevArrowShow: true,
      });
    }

    this.setState(
      {
        checked: item,
        isMovieListShow: false,
      },
      () => {
        this.slider.slickGoTo(index);
      },
    );
  }

  movieListClick() {
    this.setState({
      isMovieListShow: !this.state.isMovieListShow,
      isInfoBoxShow: false,
    });
  }

  infoboxClick() {
    this.setState(
      {
        isInfoBoxShow: !this.state.isInfoBoxShow,
      },
      () => {
        if (this.state.isInfoBoxShow) {
          this.getMovieInfo();
        }
      },
    );
  }

  // 取電影詳細資料
  getMovieInfo() {
    const movie_id = this.state.checked.movie_id;

    movieAPI
      .getMovieInfo(movie_id)
      .then(result => {
        if (result.code == '200') {
          this.setState({
            isCheckMovieError: false,
            checkedMovieInfo: result.result,
          });
        } else {
          this.setState({
            isCheckMovieError: true,
          });
        }
      })
      .catch(error => {
        this.setState({
          isCheckMovieError: true,
        });
      });
  }

  render() {
    const { isLoading, checkedMovieInfo, isInfoBoxShow, checked, isMovieListShow } = this.state;
    if (isLoading) {
      return (
        <CinemaEntryMovieWrapper>
          <FaCircleONotch className="loading" />
        </CinemaEntryMovieWrapper>
      );
    }
    if (this.state.date) {
      const settings = this.state.settings;
      let star;
      let dateMonth;
      let year;
      const staff1 = [];
      const staff2 = [];
      let movieName;
      const rank = movieGrade.gradeScore(checked.grade);

      if (!this.state.isCheckMovieError && checkedMovieInfo) {
        if (checkedMovieInfo.movie_staff.length > 1) {
          checkedMovieInfo.movie_staff.map((item, index) => {
            return item.staff_type === '1' ? staff1.push(item.staff_name) : staff2.push(item.staff_name);
          });
        }
      }

      if (checked) {
        if (checked.movie_title.zh_tw.length > 15) {
          movieName = checked.movie_title.zh_tw.slice(0, 15);
          movieName += '...';
        } else {
          movieName = checked.movie_title.zh_tw;
        }
      }

      dateMonth = timeFormat.seatMapDate(checkedMovieInfo.release_date);
      year = new Date(checkedMovieInfo.release_date).getFullYear();
      star = movieStars(checkedMovieInfo.ez_score, '#1e1e1e', 'booking');

      return (
        <div>
          <CinemaEntryMovieWrapper isInfoBoxShow={isInfoBoxShow}>
            <div className="wrapper">
              <div className="title" onClick={this.movieListClick}>
                {movieName}
                {isMovieListShow ? <FaAngleUp className="icon" /> : <FaAngleDown className="icon" />}
              </div>
              <div className="title en">{checked.movie_title.en_us}</div>

              {isMovieListShow ? (
                <div className="movielist">
                  {this.state.date.movie_list.map((item, index) => {
                    return (
                      <div key={index} className="list" onClick={() => this.checkMovie(item, index)}>
                        {item.movie_title.zh_tw}
                      </div>
                    );
                  })}
                </div>
              ) : null}

              <div className="arrowbox">
                {this.state.isPrevArrowShow ? <FaAngleLeft className="prev" onClick={this.prev} /> : null}
                {this.state.isNextArrowShow ? <FaAngleRight className="next" onClick={this.next} /> : null}
              </div>

              <Slider ref={c => (this.slider = c)} {...settings}>
                {this.state.date.movie_list.map((item, index) => {
                  return (
                    <div key={index} data={index} className="box" onClick={() => this.checkMovie(item, index)}>
                      {item.poster_url ? (
                        <img src={item.poster_url} />
                      ) : (
                        <div className="posterNull">{item.movie_title.zh_tw}</div>
                      )}
                    </div>
                  );
                })}
              </Slider>

              <div className="grade">{rank}</div>
              <div className="infobox" onClick={this.infoboxClick}>
                電影介紹
                {isInfoBoxShow ? <FaAngleUp className="icon" /> : <FaAngleDown className="icon" />}
              </div>

              {isInfoBoxShow && !this.state.isCheckMovieError ? (
                <div className="info">
                  <div className="datebox">
                    <div className="date">
                      <div className="text">上映日期</div>
                      <div className="text2">{dateMonth}</div>
			  			        <div className="text3">{year}</div>
                    </div>
                    <div className="comment">
                      <div className="star">{star}</div>
                      <div className="size">(0)則評論</div>
                    </div>
                    <div className="date">
                      <div className="text">片長時間</div>
                      <div className="text2">{checkedMovieInfo.movie_length}</div>
                      <div className="text3">分鐘</div>
                    </div>
                  </div>
                  <div className="staff">
                    導 演：
                    <span>
                      <span>{staff1.join('，')}</span>
                    </span>
                  </div>
                  <div className="staff">
                    演 員：
                    <span>
                      <span>{staff2.join('，')}</span>
                    </span>
                  </div>
                  <div className="desc">{checked.movie_description}</div>
                </div>
              ) : null}
            </div>
          </CinemaEntryMovieWrapper>
          <Clearfix />
          <BookingChoiceSession {...this.props} sessionDate={checked} date={this.state.date.date} />
        </div>
      );
    }
  }
}

export default CinemabookingMovie;
