import styled , { css , keyframes }from 'styled-components';
import { WrapperSample , WrapperSampleNoContent } from './commonStyled';
const sizes = {
	news:1280,//only movie news used
	desktop: 1024,
	tablet: 992,
	phone: 768,
	phone520:520,
	phone414:414,
	xphone: 375
}



const media = Object.keys(sizes).reduce((acc, label) =>{
	acc[label] = (...args) => css`
		@media (max-width: ${sizes[label] / 16}em) {
			${css(...args)}
		}
	`
	return acc
}, {});


export const Clearfix = styled.div`
	clear:both;
`;


export const BoxImg = styled.div`
	width:100%;
	height:720px;
	line-height:720px;
	background: #eee no-repeat 50% 50% /cover;
	cursor:pointer;
	background-image: ${props=> `url(${props.imgUrl[3]})`};

	${media.tablet`
		background-image: ${props=> `url(${props.imgUrl[4]})`};
		height: 63vw;
	`};

	${media.phone`
		background-image: ${props=> `url(${props.imgUrl[5]})`};
		height: 120vw;
	`};

`;

export const NoticeWrapper = styled.div`

	.noticeWrapper{
		z-index: 300;
		position: fixed;
		background-color: #000;
	    width: 100%;
	    opacity: .7;
	    height: 100vh;
	}
	.box{
		width: 560px;
		background-color:#fff;
		box-shadow: 1px 1px 5px #c6c6c6;
		opacity: 1;
		padding: 20px 70px;
		box-sizing: border-box;
		border-radius: 6px;
		z-index: 999;
		position: fixed;
		left: 50%;
		margin-left: -280px;
		top: 120px;

		${media.phone520`
			width: 90%;
			padding: 20px 40px;
			position: fixed;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
			margin-left: 0px;
		`};

		span{
			display: block;
			font-size: 14px;
			line-height: 22px;

			${media.phone520`
				max-height: 50vh;
				overflow: scroll;
			`};
		}

		.icon{
			width: 135px;
			height: 99px;
			display: block;
			background-repeat: no-repeat;
			margin: 20px auto;
			background-size: cover;

			${media.phone520`
				width: 122px;
				height: 89px;
			`};
		}

		.button{
			width: 230px;
			height: 40px;
			border-radius: 25px;
			background-color: #e7008c;
			font-size: 18px;
			color: #ffffff;
			margin: 20px auto;
			text-align: center;
			line-height: 40px;
			cursor: pointer;

			${media.phone520`
				width: 90%;
			`};
		}

		.button:hover{
			background: #d42782;
		}

	}

`;



export const SliderWrapper = styled.div`
	padding-top: 0;
	background-color:#ccc;
	color:#fff;
	text-align:center;
	font-size:50px;
	width:100%;
	height:720px;
	position:relative;

	${media.tablet`
		height: 63vw;
	`};

	${media.phone`
		height: 120vw;
	`};

	.bannerLoading{
		height: 720px;
		background: #303030;

		${media.tablet`
			height: 63vw;
		`};

		${media.phone`
			height: 128vw;
		`};

		img{
			width: 80px;
			height: 80px;
			padding-top: 360px;

			${media.tablet`
				width: 80px;
				height: 80px;
				padding-top: 30vw;
			`};

			${media.phone`
				width: 70px;
				height: 70px;
				padding-top: 62vw;
			`};
		}
	}
	.box-contain{
		width:100%;
		height:720px;

		&.error{
			.box{
				width:100%;
				height:100%;
				cursor:pointer;
				background-image: url("../../static/common/errorImg-bigBanner-homePage.jpg");
			}
		}
		${media.tablet`
			height: 63vw;
		`};

		${media.phone`
			height: 128vw;
		`};

		.slick-slide{
			height: 720px;

			${media.tablet`
				height: 63vw;
			`};

			${media.phone`
				height: 128vw;
			`};

		}
	}
	.slick-dots{
		bottom:40px;
		color:#e7008c;

		${media.tablet`
			bottom: 20px;
		`};

		${media.phone`
			bottom: 15px;
		`};

		${media.phone414`
			 bottom: 2vw;
		`};

		${media.xphone`
			 bottom: 2vw;
		`};

		.slick-active button:before{
			color:#e7008c;
			opacity:1;
		}

		button{
			&::before{
				color:#2b2b2b;
				opacity:1;
				font-size:1rem;
				text-shadow:1px 1px rgba(0,0,0,.3);
			}
		}
	}
`;

