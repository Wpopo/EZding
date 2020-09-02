import styled, { css, keyframes } from 'styled-components';

const sizes = {
  cinemaEntry: 1280,
  desktop: 1024,
  tablet: 992,
  phone: 768,
  faq936: 936,
  faq620: 620,
  faq757: 757,
  hotNews: 600,
  phone540: 540,
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

// giftAds-mobile,pad
export const GiftAdsMobileWrapper = styled.div`
  width: 100%;

  .giftAdsPad {
    display: none;

    ${media.tablet`
		display: block;
		width: 100%;
		position: fixed;
		bottom: 0px;
		z-index: 210;
	`};

    ${media.faq620`
			display: none;
			width: 100%;
		`};
  }
  .giftAdsMobile {
    display: none;

    ${media.faq620`
			display: block;
			width: 100%;
			position: fixed;
			bottom: 0px;
			z-index: 9;
		`};
  }
`;

// giftAds
export const GiftAdsWrapper = styled.div`
  width: 300px;
  position: fixed;
  right: 16%;
  top: 90px;
  z-index: 100;

  ${media.tablet`
		display: none;
	`};

  .giftAdsWrapper {
    color: #ff5722;
    .imgBox {
      display: ${(props) => (props.isAdsShow ? 'block' : 'none')};
      position: relative;
      .img {
        width: 300px;
      }
      .crossIcon {
        cursor: pointer;
        position: absolute;
        right: -35px;
        width: 27px;
        height: 27px;
        background-color: #ffffff;
        border-radius: 50%;

        &:after,
        &:before {
          content: '';
          background-color: black;
          width: 15px;
          height: 2px;
          position: absolute;
          top: 13px;
          left: 6px;
        }

        &:after {
          transform: rotate(45deg);
        }

        &:before {
          transform: rotate(-45deg);
        }
      }
    }

    .giftBox {
      position: absolute;
      right: 0px;
      top: 426px;
    }
    .giftBox {
      display: ${(props) => (props.isCrossShow ? 'block' : 'none')};
      .crossIcon {
        cursor: pointer;
        position: absolute;
        right: -35px;
        width: 27px;
        height: 27px;
        background-color: #ffffff;
        border-radius: 50%;

        &:after,
        &:before {
          content: '';
          background-color: black;
          width: 15px;
          height: 2px;
          position: absolute;
          top: 13px;
          left: 6px;
        }

        &:after {
          transform: rotate(45deg);
        }

        &:before {
          transform: rotate(-45deg);
        }
      }

      .giftIcon {
        width: 100px;
        height: 100px;
        margin-top: 23px;
        cursor: pointer;
      }
    }
  }
`;

// clear float
export const Clearfix = styled.div`
  clear: both;
`;

// movieStars
export const MovieStars = styled.div`
  width: 100px;
  height: 15px;
  text-align: center;
  margin: 13px auto 0;

  .star {
    width: 15px;
    height: 15px;
    float: left;
    margin: 0 2.5%;
    background: ${(props) => `${props.bgcolor} no-repeat 50% 50% /cover`};
  }
`;

// loading
const rotate360 = keyframes`
	from {
		transform: rotate(0deg);
	}

	to {
		transform: rotate(360deg);
	}
`;

// loading
export const LoadingCircleWrapper = styled.div`
  margin: auto;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  width: 100%;
  height: ${(props) => props.height};
  background-color: transparent;

  .loadingIcon {
    color: #fff;
    opacity: 0.5;
    animation: ${rotate360} 1s infinite;
    width: 40px;
    height: 40px;
    line-height: 50px;
  }
`;

// empty
export const EmptyWrapper = styled.div`
  margin: auto;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  width: 100%;
  height: ${(props) => props.height};
  background-color: transparent;

  ${media.tablet`
		height:100%;
	`};

  .emptyText {
    text-align: center;
    color: #fff;
    opacity: 0.7;
    margin-left: 20px;
    letter-spacing: 1.5px;
  }

  .empty {
    color: #fff;
    opacity: 0.5;
    width: 40px;
    height: 40px;
  }
`;

// facebook loading animation
const placeHolderLoading = keyframes`
	0% { background-position: -468px 0 }
	100% { background-position: 468px 0 }
`;

// facebook loading bar
export const LoadingBox = styled.div`
  width: ${(props) => `calc(100% / ${props.width} )`};
  height: ${(props) => `${props.height}`};
  float: left;
  margin: ${(props) => `${props.margin}`};
  animation-duration: 1s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-name: ${placeHolderLoading};
  animation-timing-function: linear;
  background: #f6f7f8;
  background: linear-gradient(135deg, #848484 8%, #c5c4c4 18%, #8a8a8a 33%);
  background-size: ${(props) => `${props.size}`};
  position: relative;

  ${media.cinemaEntry`
		width:${(props) => `calc(100% / ${props.midWidth} )`};
	`};

  ${media.phone`
		width: ${(props) => `${props.smallWidth}`};
		margin: ${(props) => `${props.smallMargin}`};
		float: none;
		height: ${(props) => `${props.smallHeight}`};
	`};
`;

// changePages
export const ChangePagesWrapper = styled.div`
  margin: auto;
  text-align: center;

  .circle {
    width: 34px;
    height: 34px;
    font-size: 14px;
    line-height: 34px;
    color: #b4b4b4;
    text-align: center;
    display: inline-block;
    margin: 0 5px;
    cursor: pointer;
    border: 1px solid transparent;

    ${media.hotNews`width:30px;height:30px;line-height:30px;margin:0 3px;`};
    ${media.phone414`width:25px;height:25px;line-height:25px;margin:0 3px;`};
    ${media.xphone`width:25px;height:25px;line-height:25px;margin:0 3px;`};

    &:hover {
      border: 1px solid #b4b4b4;
      border-radius: 50%;
      color: #fff;
    }

    img {
      vertical-align: middle;
      ${media.phone414`width:25px;height:25px;`};
      ${media.xphone`width:25px;height:25px;`};
    }
  }
  .numIndex {
  }
  .add {
    background-color: #e7008c;
    border-radius: 50%;
    color: #fff;

    &:hover {
      border: 1px solid transparent;
    }
  }
  .nowIndex1 {
    opacity: 0;
    cursor: default;
  }
`;

// common wrapper sample(has content)
export const WrapperSample = styled.div`
  width: 100%;

  .wrapper {
    width: 1080px;
    margin: auto;
    text-align: center;
  }
`;

// common wrapper sample(has no content)
export const WrapperSampleNoContent = styled.div`
  width: 100%;

  .wrapper {
    margin: auto;
    text-align: center;
  }
`;

// show app download tips
export const AppInstallTips = styled.div`
  width: 100%;
  height: 75px;
  position: fixed;
  background-color: #fff;
  z-index: 300;
  color: #fff;

  .icon {
    margin: 20px;
    color: #aaa;
    width: 30px;
    height: 30px;
    cursor: pointer;
  }
  img {
    width: 320px;
    height: 75px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    cursor: pointer;

    ${media.phone414`width:270px;height:65px;top:6%;`};
    ${media.xphone`width:260px;height:65px;top:8%;`};
  }
`;

export const NavbarWrapper = styled(WrapperSample)`
	height:80px;
	background-color:rgba(0,0,0,.7);
	color:#fff;
	position:fixed;
	line-height:80px;
	font-weight:normal;
	letter-spacing:1.2px;
	z-index:10;
	
	${media.desktop`
		height:60px;
	`}
	${media.phone`
		margin-top:${(props) => (props.showTips ? '70px' : '0')};
		height:60px;
	`}
	${media.xphone`
		margin-top:${(props) => (props.showTips ? '70px' : '0')};
		height:60px;
	`}


	.root-1{
		position: fixed;
	}

	.navbar-icon2{
		margin: 0px 20px;
		position:absolute;
		top:22px;
		//left:calc(100% - 1428px);
		left: 40px;
		height:36px;
		width:75px;
		cursor:pointer;
		transition:.3s;

		${media.desktop`top:13px;`}

		${media.phone`
			width:53px;
			height:26px;
			top:15px;
			left:3%;
		`}
		${media.xphone`left:2%;`}
	}
	.navbar-icon{
		position:absolute;
		top:22px;
		left:40px;
		height:36px;
		width:75px;
		cursor:pointer;
		transition:.3s;

		${media.desktop`top:12px;`}

		${media.phone`
			width:53px;
			height:26px;
			top:15px;
			left:3%;
		`}
		${media.xphone`left:4%;`}
	}
	.logo{
		transition:0;
		//position:absolute;

		&:hover{
			top:20px;
			${media.desktop`top:10px;`}
			${media.phone`top:13px;`}
			${media.xphone`top:13px;`}
		}
	}
	.faq{
		position:absolute;
		left:calc(100vw - 130px);
		width:35px;
		height:35px;

		${media.desktop`display:none;`}
		&:hover{
			.qaIcon{
				display:none;
			}
			.qaHoverShow{
				display:block;
			}

			&:before,&:after{
				transition:.1s;
				transition-delay: 1s;
				opacity:1;
			}
		}

		&:before{
			position:absolute;
			bottom:-87%;
			content:'客服中心';
			width:68px;
			height:27px;
			line-height:27px;
			letter-spacing:0px;
			font-weight:200;
			color:#b4b4b4;
			font-size:14px;
			text-align:center;
			border-radius:3px;
			background-color:#5c5c5c;
			opacity:0;
		}
		&:after{
			position:absolute;
			bottom:-21%;
			left:35%;
			content:"";
			display:block;
			width:0px;
			height:0px;
			border-style:solid;
			border-width:0 2px 5px;
			border-color:transparent transparent #5c5c5c;
			opacity:0;
		}
		img{
			width:100%;
			height:100%;
			position:absolute;
			top:0;
		}
		.qaHoverShow{
			display:none;
		}


	}
	.member{
		position:absolute;
		left:calc(100vw - 80px);
		width:35px;
		height:35px;
		color:#fff;
		cursor:pointer;

		&:hover{

			.memberIcon{
				display:none;
			}
			.memberHoverShow{
				display:block;
			}

			&:before,&:after{
				transition:.1s;
				transition-delay: 1s;
				opacity:${(props) => (props.member ? '0' : '1')};
			}
		}

		${media.desktop`display:none;`}
		&:before{
			opacity:0;
			position:absolute;
			bottom:-87%;
			content:'會員中心';
			width:68px;
			height:27px;
			line-height:27px;
			letter-spacing:0px;
			font-weight:200;
			color:#b4b4b4;
			font-size:14px;
			text-align:center;
			border-radius:3px;
			background-color:#5c5c5c;
		}
		&:after{
			position:absolute;
			bottom:-21%;
			left:35%;
			content:"";
			display:block;
			width:0px;
			height:0px;
			border-style:solid;
			border-width:0 2px 5px;
			border-color:transparent transparent #5c5c5c;
			opacity:0;
		}
		img{
			width:100%;
			height:100%;
			position:absolute;
			top:0;
		}
		.memberHoverShow{
			display:none;
		}
	}
	.photo{
		width:34px;
		height:34px;
		background:#535353 no-repeat 50% 50% /cover;
		border-radius:50%;
	}

	.photoClick{
		width:34px;
		height:34px;
	}

	.wrapper{
		position:relative;

		.nav-btn{
			font-size:18px;
			margin:0 1.2%;
			cursor:pointer;
			vertical-align:top;
			float:left;
			position:relative;
			${media.desktop`display:none;`}

			&::before{
				position:absolute;
				content:'';
				bottom:0;
				width:0px;
				height:3px;
				background-color:#e7008c;
				transition:.3s;
				left:50%;
				transform:translateX(-50%);
			}

			&:hover{
				color:#e7008c;

				&::before{
					width:70px;;
				}
			}
		}
		div:nth-child(1){
			position:absolute;
			left:200px;
		}
		div:nth-child(2){
			position:absolute;
			left:310px;
		}
		div:nth-child(4){
			position:absolute;
			right:290px;
		}
		div:nth-child(5){
			position:absolute;
			right:180px;
		}

		.booking{
			font-size:24px;
			margin:0 1.2%;
			cursor:pointer;
			vertical-align:top;
			width:232px;
			height:116px;
			box-sizing:border-box;
			border-radius: 0 0 116px 116px;
			background: linear-gradient(#e6008c 42%,#29007a);
			box-shadow: 2px 2px 4px 0 rgba(0, 0, 0, 0.5);
			position:fixed;
			left:50%;
			transform:translateX(-50%);
			${media.desktop`
				width:182px;
				height:90px;
				left:50%;
				transform:translateX(-50%);
			`}
			${media.phone`
				width:138px;
				height:68px;
				left:50%;
				transform:translateX(-50%);
			`}
			${media.xphone`
				width:138px;
				height:68px;
				left:50%;
				transform:translateX(-50%);
			`}

			&:hover{
				color:#fff;
				background:linear-gradient(#ff1aa3 42%,#4f04e7);
			}
			img{
				position:absolute;
				left:17%;
				top:15%;
				width:40px;
				height:40px;
				display:inline-block;
				background-color:transparent;

				${media.desktop`
					width:34px;
					height:34px;
				`}
				${media.phone`
					left:15%;
					top:12%;
					width:30px;
					height:30px;
				`}

			}
			.name{
				width:100px;
				font-size:23px;
				position:absolute;
				left:35%;
				top:15%;
				display:inline-block;
				height:35px;
				border-bottom:2px dotted #fff;
				line-height:35px;
				font-weight:normal;

				${media.desktop`
					font-size:1.25rem;
					width:90px;
					height:29px;
					line-height:29px;
					border-bottom:2px dotted #fff;
				`}
				${media.phone`
					left:38%;
					font-size:15px;
					width:70px;
					height:22px;
					line-height:22px;
					border-bottom:1px dotted #fff;
				`}
			}

		}
	}
`;

// HamburgerBtn
export const HamburgerBtn = styled.div`
  display: none;
  position: fixed;
  cursor: pointer;
  top: 10px;
  right: 1%;
  width: 36px;
  height: 36px;
  z-index: 200;
  display: none;

  ${media.desktop`display:block;`};
  ${media.phone`
		top: ${(props) => (props.lineToday ? '22px' : '7px')};
		right: ${(props) => (props.lineToday ? '10px' : '1%')};
	`};
  ${media.phone414`
		top: ${(props) => (props.lineToday ? '12px' : '7px')};
		right:1%;`};
  ${media.xphone`
		top: ${(props) => (props.lineToday ? '12px' : '10px')};
		right:1%;`};

  .hamburger {
    font-size: 25px;
    display: inline-block;
    width: 0.9em;
    height: 0.07em;
    padding: 0;
    cursor: pointer;
    transition: transform 0.3s ease-in-out;
    vertical-align: middle;
    background: transparent;

    ${media.xphone`height:1px;`};

    &:before,
    &:after {
      content: ' ';
    }

    &:before,
    .icon,
    &:after {
      display: block;
      width: 0.9em;
      height: 0.06em;
      margin: 0 0 0.3em;
      transition: transform 0.3s ease-in-out;
      background: #fff;

      ${media.xphone`height:1px;`};
    }
  }
  .active {
    &:before,
    .icon,
    &:after {
      background: #fff;
    }
  }
  .hamburger.hamburger-plus.active {
    .icon {
      transform: scale(0);
    }
    &:before {
      transform: translateY(0.35em) rotate(135deg);
      ${media.xphone`transform: translateY(.3em) rotate(135deg);`};
    }
    &:after {
      transform: translateY(-0.37em) rotate(45deg);
      ${media.xphone`height:1px;`};
    }
  }
`;

// Hamburger menu
export const HamburgerWrapper = styled.div`
  position: fixed;
  right: ${(props) => (props.show ? '0' : '-200px')};
  width: 200px;
  z-index: 50;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.9);
  transition: 0.5s;
  display: none;

  ${media.desktop`display:block;`};

  .cancel-btn {
    color: #fff;

    .icon {
      position: absolute;
      right: 8px;
      top: 14px;
      width: 33px;
      height: 33px;
      color: #e7008c;
      cursor: pointer;
    }
  }
  .ham-nav {
    width: 100%;
    height: 60px;
    border-bottom: 2px solid ${(props) => (props.member ? '#e7008c' : '#4a4a4a')};
    color: #fff;
    line-height: 63px;
    padding-left: 20px;
    letter-spacing: 1.2px;
    font-weight: 300;
    position: relative;

    span {
      transition: 0.3s;
      &:hover {
        color: #e7008c;
      }
    }

    .photo {
      width: 30px;
      height: 30px;
      background: #535353 no-repeat 50% 50% / cover;
      border-radius: 50%;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      cursor: pointer;
    }
    .empty {
      width: 35px;
      height: 35px;
      transform: translateY(-60%);
    }

    .name {
      color: #fff;
      width: 40%;
      position: absolute;
      cursor: default;
      height: 60px;
      line-height: 60px;
      margin-left: 5%;
      font-size: 14px;
      left: 50px;

      ${media.phone`height:60px;line-height:60px;`};
      ${media.xphone`height:60px;line-height:60px;`};
    }
  }
  .option {
    border: none;
    height: 60px;
    line-height: 60px;
    cursor: pointer;
    transition: 0.3s;
    ${media.tablet`height:60px;line-height: 60px;`};
    ${media.phone`height:50px;line-height: 50px;`};
    ${media.xphone`height:40px;line-height: 40px;`};
  }
  .member {
    border: none;
    height: 40px;
    line-height: 40px;
  }
  .memberBtn {
    box-sizing: border-box;
    padding-left: 30px;
    font-weight: 300;
    font-size: 14px;
    height: 40px;
    line-height: 40px;

    .icon {
      color: #e7008c;
      width: 20px;
      height: 20px;
    }
  }

  .fb-icon {
    width: 40px;
    height: 40px;
    color: #fff;
    line-height: 63px;
    cursor: pointer;
    margin: 16px;
  }
`;

// memberShowPart
export const MemberPart = styled.div`
  width: 220px;
  height: auto;
  position: fixed;
  //position: relative;
  z-index: 510;
  background-color: rgba(0, 0, 0, 0.8);
  right: ${(props) => (props.showSlow ? '40px' : '-240px')};
  //top: 90px;
  top: 100px;
  transition: 0.5s;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  ${media.desktop`display:none;`};

  &::before {
    z-index: 511;
    position: fixed;
    //position: relative;
    right: ${(props) => (props.showSlow ? '50px' : '-230px')};
    //top: 80px;
    top: 90px;
    content: '';
    display: block;
    width: 0px;
    height: 0px;
    border-style: solid;
    border-width: 0 8px 10px;
    border-color: transparent transparent rgba(0, 0, 0, 0.5);
    transition: 0.5s;
  }
  .photo {
    width: 50px;
    height: 50px;
    background: #e7008c no-repeat 50% 50% / cover;
    float: left;
    border-radius: 50%;
    margin: 3% 3% 3% 8%;
  }
  .text {
    width: 100%;
    height: 50px;
    font-size: 20px;
    padding: 0 0 0 16px;
    color: #fff;
    line-height: 50px;
    text-align: left;
    cursor: pointer;
    float: left;
    margin: 0;
    box-sizing: border-box;
    border-bottom: solid 2px #e7008c;
  }
  .text_notlogin {
    font-size: 16px;
    padding: 0 0 0 16px;
    color: #fff;
    cursor: pointer;
  }
  .logining {
    display: ${(props) => (props.member ? 'block' : 'none')};
    width: 100%;
    text-align: left;
    float: left;

    .name {
      float: left;
      line-height: 24px;
      height: 24px;
      width: 80%;
      height: 24px;
      margin: 10px 0 0 30px;
      cursor: pointer;
      color: #fff;
      transition: 0.3s;
      font-size: 16px;
      font-weight: 300;

      &:hover {
        color: #e7008c;
      }

      .icon {
        color: #e7008c;
      }
      .icon_padding {
        width: 14px;
        height: 14px;
        display: inline-block;
      }
    }
    .title {
      cursor: default;
      margin: 20px 0 0 16px;
      &:hover {
        color: #fff;
      }
    }
  }
  .fb-icon {
    display: ${(props) => (props.member ? 'block' : 'none')};
    width: 32px;
    height: 32px;
    color: #fff;
    cursor: pointer;
    padding: 24px 16px;
  }
`;

// 選單列 紅利點數
export const RedPointWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: #5f47e2;
  height: 65px;
  line-height: normal;
  color: #ffffff;
  font-size: 12px;

  img.logo {
    content: url('static/member/redpointLogo.png');
    width: 52px;
    height: 48px;
    padding: 0 12px;
  }
  .tooltip {
    display: inline;
    .tipText {
      display: none;
    }
    &:hover {
      .tipText {
        width: 208px;
        height: 53px;
        background-color: #5b5b5b;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        right: 23px;
        top: 100px;
        z-index: 10;
        border-radius: 5px;
      }
    }
  }

  .point {
    font-size: 18px;
    padding-right: 4px;
    opacity: 0.67;
  }
`;
// 從首頁選影城入口
export const CinemaEntry = styled.div`
	width:100%;
	height:920px;
	background-color:#2b2b2b;
	margin:auto;
	overflow:hidden;
	${media.cinemaEntry`
		height: auto;
	`}
	${media.phone`
		width: 100%;
		padding-bottom:50px;
	`}

	.active{
		.part{
			ul{
				${media.phone`
					display:block;
				`}
			}
			.title{
				.img-cinema-right{
					${media.phone`
						display:none;
					`}
				}
				.img-cinema-down{
					${media.phone`
						display:block;
					`}
				}
			}
		}
	}

	.phonetitle{
		display: none;
		${media.phone`
			color: #e6008a;
			display: block;
			width: 94%;
			box-sizing:border-box;
			padding: 14px 0 14px 16px;
			border-bottom: 1px solid #4a4a4a;
			font-size: .9375rem;
			height: auto;
			line-height: 21px;
			margin-left:3%;
			font-weight:300;
			font-family: 'MicrosoftJhengHei';
		`}

		span{
			font-size:12px;
			color:#e7008c;
			margin-left:10px;
		}
	}

	.part{
		float:left;
		width:calc(100% / 3 - 2px);
		height:228px;
		border:1px solid #333;
		${media.cinemaEntry`
			width: auto;
			float:none;
		    display: flex;
			justify-content:center;
			height: auto;
			padding: 10px 33px;
		`}
		${media.phone`
			display: block;
			padding: 0;
			border:none;
			border-bottom: 1px solid #4a4a4a;
			font-size: .9375rem;
			line-height: 21px;
			width:94%;
			margin-left:3%;
		`}

		.title{
			margin-top:15px;
			color:#e6008a;
			font-size:1.625rem;
			color:#e6008a;
			text-align:center;
			height:80px;
			line-height:80px;
			display:block;
			${media.cinemaEntry`
				width: 160px;
				font-size: 1.125rem;
				height:40px;
				line-height:1;
				margin-top: 0;
				text-align: left;
				padding:10px 0 0;
			`}
			${media.phone`
				width: auto;
				padding: 14px 0 14px 28px;
				font-size: .9375rem;
				height: auto;
				line-height: 21px;
				position: relative;
				font-weight:200;
			`}

			.img-cinema-right{
				display:none;
				${media.phone`
					background-repeat: no-repeat;
					display: inline-block;
					width: 8px;
				    height: 8px;
				    margin-top: -4px;
				    position: absolute;
				    top: 50%;
				    right: 20px;
				`}
			}
			.img-cinema-down{
				display:none;
				${media.phone`
					display:none;
					background-repeat: no-repeat;
					width: 8px;
				    height: 8px;
				    margin-top: -4px;
				    position: absolute;
				    top: 50%;
				    right: 20px;
				`}
			}
			span{
				font-size:26px;
				font-family: 'MicrosoftJhengHei';
				color: #e7008c;
				font-weight:300;
				margin-left:10px;
				${media.cinemaEntry`
					display:block;
					margin-left:0px;
					padding:5px 0;
					font-size:12px;
				`};
				${media.phone`
					display:inline;
					margin-left:10px;
				`};
			}
		}
		.cinemalist{
			margin:auto;
			text-align:center;
			width:80%;
			font-size: .875rem;
			padding-left: 0px;
			line-height: 1em;
			${media.cinemaEntry`
				font-size: .75rem;
			    text-align: left;
				width: 520px;
				margin: 0;
				padding:5px 0 0;
			`};
			${media.phone`
				width: 100%;
				display: none;
			`};

			.cinema{
				margin:5px 0;
				padding:0 10px;
				display:inline-block;
				color:#787878;
				border-right:1px solid #787878;
				cursor:pointer;
				${media.phone`
					width: 100%;
					display:block;
					padding: 14px 0 14px 42px;
				    border: none;
				    border-bottom: 1px solid #4a4a4a;
				    border-right:none;
				    font-size: .9375rem;
				    box-sizing:border-box;
				`}

				&:hover{
					color:#e7008c;
					${media.phone`
						color:#787878;
					`}
				}
			}
			.last{
				border:none;
			}
		}
`;

// footer
export const FooterWrapper = styled(WrapperSampleNoContent)`
  width: 100%;
  background-color: #1f1f1f;
  color: #fff;

  ${media.phone`width:100%;`};

  .wrapper {
    width: 100%;
    .box {
      width: 50%;
      float: left;
      margin: 60px 0 0;
      position: relative;

      ${media.desktop`margin:30px 0 0;`};
      ${media.phone`display:none;`};

      .link-box {
        max-width: 600px;
        width: 100%;
        height: 120px;
        margin: auto;

        ${media.cinemaEntry`width:80%;`};
        ${media.desktop`margin-top:5%;`};
        .logo {
          width: 20%;
          float: left;

          ${media.cinemaEntry`width:30%;`};
          ${media.desktop`width:100%;margin-left:0;`};

          img {
            width: 100%;
            height: auto;

            ${media.desktop`
							width:96px;
							height:47px;
							margin-bottom:10px;
						`};
          }
        }

        .link {
          width: 100px;
          height: 20px;
          float: left;
          margin: 0 0 30px 5%;
          cursor: pointer;

          ${media.cinemaEntry`margin:0 0 30px 2%;`};
          ${media.desktop`width:34%;margin:0 8% 30px 8%;`};

          .icon {
            float: left;
            width: 20px;
            height: 20px;
            color: #9e9e9e;
            ${media.desktop`width:20%;`};
          }
          .text {
            float: left;
            width: 80px;
            height: 20px;
            line-height: 20px;
            color: #9e9e9e;
            font-size: 0.875rem;

            &:hover {
              transition: 0.3s;
              color: #e7008c;
            }
            ${media.desktop`width:80%;font-size:12px;`};
          }
        }
      }
      .sloganBox {
        max-width: 600px;
        width: 100%;
        height: 120px;
        margin: auto;

        ${media.cinemaEntry`width:80%;`};
      }
      .slogan {
        max-width: 370px;
        width: 66%;
        float: left;
        margin: 30px 0 0 0;
        color: #fff;
        text-align: left;
        font-size: 14px;
        font-weight: 200;
        letter-spacing: 1px;

        ${media.cinemaEntry`
					margin: 27px 0 0 0;
					font-size:13px;
				`};

        ${media.desktop`
					margin: 10px 5% 0 0;
				    height: 60px;
				    font-size: 13px;
				    width: 100%;
				    text-align: center;
				`};
      }
      .cardBox {
        width: 33%;
        float: right;
        margin: 30px 0 0 0;
        display: inline-flex;
        justify-content: space-between;

        ${media.desktop`width:50%;float:initial;margin:0;`};
      }
      .card {
        width: auto;
        height: 40px;
        float: left;

        ${media.cinemaEntry`height:30px;`};
        ${media.desktop`margin:3% 5% 0 0;`};
      }
      .visa {
        ${media.desktop`margin:3% 0 0 0;`};
      }
    }
    .rwd768 {
      width: 100%;
      display: none;
      ${media.phone`display:block;`};

      .logo {
        width: 100%;
        padding: 30px 0;

        img {
          width: 80px;
          height: auto;
        }
      }
      .text {
        width: 94%;
        color: #9e9e9e;
        font-size: 14px;
        text-align: left;
        height: 48px;
        line-height: 48px;
        margin-left: 3%;
        border-top: 1px solid #323232;
        box-sizing: border-box;
        padding-left: 2%;
        font-weight: 200;
        cursor: pointer;
      }
      .last {
        border-bottom: 1px solid #323232;
        margin-bottom: 30px;
      }
    }
    .right {
      background: #404040 no-repeat 50% 50% / cover;
      margin: 0;
      width: 50%;
      float: left;
      padding-bottom: 15px;

      ${media.cinemaEntry`height:300px;`};
      ${media.desktop`height:390px;`};
      ${media.tablet`height:390px;`};
      ${media.phone`width:100%;height:300px;`};

      .logo2 {
        width: 100px;
        height: auto;
        margin: 70px auto 0;
        text-align: center;

        ${media.cinemaEntry`width:60px;margin:90px auto 0;`};
        ${media.desktop`width:60px;margin:90px auto 0;`};
        ${media.tablet`width:80px;`};
        ${media.phone`width:50px;margin:90px auto 0;`};
      }
      .word {
        width: 80%;
        color: #fff;
        font-size: 14px;
        margin: 20px auto;
        font-weight: 200;

        ${media.phone`font-size:1rem;`};
      }
      .app {
        height: 40px;
        display: inline-block;
        margin: 0 10px 10px;

        ${media.cinemaEntry`height:40px;`};
        ${media.desktop`height:40px;`};
        ${media.tablet`height:40px;`};
        ${media.phone`height:40px;`};
      }
    }

    .bottom {
      clear: both;
      width: 100%;
      line-height: 18px;
      padding: 22px 0;
      text-align: center;
      font-size: 0.75rem;
      color: #c7c7c7;
      background-color: #000;

      ${media.tablet`
				 height: 87px;
			`};

      ${media.faq620`
				 height: 130px;
			`};

      .testWrap {
        display: flex;
        margin: 0 auto;
        width: 550px;
        justify-content: space-between;

        ${media.faq620`
					 flex-wrap:wrap;
					 justify-content:center;
					 width: 100%;
				`};

        .text {
          ${media.faq620`
					 	width: 100%;
					`};
        }
      }
    }
  }
`;

// urlChange
export const UrlChangeWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #404040;
  z-index: 2000;

  .loading {
    width: 100px;
    height: auto;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
`;

export const PopUpContentSec = styled.div`
	position: fixed;
	z-index: 1000;
	width: 100vw;
	height: 100vh;
	top: 0;
	left: 0;

	.overlay{
		background-color:#404040;
		width: 100vw;
		height: 100vh;
		opacity: 0.9;
	}


	.contentWrapper{
		width: 960px;
		max-height: 90vh;
		margin: 60px auto;
		padding: 30px 20px 30px 20px;
		box-sizing: border-box;
		background-color: #c4c4c4;
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		z-index: 2;
		overflow-y: auto;
		-webkit-overflow-scrolling: touch;
		font-size: 16px;
		color: black;
		text-align: left;
		border-radius: 4px;
		box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);

		${media.tablet`
			width: 95%;
			max-height: 86vh;
		`}

		.cancelBox{
			position: absolute;
			right: 60px;
			top: 20px;

			${media.phone414`
				right: 50px;
			`};

			.cancel-icon{
				float:right;
				width: 40px;
				height: 40px;
				position: fixed;
				cursor: pointer;
				color:#ffffff;
			}

		}


		span{
			font-size: .875rem;
			line-height: 1.5em;

			div{
				${media.phone`
					padding-bottom: 1vw;
				`}
			}
		}

		h4{
			font-size: 1.125rem;
    		color: #4a4a4a;
    		margin-top: 0;
		}

		h5{
			font-size: .875rem;
			color: #4a4a4a;
			margin: 10px 0;
		}

		.faqPopUpWrapper{
			p{
				font-size: 18px;
				color: #4a4a4a;
			}

			ul{
				 display: flex;
				 justify-content:center;
			     flex-wrap: wrap;
				 padding-left: 0px;

				 ${media.faq620`
					margin-top: 30px;
					margin-left: auto;
					margin-right: auto;
					text-align: center;
					padding: 0px 10vw;
					justify-content: center;
 				`}

				.cinemaListButton{
					list-style: none;
					color: #787878;
					border: 1px solid #979797;
					width: 150px;
					height: 32px;
					text-align: center;
					line-height: 32px;
					vertical-align: middle;
					font-weight: 300;
					margin: 0px 9px 18px;
					cursor: pointer;

					${media.faq620`
						width: 25vw;
						height: 40px;
						margin: 0px;
						border: none;
						padding: 4px 0px;
						border-bottom: 1px dashed #9e9e9e;
						line-height: 40px;
						padding-left: 2px;
						padding-right: 2px;
    				`}

					${media.xphone`
						font-size: 14px;
    				`}
				}

				.cinemaListButton:nth-last-child(1),.cinemaListButton:nth-last-child(2){
					opacity: 0;
					cursor: auto;

					${media.faq936`
						display: none;
    				`}
				}

				.cinemaListButton:nth-last-child(3),.cinemaListButton:nth-last-child(4){
					opacity: 0;
					cursor: auto;

					${media.faq936`
						display: none;
    				`}

					${media.faq757`
						display: block;
						opacity: 0;
						cursor: auto;
    				`}

					${media.faq620`
						display: none;
    				`}
				}



				.cinemaListButton:nth-child(2n+1){
					${media.faq620`
						border-right: 1px dashed #9e9e9e;
    				`}
				}

				.cinemaListButton:nth-last-child(2){
					${media.faq620`
						border-bottom: none;
    				`}
				}

				.cinemaListButton.checked{
					background-color: #e8018b;
					color: #ffffff;
				}

				.cinemaListButton.checked:hover{
					color: #ffffff;
					background-color: #e8018b;
				}

				.cinemaListButton:hover{
					color: #fff;
					background-color: #9e9e9e;
				}
			}

			.content.content-hide{
				display: none;
			}

			.content{
				padding-left: 40px;
				${media.faq620`
					padding-left: 0px;
				`}

				.q-list{
					margin: 30px 0px;

					.question-header{
						cursor: pointer;

						.q-icon{
							color: #ffffff;
							width: 30px;
							height: 30px;
							border-radius: 100%;
							background-color: #e7008c;
							text-align: center;
							line-height: 30px;
							vertical-align: middle;
							float: left;
							margin-right: 10px;

							${media.phone414`
								margin-bottom: 17px;
							`}

						}

						.question{
							padding-top: 2px;
							font-size: 18px;
							color: #4a4a4a;

							${media.faq620`
								font-size: 16px;
							`}
						}
						.arrowIcon{
							margin-top: -30px;
							float: right;
							margin-right: 30px;

							${media.faq620`
								margin-top: -12px;
								margin-right: 3px;
							`}

							.arrowImg{
								background-image: url("../../static/common/faq-dark-drop.png");
								width: 10px;
								height: 8px;
								background-size: 100%;
								transform: rotate(90deg);
								transition: .2s;
								opacity: 0;
							}
							.arrowImg.active{
								transform:rotate(0deg);
								transition: .2s;
								opacity: 1;
							}
						}
					}

					.answer.answer-hide{
						display: none;
					}

					.answer{
						padding-bottom: 13px;

						hr{
							border: 1px solid #9e9e9e;
							margin: 10px 0px;
							margin-right: 20px;

							${media.phone`
								 margin-right: 0;
							`}
						}

						.a-icon{
							color: #ffffff;
							background-color: #4a4a4a;
							width: 30px;
							height: 30px;
							border-radius: 100%;
							text-align: center;
							line-height: 30px;
							vertical-align: middle;
							float: left;
							margin-right: 10px;
						}

						p{
							max-width: 766px;
							color: #787878;
							font-size: 16px;
							padding-right: 0px;
							padding-left: 40px;
							margin-top: 0px;
							line-height: 1.5;

							span{
								font-size: 16px;
								padding-left: 20px;
								display: inline-block;
							}
							a{
								color: #e7008c;
								text-decoration: underline;
							}
						}
					}
				}
			}

			.otherBtn{
				display: block;
				background-color: #d8d8d8;
				border-radius: 2px;
				box-shadow: inset 1px 1px 3px 0 rgba(0, 0, 0, 0.5);
				height: 61px;
				padding-top: 18px;
				margin: 40px 0;
				text-align: center;

				${media.tablet`
					margin: 40px 0;
					text-align: center;
					background-color: #c4c4c4;
					box-shadow:none;
				`}

				${media.phone`
					margin: 0px auto 20px;
				`}

				span{
					color: #787878;
					font-size: 16px;

					${media.tablet`
						display:none;
					`}
				}

				.otherQuestion, .customerService{
					width: 305px;
					padding: 8px 0px;
					background-color: #9e9e9e;
					margin-right: 20px;
					display: inline-block;
					cursor: pointer;

					${media.phone`
						width: 35vw;
					`}

					${media.phone414`
						width: 110px;
						margin-right: 5px;
					`}

					p{
						font-size: 20px;
						letter-spacing: 5px;
						color: #ffffff;
						text-align: center;
						margin-bottom: 0px;
						font-weight: 300;
						margin-top: 0px;

						${media.phone`
							font-size: 16px;
							letter-spacing: 4px;
						`}

						${media.phone414`
							font-size: 14px;
							letter-spacing: 1px;
						`}
					}
				}
			}
		}

		.footerPopUpWrapper{

			${media.tablet`
				width: 85%;
				margin: 0 auto;
			`};
			${media.phone414`
				width: 100%;
			`};

			#idNameFooterPopUp{
				.title{
					padding: 0 96px 25px 64px;

					${media.tablet`
						width: 50%;
						padding: 0 0 25px 0;
						margin: 0 auto;
					`};

					h1{
						background-color: #e7008c;
						text-align: center;
						border-radius: 100px;
						font-size: 24px;
						font-weight: 300;
						margin: 0;
						color: #fff;

						${media.tablet`
							font-size: 18px;
						`};
					}
				}

				.content{
					width: 715px;
					margin: 0 auto;

					${media.tablet`
						width: 100%;
					`};

					ul{
						padding-left: 36px;

						li{
							font-size: 14px;
							line-height: 1.6;
							color: #4a4a4a;
							margin-bottom: 10px;
							padding-left: 10px;

							.pink{
								color: #de0079;
							}
						}

						.pink{
							color: #de0079;
						}
					}
					.heading{
						display: flex;

						p{
							font-size: 14px;
							color: #4a4a4a;
							padding: 6px 17px;
							border: 1px solid #e7008c;
							border-radius: 100px;
							text-align: left;
							margin: 0;
						}
					}
					.subContent{
						font-size: 14px;
						margin: 0 0 10px 16px;

						${media.phone414`margin:0 0 10px 0;`};

						.gray{
							color: #4a4a4a;
							margin: 0 0 10px 16px;

							${media.phone414`margin:0 0 10px 0;`};
						}
						.pink{
							color: #de0079;
							margin: 0 0 10px 16px;

							${media.phone414`margin:0 0 10px 0;`};
						}
					}
				}
			}
		}
	}
`;

// share article
export const ShareArticleWrap = styled.div`
  ${media.tablet`
		margin: 0 auto;
		width: 190px;
	`};

  .shareArticleDesktop {
    width: 135px;
    display: inline-block;
    ${media.tablet`
			display: none;
		`};

    .icon {
      width: 33px;
      height: 33px;
      display: inline-block;
      margin: 0 6px 0 6px;
      background-size: cover;
    }
    .icon.fbShare {
      background-image: url('../../static/article/share-fb.png');

      &:hover {
        background-image: url('../../static/article/hover-fb.png');
      }
    }
    .icon.googleShare {
      background-image: url('../../static/article/share-google.png');

      &:hover {
        background-image: url('../../static/article/hover-google.png');
      }
    }
    .icon.lineShare {
      background-image: url('../../static/article/share-line.png');

      &:hover {
        background-image: url('../../static/article/hover-line.png');
      }
    }
  }

  .shareArticleMobile {
    display: none;

    ${media.tablet`
			display: block;
		    height: 61px;
		    position: fixed;
		    bottom: 0px;
			z-index: 2;
		`};

    .icon {
      display: none;
      ${media.tablet`
				width: 33px;
				height: 33px;
				display: inline-block;
				margin: 9px 15px 0 15px;
				background-size: cover;
			`};
    }

    .icon.fbShare {
      display: none;
      ${media.tablet`
				display: inline-block;
				background-image: url("../../static/article/share-fb.png");

			`};
    }
    .icon.googleShare {
      display: none;
      ${media.tablet`
				display: inline-block;
				background-image: url("../../static/article/share-google.png");

			`};
    }
    .icon.lineShare {
      display: none;
      ${media.tablet`
				display: inline-block;
				background-image: url("../../static/article/share-line.png");

			`};
    }
  }
`;

// repairPage
export const RepairWrapper = styled.div`
  width: 100%;
  height: 700px;
  background: url('/static/common/repairBg.png') no-repeat 50% 50% / cover;

  ${media.phone414`
		height:85vh;
		background: url('/static/common/repairBgRwd.png');
		background-size: 135%;
	`};

  img {
    width: 160px;
    margin: 0 auto;
    display: block;
    padding-top: 230px;

    ${media.phone414`
			width:100px;
			padding-top:150px;
		`};
  }
  div {
    width: 244px;
    height: 37px;
    line-height: 37px;
    font-family: PingFangTC;
    font-size: 18px;
    margin: 20px auto;
    color: #fff;
    text-align: center;

    ${media.phone414`
			margin:10px auto;
			font-size: 14px;
		`};
  }
  a {
    display: block;
    width: 150px;
    height: 45px;
    border: 1px solid #fff;
    border-radius: 22px;
    text-align: center;
    font-size: 18px;
    color: #fff;
    line-height: 45px;
    margin: auto;
    cursor: pointer;
    transition: 0.3s;

    ${media.phone414`
			width:100px;
			height:30px;
			line-height:30px;
			border-radius:15px;
			font-size:12px;
		`}

    &:hover {
      background-color: #fff;
      color: #404040;

      ${media.phone`
				background-color:transparent;
				color:#fff;
				cursor:default;
			`}
    }
  }
  .errorBookingImg {
    width: 250px;
    height: 150px;
    padding-top: 180px;
    ${media.phone540`
			padding-top: 33vw;
		`}
  }
  .errorBookingTitle {
    margin: 30px auto 20px;
    ${media.phone540`
			font-size: 14px;
		`}
  }
  .errorBookingText {
    width: 346px;
    text-align: left;
    line-height: normal;
    font-size: 17.1px;
    ${media.phone540`
			height: auto;
			width: 60%;
		`}

    .errorBookingSubText {
      font-size: 18px;
      width: 346px;
      margin: 20px auto 0px;
      text-align: left;
      height: auto;
      line-height: 1;
      ${media.phone540`
				width: 100%;
				font-size: 14px;
			`}
    }

    ol {
      padding-inline-start: 20px;
      margin-block-start: 10px;
      ${media.phone540`
				font-size: 14px;
			`}
    }
  }
`;

// CheckCircle
const CheckCircleSize = {
  lg: { size: '28px', width: '12px', height: '6px', top: '8px', left: '7px' },
  normal: { size: '18px', width: '7px', height: '3px', top: '6px', left: '5px' },
  sm: '12px',
};

export const CheckCircleWrapper = styled.div`
  width: ${(props) => CheckCircleSize[props.size].size || CheckCircleSize.normal.size};
  position: relative;
  display: inline-block;
  padding: 0px 5px;

  label {
    background-color: #222222;
    border-radius: 50%;
    cursor: pointer;
    left: 0;
    position: absolute;
    top: 0;
    height: ${(props) => CheckCircleSize[props.size].size};
    width: ${(props) => CheckCircleSize[props.size].size};

    :after {
      border: 2px solid #3f3f3f;
      border-top: none;
      border-right: none;
      content: '';
      width: ${(props) => CheckCircleSize[props.size].width};
      height: ${(props) => CheckCircleSize[props.size].height};
      top: ${(props) => CheckCircleSize[props.size].top};
      left: ${(props) => CheckCircleSize[props.size].left};
      position: absolute;
      transform: rotate(-45deg);
    }
  }

  input[type='checkbox'] {
    visibility: hidden;

    :checked + label {
      background-color: #ff0b94;

      :after {
        border-color: #000000;
      }
    }
  }

  body {
    background-color: #f1f2f3;
  }
`;
