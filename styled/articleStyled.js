import styled, { css } from 'styled-components';
import { WrapperSample, WrapperSampleNoContent } from './commonStyled';

const sizes = {
  desktop: 1024,
  tablet: 992,
  phone: 768,
  hotNewsL: 657,
  hotNews: 600,
  phone414: 414,
  xphone: 375,
};

const media = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (max-width: ${sizes[label] / 16}em) {
      ${css(...args)}
    }
  `;

  return acc;
}, {});

export const Clearfix = styled.div`
  clear: both;
`;

export const ArticleWrapper = styled(WrapperSample)`
  padding-top: 130px;
  background-color: #404040;
  position: relative;
  font-family: system, -apple-system, BlinkMacSystemFont, 'PingFang SC', Microsoft JhengHei, Helvetica, Arial,
    sans-serif;

  ${media.tablet`padding-top:100px;`};
  .selectWrapper {
    max-width: 1080px;
    width: 90%;
    margin: auto;
    position: relative;
    ${media.tablet`float:right;`};
    ${media.hotNews`bottom:-50px;float:none;`};
  }
  .select {
    width: 73%;
    float: left;
    position: absolute;
    bottom: -85px;
    z-index: 2;

    ${media.desktop`width:100%;`};
    ${media.hotNews`width:90%;float:none;left:50%;transform:translateX(-50%);`};
    .options {
      float: right;
      display: flex;
      justify-content: space-between;
      margin: 10px 3% 10px 0;

      ${media.tablet`margin:10px 5% 10px 0;`};
      ${media.hotNews`float:none;width:100%;`};

      .option {
        width: 63px;
        height: 25px;
        border-radius: 19.8px;
        background-color: #404040;
        color: #9e9e9e;
        font-size: 14px;
        text-align: center;
        font-weight: 200;
        line-height: 25px;
        margin-left: 10px;
        cursor: pointer;

        ${media.hotNews`margin-left:0px;`};
      }

      .checked {
        background-color: #2b2b2b;
        color: #fff;
      }
    }
  }

  .wrapper {
    width: 90%;
    max-width: 1110px;
    background-color: #404040;
    float: left;
    position: relative;
    left: 50%;
    transform: translateX(-50%);

    .adrwd {
      width: 300px;
      height: 250px;
      background: #9e9e9e no-repeat 50% 50% / cover;
      display: none;
      margin: 50px 0 30px;
      float: left;
      position: relative;
      left: 50%;
      transform: translateX(-50%);
      cursor: pointer;

      ${media.desktop`display:block;`};
    }
  }
  .bannerWrapper {
    width: 90%;
    max-width: 1110px;
    margin: auto;

    .banner {
      width: 70%;
      height: 250px;
      float: left;

      ${media.desktop`width:100%;`};

      .bannerbox {
        position: relative;
        height: 250px;
        background: #303030 no-repeat 50% 50% / cover;
        cursor: pointer;

        .background {
          position: absolute;
          bottom: 0;
          background-image: linear-gradient(180deg, transparent, rgba(0, 0, 0, 0.8));
          width: 100%;
          height: 177px;

          .title {
            text-align: left;
            width: 80%;
            margin: 70px 0 0 50px;
            color: #fff;
            font-size: 24px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            font-family: system, -apple-system, BlinkMacSystemFont, 'PingFang SC', Microsoft JhengHei, Helvetica, Arial,
              sans-serif;

            ${media.tablet`font-size:18px;`};
            ${media.xphone`margin:70px 0 0 30px;`};
          }
          .img {
            width: 30px;
            height: 30px;
            float: left;
            margin: 10px 0 0 50px;
            background: #e7008c no-repeat 50% 50% / cover;
            border-radius: 50%;
            ${media.xphone`margin:10px 0 0 30px;`};
          }
          .name {
            font-size: 14px;
            color: #fff;
            opacity: 0.8;
            margin: 10px 0 0 10px;
            float: left;
            height: 30px;
            line-height: 30px;
          }
          .eval {
            float: right;
            width: 43px;
            padding: 1;
            border-radius: 120px;
            margin: 10px 30px 10px 0;
            background-color: rgb(95, 71, 266);
            color: #fff;
            font-size: 12px;
            text-align: center;
          }
        }
      }
      .slick-dots {
        margin: -10px 0;
      }
      .slick-dots li button {
        &::before {
          color: #2b2b2b;
          font-size: 13px;
          opacity: 1;
        }
      }
      .slick-dots .slick-active button {
        &::before {
          color: #e7008c;
        }
      }
    }
    .ad {
      max-width: 300px;
      width: 28%;
      height: 250px;
      background: #9e9e9e no-repeat 50% 50% / cover;
      float: left;
      margin-left: 2%;
      cursor: pointer;

      ${media.desktop`display:none;`};
    }
  }

  .pages {
    background: #404040;
    margin-bottom: 30px;
    float: left;
  }

  .flex {
    display: flex;
    flex-wrap: wrap;
    ${media.desktop`flex-flow: column wrap;`};
  }

  .flex-Pages {
    width: 70%;
    ${media.desktop`width:100%;order:0;`};
  }

  .flex-HotNews {
    width: 30%;
    padding-left: 15px;

    ${media.desktop`width:100%;padding: 0 3%;order:3;`};
  }

  .flex-Pages-controls {
    width: 100%;
    flex: 1 0 auto;
    ${media.desktop`margin: 0 3%;order:1;`};
  }

  .adrwd {
    ${media.desktop`order:2;`};
  }