export const MovieRankWrapper = styled.div`
	width:100%;
	margin:0;
	background-color:#404040;
	overflow:hidden;

	.wrapper{
		width:100%;
		margin:auto;
		text-align:center;
		padding:50px 0;
		background-color:#404040;

		${media.phone`
			 padding: 80px 0 30px 0;
		`};

		.rank-btn{
			width:145px;
			display:inline-block;
			margin:0 20px;
			cursor:pointer;
			font-size:1.625rem;
			transition:.3s;
			border-bottom:2px solid transparent;
			color:#fff;

			${media.phone`
				width:100px;
				font-size:1.25rem;
				margin:0 12px;
			`}

			${media.xphone`
				font-size:1rem;
				margin:0 10px;
				width: 70px;
			`}
		}
		.checked{
			color:#fff;
			border-bottom:2px solid #e6008a;
		}
	}

`;

export const MovieRankPart = styled.div`
	height:35vw;
	${media.desktop`height:57vw;`};
	${media.xphone`height:100vw;`};

	.loadingBox{
		width: 100%;
		height:30vw;
		display: flex;
		${media.desktop`
			display:none;
		`};

		.loading{
			width: 20%;
			background-color: #2e2e2e;
			border: 10px solid #404040;
			box-sizing: border-box;
			height:30vw;
		}
	}

	.mobileLoadingBox{
		display:none;

		${media.desktop`
			width: 100%;
			height: 50vw;
			display: flex;

			.mobileLoading{
				width: calc(100%/3);
				background-color: #2e2e2e;
				border: 5px solid #404040;
				box-sizing: border-box;
			}
		`};

		${media.xphone`
			display:none;
		`};
	}

	.phoneLoadingBox{
		display:none;

		${media.xphone`
			width: 100%;
			height: 100vw;
			display: flex;

			.phoneLoading{
				width: 70%;
				background-color: #2e2e2e;
				border: 5px solid #404040;
				box-sizing: border-box;
				margin: 0 auto;
			}
		`};
	}


	.errorBox{
		width: 100%;
		height: 92%;
		background-image: url("../../static/common/errorBg.png");
		background-size: cover;
		background-position: center;
		color: white;
		font-size: 14px;
		display: flex;
		flex-direction: column;
		justify-content: center;

		${media.phone`
			background-image: url("../../static/common/errorBg-mobile.png");
			background-position: 0 88%;
		`};

		.errorIcon{
			margin: 0 auto;
			height: 95px;
			width: 165px;
			background-image: url("../../static/common/error-homepage-rank.png");
			background-size: 100%;
			background-repeat: no-repeat;

			${media.phone`
				height: 90px;
				width: 150px;
			`};


		}
		.errorText{
			width: 250px;
			text-align: center;
			margin: 0 auto;

			${media.phone`
				width: 250px;
			`};
		}
	}

	.rank-post-wrapper{
		height:30vw;
		position:relative;

		${media.desktop`height:50vw;`};
		${media.phone`height:50vw;`};
		${media.xphone`height:100vw`};


		.post{
			cursor:pointer;
			position:relative;
			height:30vw;

			${media.desktop`height:50vw;`};
			${media.phone`height:50vw;`};
			${media.xphone`height:100vw`};

			&:hover {
				.goToBooking{
					display:flex;

					${media.desktop`display:none;`};
				}
				.hoverPart{
					display:block;
					background-color:rgba(0,0,0,.7);

					${media.desktop`background-color:transparent;`};
				}
			}

			.goToBooking{
				display:none;
				width:110px;
				height:auto;
				position:absolute;
				top:50%;
				left:50%;
				transform:translate(-50%,-50%);
				flex-direction:column;
				justify-content:center;
				z-index:10;

				.booking,.information{
					width:110px;
					background-color:transparent;
					height:28px;
					line-height:28px;
					border:1px solid #fff;
					text-align:center;
					font-size:14px;
					letter-spacing:1.5px;
					color:#fff;
					font-weight:300;
					margin:10px auto;
					cursor:pointer;
					border-radius:3px;
					position:relative;
					cursor:pointer;

					&:hover{
						background-color:#e7008c;
						color:#fff;
						border:1px solid transparent;
					}

				}


			}

			.iconBox{
				display:none;
				position:absolute;
				left:25%;
				bottom:30px;
				width:56px;
				height:56px;
				cursor:pointer;
				border-radius:50%;
				z-index:10;

				${media.desktop`display:block;`};
				${media.phone`
					left:20%;
				`};
				${media.phone414`
					left:15%;
					width:40px;
					height:40px;
					bottom:15px;
				`};
				${media.xphone`
					left:25%;
					width:50px;
					height:50px;
					bottom:40px;
				`};

				.icon{
					width:100%;
					height:100%;
				}

			}
			.play{
				right:25%;
				left:initial;
				${media.phone`
					right:20%;
				`};
				${media.phone414`
					right:15%;
				`};
				${media.xphone`
					right:25%;
				`};
			}

			.alt{
				width:100%;
				min-height:30px;
				color:#fff;
				text-align:center;
				z-index:2;
				position:absolute;
				top:10%;
				font-size:18px;
			}
			.en{
				top:28%;
				font-size:14px;
			}

			.rank{
				width:3.4vw;
				height:3.4vw;
				position:absolute;
				z-index:2000;
				background-color:#e6008a;
				right:.6vw;
				top:-.6vw;
				box-shadow:-0.2vw 0.2vw 0.2vw rgba(0,0,0,.5);
				${media.phone`
					width:5vw;
					height:5vw;
				`};
				${media.phone414`
					width:8vw;
					height:8vw;
				`};
				${media.xphone`
					width:10vw;
					height:10vw;
				`};

				&::before{
					position:absolute;
					top:0;
					left:-.43vw;
					content:"";
					display:block;
					width:0;
					height:0;
					border-style:solid;
					border-width:0 0 .6vw .44vw;
					border-color:transparent transparent #80004d;
				}
				.num{
					float:left;
					color:#fff;
					margin:10% 0 0 10%;
					font-size:1.9vw;
					width:25px;
					text-align:right;

					${media.phone`
						margin:10% 0 0 2%;
						font-size:24px;
						width:20px;
					`};
					${media.phone414`font-size:20px;margin:10% 0 0 2%;`};
					${media.xphone`font-size:20px;margin:18% 0 0 10%;`};
				}
				.updown{
					float:left;
					position:absolute;
					top:40%;
					right:0;
					width:1vw;
					height:1vw;
					color:#fff;

					${media.phone`width:2.7vw;height:2.7vw;right:-5%;top:33%;`};
					${media.phone414`width:3vw;height:3vw;right:0%;`};
					${media.xphone`width:4vw;height:4vw;top:43%;`};
				}
			}
			.hoverPart{
				display:none;
				position:absolute;
				width:100%;
				height:100%;
				top:0;
				left:0;
				background-color:rgba(0,0,0,.7);
				cursor:pointer;
				z-index:5;

				${media.desktop`
					display:block;
					background:linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0) 73%, rgba(0, 0, 0, 0.6));
				`};
			}
			.backgroundClick{
				position:absolute;
				width:100%;
				height:100%;
				top:0;
				left:0;
				background-color:transparent;
				background: #232323 no-repeat 50% 50% / cover;
			}
		}

		.prev{
			width:25px;
			height:25px;
			color:#fff;
			position:absolute;
			left:45%;
			cursor:pointer;
			z-index:9;
			bottom:-10%;

			${media.desktop`left:30%`};
			${media.phone414`display:none;`}
		}
		.next{
			width:25px;
			height:25px;
			color:#fff;
			position:absolute;
			right:45%;
			cursor:pointer;
			z-index:9;
			bottom:-10%;

			${media.desktop`right:30%`}
			${media.phone414`display:none;`}
		}

	}
	.slick-dots{
		bottom:-10%;
		color:#e7008c;
		z-index:5;

		.slick-active button:before{
			color:#e7008c;
			opacity:1;
		}

		button{
			&::before{
				color:#2b2b2b;
				opacity:1;
				font-size:1rem;
				text-shadow:1px 1px rgba(0,0,0,.3);

				${media.phone`font-size:.75rem;`};
			}

		}
	}
	.slick-list{
		overflow: visible;
	}
`;


