import styled, { css, keyframes } from 'styled-components';

const sizes = {
  desktop: 1919,
  tablet: 1100,
  pad: 767,
  phone: 630,
};

const media = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (max-width: ${sizes[label] / 16}em) {
      ${css(...args)}
    }
  `;

  return acc;
}, {});

const Shake = keyframes`
  25% {
    margin-top:-10px;
    margin-left:-10px;
  }
  50% {
    margin-top:10px;
    margin-left:10px;
  }
  75% {
    margin-top:20px;
    margin-left:15px;
  }
  100% {
    margin-top:7px;
    margin-left:7px;
  }
`;

const move = keyframes`
  0% {
    top: -5%;
  }
  100% {
    top: 10%;
  }
`;

export const BonusWrapper = styled.div`
  padding-top: 80px;
  background-color: #3d3d3d;
  height: 3565px;

  .title {
    font-size: 60px;
    font-weight: 600;
    color: #333333;
    z-index: 5;
    .small {
      font-size: 42px;
    }
  }

  .title_bg {
    position: absolute;
    height: 54px;
    border-radius: 27px;

    &.sm {
      height: 42px;
    }
  }

  .header {
    background: url(/static/bonusContents/header.png) no-repeat center center;
    background-size: cover;
    height: 884px;

    .banner {
      background: url(/static/bonusContents/banner.png) no-repeat center center;
      background-size: contain;
      position: absolute;
      width: 629px;
      height: 478px;
      top: 163px;
      left: calc(50% - 296px);
    }
    .left_logo {
      background: url(/static/bonusContents/left_logo.png) no-repeat center center;
      background-size: contain;
      position: absolute;
      width: 244px;
      height: 209px;
      top: 542px;
      left: calc(50% - 112px - 300px);
      z-index: 5;
    }
    .right_logo {
      background: url(/static/bonusContents/right_logo.png) no-repeat center center;
      background-size: contain;
      position: absolute;
      width: 269px;
      height: 623px;
      top: 103px;
      left: calc(50% - 134px + 400px);
      z-index: 5;
    }
    .search {
      background: url(/static/bonusContents/search.png) no-repeat center center;
      background-size: contain;
      position: absolute;
      width: 60px;
      height: 60px;
      top: 720px;
      left: calc(50% - 30px + 450px);
      z-index: 5;
      cursor: pointer;
    }
  }
  .content_buy {
    background: url(/static/bonusContents/content_buy.png) no-repeat;
    background-size: cover;
    height: 1500px;
    width: 100%;
    position: absolute;
    top: 630px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .title {
      padding-top: 282px;
    }
    .title_bg {
      background-color: #b0c5d9;
      width: 644px;
      margin-top: 322px;
    }

    .xs {
      display:none;
    }
    
    .content {
      margin-top: 74px;
      display: flex;
      justify-content: space-around;
      width: 100%;
      max-width: 850px;

      .box {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;

        .box_body {
          display: flex;
          align-items: center;
          flex-direction: column;
        }
        .box_title {
          display: flex;
          font-size: 24px;
        }
        .icon {
          background-size: cover !important;
          width: 60px;
          height: 60px;
          margin-right: 10px;
        }
        .img {
          background-size: cover !important;
          margin-top: 47px;
        }

        .desc {
          margin-top: 20px;
          font-size: 20px;
          font-weight: 500;
          text-align: center;
        }
      }
      .box1 {
        .icon {
          background: url(/static/bonusContents/icon_1.png) no-repeat center center;
        }
        .img {
          background: url(/static/bonusContents/buy_1.png) no-repeat center center;
          width: 202px;
          height: 408px;
        }
      }
      .box2 {
        .icon {
          background: url(/static/bonusContents/icon_2.png) no-repeat center center;
        }
        .img {
          background: url(/static/bonusContents/buy_2.png) no-repeat center center;
          width: 259px;
          height: 375px;
        }
      }
      .box3 {
        .icon {
          background: url(/static/bonusContents/icon_3.png) no-repeat center center;
        }
        .img {
          background: url(/static/bonusContents/buy_3.png) no-repeat center center;
          width: 218px;
          height: 400px;
        }
      }
    }
  }
  .content_QA {
    background: url(/static/bonusContents/content_QA.png) no-repeat;
    background-size: cover;
    height: 1200px;
    width: 100%;
    position: absolute;
    top: 1730px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .title {
      padding-top: 282px;
    }

    .title_bg {
      background-color: #d1f5e8;
      width: 400px;
      margin-top: 322px;
    }

    .content {
      width: 100%;
      max-width: 800px;
      display: flex;
      flex-direction: column;
      align-items: center;

      .box {
        display: flex;
        align-items: center;
        margin-top: 50px;

        .icon {
          background-size: cover !important;
          margin-right: 20px;
        }

        .main {
          font-size: 28px;
          font-weight: 500;
        }

        .sub {
          font-size: 22px;
          padding-top: 10px;
          display: inline-block;
          border-bottom: 2.8px solid #dc018e;
          padding-bottom: 1px;
        }
        .desc {
          font-size: 18px;
          padding-top: 10px;
        }
      }
      .box1 {
        .icon {
          background: url(/static/bonusContents/QA_1.png) no-repeat center center;
          width: 192px;
          height: 220px;
        }
      }
      .box2 {
        margin-left: 150px;
        .icon {
          background: url(/static/bonusContents/QA_2.png) no-repeat center center;
          width: 217px;
          height: 170px;
        }
      }
      .box3 {
        margin-left: -70px;
        .icon {
          background: url(/static/bonusContents/QA_3.png) no-repeat center center;
          width: 181px;
          height: 179px;
        }
      }
    }
  }
  .footer {
    position: absolute;
    top: 2930px;
    background-color: #1a1a1a;
    color: #ffffff;
    height: 716px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    .title {
      margin-top: 54px;
      color: #ffffff;
    }

    .title_bg {
      background-color: #328266;
      width: 275px;
      height: 35px;
      margin-top: 100px;
    }

    .notice {
      max-width: 700px;
      width: 95%;
      padding-top: 40px;

      li {
        width: calc(100% - 2.2em);
        list-style: none;
        position: relative;
        padding-top: 2px;
        margin-left: 1em;
        left: 1.2em;
        counter-increment: list;
      }
      li:before {
        content: counter(list) '.';
        position: absolute;
        left: -1.2em;
      }
    }
  }

  ${media.tablet`
  .header {
    .banner {
      width: 503px;
      height: 382px;
      left: calc(50% - 251px);
    }
    .left_logo {
      width: 195px;
      height: 167px;
      top: 542px;
      left: calc(50% - 112px - 250px);
    }
    .right_logo {
      width: 215px;
      height: 498px;
      top: 140px;
      left: calc(50% - 107px + 265px);
    }
    .search {
      top: 650px;
      left: calc(50% - 30px + 317px);
    }
  }
  .content_buy {
    .content {
      .box {
        .box_title {
          font-size: 22px;
        }
        .desc {
          font-size: 18px;
        }
      }
      .box1 {
        .img {
          width: 161px;
          height: 326px;
        }
      }
      .box2 {
        .img {
          width: 207px;
          height: 300px;
        }
      }
      .box3 {
        .img {
          width: 174px;
          height: 320px;
        }
      }
    }
  }
  `}

  ${media.pad`
  height: 2603px; 

  .title {
    font-size: 44px;
    .small {
      font-size: 42px;
    }
  }

  .title_bg {
    height: 41px;

    &.sm {
      height: 26px;
    }
  }
  
  .header {
    height: 350px;

    .banner {
      width: 479px;
      height: 384px;
      left: calc(50% - 239px);
      top: 95px;
    }
    .left_logo {
      width: 185px;
      height: 159px;
      top: 440px;
      left: calc(50% - 92px - 180px);
    }
    .right_logo {
      width: 198px;
      height: 474px;
      top: 75px;
      left: calc(50% - 99px + 200px);
    }
    .search {
      top: 550px;
      left: calc(50% - 30px + 250px);
    }
  }
  .content_buy {
    top: 530px;
    height: 1000px;

    .title {
      padding-top: 160px;
    }

    .title_bg {
      width: 480px;
      margin-top: 190px;
    }
    
    .content {
      .box {
        .box_title {
          font-size: 18px;
        }
        .desc {
          font-size: 14px;
        }
        .icon {
          width: 50px;
          height: 50px;
        }
        .img {
          margin-top: 30px;
        }
      }

      .box1 {
        .img {
          width: 161px;
          height: 326px;
        }
      }
      .box2 {
        .img {
          width: 207px;
          height: 300px;
        }
      }
      .box3 {
        .img {
          width: 174px;
          height: 320px;
        }
      }
    }
  }
  .content_QA {
    top: 1340px;
    height: 800px;

    .title {
      padding-top: 130px;
    }

    .title_bg {
      width: 304px;
      margin-top: 160px;
    }

    .content {
      max-width: 760px;

      .box {
        margin-top: 30px;

        .icon {
          margin-right: 10px;
        }

        .main {
          font-size: 20px;
        }

        .sub {
          font-size: 16px;
          padding-top: 8px;
          border-bottom: 2.1px solid #dc018e;
        }
        .desc {
          font-size: 12px;
          padding-top: 8px;
        }
      }
      .box1 {
        .icon {
          background: url(/static/bonusContents/QA_1.png) no-repeat center center;
          width: 139px;
          height: 160px;
        }
      }
      .box2 {
        margin-left: 150px;
        .icon {
          background: url(/static/bonusContents/QA_2.png) no-repeat center center;
          width: 161px;
          height: 125px;
        }
      }
      .box3 {
        margin-left: -70px;
        .icon {
          background: url(/static/bonusContents/QA_3.png) no-repeat center center;
          width: 146px;
          height: 145px;
        }
      }
    }
  }
  .footer {
    top: 2140px;
    height: 543px;

    .title {
      margin-top: 42px;
    }

    .title_bg {
      width: 209px;
      height: 26px;
      margin-top: 74px;
    }

    .notice {
      width: 90%;
      font-size:12px;
    }
  }
  `}
  ${media.phone`
  height: 3958px; 

  .title {
    font-size: 32px;
    .small {
      font-size: 22px;
    }
  }

  .title_bg {
    height: 24px;

    &.sm {
      height: 21px;
    }
  }
  
  .header {
    height: 500px;

    .banner {
      width: 288px;
      left: calc(50% - 144px);
      top: 40px;
    }
    .left_logo {
      width: 120px;
      height: 102px;
      top: 350px;
      left: calc(50% - 60px - 80px);
    }
    .right_logo {
      width: 123px;
      height: 238px;
      top: 350px;
      left: calc(50% - 61px + 85px);
    }
    .search {
      top: 615px;
      left: calc(50% - 30px + 120px);
    }
  }
  .content_buy {
    top: 600px;
    height: 1900px;

    .lg {
      display: none;
    }

    .xs {
      display: block;
    }

    .title_1 {
      padding-top: 110px;
    }

    .title_bg_1 {
      width: 145px;
      margin-top: 130px;
    }

    .title_2 {
      padding-top: 0px;
    }

    .title_bg_2 {
      width: 195px;
      margin-top: 175px;
    }
    
    .content {
      flex-direction: column;

      .box {
        padding-bottom: 30px;
      }
    }
  }
  .content_QA {
    top: 2340px;
    height: 1100px;

    .title {
      padding-top: 130px;
    }

    .title_bg {
      width: 240px;
      margin-top: 160px;
    }

    .content {

      .box {
        margin-top: 30px;
        flex-direction: column;

        .icon {
          margin-right: 10px;
        }

        .main {
          font-size: 20px;
        }

        .sub {
          font-size: 16px;
          padding-top: 8px;
          border-bottom: 2.1px solid #dc018e;
        }
        .desc {
          font-size: 12px;
          padding-top: 8px;
        }
      }
      .box1,.box2,.box3 {
        margin-left: 0px!important;
      }
    }
  }
  .footer {
    top: 3440px;
    height: 600px;

    .title_bg {
      margin-top: 62px;
    }

    .notice {
      width: 90%;
      font-size:12px;
    }
  }
  `}
`;
