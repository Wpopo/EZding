import React from 'react';
import Link from 'next/link';
import { BookingDialogContent, Clearfix } from '../../styled/bookingDialogStyled';
import LoadingCircle from '../common/loading';
import Empty from '../common/empty';
import * as movieGrade from '../common/grade';

import * as movieAPI from '../../actions/movieAPI';

class BookingDialogMovie extends React.Component {
  constructor(props) {
    super(props);

    this.setSession = this.setSession.bind(this);
    this.getMovieList = this.getMovieList.bind(this);
    this.state = {
      isLoading: true,
      isError: false,
      isEmpty: false,
      movielist: [],
    };
  }

  componentDidMount() {
    this.getMovieList(1);
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.height = '100vh';
  }

  setSession(item) {
    const tempRedirect = sessionStorage.getItem('redirect');
    window.sessionStorage.clear();
    sessionStorage.setItem('redirect', tempRedirect);
    sessionStorage.setItem('movieid', item.movie_id);
    sessionStorage.setItem('moviename', item.movie_title.zh_tw);
    this.props.gotowhere();
  }

  getMovieList(page) {
    this.setState({
      isLoading: true,
    });
    let page_size = 200;

    movieAPI
      .movieRankHot(page, page_size)
      .then(result => {
        if (result.result.total_records == 0) {
          this.setState({
            isEmpty: true,
            isLoading: false,
            isError: false,
          });
        } else {
          this.setState({
            isLoading: false,
            movielist: result.result.list,
          });
        }
      })
      .catch(error => {
        this.setState({
          isError: true,
          isLoading: false,
        });
      });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <BookingDialogContent>
          <LoadingCircle height={'80vh'} />
        </BookingDialogContent>
      );
    } else if (this.state.movielist.length > 0) {
      let emptyBox = [];

      for (let i = 0; i < 5 - (this.state.movielist.length % 5); i++) {
        emptyBox.push(<div className="movie-rank empty" key={i}></div>);
      }

      return (
        <BookingDialogContent>
          <h1 className="title">訂票排行榜</h1>
          <div className="poster-wrapper">
            {this.state.movielist.map((item, index) => {
              if (index < 5) {
                let grade = movieGrade.gradeScore(item.grade);

                let poster =
                  item.poster_url !== null && item.poster_url !== ''
                    ? item.poster_url
                    : '../../static/member/poster.png';
                let show = item.poster_url !== null && item.poster_url !== '' ? '' : 'show';
                return (
                  <div
                    className="poster"
                    key={index}
                    onClick={() => this.setSession(item)}
                    style={{ backgroundImage: `url(${poster})` }}
                  >
                    <div className={`poster-info ${show}`}>
                      <div className="movie-title" title={item.movie_title.zh_tw}>
                        {item.movie_title.zh_tw}
                      </div>
                      <div className="movie-title en" title={item.movie_title.en_us}>
                        {item.movie_title.en_us}
                      </div>
                      <div className="grade">{grade}</div>
                    </div>
                  </div>
                );
              }
            })}
          </div>
          <Clearfix />
          <h1 className="title">現正熱映</h1>
          <div className="movie-rank-wrapper">
            {this.state.movielist.map((item, index) => {
              if (index > 4) {
                return (
                  <div key={index}>
                    <div className="movie-rank" onClick={() => this.setSession(item)} title={item.movie_title.zh_tw}>
                      {item.movie_title.zh_tw}
                    </div>
                  </div>
                );
              }
            })}
            {emptyBox}
          </div>
          <Clearfix />
        </BookingDialogContent>
      );
    } else if (this.state.isEmpty) {
      return (
        <BookingDialogContent>
          <Empty height={'80vh'} />
        </BookingDialogContent>
      );
    } else if (this.state.isError) {
      return (
        <BookingDialogContent>
          <Empty height={'80vh'} />
        </BookingDialogContent>
      );
    } else {
      return (
        <BookingDialogContent>
          <LoadingCircle height={'80vh'} />
        </BookingDialogContent>
      );
    }
  }
}

export default BookingDialogMovie;