export const NewsArticleWrapper = styled(WrapperSample)`
	min-height:300px;
	background-color:#404040;
	padding-top:50px;
	padding-bottom:50px;
	overflow:hidden;

	.errorIcon{
		background-image: url("../../static/common/error-homepage-article.jpg");
		background-size: cover;
		background-position: center;
		width:100%;
		height: 28vw;
		margin-top: 20px;

		${media.phone`
			background-image: url("../../static/common/error-homepage-article-mobile.png");
			height: 110vw;
			margin-top: 10px;
		`};
	}

	.wrapper{
		width:1080px;
		${media.news`width:714px;`};
		${media.phone`width:714px;`};
		.title{
			width:125px;
			height:36px;
			background-color:#000;
			color:#fff;
			line-height:36px;
			text-align:left;

			${media.phone`margin: 0 50px 0 10vw;`};

			.icon{
				width:15px;
				height:15px;
				margin:0 10px 0 13px;
			}
		}
		.content{
			padding-top:30px;
			width:1080px;

			${media.news`width:714px;height:600px`};
			${media.phone`
				height:1030px;
				width: 100vw;
			`};

			.background-masker{
				background: #404040;
				position: absolute;
			}

			.background-masker.top{
				height: 10px;
				top: 10px;
				width: 100%;

				${media.phone`
					top: 13px;
				`};
			}

			.background-masker.second{
				height: 10px;
				top: 30px;
				width: 100%;

				${media.phone`
					top: 36px;
				`};
			}

			.background-masker.third{
				height: 18px;
				top: 50px;
				width: 100%;

				${media.phone`
					height: 15px;
					top: 56px;
				`};
			}

			.background-masker.left{
				height: 10px;
				top: 40px;
				width: 30px;
				left: 70px;

				${media.phone`
					top: 46px;
				`};
			}

			.background-masker.right{
				height: 10px;
				top: 40px;
				width: 150px;
				left: 140px;

				${media.phone`
					width: 470px;
					top: 46px;
				`};
			}

			.newsbox{
				width:calc(100% / 3 - 70px);
				height:65px;
				float:left;
				margin: 0 70px 18px 0;

				${media.news`width:calc(100% / 2 - 70px);`};
				${media.phone`width:80%; margin: 0 auto; float:none; margin-bottom:10px; height:70px; border-bottom:1px solid #9e9e9e`};

				.newsTitle{
					text-align:left;
					width:100%;
					height:45px;
					font-size:1rem;
					color:#fff;
					font-weight:300;
					cursor:pointer;

					&:hover{
						color:#e7008c;
						${media.phone`color:#fff;`}

					}

					${media.phone`
						padding-bottom: 5px;
					`};

				}
				.newsdetail{
					text-align:left;
					width:30%;
					height:15px;
					line-height:15px;
					color:#9e9e9e;
					font-size:.75rem;
					float:left;
				}
			}
			.errorText{
				font-size:18px;
				text-align:center;
				color:rgba(0,0,0,.5);
				letter-spacing:2px;
			}
		}
		.more{
			float:right;
			margin-right:50px;
			color:#fff;
			font-weight:300;
			cursor:pointer;

			${media.phone`margin-right:20%;`};
		}
	}

