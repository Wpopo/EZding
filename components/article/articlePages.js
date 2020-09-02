import React from 'react';
import Router from 'next/router';
import 'isomorphic-unfetch';
import { ArticlePagesWrapper, Clearfix } from '../../styled/articleStyled';
import timeFormat from '../common/timeFormat';
// API
import * as articleAPI from '../../actions/articleAPI';

class ArticlePages extends React.Component {
  constructor(props) {
    super(props);

    this.getNews = this.getNews.bind(this);
    this.gotoPage = this.gotoPage.bind(this);

    this.state = {
      isLoading: true,
      isError: false,
      news: [],
      checked: this.props.checked,
      nowIndex: this.props.nowIndex,
    };
  }

  componentDidMount() {
    const { nowIndex } = this.state;
    this.getNews(nowIndex);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.checked !== this.state.checked) {
      this.setState(
        {
          checked: nextProps.checked,
        },
        () => {
          this.getNews(this.state.nowIndex);
        },
      );
    }
    if (nextProps.nowIndex != this.state.nowIndex) {
      this.setState(
        {
          nowIndex: nextProps.nowIndex,
        },
        () => {
          this.getNews(this.state.nowIndex);
        },
      );
    }
    if (nextProps.isLoading !== this.state.isLoading) {
      this.setState({
        isLoading: false,
      });
    }
    if (nextProps.isError !== this.state.isError) {
      this.setState({
        isError: nextProps.isError,
      });
    }
  }

  getNews(page) {
    this.setState({
      isLoading: true,
    });
    let content_type = '';
    // 0 = all , 1 = 專題 , 2 = 影評, 3 = 新聞

    content_type = this.props.options[this.state.checked].value;

    const content_category = 'movie_express';
    const feature = 0;
    const top = 0;
    const valid = 1;
    const page_size = 6;

    articleAPI
      .articleNews(content_category, content_type, valid, page, page_size, top, feature)
      .then(result => {
        this.setState({
          news: result.result.list,
          isLoading: false,
        });

        this.props.totalPage(result.result.total_pages);
      })
      .catch(error => {
        this.setState({
          isLoading: false,
          isError: true,
        });
      });
  }

  gotoPage(item) {
    Router.push({
      pathname: '/articlePage',
      query: {
        content_id: item,
      },
    });
  }

  elementFromHTML(htmlString) {
    let text = '';

    if (typeof htmlString === 'string') {
      const div = document.createElement('div');
      div.innerHTML = htmlString.trim();

      if (div.childNodes.length > 1) {
        text = div.childNodes[1].parentElement.innerText.trim();
      }
    }

    if (text.length > 80) {
      text = text.slice(0, 80);
    }

    return text;
  }

  render() {
    const { isLoading, news, pagesIndex, isError } = this.state;

    if (isLoading) {
      return (
        <ArticlePagesWrapper isLoading={isLoading}>
          <div className="wrapper">
            <div className="titlebox">
              <div className="title">近期文章</div>
            </div>

            <div className="newsbox">
              <div className="photoBox">
                <div className="photo" />
              </div>
            </div>
            <div className="newsbox">
              <div className="photoBox">
                <div className="photo" />
              </div>
            </div>
            <div className="newsbox">
              <div className="photoBox">
                <div className="photo" />
              </div>
            </div>
            <div className="newsbox">
              <div className="photoBox">
                <div className="photo" />
              </div>
            </div>
            <div className="newsbox">
              <div className="photoBox">
                <div className="photo" />
              </div>
            </div>
            <div className="newsbox">
              <div className="photoBox">
                <div className="photo" />
              </div>
            </div>
          </div>
        </ArticlePagesWrapper>
      );
    }
    if (news.length > 0) {
      const emptyBox = [];
      const boxLength = news.length % 6 === 0 ? 0 : 6 - (news.length % 6);
      for (let i = 0; i < boxLength; i += 1) {
        emptyBox.push(<div className="newsbox emptybox" key={i} />);
      }
      return (
        <ArticlePagesWrapper pagesIndex={pagesIndex} className={this.props.className}>
          <div className="wrapper">
            <div className="titlebox">
              <div className="title">近期文章</div>
            </div>

            {news.map((item, index) => {
              const { created_time, content_title, content_id, first_image, author, event, content_detail } = item;
              const time = timeFormat.newsDate(created_time);

              const photo = first_image ? first_image.toString() : '../../static/poster.png';

              return (
                <div className="newsbox" key={index} onClick={() => this.gotoPage(content_id)}>
                  <div className="photoBox">
                    <div className="photo" style={{ backgroundImage: `url(${photo})` }} />
                  </div>
                  <div className="title" title={content_title}>
                    {content_title}
                  </div>

                  <div
                    className="name_pic"
                    style={{
                      backgroundImage: `url(https://img.ezding.com.tw/photos/mymovie/act/${author.author_photo})`,
                    }}
                  />
                  <div className="name">
                    <div>{author.author_name}</div>
                    <div>{time}</div>
                  </div>
                  {item.eval !== 0 ? <div className="eval">有雷</div> : null}
                  {event !== 0 ? <img className="event" alt="event" src="./../static/article/activity.svg" /> : null}

                  <div className="text">{this.elementFromHTML(content_detail)}</div>
                </div>
              );
            })}
            {emptyBox}
          </div>
          <Clearfix />
        </ArticlePagesWrapper>
      );
    }
    if (isError) {
      return (
        <ArticlePagesWrapper>
          <div className="wrapper">
            <div className="titlebox">
              <div className="title">近期文章</div>
            </div>
          </div>
        </ArticlePagesWrapper>
      );
    }
    return (
      <ArticlePagesWrapper isLoading={isLoading}>
        <div className="wrapper">
          <div className="titlebox">
            <div className="title">近期文章</div>
          </div>
        </div>
      </ArticlePagesWrapper>
    );
  }
}

export default ArticlePages;
