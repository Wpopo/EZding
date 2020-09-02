import React from 'react';
import 'isomorphic-unfetch';
import Router from 'next/router';
import { ArticleWrapper, Clearfix } from '../../styled/articleStyled';
import ReactSlider from 'react-slick';
import ArticlePages from './articlePages';
import ArticleHotNews from './articleHotNews';
import ChangePages from '../common/changePages';
// API
import * as articleAPI from '../../actions/articleAPI';
import * as activityAPI from '../../actions/activityAPI';

class ArticleContent extends React.Component {
  constructor(props) {
    super(props);

    this.getBanner = this.getBanner.bind(this);
    this.getAdBanner = this.getAdBanner.bind(this);
    this.optionChecked = this.optionChecked.bind(this);

    this.renderSelect = this.renderSelect.bind(this);
    this.gotoPage = this.gotoPage.bind(this);
    this.gotoAd = this.gotoAd.bind(this);

    this.pageChange = this.pageChange.bind(this);
    this.totalPage = this.totalPage.bind(this);

    this.state = {
      isLoading: true,
      isError: false,
      topitems: [],
      adbanner: [],
      adurl: '',
      checked: this.props.url.query.type,
      nowIndex: this.props.url.query.page,
      options: [
        { key: '全部', value: '' },
        { key: '專題', value: 'topic' },
        { key: '影評', value: 'cinecism' },
        { key: '新聞', value: 'news' },
      ],
      settings: {
        dots: true,
        infinite: true,
        speed: 500,
        arrows: false,
        autoplay: true,
        pauseOnHover: true,
      },

      total: 5,
    };
  }

  componentDidMount() {
    this.getBanner();
    this.getAdBanner();
    this.optionChecked(this.props.url.query.type);
  }

  componentWillReceiveProps(nextProps, nextState) {
    if (nextProps.type !== this.props.type) {
      this.setState(
        {
          checked: nextProps.type,
        },
        () => {
          this.optionChecked(nextProps.type);
        },
      );
    }
    if (nextProps.page !== this.props.page) {
      this.setState(
        {
          nowIndex: nextProps.page,
        },
        () => {
          this.optionChecked(nextProps.type);
        },
      );
    }
  }

  getBanner() {
    this.setState({
      isLoading: true,
    });

    const content_category = 'movie_express';
    const content_type = '';
    const top = 1;
    const feature = 0;
    const valid = 1;
    const page = 1;
    const page_size = 6;

    articleAPI
      .articleNews(content_category, content_type, valid, page, page_size, top, feature)
      .then(result => {
        this.setState({
          topitems: result.result.list,
        });
      })
      .catch(error => {
        this.setState({
          isError: true,
        });
      });
  }

  getAdBanner() {
    const ad_type = 1;
    const ad_category = 'ezding.rwd';
    const ad_channel = '5d5e5ed3184fedf201184fedf6eb0001';
    const page_code = 'movie_express_home';
    const area_code = 'proBanner';
    const ad_size = 1;

    activityAPI
      .getbanner(ad_type, ad_size, ad_category, ad_channel, page_code, area_code)
      .then(result => {
        if (result.result.length == 0) {
          this.setState({
            adbanner: '../../static/article/addbanner.jpg',
            adurl: '/',
          });
        } else {
          this.setState({
            adbanner: `https://img.ezding.com.tw${result.result['0'].ad_url_big}`,
            adurl: result.result['0'].ad_link,
          });
        }
      })
      .catch(error => {});
  }

  optionChecked(key) {
    // 0 = all , 1 = 專題 , 2 = 影評, 3 = 新聞
    const option = document.getElementsByClassName('option');
    for (let i = 0; i < option.length; i++) {
      option[i].classList.remove('checked');
    }
    option[key].classList.add('checked');

    if (this.state.checked !== key) {
      this.setState(
        {
          checked: key,
        },
        () => {
          Router.push({
            pathname: '/article',
            query: {
              type: key,
              page: 1,
            },
          });
        },
      );
    }
  }

  pageChange(nowIndex) {
    if (nowIndex !== this.state.nowIndex) {
      this.setState(
        {
          nowIndex,
        },
        () => {
          Router.push({
            pathname: '/article',
            query: {
              type: this.state.checked,
              page: nowIndex,
            },
          });
        },
      );
    }
  }

  totalPage(total) {
    this.setState({
      total,
      isLoading: false,
    });
  }