`;

export const ArticlePagesWrapper = styled(WrapperSample)`
  width: 70%;
  float: left;
  background-color: #404040;
  margin-top: 40px;
  font-family: system, -apple-system, BlinkMacSystemFont, 'PingFang SC', Microsoft JhengHei, Helvetica, Arial,
    sans-serif;

  ${media.desktop`width:100%`};

  .wrapper {
    width: 100%;
    display: flex;
    align-content: flex-start;
    justify-content: space-between;
    flex-wrap: wrap;

    .titlebox {
      width: 100%;
      height: 46px;
      border-bottom: 1px solid #fff;
      margin-bottom: 20px;

      ${media.tablet`width:100%`};
      ${media.hotNews`margin-bottom:60px;`};

      .title {
        width: 100px;
        height: 45px;
        line-height: 40px;
        color: #fff;
        text-align: left;
        font-size: 16px;
        border-bottom: 4px solid #e7008c;
        float: left;
      }
    }
    .emptybox {
      ${media.tablet`display:none;`}
    }
    .newsbox {
      width: 32%;
      height: 360px;
      float: left;
      margin: 0px 0px 15px;
      overflow: hidden;
      font-weight: normal;

      ${media.desktop`width:32%;margin:0px 0px 10px;`};
      ${media.tablet`width:32%;margin:0px 0px 10px;`};
      ${media.phone`width:48%;margin:0px 0px 10px;height:380px;`};
      ${media.phone414`width:100%;margin:0px 0px 10px;height:360px;`};
      ${media.xphone`width:100%;margin:0px 0px 10px;height:360px;`};

      &:hover .photo {
        transform: scale(1.1);
        -webkit-transform: scale(1.1);
      }
      .photoBox {
        width: 100%;
        height: 180px;
        overflow: hidden;
      }
      .photo {
        width: 100%;
        height: 100%;
        background: #303030 no-repeat 50% 50% / cover;
        transition: 0.5s;
      }
      .title {
        width: 100%;
        color: #fff;
        text-align: left;
        margin: 5px 0;
        height: 50px;
        font-size: 18px;
        cursor: pointer;

        // for 標題字數顯示兩行
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;

        &:hover {
          color: #e7008c;
          ${media.phone`color:#fff;`};
          ${media.xphone`color:#fff;`}
        }
      }
      .rwd768Title {
        display: none;
        ${media.phone`display:block;font-size:18px;`}
        ${media.xphone`display:none;`}
      }
      .rwd320Title {
        display: none;
        ${media.xphone`display:block;font-size:18px;`}
      }
      .name_pic {
        width: 35px;
        height: 35px;
        background: #303030 no-repeat 50% 50% / cover;
        float: left;
        margin-right: 5px;
        border-radius: 50%;
      }
      .name {
        width: 40%;
        height: 35px;
        float: left;

        div {
          font-size: 11px;
          text-align: left;
          color: #dcdcdc;
          width: 100%;
          height: 50%;
          font-weight: 200;
          background-color: ${props => (props.isLoading ? '#303030' : 'transparent')};
        }
      }
      .event {
        float: right;
        height: 21px;
        margin: 8px 0px;
      }
      .eval {
        background-color: rgb(95, 71, 226);
        width: 36px;
        padding: 1px;
        font-size: 10px;
        color: #fff;
        border-radius: 120px;
        float: right;
        margin: 10px 2px;
      }
      .text {
        font-size: 16px;
        color: #9e9e9e;
        width: 100%;
        float: left;
        text-align: left;
        line-height: 1.5;
        margin-top: 8px;

        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
      }
    }

    .pages {
      height: 50px;
      float: left;
      width: 100%;
      margin-top: 20px;
      position: relative;

      .box {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);

        .page {
          width: 35px;
          height: 35px;
          color: #fff;
          background-color: #9e9e9e;
          cursor: pointer;
          line-height: 35px;
          font-weight: 700;
          float: left;

          &:hover {
            background-color: #e7008c;
          }
        }
      }
      .box div:nth-child(1) {
        background-color: ${props => (props.pagesIndex === 1 ? '#e7008c' : '#9e9e9e')};
      }
      .box div:nth-child(2) {
        background-color: ${props => (props.pagesIndex === 1 ? '#9e9e9e' : '#e7008c')};
      }
    }

    .allpages {
      color: #7c7c7c;
      height: 50px;
      font-size: 0.75rem;
      font-weight: 500;
      float: left;
      position: relative;
      left: 50%;
      transform: translateX(-50%);

      span {
        color: #e7008c;
        margin: 0 5px;
        font-weight: 700;
        font-size: 0.8rem;
        letter-spacing: 1px;
      }
    }
  }
