import React from 'react';
import Link from 'next/link';
import 'isomorphic-unfetch';
import Router from 'next/router';
import HeadMeta from '../components/headMeta';
import Navbar from '../components/common/navbar';
import { MovieInfoWrapper, MovieFooterWrapper, Clearfix } from '../styled/movieInfoStyled';
import CinemaEntry from '../components/common/cinemaEntry';
import Footer from '../components/common/footer';
import UrlChange from '../components/common/urlChange';
import MovieVideo from '../components/movieInfo/movieVideo';
import MovieTime from '../components/movieInfo/movieTime';
import MovieDesc from '../components/movieInfo/movieDesc';
import GiftAds from '../components/common/giftAds';
import timeFormat from '../components/common/timeFormat';
import { movieStars } from '../components/common/scoreStars';
import cheerio from 'cheerio';

import * as articleAPI from './../actions/articleAPI';
import * as movieAPI from './../actions/movieAPI';
import * as movieGrade from '../components/common/grade';
import * as gtag from '../components/common/gtag';

class MovieInfo extends React.Component {
  static async getInitialProps({ query, req, res }) {
    let global1 = Object.assign({}, global.window);
    let global2 = Object.assign({}, global1.location);
    let baseUrl = req ? req.protocol + '://' + req.headers.host : global2.origin;

    const response = await fetch(baseUrl + '/new_ezding/movies/' + query.movieid);
    const data = await response.json();

    const response2 = await fetch(
      baseUrl + '/new_ezding/contents?movie_id=' + query.movieid + '&page=1&page_size=4&valid=1',
    );
    const data2 = await response2.json();

    if (!data.result) {
      res.redirect(baseUrl + '/repairPage');
    } else {
      return {
        movieInfo: data.result,
        movie_id: query.movieid,
        otherList: data2.result.list,
        choiceTab: query.tab,
      };
    }
  }
  constructor(props) {
    super(props);

    this.videoShow = this.videoShow.bind(this);
    this.videoUrl = this.videoUrl.bind(this);
    this.choiceClick = this.choiceClick.bind(this);
    this.gotoPage = this.gotoPage.bind(this);
    this.scrollToTop = this.scrollToTop.bind(this);

    this.state = {
      changevisible: false,
      movie_id: '',
      movieInfo: this.props.movieInfo,
      videoShow: false,
      video: '',
      choiceTab: 0,
      isGiftShow: false,
      otherList: this.props.otherList,
      isOtherEmpty: this.props.otherList.length == 0 ? true : false,
    };
  }

  componentDidMount() {
    this.scrollToTop(1);

    if (sessionStorage.getItem('giftAds') !== 'false') {
      this.setState({
        isGiftShow: true,
      });
    }
    if (this.state.movieInfo.movie_preview[0].preview_body !== null) {
      this.videoUrl();
    }

    if (this.props.url.query.movieid == '0b6b405a201640ff94ad0221000a0314') {
      gtag.pageview(window.location.href);
      gtag.event('DC-8209718/wb_to0/wb_le0+standard');
      gtag.event('DC-8388319/invmedia/wb_le0+standard');
      fbq('track', 'PageView');
    }

    if (this.props.choiceTab) {
      this.choiceClick(this.props.choiceTab);
    }

    Router.onRouteChangeStart = (url) => {
      this.setState({
        changevisible: true,
      });
    };
    Router.onRouteChangeComplete = (url) => {
      this.setState({
        changevisible: false,
      });
    };
  }

  videoUrl() {
    let src = '';

    if (this.state.movieInfo.movie_preview[0].preview_body) {
      let iframeStr = this.state.movieInfo.movie_preview[0].preview_body;
      let regexp = /src=\S+/g;
      let matchStr = iframeStr.match(regexp);

      let url = matchStr[0].split(':');
      let newUrl = url[1].substring(0, url[1].length - 1);
      src = 'https:' + newUrl;
    }

    this.setState({
      video: src,
    });
  }

  videoShow() {
    this.setState({
      videoShow: !this.state.videoShow,
    });
  }

  choiceClick(val) {
    this.setState({
      choiceTab: val,
    });
    let items = document.getElementsByClassName('movie-intro-title');
    for (let i = 0; i < items.length; i++) {
      items[i].classList.remove('choice');
    }
    items[val].classList.add('choice');
  }

  gotoPage(id) {
    Router.push({
      pathname: '/articlePage',
      query: {
        content_id: id,
      },
    });
  }

