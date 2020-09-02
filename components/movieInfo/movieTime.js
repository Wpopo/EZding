import React from 'react';
import { MovieTimeWrapper } from '../../styled/movieInfoStyled';
import FaCaretDown from 'react-icons/lib/fa/caret-down';
import MdSentimentNeutral from 'react-icons/lib/md/sentiment-neutral';
import IoIosArrowLeft from 'react-icons/lib/io/ios-arrow-left';
import IoIosArrowRight from 'react-icons/lib/io/ios-arrow-right';
import timeFormat from '../common/timeFormat';
import Empty from '../common/empty';
import MovieTimeCinemas from './movieTimeCinemas';
import Slider from 'react-slick';
import * as movieAPI from '../../actions/movieAPI';

class MovieTime extends React.Component {
  constructor(props) {
    super(props);

    this.getMovieCinemasListByLocation = this.getMovieCinemasListByLocation.bind(this);
    this.locationShow = this.locationShow.bind(this);
    this.locationChange = this.locationChange.bind(this);
    this.checkedDate = this.checkedDate.bind(this);
    this.dateSlider = this.dateSlider.bind(this);
    this.tipsShow = this.tipsShow.bind(this);
    this.onSliderSwipe = this.onSliderSwipe.bind(this);

    this.state = {
      isLoading: true,
      isResult: false,
      isError: false,
      isEmpty: false,
      visible: false,
      checked: 0,
      dateChecked: 0,
      location: [
        { id: [1, 8, 11], name: '北區' },
        { id: [2, 3, 9], name: '桃竹苗' },
        { id: [4], name: '中區' },
        { id: [5, 6, 7, 10], name: '南區及離島' },
      ],
      alldata: [],
      nowData: [],
      datePart: true,
      isTipsShow: false,
      settings: {
        dots: false,
        infinite: false,
        speed: 500,
        arrows: false,
        swipeToSlide: true,
        responsive: [
          {
            breakpoint: 580,
            settings: {
              slidesToShow: 7,
              slidesToScroll: 7,
              swipeToSlide: false,
              infinite: false,
              beforeChange: this.onSliderSwipe,
              afterChange: this.onSliderSwipe,
            },
          },
          {
            breakpoint: 415,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 4,
              swipeToSlide: false,
              infinite: false,
              beforeChange: this.onSliderSwipe,
              afterChange: this.onSliderSwipe,
            },
          },
          {
            breakpoint: 376,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 4,
              swipeToSlide: false,
              infinite: false,
              beforeChange: this.onSliderSwipe,
              afterChange: this.onSliderSwipe,
            },
          },
        ],
      },
    };
  }

  componentDidMount() {
    this.getMovieCinemasListByLocation();
  }

  locationShow() {
    this.setState({
      visible: !this.state.visible,
    });
  }

  locationChange(checked) {
    this.setState(
      {
        checked,
        visible: false,
      },
      () => {
        this.getMovieCinemasListByLocation();
      },
    );
  }

  getMovieCinemasListByLocation() {
    this.setState({
      isLoading: true,
      isResult: false,
      alldata: [],
    });

    const movie_id = this.props.movie;
    const page = 1;
    const page_size = 200;

    if (this.props.order) {
      // 已開放訂票
      let times = 0;
      this.state.location[this.state.checked].id.map((item, index, self) => {
        const location = item;

        movieAPI
          .getMovieCinemasListByLocation(movie_id, location, page, page_size)
          .then(result => {
            if (result.code !== '200') {
              times += 1;
              if (times == self.length) {
                this.checkedDate(0);
              }
            } else {
              const alldata = this.state.alldata;
              const datelist = new Set();

              result.result.list.map(item => {
                item.sdata.map(sdataItem => {
                  alldata.push({
                    date: item.date,
                    cinema_id: sdataItem.cinema_data.cinema_id,
                    cinema_name_tw: sdataItem.cinema_data.cinema_name.zh_tw,
                    movie_version: sdataItem.movie_version,
                    movie_id: sdataItem.movie_id,
                    movie_name: result.result.booking_info.movie_title,
                    data_session: sdataItem.data_session,
                  });
                });
              });

              alldata.map(item => {
                return datelist.add(item.date);
              });

              this.setState(
                {
                  alldata,
                  datelist: Array.from(datelist),
                },
                () => {
                  // 這邊判斷是否為最後一筆查詢資料

                  times += 1;
                  if (times == self.length) {
                    this.checkedDate(0);
                  }
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
      });
    } else {
      // 未開放訂票
      this.setState({
        isEmpty: true,
        isLoading: false,
        isError: false,
      });
    }
  }

  checkedDate(index) {
    // 比對當日的所有場次

    const datelist = this.state.datelist;
    const alldata = this.state.alldata;

    const newDateList = alldata.filter((item, key) => {
      return item.date == datelist[index];
    });

    this.setState(
      {
        isLoading: false,
        dateChecked: index,
        nowData: newDateList,
        isResult: true,
      },
      () => {
        if (newDateList.length > 0) {
          const items = document.getElementsByClassName('datebox');
          const itemsRWD = document.getElementsByClassName('dateboxRWD');
          for (let i = 0; i < items.length; i++) {
            items[i].classList.remove('checked');
          }
          for (let i = 0; i < itemsRWD.length; i++) {
            itemsRWD[i].classList.remove('checked');
          }
          items[index].classList.add('checked');
          itemsRWD[index].classList.add('checked');
        }
      },
    );
  }

  onSliderSwipe(e) {
    const items = document.getElementsByClassName('datebox');
    const itemsRWD = document.getElementsByClassName('dateboxRWD');

    items[this.state.dateChecked].classList.add('checked');
    itemsRWD[this.state.dateChecked].classList.add('checked');
  }

  dateSlider(boolean) {
    this.setState({
      datePart: boolean,
    });
  }

  tipsShow() {
    this.setState({
      isTipsShow: !this.state.isTipsShow,
    });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <MovieTimeWrapper>
          <div className="wrapper">
            <div className="grayloading" />
          </div>
        </MovieTimeWrapper>
      );
    }
    if (this.state.isResult) {
      const today_y = new Date().getFullYear();
      const today_m = new Date().getMonth();
      const today_d = new Date().getDate();

      return (
        <MovieTimeWrapper visible={this.state.visible} datePart={this.state.datePart}>
          <div className="wrapper">
            <div className="location" onClick={this.locationShow}>
              {this.state.location[this.state.checked].name}
              <FaCaretDown className="icon" />
            </div>
            {this.state.visible ? (
              <div className="locationList">
                <div className="list" onClick={() => this.locationChange(0)}>
                  北區
                </div>
                <div className="list" onClick={() => this.locationChange(1)}>
                  桃竹苗
                </div>
                <div className="list" onClick={() => this.locationChange(2)}>
                  中區
                </div>
                <div className="list" onClick={() => this.locationChange(3)}>
                  南區及離島
                </div>
              </div>
            ) : null}

            <div className="datePart">
              {this.state.datelist.length > 7 ? (
                <IoIosArrowLeft className="leftIcon" onClick={() => this.dateSlider(true)} />
              ) : null}
              <div className="dateHidden">
                {this.state.datelist.map((item, index) => {
                  const date = timeFormat.sessionDate(item);
                  return (
                    <div className="datebox" key={index} onClick={() => this.checkedDate(index)}>
                      <div className="week">{date[0].week}</div>
                      <div className="date">{date[0].date}</div>
                      <div className="month">{date[0].month}</div>
                    </div>
                  );
                })}
              </div>
              {this.state.datelist.length > 7 ? (
                <IoIosArrowRight className="rightIcon" onClick={() => this.dateSlider(false)} />
              ) : null}
              <div className="dateHiddenRWD">
                <Slider {...this.state.settings} ref={c => (this.slider = c)}>
                  {this.state.datelist.map((item, index) => {
                    const date = timeFormat.sessionDate(item);
                    return (
                      <div
                        className="dateboxRWD"
                        key={index}
                        onClick={() => this.checkedDate(index)}
                        onTouchStart={this.onSliderSwipe}
                        onTouchCancel={this.onSliderSwipe}
                        onTouchMove={this.onSliderSwipe}
                      >
                        <div className="week">{date[0].week}</div>
                        <div className="date">{date[0].date}</div>
                        <div className="month">{date[0].month}</div>
                      </div>
                    );
                  })}
                </Slider>
              </div>
            </div>
            <div className="tipsbox">
              <div className="text status">座位狀態</div>
              <div className="text">
                <span />
                充足
              </div>
              <div className="text">
                <span className="seat40" />
                緊張(低於40%)
              </div>
              <div className="text">
                <span className="seat5" />
                告急(低於5%)
              </div>
              <img src="../../static/movieInfo/information.svg" className="text icon" onClick={this.tipsShow} />
              {this.state.isTipsShow ? (
                <div className="tips">
                  <div className="tipsText">以下時刻僅供參考，如有異動，以戲院實際播放時間為準</div>
                  <div className="time">
                    (時刻表更新日期：
                    <span>{`${today_y}-${today_m + 1}-${today_d}`}</span>
                    )
                  </div>
                </div>
              ) : null}
            </div>

            <MovieTimeCinemas nowData={this.state.nowData} url={this.props.url} />
          </div>
        </MovieTimeWrapper>
      );
    }
    if (this.state.isError) {
      return (
        <MovieTimeWrapper>
          <div className="wrapper">
            <div className="location" onClick={this.locationShow}>
              {this.state.location[this.state.checked].name}
              <FaCaretDown className="icon" />
            </div>
            {this.state.visible ? (
              <div className="locationList">
                <div className="list" onClick={() => this.locationChange(0)}>
                  北區
                </div>
                <div className="list" onClick={() => this.locationChange(1)}>
                  桃竹苗
                </div>
                <div className="list" onClick={() => this.locationChange(2)}>
                  中區
                </div>
                <div className="list" onClick={() => this.locationChange(3)}>
                  南區及離島
                </div>
              </div>
            ) : null}
            <div className="isEmpty">
              <MdSentimentNeutral className="emptyIcon" />
              未開放訂票
            </div>
          </div>
        </MovieTimeWrapper>
      );
    }
    if (this.state.isEmpty) {
      return (
        <MovieTimeWrapper>
          <div className="wrapper">
            <div className="location" onClick={this.locationShow}>
              {this.state.location[this.state.checked].name}
              <FaCaretDown className="icon" />
            </div>
            {this.state.visible ? (
              <div className="locationList">
                <div className="list" onClick={() => this.locationChange(0)}>
                  北區
                </div>
                <div className="list" onClick={() => this.locationChange(1)}>
                  桃竹苗
                </div>
                <div className="list" onClick={() => this.locationChange(2)}>
                  中區
                </div>
                <div className="list" onClick={() => this.locationChange(3)}>
                  南區及離島
                </div>
              </div>
            ) : null}
            <div className="isEmpty">
              <MdSentimentNeutral className="emptyIcon" />
              未開放訂票
            </div>
          </div>
        </MovieTimeWrapper>
      );
    }
    return (
      <MovieTimeWrapper>
        <div className="wrapper">
          <div className="location" onClick={this.locationShow}>
            {this.state.location[this.state.checked].name}
            <FaCaretDown className="icon" />
          </div>
          {this.state.visible ? (
            <div className="locationList">
              <div className="list" onClick={() => this.locationChange(0)}>
                北區
              </div>
              <div className="list" onClick={() => this.locationChange(1)}>
                桃竹苗
              </div>
              <div className="list" onClick={() => this.locationChange(2)}>
                中區
              </div>
              <div className="list" onClick={() => this.locationChange(3)}>
                南區及離島
              </div>
            </div>
          ) : null}
          <div className="isEmpty">
            <MdSentimentNeutral className="emptyIcon" />
            未開放訂票
          </div>
        </div>
      </MovieTimeWrapper>
    );
  }
}

export default MovieTime;