`;

export const HotNewsWrapper = styled(WrapperSampleNoContent)`
  width: 30%;
  float: left;
  padding-left: 15px;
  margin-top: ${props => (props.textPage ? '0' : '25px')};
  background-color: #404040;
  box-sizing: border-box;
  font-family: system, -apple-system, BlinkMacSystemFont, 'PingFang SC', Microsoft JhengHei, Helvetica, Arial,
    sans-serif;

  ${media.desktop`width:100%;padding:0 3%;`};

  .wrapper {
    max-width: ${props => (props.textPage ? '300px' : '300px')};
    width: 100%;
    float: left;
    margin-bottom: 100px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    ${media.desktop`
			max-width:100%;
			width:${props => (props.textPage ? '100%' : '100%')};
			margin:${props => (props.textPage ? '0px 0% 50px' : '0 auto 50px')};
		`};

    .titlebox {
      width: 100%;
      height: 61px;
      border-bottom: 1px solid #fff;
      margin-bottom: 20px;

      ${media.desktop`width:100%`};

      .title {
        width: 100px;
        height: 60px;
        line-height: 70px;
        color: #fff;
        text-align: left;
        font-size: 16px;
        border-bottom: 4px solid #e7008c;
        float: left;
      }
    }
    .newsbox {
      width: 100%;
      height: 90px;
      margin-bottom: 10px;
      float: left;

      ${media.desktop`width:48%;margin:10px 0;height:100px;`};
      ${media.phone`width:50%;margin:10px 0;height:100px;`};
      ${media.hotNews`width:100%;margin:10px 0;height:120px;`};

      .photo {
        background: #303030 no-repeat 50% 50% / cover;
        width: 48%;
        height: 100%;
        float: left;
        margin-right: 4%;

        ${media.phone`width:130px;`};
        ${media.hotNews`width:50%;`};
      }
      .title {
        cursor: pointer;
        text-align: left;
        float: left;
        background-color: ${props => (props.isLoading ? '#303030' : 'transparent')};
        color: #fff;
        width: 48%;
        height: 46%;
        font-size: 14px;
        margin-bottom: 4%;
        font-weight: 200;

        // for 標題字數顯示一行
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;

        &:hover {
          color: #e7008c;
          ${media.phone`color:#fff;`};
          ${media.xphone`color:#fff;`}
        }
        ${media.desktop`-webkit-line-clamp: 3;height:55%;margin-bottom:3%;`};
        ${media.phone`width:48%;height:56%;margin-bottom:2%;`};
        ${media.hotNewsL`-webkit-line-clamp: 2;width:43%;height:36%;margin-bottom:2%;`};
        ${media.hotNews`-webkit-line-clamp: 3;height:50%;margin-bottom:6%;`};
      }

      .name_pic {
        width: 35px;
        height: 35px;
        background: #303030 no-repeat 50% 50% / cover;
        float: left;
        margin-right: 5px;
        border-radius: 50%;
      }
      .name {
        font-size: 11px;
        text-align: left;
        color: #9e9e9e;
        float: left;
        width: calc(48% - 40px);
        height: 20%;
        background-color: ${props => (props.isLoading ? '#303030' : 'transparent')};

        ${media.phone`width:30%;height:15%;font-size:9px;`};
        ${media.hotNews`width:30%;`};
      }
    }
  }