  scrollToTop(scrollDuration) {
    var scrollStep = -window.scrollY / (scrollDuration / 15),
      scrollInterval = setInterval(function () {
        if (window.scrollY != 0) {
          window.scrollBy(0, scrollStep);
        } else clearInterval(scrollInterval);
      }, 15);
  }

  render() {
    let movie = this.state.movieInfo;
    let grade = movieGrade.gradeScore(movie.grade);

    let staff1 = [],
      staff2 = [];
    movie.movie_staff.map((item, index) => {
      return item.staff_type === '1' ? staff1.push(item.staff_name) : staff2.push(item.staff_name);
    });

    return (
      <div style={{ backgroundColor: '#ffffff' }}>
        {this.state.changevisible ? <UrlChange /> : null}
        {this.state.videoShow ? <MovieVideo video={this.state.video} videoShow={this.videoShow} /> : null}

        <HeadMeta moviepage={true} movieInfo={this.state.movieInfo} />
        <Navbar url={this.props.url} />
        {this.state.isGiftShow ? <GiftAds /> : null}
        <MovieInfoWrapper>
          {this.state.video ? (
            <div
              className="videoIcon"
              onClick={this.videoShow}
              style={{ backgroundImage: 'url(./static/common/videoPlay.svg)' }}
            ></div>
          ) : null}
          <div className="videobox">
            <div className="video">
              <iframe width="1980" height="400" src={this.state.video} frameBorder="0" allowFullScreen />
            </div>
          </div>

          <div className="wrapper-title">
            <div className="wrapper-title-contain">
              <div className="poster" style={{ backgroundImage: `url(${movie.poster_url})` }}>
                <div className="grade">{grade}</div>
                <div className="movie-title">{movie.movie_title.zh_tw}</div>
                <div className="movie-title eu">{movie.movie_title.en_us}</div>
                <div className="time">
                  <span>上映日期：{timeFormat.newsDate(movie.release_date)}</span>
                  <span className="length">片長：{movie.movie_length}分鐘</span>
                </div>

                <div className="allScore">
                  <div className="starbox">
                    <div className="star">{movieStars(movie.ez_score, 'transparent')}</div>
                    <div className="text">ez訂</div>
                  </div>
                  <div className="imdb">
                    <div className="score">{movie.imdb_score}</div>
                    <div className="text">IMDB</div>
                  </div>
                  <div className="tomato">
                    <div className="score">{movie.rt_score}</div>
                    <div className="text">爛番茄</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="wrapper-content">
              <div className="movie-intro-title-wrapper">
                <div className="movie-intro-title choice" onClick={() => this.choiceClick(0)}>
                  電影時刻
                </div>
                <div className="movie-intro-title" onClick={() => this.choiceClick(1)}>
                  電影介紹
                </div>
              </div>
              {this.state.choiceTab == 0 ? (
                <MovieTime movie={movie.movie_id} order={movie.order_availible} url={this.props.url} />
              ) : null}
              {this.state.choiceTab == 1 ? (
                <MovieDesc choiceClick={this.choiceClick} staff1={staff1} staff2={staff2} movie={movie} />
              ) : null}
            </div>
          </div>
        </MovieInfoWrapper>
        <Clearfix />
        {this.state.isOtherEmpty ? null : (
          <MovieFooterWrapper>
            <div className="wrapper">
              <div className="look">觀看此內容的人也查看過</div>
              <div className="otherBox">
                {this.state.otherList.map((item, index) => {
                  let time = timeFormat.newsDate(item.created_time);
                  let isEval = item.eval == 0 ? '' : '有雷';
                  let evalStyle = item.eval == 0 ? '' : 'eval';
                  let $ = cheerio.load(item.content_detail);
                  let text = $('p:nth-child(2)').text().slice(0, 50);
                  text += '···';
                  return (
                    <div className="box" key={index} onClick={() => this.gotoPage(item.content_id)}>
                      <div className="photo" style={{ backgroundImage: `url(${item.first_image})` }}></div>
                      <div className="title">{item.content_title}</div>
                      <div className="authorInfo">
                        <div
                          className="authorPhoto"
                          style={{
                            backgroundImage: `url(https://img.ezding.com.tw/photos/mymovie/act/${item.author.author_photo})`,
                          }}
                        ></div>
                        <div className="nameTime">
                          <div className="name">{item.author.author_name}</div>
                          <div className="time">{time}</div>
                        </div>
                        <div className={evalStyle}>{isEval}</div>
                      </div>
                      <div className="desc">{text}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </MovieFooterWrapper>
        )}
        <Clearfix />
        <CinemaEntry />
        <Footer />
      </div>
    );
  }
}

export default MovieInfo;