`;

export const NewsSliderWrapper = styled(WrapperSampleNoContent)`
	background-color:#404040;
	overflow:hidden;
	padding-bottom:20px;
	height:17vw;

	${media.desktop`
		height:45vw;
	`};

	${media.phone`
		height:50vw;
	`};

	.adLoadingBox{
		width: 100%;
		height: 100%;
		display: flex;

		${media.desktop`
			display: none;
		`};

		.adLoading{
			width: calc(100%/3);
			background-color: #2e2e2e;
			border: 5px solid #404040;
			box-sizing: border-box;
		}
	}

	.mobileAdLoadingBox{
		display: none;

		${media.desktop`
			width: 100%;
			height: 45vw;
			display: block;

		   .mobileAdLoading{
			   width: 80%;
			   margin: 0 auto;
			   background-color: #2e2e2e;
			   border: 5px solid #404040;
			   box-sizing: border-box;
			   height: 100%;
		   }
		`};
	}

	.loadingBox{
		width: 100%;
		height: 100%;
		display: flex;

		.loading{
			width: calc(100%/3);
			background-color: #2e2e2e;
			border: 5px solid #404040;
			box-sizing: border-box;
		}
	}

	.errorBox{
		width: 100%;
		height: 100%;
		background-color: #565656;

		.errorIcon{
			width: 100%;
			height: 70px;
			color: #8e8e8e;
			padding-top: 110px;
		}
	}

	.wrapper{
		background-color:#404040;

		.big{
			${media.desktop`display:none`};
			${media.tablet`display:none;`};
			${media.phone`display:none;`};
			.post{
				height:20.5vw;
				box-sizing:border-box;
				cursor:pointer;

				img{
					width:97.5%;
				}
			}
		}
		.slick-next, .slick-prev{
			top:40%;
		}
		.mid{
			display:none;
			${media.desktop`display:block`};
			${media.phone`display:none;`};
			.post{
				height:43vw;
				box-sizing:border-box;
				cursor:pointer;

				img{
					width:100%;
				}
			}
			.center{

			}
			.slick-next{
				top:50%;
				right:4.5vw !important;
			}
			.slick-prev{
				top:50%;
				left:4.5vw !important;
			}

		}
		.small{
			display:none;
			${media.phone`display:block;`};
			height:49vw;

			.post{
				height:51vw;
				box-sizing:border-box;
				cursor:pointer;

				img{
					width:100%;
				}
			}

		}

	}
`;

export const AdImg = styled.div`
	background-image: ${props=> `url(${props.imgUrl})`};
	width: 97.5%;
    height: 81%;
	background-size: cover;

		${media.desktop`
			width:100%;
		    height:43vw;
		`};

		${media.phone`
			height:51vw;
		`};
`;