`;

export const ArticleTextPageWrapper = styled.div`
  padding-top: 170px;
  width: 70%;
  float: left;
  background-color: #404040;
  min-height: 100vh;

  ${media.tablet`width:100%;padding-top:125px;`};
  ${media.phone`padding-top:100px;`};

  .wrapper {
    max-width: 850px;
    width: 100%;
    float: right;
    box-sizing: border-box;
    padding: 0 3% 0 0;

    ${media.tablet`float:none;margin:auto;width:100%;padding:0 3%;max-width:100%;`};

    .title {
      margin: 20px auto 30px;
      width: 100%;
      font-size: 36px;
      height: auto;
      color: #fff;
      text-align: left;
      font-weight: normal;

      ${media.phone`font-size:24px;width:100%;`};
      ${media.xphone`font-size:24px;width:100%;margin:10px auto;`};
    }
    .type {
      width: 30px;
      font-size: 12px;
      color: #fff;
      display: inline-block;
      border-right: 1px solid #9e9e9e;
      padding-right: 2px;
      height: 15px;
      line-height: 15px;
      vertical-align: text-bottom;
      margin-top: 10px;
    }
    .authorIcon {
      width: 15px;
      height: 15px;
      margin: 0 2px 0 5px;
      vertical-align: text-bottom;
    }
    .date {
      color: #9e9e9e;
      font-size: 10px;
      display: inline-block;
      height: 15px;
      line-height: 15px;
      vertical-align: text-bottom;
      letter-spacing: 1px;
      margin: 0 5px 0 0;
      padding: 0 10px 0 0;
      text-align: left;
    }
    .boxShareArticle {
      float: right;
      margin-bottom: 5px;
      ${media.tablet`
				float:none;
			`};
    }
    .author {
      color: #9e9e9e;
      font-size: 12px;
      margin: 0 5px 0 0;
      padding: 0 10px 0 0;
      display: inline-block;
      height: 15px;
      line-height: 15px;
      vertical-align: text-bottom;
      border-right: 1px solid #9e9e9e;
      text-align: left;
    }
    .text {
      margin-top: 10px;
      color: #fff;
      width: 100%;
      font-size: 16px;
      font-weight: normal;
      line-height: 1.5;

      p,
      div,
      iframe {
        width: 100%;
      }
      a {
        color: #fff;
        text-decoration: none;

        &:hover {
          color: #e7008c;
        }
      }
      img {
        width: 100% !important;
        height: auto !important;
      }
    }
    .tags {
      width: 100%;
      padding-bottom: 40px;
      border-bottom: 1px solid #979797;

      .tag_title {
        display: inline-block;
        color: #fff;
        font-weight: 500;
        margin: 1%;
        width: 7%;
        height: 100%;
        vertical-align: text-top;
        font-size: 18px;

        ${media.phone`font-size:18px;height:40px;line-height:40px;width:100%;text-align:center;margin:0;`};
      }
      .box {
        width: 90%;
        display: inline-block;
        vertical-align: text-top;

        ${media.phone`width:100%;`};

        .tag {
          display: inline-block;
          color: #fff;
          height: 25px;
          line-height: 25px;
          border: 1px solid #fff;
          margin: 5px;
          font-size: 14px;
          padding: 1px 5px;

          ${media.phone`font-size:11px;`};
        }
      }
    }
    .prev,
    .next {
      height: 100px;
      width: 50%;
      padding-bottom: 40px;
      border-bottom: 1px solid #979797;
      float: left;
      position: relative;
      margin-bottom: 30px;
      transition: 0.3s;

      ${media.phone`width:100%;border-bottom:none;height:70px;`};

      .page {
        text-align: center;
        font-size: 12px;
        width: 80px;
        height: 60px;
        float: left;
        color: #9e9e9e;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
      }
      .icon {
        width: 100%;
        text-align: center;
        color: #fff;
        font-size: 12px;
        height: 20px;
        margin: 10px 0;
        float: left;
      }
      .right {
        margin: 5px 0 0 5px;
      }
      .page_title {
        text-align: center;
        color: #fff;
        font-size: 16px;
        font-weight: 300;
        width: 60%;
        left: 100px;
        cursor: pointer;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);

        &:hover {
          color: #e7008c;
          ${media.phone`color:#fff`};
        }
      }
    }
    .next {
      .page_title {
        left: initial;
        right: 100px;
      }
      .page {
        left: initial;
        right: 0;
      }
      .icon {
        margin: 10px 0;
      }
    }
    .ad-wrapper {
      display: none;
      width: 100%;
      background-color: #2b2b2b;
      height: 150px;
      box-sizing: border-box;
      padding: 30px 50px;
      justify-content: space-between;

      ${media.tablet`display:flex;margin-bottom:20px;`};
      ${media.phone`display:flex;margin-bottom:20px;flex-direction:column;height:auto;`};

      .photo {
        width: 60px;
        height: 60px;
        background: #eee no-repeat 50% 50% / cover;
        border-radius: 50%;
        position: relative;
        margin: auto;
        text-align: center;

        ${media.phone`margin-bottom:50px;`};

        .name {
          width: 60px;
          height: 20px;
          margin: 10px 0 0;
          font-size: 14px;
          color: #d8d8d8;
          font-weight: 500;
          position: absolute;
          bottom: -30px;
          text-align: center;

          ${media.phone`font-size:18px;color:#fff;`};
          ${media.xphone`font-size:18px;color:#fff;width:140px;left:-40px;`};
        }
      }

      .desc {
        width: 83%;
        font-size: 14px;
        letter-spacing: 1px;
        line-height: 1.2;
        color: #fff;
        margin-left: 5%;

        ${media.phone`text-align:center;width:100%;margin-left:0;word-wrap:break-word;`};
      }
    }
  }
