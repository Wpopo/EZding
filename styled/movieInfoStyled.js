import styled , { css }from 'styled-components';
import { WrapperSample , WrapperSampleNoContent } from './commonStyled';


const sizes = {
	desktop: 1024,
	tablet: 992,
	phone: 580,
	phone414:414,
	xphone:375,
	phone320:320
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

//movie mutiple pages content
export const MovieInfoContentWrapper = styled(WrapperSampleNoContent)`
	padding-top:100px;
	background-color:#3f3f3f;

	${media.desktop`padding-top:100px`};
	${media.phone`padding-top:40px`};
	.wrapper{
		width:100%;
		height:130px;

		.btn,.btn2{
			width:150px;
			height:48px;
			line-height:48px;
			display:inline-block;
			margin:40px 0 0;
			color:${props=>props.checked? '#fff':'#cacaca'};
			font-size:16px;
			cursor:pointer;
			transition:.3s;

			&:hover{
				color:#fff;
				${media.tablet`
					color:${props=>props.checked? '#fff':'#cacaca'};
				`};
			}
		}
		.btn2{
			color:${props=>props.checked ? '#cacaca':'#fff'};
		}
		.checked{
			width:300px;
			text-align:center;
			margin:3px auto 40px;
			height:2px;
			border-bottom:1px solid rgba(0,0,0,.3);

			.bar{
				width:50%;
				height:2px;
				margin-bottom:-2px;
				background-color:#e7008c;
				transition:.3s;
				transform:${props=>props.checked?'translate(0%)':'translate(100%)'};
			}
		}
	}


`;

//movie list render
export const MovieInfoBoxWrapper = styled(WrapperSampleNoContent)`
	min-height:100vh;

	.box-wrapper{
		max-width:1200px;
		width:100%;
		margin:auto;
		text-align:center;

		${media.desktop`max-width:100%;`};
		${media.tablet`width:100%`};

		.post-box{
			width:calc(100% / 4 - 10px);
			height:530px;
			max-height:45vw;
			margin:5px;
			float:left;

			${media.desktop`width:width:calc(100% / 4);`};
			${media.tablet`width:calc(100% / 3 - 10px);height:500px;max-height:500px;`};
			${media.phone`width:calc(100% / 3 - 10px);;height:70vw;max-height:450px;`};
			${media.xphone`width:calc(100% / 2 - 10px);;height:100vw;max-height:450px;`};
			.post{
				background:#232323 no-repeat 50% 50% / cover;
				width:90%;
				height:373px;
				max-height:32vw;
				margin:auto;
				cursor:pointer;

				${media.desktop`width:209px;height:310px;`};
				${media.tablet`width:90%;height:43vw;max-height:380px;`};
				${media.phone`width:90%;height:43vw;`};
				${media.xphone`width:90%;height:60vw;`};
			}
			.title{
				font-size:20px;
				color:#fff;
				text-align:center;
				height:27px;
				line-height:27px;
				font-weight:300;
				margin:7px auto 0;
				overflow:hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				width: 90%;

				${media.tablet`font-size:18px;`};
				${media.phone`font-size:16px;`};
			}
			.en{
				font-size:14px;
				color:#9e9e9e;
				height:19px;
				line-height:19px;
				text-align:center;
				font-weight:300;
				overflow:hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				width:90%;
				margin: auto;
				${media.tablet`font-size:12px;`};
			}
			.grade{
				width:85px;
				height:22px;
				line-height:22px;
				font-size:12px;
				border-radius: 12.5px;
  				border: solid 1px #555555;
				text-align:center;
				color:#9e9e9e;
				margin:5px auto;
			}
			.coming{
				height:16px;
				line-height:16px;
				font-size:12px;
				color:#9e9e9e;
				text-align:center;
				margin-top:10px;

				span{
					font-size:12px;
					color:#fff;
					margin: 0 1%;
				}
			}
		}
	}

	.page{
		width:100%;
		height:100px;
		margin:30px auto 0;
		text-align:center;
		display:inline-block;

		.num{
			width:35px;
			height:35px;
			background-color:#777;
			line-height:35px;
			font-size:16px;
			color:#fff;
			display:inline-block;
			cursor:pointer;

			&:hover{
				background-color:#e7008c;
			}

		}

		.checked{
			background-color:#e7008c;
		}

	}

	.clear{
		clear:both;
	}
`;


//movie singlepage
export const MovieInfoWrapper = styled.div`
	width:100%;
	height:400px;
	background-color:#ccc;

	${media.tablet`height:360px;`};
	${media.phone`height:287px;`};
	${media.xphone`height:222px;`};

	.videoIcon{
		border-radius:50%;
		width:100px;
		height:100px;
		color:#fff;
		position:absolute;
		top:18%;
		left:51%;
		transform:translateX(-50%);
		cursor:pointer;
		z-index:1;
		background:transparent no-repeat 50% 50%/cover;

		${media.desktop`top:18%;`};
		${media.tablet`top:70px;right:-5%;left:initial;`};
		${media.phone`top:70px;right:-5%;width:80px;height:80px;`};
		${media.xphone`top:75px;right:-5%;width:50px;height:50px;`};

	}
	.videobox{
		width:100%;
		height:100%;
		position:relative;

		&::before{
			content:'';
			width:100%;
			height:100%;
			background-color:#000;
			position:absolute;
			left:0;
			top:0;

		}

		.video{
			margin:auto;
			width:100vw;
			height:100%;
			background-color:#000;
			filter: blur(20px) opacity(.8);

			iframe{
				width:100%;
				height:100%;
			}
		}
	}


	.wrapper-title{
		width:100%;
		margin-top:-441px;
		height:550px;
		position:relative;

		${media.tablet`margin: -460px auto 0px;`};
		${media.phone`margin: -540px auto 80px;`};
		${media.xphone`margin: -540px auto 50px;`};

		.wrapper-title-contain{
			max-width:1080px;
			height:100%;
			margin:auto;
			position:relative;
			overflow:hidden;

			.poster{
				position:absolute;
				left:3%;
				bottom:0;
				width:215px;
				height:316px;
				background: #ccc no-repeat 50% 50% / cover;
				border-bottom:4px solid #e7008c;

				${media.tablet`width:214px;height:327px;left:11%;`};
				${media.phone`width:120px;height:178px;left:7%;`};
				${media.xphone`width:95px;height:135px;left:7%;`};

				.grade{
					color:#fff;
					border:1px solid rgba(255,255,255,.6);
					border-radius:12.5px;
					width:85px;
					height:23px;
					line-height:23px;
					position:absolute;
					left:115%;
					top:60px;
					font-size:12px;
					text-align:center;
					font-weight:500;

					${media.tablet`top:80px;`};
					${media.phone`top:0px;`};
				}

				.movie-title{
					position:absolute;
					left:115%;
					top:95px;
					color:#fff;
					font-size:36px;
					width:700px;
					height:36px;
					line-height:36px;
					font-weight:300;
					letter-spacing:1.5px;
					overflow:hidden;

					${media.tablet`top:115px;font-size:24px;width:400px;`};
					${media.phone`top:30px;font-size:20px;width:200px;`};
					${media.xphone`top:30px;font-size:18px;width:180px;`};
				}
				.eu{
					top:140px;
					left:115%;
					font-size:14px;
					font-weight:200;
					height:18px;
					line-height:18px;

					${media.tablet`top:160px;`};
					${media.phone`top:65px;font-size:14px;`};
					${media.xphone`top:60px;font-size:12px;`};
				}
				.time{
					color:#fff;
					font-size:12px;
					position:absolute;
					top:170px;
					left:115%;
					font-weight:200;
					letter-spacing:1.5px;
					height:16px;
					width:30vw;

					${media.tablet`top:190px;width:50vw;`};
					${media.phone`top:100px;`};
					${media.xphone`top:85px;`};

					span{
						height:16px;
						line-height:16px;
						float:left;
						margin:0 15px 0 0;
						${media.phone`height:20px;line-height:20px;width:100%;font-size:12px;`};
					}
				}
				.allScore{
					position: absolute;
				    left: 115%;
				    width: 300px;
				    height: 70px;
				    bottom: 5%;

				    ${media.tablet`bottom:2%;`};
					${media.phone`width:350px;bottom:-45%;left:0;`};
					${media.xphone`width:320px;bottom:-60%;`};
					${media.phone320`width:280px;`};

					.starbox{
						width: 100px;
					    position: absolute;
					    left: 0;
					    bottom: 0;

						${media.tablet``};
						${media.phone`left:20px;`};
						${media.xphone`left:0px;`};

						.star{
							height:15px;
						}
						.text{
							width:100%;
							text-align:center;
							font-size:12px;
							height:30px;
							line-height:30px;
							font-weight:300;
							color:#3f3f3f;
						}
					}
					.imdb{
						width: 70px;
					    position: absolute;
					    left: 110px;
					    bottom: 0;

						${media.tablet``};
						${media.phone`left:150px;`};
						${media.xphone`left:140px;`};
						${media.phone320`left:110px;`};

						.score{
							font-size:28px;
							color:#9d90e6;
							text-align:center;
							font-weight:300;
							font-family: HelveticaNeueLTPro-Th,"PingFang SC";
						}
						.text{
							width:100%;
							text-align:center;
							font-size:12px;
							height:30px;
							line-height:30px;
							font-weight:300;
							color:#3f3f3f;
						}
					}
					.tomato{
						width: 70px;
					    position: absolute;
					    left: 200px;
					    bottom: 0;

						${media.tablet``};
						${media.phone`left:250px;`};
						${media.xphone`left:250px;`};
						${media.phone320`left:200px;`};

						.score{
							font-size:28px;
							color:#9d90e6;
							text-align:center;
							font-weight:300;
							font-family: HelveticaNeueLTPro-Th,"PingFang SC";
							width:100%;
						}
						.text{
							width:100%;
							text-align:center;
							font-size:12px;
							height:30px;
							line-height:30px;
							font-weight:300;
							color:#3f3f3f;
						}
					}
				}
			}
		}
	}
	.wrapper-content{
		width:100%;
		max-width:1080px;
		margin:auto;
		box-sizing:border-box;

		${media.desktop`padding:10px;`};
		${media.tablet`padding:15px 50px;`};
		${media.phone`padding:15px 20px;`};

		.movie-intro-title-wrapper{
			float:left;
			width:100%;
			border-bottom:1px solid #eee;
			position:relative;
			height:49px;
			margin:50px 0 23px;

			${media.tablet`margin:20px 0 ;`};
			${media.phone`margin:20px 0 ;`};

			.movie-intro-title{
				text-align:center;
				width:100px;
				height:48px;
				line-height:48px;
				border-bottom:3px solid transparent;
				color:#9e9e9e;
				font-weight:400;
				letter-spacing:1.5px;
				font-size:16px;
				float:left;
				cursor:pointer;
				transition:.2s;

				${media.phone`width:calc(100% / 3);`};

			}
			.choice{
				color:#000;
				border-bottom:3px solid #e7008c;
			}
			.movie-go-booking{
				position:absolute;
				top:0;
				right:0;
				text-align:center;
				width:130px;
				height:40px;
				line-height:40px;
				background-color:#e7008c;
				color:#fff;
				font-weight:300;
				letter-spacing:1.5px;
				cursor:pointer;
				border-radius:3px;
			}
		    .no{
		    	background-color:#9e9e9e;
		    }
		}

	}

	.clear{
		clear:both;
	}

`;

export const MovieFooterWrapper = styled(WrapperSampleNoContent)`
	background-color:#404040;

	.wrapper{
		margin:auto;

		.look{
			margin:auto;
			text-align:center;
			width:300px;
			color:#fff;
			height:100px;
			line-height:150px;
			border-bottom:2px solid #9e9e9e;
			position:relative;

			&::before{
				position:absolute;
				content:'';
				width:100px;
				bottom:-3px;
				left:50%;
				transform:translate(-50%);
				border-bottom:4px solid #e7008c;
			}
		}

		.otherBox{
			width:100%;
			max-width:1080px;
			margin:auto;
			padding:20px 0 50px;
			display:flex;
			justify-content:flex-start;

			${media.desktop`width:100%;box-sizing:border-box;padding:20px;`};
			${media.tablet`
				width:100%;
				display:inline-flex;
				align-content:flex-start;
				box-sizing:border-box;
				padding:50px;
				flex-wrap:wrap;
			`};
			${media.xphone`padding:20px 0;justify-content:space-around;`}

			.iconBox{
				height:250px;
				.icon{
					margin-top:50px;
					width:50px;
					height:50px;
					color:rgba(0,0,0,.5);
				}
				.text{
					text-align:center;
					font-size:18px;
					color:rgba(0,0,0,.5);
					letter-spacing:2px;
				}
			}
			.box{
				height:400px;
				width:270px;
				border-bottom:1px solid #646464;
				margin:0 5px;

				${media.desktop`width:calc(100% / 4 - 10px);`};
				${media.tablet`width:46%;padding-bottom:20px;margin-bottom:15px;`};
				${media.phone`height:60%;width:100%;padding-bottom:20px;margin-bottom:15px;`};
				${media.xphone`width:300px;`};
				.photo{
					background:#eee no-repeat 50% 50% /cover;
					width:100%;
					height:181px;
					margin-bottom:12px;

					${media.phone`height:250px;`};
					${media.xphone`width:300px;height:180px;`};
				}
				.title{
					height:54px;
					font-family: MicrosoftJhengHei;
  					font-size: 18px;
  					color:#fff;
  					line-height:1.5;
  					font-weight:300;
  					text-align:left;
  					margin-bottom:10px;
  					overflow:hidden;
				}
				.authorInfo{
					height:30px;
					width:100%;

					.authorPhoto{
						width:28px;
						height:28px;
						marign:1px 1px 1px 0;
						border-radius:50%;
						background:#eee no-repeat 50% 50% /cover;
						float:left;
					}
					.nameTime{
						width:100px;
						float:left;
						margin-left:5px;

						.name{
							height:15px;
							text-align:left;
							font-size:12px;
							color:#fff;
							font-weight:200;
							font-family: MicrosoftJhengHei;
						}
						.time{
							height:15px;
							text-align:left;
							font-size:12px;
							color:#fff;
							font-weight:200;
							font-family: MicrosoftJhengHei;
						}

					}
					.eval{
						width:36px;
						height:21px;
						line-height:21px;
						border-radius:120px;
						background-color:rgb(95,71,226);
						text-align:center;
						color:#fff;
						font-size:12px;
						font-weight:300;
						float:right;
						margin-right:5px;
					}
				}
				.desc{
					margin-top:10px;
					width:100%;
					font-size:16px;
					color:#9e9e9e;
					text-align:left;
				}
			}
		}
		.none{
			display:block;
			margin:auto;
		}
	}

`;

export const MovieVideoWrapper = styled(WrapperSampleNoContent)`
	background-color:rgba(0,0,0,.9);
	width:100vw;
	height:100vh;
	position:fixed;
	z-index:2000;
	.icon{
		position:fixed;
		right:20px;
		top:20px;
		width:30px;
		height:30px;
		color:#fff;
	}

	.wrapper{
		width:100%;
		position:absolute;
		top:50%;
		left:50%;
		transform:translate(-50%,-50%);

		iframe{
			width:900px;
			height:550px;

			${media.phone`width:100%;height:315px`};
		}

	}

`;

export const MovieDescWrapper = styled.div`
	.gotoTimePage{
		position:fixed;
		height:60px;
		width:60px;
		background-color:${props=>props.order ? '#e7008c':'#dcdcdc'};
		right:5vw;;
		bottom:5vh;
		border-radius:50%;
		cursor:pointer;
		z-index:100;
		box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);

		&:hover{
			background-color:${props=>props.order ? '#e7008c':'#dcdcdc'};
		}

		img{
			width:30px;
			height:30px;
			margin: 15px;
		}
	}

	.wrapper{
		width:100%;
		max-width:1080px;
		margin:auto;
		box-sizing:border-box;
		float:left;

		.staffbox{
			margin:10px 0;
		}
		.staffContent{
			width:70%;
			height:100%;
			float:left;
		}
		.movie-intro-staff{
			float:left;
			color:#3f3f3f;
			margin:0;
			font-weight:400;
			font-size:16px;
			width:5%;
			height:100%;

			${media.tablet`width:10%;`};
			${media.phone`width:12%;font-size:14px;`};
		}
		.staff{
			float:left;
			color:#3f3f3f;
			font-weight:400;
			font-size:16px;
			min-width:60px;

			${media.phone`font-size:14px;`};
		}
		.movie-intro-content{
			width:100%;
			float:left;
			color:#3f3f3f;
			margin:15px 0 100px;
			font-weight:400;
			letter-spacing:1.5px;
			line-height:2;
			font-size:16px;

			${media.tablet`font-size:14px;`};
		}
	}

`;

export const MovieTimeWrapper = styled.div`
	.wrapper{
		width:100%;
		max-width:1080px;
		margin:auto;
		box-sizing:border-box;
		float:left;
		min-height:500px;
		overflow:hidden;

        .grayloading{
            width: 50px;
            height: 50px;
            margin: 45px auto;
            background: url('/static/movieInfo/blackLoading.gif') no-repeat 50% 50%/ cover;

            ${media.tablet`
                margin: 60px auto;

            `};
        }

		.isEmpty{
			text-align:center;
			width:100%;
			height:150px;
			line-height:150px;
			font-size:20px;
			color:#2b2b2b;
			letter-spacing:1.5px;

			.emptyIcon{
				width:30px;
				height:30px;
				color:#2b2b2b;
				margin-right:10px;
				line-height:150px;
			}
		}

		.location{
			width:150px;
			height:48px;
			border:1px solid #dcdcdc;
			border-radius:${props=>props.visible? '2px 2px 0 0':'2px'};
			color:#000;
			line-height:48px;
			font-size:20px;
			box-sizing:border-box;
			cursor:pointer;
			padding-left:10px;

			${media.phone`width:87.5vw;`};

			.icon{
				float:right;
				width:15px;
				height:15px;
				margin:16px 20px 16px 0;
			}
		}

		.locationList{
			width:150px;
			border:1px solid #dcdcdc;
			border-radius:0 0 2px 2px;
			box-sizing:border-box;
			position:absolute;
			background-color:#fff;
			z-index:5;

			${media.phone`width:87.5vw;`};

			.list{
				height:49px;
				cursor:pointer;
				font-size:20px;
				line-height:49px;
				font-weight:300;
				box-sizing:border-box;
				padding-left:10px;

				&:hover{
					background-color:#f2f4f8;
				}
			}

		}
		.datePart{
			height:100px;
			width:701px;
			overflow:hidden;
			display:inline-flex;
			justify-content:space-between;

			${media.tablet`justify-content:flex-start;flex-direction:row;width:100%;margin:auto;`};

			.dateHidden{
				width:100%;
				min-height:100px;
				display:inline-flex;
				justify-content:flex-start;
				flex-direction:row;
				flex-wrap:wrap;
				transform: ${props=>props.datePart ? 'translateY(0%)':'translateY(-100%)'};
				transition:.3s;

				${media.phone`display:none;`};

				.datebox{
					width:70px;
					height:70px;
					margin:15px 10px 15px;
					background-color:#fff;
					border-radius:50%;
					border:1px solid #dcdcdc;
					cursor:pointer;

					&:hover{
						border:1px solid #e7008c;
					}


					${media.tablet`margin:15px 5px 15px;
						&:hover:{
							border:1px solid #dcdcdc;
						}
					`};

					.week{
						text-align:center;
						font-size:12px;
						color:#9e9e9e;
						height:22px;
						line-height:32px;
					}
					.date{
						text-align:center;
						font-size:24px;
						color:#9e9e9e;
						height:26px;
						line-height:28px;
					}
					.month{
						text-align:center;
						font-size:12px;
						color:#9e9e9e;
						height:20px;
						line-height:20px;
					}

				}
				.checked{
					background-color:#e7008c;
					border:1px solid #e7008c;

					.week,.date,.month{
						color:#fff;
					}
				}
			}
			.dateHiddenRWD{
				display:none;
				width:100%;
				height:100px;

				${media.phone`display:block;`};
				${media.xphone`height:80px;padding-top:5px;`};

				.dateboxRWD{
					width:70px !important;
					height:70px;
					margin:15px 10px 15px;
					background-color:#fff;
					border-radius:50%;
					border:1px solid #dcdcdc;
					cursor:pointer;

					${media.xphone`
						width:35px !important;
						height:35px;
						margin:15px 10px 15px;
						position:relative;
					`};

					.week{
						text-align:center;
						font-size:12px;
						color:#9e9e9e;
						height:22px;
						line-height:32px;
						${media.xphone`
							font-size:12px;
							color:#9e9e9e;
							position:absolute;
							bottom:-66%;
							width:120%;
							left:-10%;
							text-align:center;
							letter-spacing:0px;
						`};
					}
					.date{
						text-align:center;
						font-size:24px;
						color:#9e9e9e;
						height:26px;
						line-height:28px;
						${media.xphone`
							font-size:16px;
							color:#9e9e9e;
							position:absolute;
							top: 14%;
						    width: 100%;
						    text-align: center;
						`};
					}
					.month{
						text-align:center;
						font-size:12px;
						color:#9e9e9e;
						height:20px;
						line-height:20px;
						${media.xphone`
							font-size:12px;
							color:#9e9e9e;
							position:absolute;
							top:-60%;
							width:100%;
							text-align:center;
						`};
					}


					&:hover{
						border:1px solid #e7008c;

						${media.phone414`
							border:1px solid #dcdcdc;
						`}

					}

				}
				.checked{
					background-color:#e7008c;
					border:1px solid #e7008c;

					.week,.date,.month{
						color:#fff;
					}
					.week,.month{
						${media.xphone`color:#000;`};
					}

				}
				.slick-slider,.slick-list,.slick-track{
					${media.xphone`height:80px;padding-top:5px;`}
				}
			}

			.leftIcon,.rightIcon{
				width:20px;
				height:20px;
				margin:42px 5px;
				cursor:pointer;

				${media.phone`display:none;`};
			}
			.leftIcon{
				color: ${props=>props.datePart ? '#cacaca':'#2b2b2b'};
				${media.phone`display:none;`};
			}
			.rightIcon{
				color: ${props=>props.datePart ? '#2b2b2b':'#cacaca'};
				${media.phone`display:none;`};
			}


		}
		.tipsbox{
			width:31.5%;
			float:right;
			height:100px;
			display:inline-flex;
			align-content:flex-end;
			align-items:flex-end;
			justify-content:space-between;
			position:relative;

			${media.desktop`width:100%;height:30px;justify-content:flex-end;padding:0 0 10px 0;`};
			${media.phone`justify-content:space-between;`};

			.status{
				${media.xphone`display:none;`};
			}

			.text{
				font-size:12px;
				color:#3f3f3f;
				height:17px;

				${media.desktop`padding:0 15px;`};
				${media.phone`padding:0 5px;`};
				${media.xphone`padding:0 0 0 15px;`};

				span{
					display:block;
					position:absolute;
					margin:2px 0 0 -13px;
					width:12px;
					height:12px;
					border-radius:50%;
					background-color:#00b341;
				}
				.seat40{
					background-color:#ffc200;
				}
				.seat5{
					background-color:#da0000;
				}
			}
			.icon{
				cursor:pointer;
			}
		}
		.tips{
			width: 205px;
			background-color: #ffffff;
			border: solid 1px #dcdcdc;
			padding:10px;
			position:absolute;
			bottom: -85%;
			right:0;

			&:before{
				z-index: 511;
			    position:absolute;
			    right: 5px;
			    top: -5px;
			    content: "";
			    display: block;
			    width: 0px;
			    height: 0px;
			    border-style: solid;
			    border-width: 0 4px 5px;
			    border-color: transparent transparent #fff;
			}

			&:after{
		        box-sizing: content-box;
		        width: 0px;
		        height: 0px;
		        position: absolute;
		        right: 4px;
			    top: -6px;
			    padding: 0;
			    border-style: solid;
			    border-width: 0 5px 6px;
		        border-color: transparent transparent #dcdcdc;
		        display: block;
		        content:'';
		    }

			${media.desktop`bottom: -190%;`};

			.tipsText{
				font-size:12px;
				color: #3f3f3f;
				font-weight:300;
			}
			.time{
				font-size:12px;
				color: #3f3f3f;
				font-weight:300;
			}

		}


	}

