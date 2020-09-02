import React from 'react';
import Router from 'next/router';
import 'isomorphic-unfetch';
import { HotNewsWrapper, Clearfix } from '../../styled/articleStyled';
import timeFormat from '../common/timeFormat';
// API
import * as articleAPI from '../../actions/articleAPI';

class ArticleHotNews extends React.Component {
  constructor(props) {
    super(props);

    this.getHotNews = this.getHotNews.bind(this);
    this.gotoPage = this.gotoPage.bind(this);
    this.state = {
      isLoading: true,
      isError: false,
      hotNews: [],
    };
  }

  componentDidMount() {
    this.getHotNews();
  }

  getHotNews() {
    this.setState({
      isLoading: true,
    });

    const content_category = 'movie_express';
    const content_type = '';
    const feature = 1;
    const top = 0;
    const valid = 1;
    const page = 1;
    const page_size = 6;

    articleAPI
      .articleNews(content_category, content_type, valid, page, page_size, top, feature)
      .then(result => {
        this.setState({
          hotNews: result.result.list,
          isLoading: false,
        });
      })
      .catch(() => {
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

  render() {
    const { isLoading, hotNews, isError } = this.state;
    const { textPage } = this.props;
    if (isLoading) {
      return (
        <HotNewsWrapper isLoading={isLoading}>
          <div className="wrapper">
            <div className="titlebox">
              <div className="title">熱門文章</div>
            </div>

            <div className="newsbox">
              <div className="photo" />
              <div className="title" />
              <div className="name_pic" />
              <div className="name" />
              <div className="name" />
            </div>

            <div className="newsbox">
              <div className="photo" />
              <div className="title" />
              <div className="name_pic" />
              <div className="name" />
              <div className="name" />
            </div>

            <div className="newsbox">
              <div className="photo" />
              <div className="title" />
              <div className="name_pic" />
              <div className="name" />
              <div className="name" />
            </div>

            <div className="newsbox">
              <div className="photo" />
              <div className="title" />
              <div className="name_pic" />
              <div className="name" />
              <div className="name" />
            </div>

            <div className="newsbox">
              <div className="photo" />
              <div className="title" />
              <div className="name_pic" />
              <div className="name" />
              <div className="name" />
            </div>
          </div>
        </HotNewsWrapper>
      );
    }
    if (hotNews) {
      return (
        <HotNewsWrapper isLoading={isLoading} textPage={textPage} className={this.props.className}>
          <div className="wrapper">
            <div className="titlebox">
              <div className="title">熱門文章</div>
            </div>

            {hotNews.map((item, index) => {
              const { content_title, created_time, content_id, first_image, author } = item;

              const time = timeFormat.newsDate(created_time);

              return (
                <div className="newsbox" key={index} onClick={() => this.gotoPage(content_id)}>
                  <div className="photo" style={{ backgroundImage: `url(${first_image})` }} />
                  <div className="title" title={content_title}>
                    {content_title}
                  </div>
                  <div
                    className="name_pic"
                    style={{
                      backgroundImage: `url(https://img.ezding.com.tw/photos/mymovie/act/${author.author_photo})`,
                    }}
                  />
                  <div className="name">{author.author_name}</div>
                  <div className="name">{time}</div>
                </div>
              );
            })}
          </div>
          <Clearfix />
        </HotNewsWrapper>
      );
    }
    if (isError) {
      return (
        <HotNewsWrapper isLoading={isLoading}>
          <div className="wrapper">
            <div className="titlebox">
              <div className="title">熱門文章</div>
            </div>

            <div className="newsbox">
              <div className="photo" />
              <div className="title" />
              <div className="name_pic" />
              <div className="name" />
              <div className="name" />
            </div>
          </div>
        </HotNewsWrapper>
      );
    }
  }
}

export default ArticleHotNews;