`;

export const ArticleTextPageRight = styled.div`
  padding-top: 170px;
  width: 30%;
  float: left;
  background-color: #404040;
  font-family: system, -apple-system, BlinkMacSystemFont, 'PingFang SC', Microsoft JhengHei, Helvetica, Arial,
    sans-serif;

  ${media.tablet`
    padding-top: 0px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  `};

  .wrapper {
    max-width: 300px;
    width: 100%;
    float: left;

    .ad {
      width: 100%;
      height: 250px;
      background: #9e9e9e no-repeat 50% 50% / cover;
      float: left;
      cursor: pointer;
    }
    .ad2 {
      ${media.tablet`display:none;`};
      width: 100%;
      float: left;
      background-color: #2b2b2b;
      margin: 10px 0;
      box-sizing: border-box;

      .photo {
        position: relative;
        left: 50%;
        transform: translateX(-50%);
        margin-top: 50px;
        width: 100px;
        height: 100px;
        background: #9e9e9e no-repeat 50% 50% / cover;
        border-radius: 50%;
        border: 2px solid #e7008c;
      }
      .name {
        width: 85%;
        text-align: center;
        color: #fff;
        margin: 20px auto;
        font-size: 16px;

        .text {
          margin-top: 40px;
          padding-bottom: 35px;
          font-size: 14px;
        }
      }
    }
  }
`;

export const ArticleBackGround = styled.div`
  background-color: #404040;
  min-height: 100vh;

  .bgForShareArticleWeb {
    z-index: 1;
    height: 50px;
    width: 100%;
    position: fixed;
    bottom: 0px;
    background-color: rgba(0, 0, 0, 0.7);

    ${media.tablet`
			display: none;
		`}

    .shareBox {
      width: 200px;
      padding-left: 65px;
      padding-top: 9px;

      ${media.tablet`
				display: none;
			`}
    }
  }

  .bgForShareArticleMobile {
    display: none;

    ${media.tablet`
			display: block;
			height: 61px;
			width: 100%;
			position: fixed;
			bottom: 0px;
			background-color: #000000;
			z-index: 1;
		`}
  }
`;