`;

export const MovieTimeCinemasWrapper = styled.div`
	margin-top:10px;
	width:100%;
	min-height:500px;

	.timeWrapper{
		.gotoTop{
			position:fixed;
			height:60px;
			width:60px;
			background-color:#2b2b2b;
			right:5vw;;
			bottom:5vh;
			border-radius:50%;
			cursor:pointer;
			z-index:100;
			box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);

			.topIcon{
				width:25px;
				height:25px;
				margin: 17px;
				color:#e50a84;
			}
		}
		.cinemabox{
			width:100%;
			float:left;
			box-sizing:border-box;
			padding:28px 16px;
			border-top:1px solid #dcdcdc;

			${media.tablet`padding:28px 0px;`};
			${media.phone`border-top:1px solid #dcdcdc;`};

			.cinemaName{
				font-size:18px;
				color:#3f3f3f;
				cursor:pointer;

				.cinemaIcon{
					float:right;
					color:#dcdcdc;
					width:20px;
					height:20px;
					margin:3px;

					${media.tablet`display:none;`};
				}

			}
			.toggleBox{
				width:100%;
				float:left;
				${media.tablet`display:none;`};
			}
			.active{
				display:none;
				${media.tablet`display:block;`};
			}
			.iconActive{
				display:none;

				${media.tablet`display:block !important;`};
			}

			.sessionBox{
				width:100%;
				margin:20px 0 0 0;
				float:left;

				.version{
					float:left;
					width:135px;
					box-sizing:border-box;
					margin-right:10px;
					background-color:rgba(0,0,0,.8);
					border-radius:3px;
					text-align:center;
					font-size:16px;
					color:#fff;
					font-weight:300;
					height:30px;
					line-height:30px;

					${media.tablet`width:100px;font-size:14px;`};

				}
				.session{
					width:80%;
					float:left;
					display:inline-flex;
					justify-content:flex-start;
					flex-wrap:wrap;

					${media.tablet`width:77%;`};
					${media.phone`width:100%;margin-top:10px;`};

					.time{
						width:90px;
						padding: 5px;
						border-radius: 2px;
						border: solid 2px #f7f7f7;
						text-align:center;
						margin:0 5px 5px;
						font-weight:300;
						cursor:pointer;
						box-sizing:border-box;

						${media.phone`margin:0 5px 5px 0; `};
						${media.xphone`
							width:30%;
							margin:0 3% 5px 0;
						`};

						&:hover{
							border: solid 2px #e50a84;
							color:#e50a84;
						}

						.seats{
							float:left;
							display:block;
							width:5px;
							height:5px;
							border-radius:50%;
							background-color:#00b341;
							margin:7px 0 0 10px;
						}
						.yellow{
							background-color:#ffc200;
						}
						.red{
							background-color:#da0000;
						}
					}
				}

			}
		}
	}

