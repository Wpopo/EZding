import React from 'react';
import 'isomorphic-unfetch';
import Router from 'next/router';
import { ArticleBackGround, ArticleTextPageWrapper, ArticleTextPageRight, Clearfix } from '../../styled/articleStyled';
import timeFormat from '../common/timeFormat';
import cheerio from 'cheerio';
import ArticleHotNews from './articleHotNews';
import FaAngleLeft from 'react-icons/lib/fa/angle-left';
import FaAngleRight from 'react-icons/lib/fa/angle-right';
import ShareArticle from '../common/shareArticle';
import * as articleAPI from '../../actions/articleAPI';
import * as activityAPI from '../../actions/activityAPI';

class ArticleTextPage extends React.Component {
  constructor(props) {
    super(props);

    this.getAdBanner = this.getAdBanner.bind(this);
    this.createMarkUp = this.createMarkUp.bind(this);
    this.getNext = this.getNext.bind(this);
    this.getPrev = this.getPrev.bind(this);
    this.gotoPage = this.gotoPage.bind(this);
    this.gotoAd = this.gotoAd.bind(this);
    this.getNews = this.getNews.bind(this);
    this.handleScroll = this.handleScroll.bind(this);

    this.state = {
      isLoading: true,
      isError: false,
      isNextResult: false,
      isPrevResult: false,
      adbanner: '',
      adurl: '',
      content: this.props.content,
      next: null,
      prev: null,
      total_records: '',
      isShareArticle: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.content !== this.state.content) {
      this.setState(
        {
          content: nextProps.content,
          isLoading: true,
        },
        () => {
          this.getNews();
          this.getAdBanner();
        },
      );
    }
  }

  componentDidMount() {
    this.getNews();
    this.getAdBanner();
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    if (document.documentElement.scrollTop > 500 || document.body.scrollTop > 500) {
      this.setState({
        isShareArticle: true,
      });
    } else {
      this.setState({
        isShareArticle: false,
      });
    }
  }

