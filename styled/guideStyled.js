import styled, { css } from 'styled-components';

const sizes = {
  desktop: 1980,
  tablet: 1080,
  phone: 768,
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

export const GuideWrapper = styled.div`
  width: 100%;
  background-color: #404040;
  height: auto;

  .wrapper {
    width: 1080px;
    margin: auto;
    text-align: center;
    height: 500px;
    line-height: 500px;
    cursor: pointer;
    color: #fff;
    font-size: 50px;
  }
`;

export const GuideTitleWrapper = styled.div`
  width:100%;

  .guideTitleWrap{
      width: 100%;
      height: 590px;
      background-image: url("../../static/guide/title-bg.png");
      background-size: cover;
      background-position: center;
      display: flex;
      justify-content: center;
      align-items: flex-end;

      ${media.tablet`
        height: 60vw;
        `}

      ${media.phone`
          width: 100vw;
            height: auto;
            display: block;
        padding-top: 16vw;
        background-size: cover;
            background-image: url("../../static/guide/title-bg-phone.png");
        padding-bottom: 1vw;
      `}
    }

  .leftTitle{
      width: 370px;
      position: relative;
      margin-bottom: 55px;

    ${media.tablet`
      width: 63vw;
        margin-bottom: 4vw;
    `}

    ${media.phone`
      width: 100vw;
          margin-bottom: 18vw;
          padding-top: 5vw;
    `}
    ${media.xphone`
          padding-top: 8vw;
    `}
  }

  .rightTitle{
      width: 370px;
      position: relative;
      margin-bottom: 60px;

    ${media.tablet`
      width: 40vw;
          margin-bottom: 5vw;
    `}

    ${media.phone`
      width: 100vw;
          margin-bottom: 5vw;
    `}
  }

  .leftTitleWord{
      background-image: url("../../static/guide/left-title.png");
      background-size: cover;
      width: 370px;
      height: 320px;
      margin: auto;

    ${media.tablet`
      width: 37vw;
      height: 32vw;
    `}

    ${media.phone`
      width: 83vw;
      height: 72vw;
    `}
  }

  .rightTitleWord{
      background-image: url("../../static/guide/right-title.png");
      background-size: cover;
      width: 370px;
      height: 295px;
      margin-bottom: 42px;

    ${media.tablet`
      width: 35vw;
          height: 33vw;
          margin-bottom: 0px;
    `}

    ${media.phone`
      width: 70vw;
          height: 70vw;
          margin: 0 auto;
    `}
  }

  .middleGift{
      background-image: url("../../static/guide/gift.svg");
      width: 219px;
      height: 356px;

    ${media.tablet`
      background-size: cover;
          width: 33vw;
          height: 36vw;
    `}

    ${media.phone`
      display: none;
    `}
  }

  .rightTriangleSec{
    width: 160px;
    position: relative;
    padding-left: 80px;

    ${media.tablet`
      width: 101px;
      padding-left: 11vw;
    `}

    ${media.phone`
      padding-left: 0;
      margin: 0 auto;
      width: 30vw;
    `}

    .righttriangleImg{
      display: block;
      margin: 0 auto;
      cursor: pointer;

      ${media.tablet`
        width: 13vw;
      `}

      ${media.phone`
        width: 33vw;
            height: 17vw;
            right: 19vw;
      `}
    }

    .rightTriangleWord{
      position: absolute;
      top: 8px;
      width: 36px;
      color: #ffffff;
      left: 146px;
      line-height: 1.3;
      cursor: pointer;

      ${media.tablet`
        position: absolute;
        top: .8vw;
        left: 16vw;
        font-size: 1.7vw;
        width: 4vw;
      `}

      ${media.phone`
            left: 13vw;
            font-size: 4vw;
            width: 10vw;
      `}
    }
  }



  .leftTriangleSec{
    width: 160px;
    position: relative;
    padding-left: 150px;

    ${media.tablet`
      width: 20vw;
      padding-left: 13vw;
    `}

    ${media.phone`
      width: 35vw;
        padding-left: 0;
        margin: 0 auto;
    `}

    .lefttriangleImg{
      display: block;
      margin: 0 auto;
      cursor: pointer;

      ${media.tablet`
        width: 13vw;
      `}

      ${media.phone`
        width: 40vw;
            height: 17vw;
            right: 31vw;
            margin-top: 4vw;
      `}
    }

    .lefttriangle{
      position: absolute;
      top: 8px;
      width: 36px;
      color: #ffffff;
      right: 58px;
      line-height: 1.3;
      cursor: pointer;

      ${media.tablet`
        position: absolute;
        top: .8vw;
        right: 7.5vw;
        font-size: 1.7vw;
        width: 4vw;
      `}

      ${media.phone`
            right: 8vw;
            font-size: 4vw;
            width: 10vw;
      `}
    }
  }

  .buttonToDiscount{
      margin-bottom: 80px;

    ${media.phone`
      margin-bottom: 13vw;
    `}
  }


`;

export const GuideDiscountWrapper = styled.div`

    .guideDiscountWrap{
      width: 100%;
      height: 655px;
      background-color: #00a5d0;
      background-image: url("../../static/guide/discount-bg.png");
      background-repeat: repeat;
      background-size: contain;

      ${media.tablet`
        height: 54vw;
        background-size: 45%;
        background-position: -24px -30px;
      `}

      ${media.phone`
        background-image: url("../../static/guide/discount-bg-phone.png");
            background-size: cover;
            height: 300vw;
            width: 100vw;
        padding-bottom: 10vw;
      `}

    }

    .discountList{
      display: flex;
      width: 630px;
      margin: 0 auto;
      align-items: center;

      ${media.tablet`
        display: flex;
            width: 80vw;
      `}

      ${media.phone`
        display: block;
            padding-left: 0vw;
            padding-right: 0vw;
            width: 100vw;
      `}
    }

    .discountTitle{
      display: block;
      width: 388px;
      height: 206px;
      margin: 0 auto;
      margin-bottom: 20px;
      padding-top: 28px;

      ${media.tablet`
        width: 36vw;
            height: 17vw;
            padding-top: 1vw;
            margin-bottom: 1vw;
      `}

      ${media.phone`
        width: 80vw;
            height: 40vw;
            padding-top: 12vw;
            margin-bottom: 10vw;
      `}
    }

    .disBlock{
      width: 910px;
      position: relative;
      display: flex;

      ${media.tablet`
        width: 80vw;
      `}

      ${media.phone`
        width: 42vw;
            display: block;
            height: 73vw;
            border-radius: 21vw;
            margin: 0 auto;
      `}
    }

    .disImg{
      width: 108px;
      height: 108px;
      margin: 0 auto;
      display: block;
      margin-top: 27px;

      ${media.tablet`
        height: 9vw;
            margin-top: 2vw;
      `}

      ${media.phone`
        height: 22vw;
            padding-top: 7vw;
            width: 22vw;
      `}
    }

    .distitle{
      width: 150px;
      font-size: 17.5px;
      font-weight: 700;
      display: block;
      margin: 0 auto;
      margin-top: 10px;

      ${media.tablet`
        font-size: 1.8vw;
            width: 17vw;
      `}

      ${media.phone`
        font-size: 4vw;
            width: 33vw;
      `}

      ${media.xphone`
        font-size: 3.5vw;
            width: 39vw;
      `}
    }

    .distitle a{
      color: rgba(0,0,0,.8);
      display: block;
      text-align: center;

      ${media.tablet`
        color: rgba(0,0,0,.8);
            display: block;
            text-align: center;
      `}

      ${media.phone`
        color: rgba(0,0,0,.8);
            display: block;
            text-align: center;
      `}
    }

    .disSec{
      width: 184px;
      height: 330px;
      border-radius: 91.9px;
      background-color: #ffffff;
      margin-right: 39px;

      ${media.tablet`
        width: 17vw;
            height: 30vw;
            margin-right: 3.8vw;
      `}

      ${media.phone`
        width: 42vw;
            display: block;
            height: 73vw;
            border-radius: 21vw;
            margin: 0 auto;
            margin-bottom: 4vw;
      `}
    }

    .disSec:last-child{
      margin-right: 0px;
    }

    .disbox{
      width: 184px;
      display: block;

      ${media.tablet`
        width: 17vw;
            margin: 0 auto;
      `}

      ${media.phone`
        width: 37vw;
            margin: 0 auto;
            height: 20vw;
      `}
      ${media.xphone`
        width: 39vw;
            margin: 0 auto;
            height: 20vw;
      `}
    }

    .disdescrip{
      color: rgba(0,0,0,.8);
      font-size: 13.6px;
      margin: 0px;
      height: 60px;
      text-align: center;
      
      .focus {
        color:#e7008c;
        font-weight: bold;
      }

      ${media.tablet`
        font-size: 1.4vw;
      `}

      ${media.phone`
        font-size: 3vw;
      `}
    }

    .dismore{
      width: 82.2px;
      height: 31.5px;
      border-radius: 21px;
      background-color: #e7008c;
      font-size: 13.6px;
      margin: 20px auto 0;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;

      ${media.tablet`
        font-size: 13px;
        margin-top: 1vw;
            width: 9vw;
            height: 3vw;
      `}

      ${media.phone`
        font-size: 3vw;
        margin-top: 3vw;
        width: 25vw;
        height: 7vw;
      `}
      ${media.xphone`
        font-size: 3vw;
        margin-top: 4vw;
        width: 23vw;
      `}
    }

    .dismore a{
      text-decoration: none;
      color: #ffffff;

      &:after {
        content: "";
        width: 9px;
        height: 9px;
        border-right: 1px solid white;
        border-bottom: 1px solid white;
        transform: rotate(-45deg);
        display: inline-block;

        ${media.tablet`
          width: 7px;
          height: 7px;
        `}

        ${media.phone`
          width: 2vw;
          height: 2vw;
          border-right: 1.5px solid white;
          border-bottom: 1.5px solid white;
        `}
      }
    }



    .addcircle{
      width: 52.2px;
      height: 52.2px;
      background-color: #e50a84;
      border-radius: 50%;
      position: absolute;
      top: 130px;
      background-image: url("../../static/guide/discount-add.png");
      background-size: 35%;
      background-repeat: no-repeat;
      background-position: 16px 16px;

      ${media.tablet`
        width: 5vw;
            height: 5vw;
            top: 13vw;
            background-position: 14px 13px;
      `}

      ${media.phone`
        width: 12vw;
            height: 12vw;
            top: 13vw;
            background-position: 4vw 3.5vw;
      `}
    }

    .addcircle.a{
      left: 175px;

      ${media.tablet`
        left: 16.3vw;
      `}

      ${media.phone`
        left: 14vw;
            top: 68vw;
      `}
    }

    .addcircle.b{
      left: 400px;

      ${media.tablet`
        left: 37vw;
      `}

      ${media.phone`
        left: 14vw;
            top: 146vw;
      `}
    }

    .addcircle.c{
      left: 622px;

      ${media.tablet`
        left: 58vw;
      `}

      ${media.phone`
        left: 14vw;
            top: 223vw;
      `}
    }

    .buttonToStep{
      margin-top: 10px;

      ${media.phone`
        margin-top: 238vw;
      `}
    }

`;

export const StepByStepWrapper = styled.div`
  .stepByStepWrap {
    width: 100%;
    height: 900px;
    background-image: url('../../static/guide/step-bg.png');
    background-size: cover;
    background-position: center;

    ${media.tablet`
      height: 110vw;
    `}

    ${media.phone`
      width: 100vw;
          background-image: url("../../static/guide/step-bg-phone.png");
          height: 190vw;
      overflow: hidden;
    `}
  }

  .stepTitle {
    width: 269px;
    height: 107px;
    margin-top: 70px;

    ${media.tablet`
      width: 28vw;
          margin-top: 7vw;
    `}

    ${media.phone`
      width: 45vw;
          height: 29vw;
          margin-top: 0vw;
          display: block;
          margin: 0 auto;
    `}
  }

  .stepTitleWrap {
    margin: 0 auto;
    width: 300px;
    position: relative;
    margin-bottom: 15px;

    ${media.tablet`
      width: 28vw;
          margin-bottom: 2vw;
    `}

    ${media.phone`
      width: 62vw;
          height: 18vw;
          padding-top: 9vw;
          margin-bottom: 7vw;
    `}
  }

  .stepTitleWrap a {
    width: 250px;
    height: 67px;
    font-size: 48px;
    font-weight: 500;
    text-align: center;
    color: #ffffff;
    position: absolute;
    top: 84px;
    left: 12px;

    ${media.tablet`
      font-size: 5vw;
          margin: 0 auto;
          display: block;
          width: 25vw;
          line-height: 6vw;
    `}

    ${media.phone`
      font-size: 8vw;
          display: block;
          width: 56vw;
          line-height: 6vw;
          top: 20vw;
          left: 3vw;
    `}
  }

  .stepMiddle {
    width: 582px;
    height: 54px;
    font-size: 18px;
    line-height: 1.5;
    letter-spacing: 4px;
    text-align: center;
    color: #ffffff;
    margin: 0 auto;

    ${media.tablet`
      font-size: 2.2vw;
          width: 68vw;
    `}

    ${media.phone`
      font-size: 3.2vw;
          width: 68vw;
          height: 15vw;
    `}
  }

  .stepChoose {
    width: 550px;
    display: flex;
    margin: 0 auto;
    margin-top: 20px;

    ${media.tablet`
      margin-top: 4vw;
    `}

    ${media.phone`
      display:none;
    `}
  }

  .stepChoose-left {
    margin-right: 75px;
    display: flex;
  }

  .stepCircleZone {
    width: 28px;
    position: relative;
    margin-top: 22px;
    margin-right: 20px;
  }

  .stepCircle {
    width: 27px;
    height: 26px;
    background-image: url('../../static/guide/step-circle-empty.svg');
    background-repeat: no-repeat;
    display: block;
  }

  .stepCircle.checked {
    background-image: url('../../static/guide/step-circle.svg');
    background-repeat: no-repeat;
    display: block;
  }

  .stepline {
    width: 2px;
    height: 78px;
    background-color: #979797;
    margin: auto;
  }

  .stepWord {
    width: 195px;
    margin-top: 20px;
  }

  .stepSec {
    width: 195px;
    margin-bottom: 35px;
  }

  .stepSec a {
    width: 105px;
    height: 29px;
    font-size: 21px;
    font-weight: 500;
    text-align: center;
    color: #e7008c;
  }

  .stepSec p {
    width: 230px;
    height: 42px;
    font-size: 15px;
    text-align: left;
    color: #ffffff;
    margin: 0;
    line-height: 1.5;
  }

  .stepPhone {
    width: 230px;
    height: 455px;
    background-size: cover;

    ${media.phone`
      width: 50vw;
          height: 97vw;
          margin: 0 auto;
    `}
  }

  .stepButton {
    width: 224.7px;
    height: 56px;
    border-radius: 28px;
    background-color: #e7008c;
    position: relative;
    margin: 0 auto;
    margin-top: 32px;
    cursor: pointer;

    ${media.phone`
      width: 41vw;
          height: 10vw;
      margin-top: -10vw;
    `}
  }

  .stepButton a {
    width: 110px;
    height: 36px;
    font-size: 25.2px;
    text-align: center;
    color: #ffffff;
    position: absolute;
    top: 9px;
    left: 47px;

    ${media.phone`
      font-size: 5vw;
          top: 1.5vw;
          left: 6vw;
          width: 25vw;
    `}
  }

  .stepImg {
    width: 12px;
    position: absolute;
    right: 52px;
    top: 13px;

    ${media.phone`
      width: 2vw;
          right: 9vw;
          top: 2.7vw;
    `}
  }

  .mibileSlider {
    display: none;

    ${media.phone`
      display: block;
      width: 50vw;
      height: 110vw;
      margin: 8vw auto;
          overflow-y: initial;
    `}

    .sliderBox {
      .img {
        ${media.phone`
          width: 40vw;
          height: 80vw;
          background-size: cover;
          margin: 0 auto;
        `}
      }

      .title {
        ${media.phone`
           font-size: 5vw;
              font-weight: 500;
              text-align: center;
              color: #e7008c;
           margin-top: 3vw;
        `}
      }

      .content {
        ${media.phone`
           width: 35vw;
           height: 15vw;
           font-size: 2.8vw;
           text-align: center;
           color: #ffffff;
           margin: 0 auto;
           margin-top: 1vw;
        `}
      }
    }
  }

  .slick-arrow.slick-next {
    ${media.phone`
      background-image: url("../../static/guide/slick-arrow-right.png");
      width: 4.2vw;
        height: 8vw;
        background-repeat: no-repeat;
      background-size: cover;
    `}
  }

  .slick-next:before {
    ${media.phone`
      content: '';
    `}
  }

  .slick-arrow.slick-prev {
    ${media.phone`
      background-image: url("../../static/guide/slick-arrow-left.png");
      width: 4vw;
        height: 8vw;
        background-repeat: no-repeat;
      background-size: cover;
    `}
  }

  .slick-prev:before {
    ${media.phone`
      content: '';
    `}
  }
`;

export const GuideSocialWrapper = styled.div`
  .guideSocialWrap {
    width: 100%;
    height: 533px;
    background-image: linear-gradient(133deg, #3023ae, #7143bf 43%, #814bc4 53%, #c86dd7);

    ${media.tablet`
      height: 80vw;
    `}

    ${media.phone`
      height: auto;
      padding-bottom: 20vw;
      padding-top: 9vw;
    `}
  }

  .socialTitle {
    width: 286px;
    height: 93px;
    margin: 0 auto;
    position: relative;
    margin-bottom: 140px;

    ${media.tablet`
      width: 30vw;
          margin-bottom: 13vw;
    `}

    ${media.phone`
      width: 100vw;
          margin-bottom: 16vw;
    `}
  }

  .socialTitle img {
    padding-top: 100px;

    ${media.tablet`
      padding-top: 11vw;
          width: 32vw;
    `}

    ${media.phone`
      width: 55vw;
          display: block;
          margin: 0 auto;
    `}
  }

  .socialTitle a {
    width: 100%;
    height: 53px;
    font-size: 38px;
    font-weight: 500;
    text-align: center;
    color: #ffffff;
    position: absolute;
    left: 0;
    top: 115px;

    ${media.tablet`
          top: 13vw;
          font-size: 4vw;
    `}

    ${media.phone`
          font-size: 7.5vw;
      top: 14vw;
    `}
  }

  .socialcontent {
    width: 860px;
    display: flex;
    margin: 0 auto;

    ${media.tablet`
      width: 60vw;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
    `}

    ${media.phone`
      width: 100vw;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
    `}
  }

  .socialSec {
    width: 180px;
    margin-right: 45px;

    ${media.tablet`
      width: 25vw;
          margin-right: 0vw;
          margin-bottom: 8vw;
    `}

    ${media.phone`
      width: 100vw;
          margin-right: 0vw;
          margin-bottom: 12vw;
    `}
  }

  .socialSec img {
    width: 61px;
    height: 61px;
    display: block;
    margin: 0 auto;

    ${media.tablet`
      width: 6vw;
          height: 6vw;
    `}

    ${media.phone`
      width: 15vw;
          height: 15vw;
    `}
  }

  .socialSec a {
    width: 120px;
    height: 28px;
    font-size: 20px;
    text-align: center;
    color: #ffffff;
    margin: 0 auto;
    display: block;
    font-weight: bold;

    ${media.tablet`
      width: 14vw;
          font-size: 2.3vw;
    `}

    ${media.phone`
      width: 27vw;
          font-size: 5vw;
    `}
  }

  .socialSec p {
    width: 180px;
    height: 44px;
    font-size: 16px;
    text-align: center;
    color: #ffffff;
    margin-top: 25px;

    ${media.tablet`
      width: 24vw;
          margin: 18px auto;
    `}

    ${media.phone`
      width: 50vw;
      margin: 2.5vw auto;
      font-size: 3.3vw;
    `}
  }

  .iframeFbBox {
    width: 200px;
    height: 50px;

    ${media.phone`
      width: 18vw;
      margin-left: 35vw;
      margin-top: 4vw;
    `}

    iframe {
      width: 160px;
    }
  }
`;