`;

export const MovieTimeChoicePeopleWrapper = styled.div`
	position:fixed;
	width:100vw;
	height:100vh;
	top:0;
	left:0;
	z-index:1000;

	.box{
		z-index:500;
		position:relative;
		top:50%;
		left:50%;
		transform:translate(-50%,-50%);
		max-width:1080px;
		width:90%;
		height:480px;
		background-color:#2b2b2b;
		border-radius:2px;
		box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);

		.closeIcon{
			position:absolute;
			right:30px;
			top:30px;
			width:30px;
			height:30px;
			color:#fff;
			cursor:pointer;
			z-index:1000;

			${media.phone`
				right:20px;
				top:20px;
			`};
		}

		.informationbox{
			width:70%;
			height:200px;
			position:absolute;
			left:50%;
			transform:translateX(-50%);
			box-sizing:border-box;
			align-items:flex-end;
			display:inline-flex;
			justify-content:center;

			${media.tablet`width:80%;`};
			${media.phone`
				flex-wrap:wrap;
				align-content:space-around;
				width:80%;
				box-sizing: border-box;
    			padding: 30px 0 0;
			`};
			${media.xphone`
				width:90%;
			`};

			.info{
				max-width:200px;
				height:75px;
				border-right:1px solid #555;
				box-sizing:border-box;
				padding:10px 25px 0;

				${media.tablet`padding:10px;`};

				.infoTitle{
					font-size:12px;
					color:#adadad;
					text-align:center;
					height:20px;
					line-height:20px;
				}
				.infoText{
					font-size:16px;
					color:#fff;
					text-align:center;
					height:36px;
					font-weight:300;
					letter-spacing:1.5px;
				}
				.time{
					font-weight: 500;
					font-family: Graphik;
					font-size:20px;
				}
			}
			.last{
				border:none;
			}
			.name{
				${media.phone`width:50%;`};
			}
			.cinema{
				${media.phone`border:none;width:50%;`};
			}
			.version{
				width:130px;
				${media.phone`width:75px;`};
			}
		}

		.people{
			width:100%;
			text-align:center;
			color:#fff;
			position:relative;
			top:47%;
			font-size:18px;
			font-weight:300;
		}
		.peoplebox{
			width:100%;
			text-align:center;
			position:relative;
			top:50%;
			height:115px;

			${media.phone`height:160px;`};

			.numbox{
				width:390px;
				height:40px;
				position:absolute;
				left:50%;
				transform:translateX(-50%);
				display:inline-flex;
				justify-content:space-between;

				${media.phone`width:200px;flex-wrap:wrap;height:100px;justify-content:flex-start;`};

				.num{
					width:40px;
					height:40px;
					background-color:#3f3f3f;
					line-height:40px;
					text-align:center;
					font-size:20px;
					color:#fff;
					border-radius:50%;
					cursor:pointer;
					transition:.2s;

					${media.phone`margin:0 13px;`}

					&:hover{
						background-color:#e50a84;
						box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
					}
				}
				.numChecked{
					background-color:#e50a84;
					box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
				}

			}
			.submit{
				cursor:pointer;
				width:130px;
				height:45px;
				border-radius: 2px;
				position:absolute;
				bottom:0;
				left:50%;
				transform:translateX(-50%);
				color:#fff;
				line-height:45px;
				letter-spacing:1.5px;
				font-weight:300;
				border: solid 1px #e50a84;
				transition:.3s;


				&:hover{

				}
			}
			.submitCheck{
				background-color: #e50a84;
				box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
			}
		}
	}
	.backClickWrapper{
		position:fixed;
		top:0;
		left:0;
		width:100vw;
		height:100vh;
		background-color:rgba(0,0,0,.5);
	}

`;

export const MovieCommentWrapper = styled.div`


`;
