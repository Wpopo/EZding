import React from 'react';
import 'isomorphic-unfetch';
import Router from 'next/router';
import HeadMeta from '../components/headMeta';
import Navbar from '../components/common/navbar';
import ArticleTextPage from '../components/article/articleTextPage';
import CinemaEntry from '../components/common/cinemaEntry';
import Footer from '../components/common/footer';

class Article extends React.Component {
  static async getInitialProps({ query, req, res }) {
    const checkId = parseInt(query.content_id, 10);
    if (!isNaN(checkId)) {
      const global1 = Object.assign({}, global.window);
      const global2 = Object.assign({}, global1.location);
      const baseUrl = req ? `${req.protocol}://${req.headers.host}` : global2.origin;

      const response = await fetch(`${baseUrl}/new_ezding/contents/${query.content_id}`);
      const data = await response.json();

      if (!data.result) {
        res.redirect(`${baseUrl}/repairPage`);
      } else {
        return {
          content: data,
        };
      }
    }
    res.redirect('/');
  }

  constructor(props) {
    super(props);

    this.scrollToTop = this.scrollToTop.bind(this);

    this.state = {
      content: this.props.content,
      visible: true,
      isError: false,
      isShow: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.content !== this.state.content) {
      this.setState(
        {
          content: nextProps.content,
        },
        () => {
          this.scrollToTop(1);
        },
      );
    }
  }

  scrollToTop(scrollDuration) {
    const scrollStep = -window.scrollY / (scrollDuration / 15);
    var scrollInterval = setInterval(() => {
      if (window.scrollY != 0) {
        window.scrollBy(0, scrollStep);
      } else clearInterval(scrollInterval);
    }, 15);
  }

  componentDidMount() {
    this.scrollToTop(1);
    Router.onRouteChangeStart = url => {
      this.setState({
        visible: true,
      });
    };
    Router.onRouteChangeComplete = url => {
      this.setState({
        visible: false,
      });
    };

    if (Router.router.query.device !== 'app') {
      this.setState({
        isShow: true,
      });
    }
  }

  render() {
    return (
      <div>
        <HeadMeta articlePage articleInfo={this.props.content} />
        {this.state.isShow ? <Navbar url={this.props.url} /> : null}
        <ArticleTextPage content={this.state.content} isApp={!this.state.isShow} />
        {this.state.isShow ? <CinemaEntry /> : null}
        {this.state.isShow ? <Footer /> : null}
      </div>
    );
  }
}

export default Article;