  renderSelect() {
    return (
      <div className="select">
        <div className="options">
          <div className="option checked" onClick={() => this.optionChecked(0)}>
            <div>{this.state.options[0].key}</div>
          </div>
          <div className="option" onClick={() => this.optionChecked(1)}>
            <div>{this.state.options[1].key}</div>
          </div>
          <div className="option" onClick={() => this.optionChecked(2)}>
            <div>{this.state.options[2].key}</div>
          </div>
          <div className="option" onClick={() => this.optionChecked(3)}>
            <div>{this.state.options[3].key}</div>
          </div>
        </div>
      </div>
    );
  }

  gotoPage(item) {
    Router.push({
      pathname: '/articlePage',
      query: {
        content_id: item,
      },
    });
  }

  gotoAd(url) {
    Router.push({
      pathname: url,
    });
  }

  render() {
    const settings = this.state.settings;

    if (this.state.isLoading) {
      return (
        <ArticleWrapper visible={this.state.visible}>
          <div className="bannerWrapper">
            <div className="banner">
              <ReactSlider {...settings}>
                <div className="bannerbox" />
              </ReactSlider>
            </div>

            <div
              className="ad"
              onClick={() => this.gotoAd(this.state.adurl)}
              style={{ backgroundImage: `url(${this.state.adbanner})` }}
            />
          </div>

          <Clearfix />

          <div className="selectWrapper">{this.renderSelect()}</div>

          <Clearfix />

          <div className="wrapper">
            <ArticlePages
              nowIndex={this.state.nowIndex}
              options={this.state.options}
              totalPage={this.totalPage}
              checked={this.state.checked}
              isLoading={this.state.isLoading}
              isError={this.state.isError}
            />
            <ArticleHotNews />
          </div>

          <Clearfix />
        </ArticleWrapper>
      );
    }
    if (this.state.topitems) {
      return (
        <ArticleWrapper visible={this.state.visible}>
          <div className="bannerWrapper">
            <div className="banner">
              <ReactSlider {...settings}>
                {this.state.topitems.map((item, index) => {
                  return (
                    <div
                      className="bannerbox"
                      onClick={() => this.gotoPage(item.content_id)}
                      key={index}
                      style={{ backgroundImage: `url(${item.first_image})` }}
                    >
                      <div className="background">
                        <div className="title" title={item.content_title}>
                          {item.content_title}
                        </div>
                        <div
                          className="img"
                          style={{
                            backgroundImage: `url(https://img.ezding.com.tw/photos/mymovie/act/${
                              item.author.author_photo
                            })`,
                          }}
                        />
                        <div className="name">{item.author.author_name}</div>
                        {item.eval === 0 ? null : <div className="eval">有雷</div>}
                      </div>
                    </div>
                  );
                })}
              </ReactSlider>
            </div>

            <div
              className="ad"
              onClick={() => this.gotoAd(this.state.adurl)}
              style={{ backgroundImage: `${this.state.adbanner})` }}
            />
          </div>

          <Clearfix />

          <div className="selectWrapper">{this.renderSelect()}</div>

          <Clearfix />

          <div className="wrapper flex">
            <ArticlePages
              className={'flex-Pages'}
              nowIndex={this.state.nowIndex}
              totalPage={this.totalPage}
              options={this.state.options}
              checked={this.state.checked}
              isLoading={this.state.isLoading}
            />
            <div
              className="ad adrwd"
              onClick={() => this.gotoAd(this.state.adurl)}
              style={{ backgroundImage: `url(${this.state.adbanner})` }}
            />

            <ArticleHotNews className={'flex-HotNews'} textPage={false} />

            <div className="pages flex-Pages-controls">
              <ChangePages page={this.state.nowIndex} pages={this.state.total} fetchFunc={this.pageChange} />
            </div>
          </div>

          <Clearfix />
        </ArticleWrapper>
      );
    }
    if (this.state.isError) {
      return (
        <ArticleWrapper visible={this.state.visible}>
          <div className="bannerWrapper">
            <div className="banner">
              <ReactSlider {...settings}>
                <div className="bannerbox" />
              </ReactSlider>
            </div>

            <div className="ad" style={{ backgroundImage: `url(${this.state.adbanner})` }} />
          </div>
          <Clearfix />

          <div className="selectWrapper">{this.renderSelect()}</div>

          <Clearfix />

          <div className="wrapper">
            <ArticlePages isLoading={this.state.isLoading} isError={this.state.isError} />
            <ArticleHotNews />
          </div>

          <Clearfix />
        </ArticleWrapper>
      );
    }
  }
}

export default ArticleContent;