  getNews() {
    this.setState({
      isLoading: true,
    });
    let content_type = '';
    // 0 = all , 1 = 專題 , 2 = 影評, 3 = 新聞

    content_type = 0;

    const content_category = 'movie_express';
    const feature = 0;
    const top = 0;
    const valid = 1;
    const page = 1;
    const page_size = 6;

    articleAPI
      .articleNews(content_category, content_type, valid, page, page_size, top, feature)
      .then(result => {
        this.setState({
          total_records: result.result.total_records,
        });
        this.getNext(this.state.content.result.content_id + 1);
        this.getPrev(this.state.content.result.content_id - 1);
      })
      .catch(error => {});
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
            isLoading: false,
            adbanner: `https://img.ezding.com.tw${result.result['0'].ad_url_big}`,
            adurl: result.result['0'].ad_link,
          });
        }
      })
      .catch(error => {});
  }

  getNext(id) {
    this.setState({
      isNextResult: false,
      isPrevResult: false,
    });
    const content_id = id;

    // next
    articleAPI
      .articlePage(content_id)
      .then(result => {
        if (result == null) {
          if (id + 1 <= this.state.total_records) {
            this.getNext(id + 1);
          }
        } else {
          this.setState(
            {
              next: result.result,
              isNextResult: true,
            },
            () => {
              if (this.state.isNextResult && this.state.isPrevResult) {
                this.setState({
                  isLoading: false,
                });
              }
            },
          );
        }
      })
      .catch(error => {});
  }

  getPrev(id) {
    this.setState({
      isNextResult: false,
      isPrevResult: false,
    });
    const content_id = id;

    // prev
    articleAPI
      .articlePage(content_id)
      .then(result => {
        if (result == null) {
          if (id - 1 > 0) {
            this.getNext(id - 1);
          }
        } else {
          this.setState(
            {
              prev: result.result,
              isPrevResult: true,
            },
            () => {
              if (this.state.isNextResult && this.state.isPrevResult) {
                this.setState({
                  isLoading: false,
                });
              }
            },
          );
        }
      })
      .catch(error => {
        this.setState({
          isLoading: false,
        });
      });
  }

  createMarkUp() {
    const text = this.state.content.result.content_detail;
    const $ = cheerio.load(text);

    for (let i = 0; i < $('img').length; i++) {
      if ($('img')[i].attribs.src.match('ckupload')) {
        $('img')[i].attribs.src = `https://img.ezding.com.tw/photos/ezding${$('img')[i].attribs.src}`;
      }
    }
    return { __html: $.html() };
  }

  gotoPage(id) {
    Router.push({
      pathname: '/articlePage',
      query: {
        content_id: id,
      },
    });
  }

  gotoAd(url) {
    Router.push({
      pathname: url,
    });
  }

  render() {
    const {
      isLoading,
      isPrevResult,
      isNextResult,
      content,
      prev,
      next,
      adurl,
      adbanner,
      isShareArticle,
      isError,
    } = this.state;

    if (isLoading) {
      return <ArticleBackGround />;
    }
    if (isPrevResult && isNextResult && content) {
      const time = timeFormat.newsDate(content.result.created_time);
      let type;
      switch (content.result.content_type) {
        case 'news':
          type = '新聞';
          break;
        case 'cinecism':
          type = '影評';
          break;
        case 'topic':
          type = '專題';
          break;
        case 'other':
          type = '其他';
          break;
      }

      let desc = content.result.author.author_desc;
      desc = desc.split('</br>');

      return (
        <ArticleBackGround>
          <ArticleTextPageWrapper>
            <div className="wrapper">
              <h1 className="title">{content.result.content_title}</h1>
              <span className="type">{type}</span>
              <img className="authorIcon" alt="authorIcon" src="./../static/article/articlePageAuthor.svg" />
              <span className="author">{content.result.author.author_name}</span>
              <img className="authorIcon" alt="authorIcon" src="./../static/article/time.svg" />
              <span className="date">{time}</span>
              <div className="boxShareArticle">
                <ShareArticle url={content.result.content_id} isApp={this.props.isApp} />
              </div>

              <div className="text" dangerouslySetInnerHTML={this.createMarkUp()} />

              <div className="ad-wrapper">
                <div
                  className="photo"
                  style={{
                    backgroundImage: `url(https://img.ezding.com.tw/photos/mymovie/act/${content.result.author.author_photo})`,
                  }}
                >
                  <div className="name">{content.result.author.author_name}</div>
                </div>
                <div className="desc">{content.result.author.author_desc}</div>
              </div>

              <div className="tags">
                <div className="tag_title">Tags</div>
                <div className="box">
                  {content.result.content_tag.map((item, index) => {
                    return (
                      <div className="tag" key={index}>
                        {item.tag_name}
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="prev">
                {prev === null ? null : (
                  <div>
                    <div className="page">
                      <FaAngleLeft className="icon" />
                      上一頁
                    </div>
                    <div className="page_title" onClick={() => this.gotoPage(prev.content_id)}>
                      {prev.content_title}
                    </div>
                  </div>
                )}
              </div>
              <div className="next">
                {next === null ? null : (
                  <div>
                    <div className="page">
                      <FaAngleRight className="icon right" />
                      下一頁
                    </div>
                    <div className="page_title" onClick={() => this.gotoPage(next.content_id)}>
                      {next.content_title}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </ArticleTextPageWrapper>

          <ArticleTextPageRight>
            <div className="wrapper">
              <div className="ad" onClick={() => this.gotoAd(adurl)} style={{ backgroundImage: `url(${adbanner})` }} />
              <div className="ad2">
                <div
                  className="photo"
                  style={{
                    backgroundImage: `url(https://img.ezding.com.tw/photos/mymovie/act/${content.result.author.author_photo})`,
                  }}
                />
                <div className="name">{content.result.author.author_name}</div>
                <div className="name">
                  <div className="text">
                    {desc.map(item => {
                      return item;
                    })}
                  </div>
                </div>
              </div>
            </div>
          </ArticleTextPageRight>
          <ArticleHotNews textPage />
          <Clearfix />
          {isShareArticle ? (
            <div className="bgForShareArticleWeb">
              <div className="shareBox">
                <ShareArticle url={content.result.content_id} />
              </div>
            </div>
          ) : null}
          <div className="bgForShareArticleMobile" />
        </ArticleBackGround>
      );
    }
    if (isError) {
      return <ArticleBackGround />;
    }
    return <ArticleBackGround />;
  }
}

export default ArticleTextPage;
