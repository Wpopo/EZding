import styled, { css, keyframes } from 'styled-components';
import { WrapperSample, WrapperSampleNoContent } from './commonStyled';


const sizes = {
	desktop: 1024,
	tablet: 992,
	phone: 768,
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

// loading
const rotate360 = keyframes`
	from {
		transform: rotate(0deg);
	}

	to {
		transform: rotate(360deg);
	}
`;
// clear float
export const Clearfix = styled.div`
	clear:both;
`;
export const MemberQueryWrapper = styled.div`
	width:100%;
	background-color:#3f3f3f;

	.wrapper{
		max-width:1200px;
		width:100%;
		margin:auto;
		box-sizing:border-box;
		padding:0 1%;

		${media.phone`
			padding:0;
		`}
	}
`;

export const MemberWrapper = styled.div`
	padding-top:130px;
	height:145px;

	${media.tablet`height:130px;`};
	${media.phone`
		display:${props => props.part ? 'block' : 'none'};
		padding-top:80px;
		position:relative;
		height:auto;
	`};

	.infoWrapper{
		width:100%;

		${media.desktop`height:70px;`};
		${media.phone`height:auto;padding-bottom:30px;`};

		.infoBox{
			float:left;
			width:10%;
			box-sizing:border-box;
			padding:10px 0 0 0;

			${media.desktop`width:13%;`};
			${media.tablet`width:10%;`};
			${media.phone`width:100%;`};

			.info{
				float:left;
				color:#fff;
				width:75%;
				margin:0 5px 0 0;
				font-weight:300;
				letter-spacing:1px;
				font-size:18px;

				${media.desktop`width:60%;font-size:14px;`};
				${media.tablet`width:100%;margin:0`};
				${media.phone`display:none;`};
			}
			.editIcon{
				float:left;
				width:15%;
				height:auto;
				color:#9e9e9e;
				border:1px solid #9e9e9e;
				border-radius:50%;
				box-sizing:border-box;
				padding:4px 3px;
				cursor:pointer;
				transition:.3s;

				${media.tablet`width:20px;height:20px;margin:5px;`};
				${media.phone`
					width:30px;
					height:30px;
					position:absolute;
					right:15px;
					top:75px;
				`};

				&:hover{
					color:#e7008c;
					border:1px solid #e7008c;

					${media.phone`
						color:#9e9e9e;
						border:1px solid #9e9e9e;
					`};
				}
			}
		}
		.photo{
			float:left;
			width:70px;
			height:70px;
			border-radius:50%;
			background:no-repeat 50% 50%/cover;

			${media.desktop`width:70px;height:70px;`};
			${media.tablet`width:60px;height:60px;`};
			${media.phone`
				position:relative;
				left:50%;
				top:30px;
				transform:translateX(-50%);
			`};

		}
		.file{
			cursor:pointer;
			position:relative;

			&:before{
				position: absolute;
				content: '更新頭像';
				width: 35px;
				cursor: pointer;
				color: #ffffff;
				font-size: 12px;
				left: 32%;
				top: 28%;
				line-height: 15px;
				z-index: 2;

				${media.tablet`
					top: 25%;
					left: 30%;
				`};
			}

			input{
				opacity:0;
				cursor:pointer;
				display:block;
				width:70px;
				height:70px;
				border-radius:50%;
				background:rgba(0,0,0,.5) no-repeat 50% 50%/cover;
				position: relative;
			    z-index: 2;

				${media.desktop`width:70px;height:70px;`};
				${media.tablet`width:60px;height:60px;`};
				${media.phone`
					position:relative;
				`};
			}
			.mask{
				width: 70px;
				height: 70px;
				background-color: #00000091;
				position: absolute;
				top: 0;
				border-radius: 50%;

				${media.tablet`width:60px;height:60px;`};
			}
		}
		.section{
			float:left;
			margin:10px 1% 0;
			letter-spacing:1px;

			${media.phone`
				width:100%;
				box-sizing:border-box;
				padding:0 20%;
			`};

			${media.xphone`
				padding:0 15%;
			`};


			.title{
				font-size:12px;
				color:#cacaca;
				text-align:left;
				font-weight:300;
				height:17px;

				${media.phone`
					width:100%;
					height:30px;
					line-height:45px;
				`};
			}

			.content{
				font-size:16px;
				color:#fff;
				text-align:left;
				margin:10px 0 0 0;
				height:18px;

				${media.phone`
					width:100%;
					height:30px;
					font-weight:300;
					margin:5px 0 0 0;
				`};
			}
			input{
				width:100%;
				background:transparent;
				border:none;
				margin-top:10px;
				border-bottom:1px solid #555;
				caret-color:#e50a84;
				text-align:left;
				font-size:16px;
				color:#fff;
				font-weight:300;
				letter-spacing:1px;

				${media.desktop`font-size:12px;`};
				${media.phone`
					font-size:16px;
					text-align:center;
					height:27px;
					margin-top:5px;
				`};

				&:focus{
					outline:none;
					border-bottom: solid 1px #e50a84;
				}
			}
			.submit,.cancel{
				width:100%;
				height:20px;
				border:1px solid #e50a84;
				border-radius:3px;
				color:#fff;
				background-color:#e50a84;
				line-height:20px;
				font-size:14px;
				letter-spacing:1.5px;
				cursor:pointer;
				font-weight:300;
				position:relative;
				text-align:center;

				${media.phone`
					width:47%;
					float:left;
					margin:1%;
					height:30px;
					line-height:30px;
				`}

				.loadingIcon{
					position:absolute;
					color:#fff;
					width:14px;
					height:14px;
					margin:3px;
					animation: ${rotate360} 1s infinite;

					${media.phone`margin:8px;`}
				}
			}
			.cancel{
				margin:5px 0 0 0;
				color:#9e9e9e;
				border:1px solid #9e9e9e;
				background-color:transparent;
				${media.phone`margin:1%;`}
			}

		}
		.name{
			width:15%;
			margin:10px 1% 0;

			${media.desktop`width:10%;margin:10px 1% 0;`};
			${media.phone`
				width:100%;
				margin:10px 0 0;
			`};
			.title{
				${media.phone`display:none;`};
			}
			.content{
				${media.phone`
					text-align:center;
					font-weight:300;
					margin-top:30px;
				`};
			}
			input{
				${media.phone`
					width:30%;
					position:relative;
					left:50%;
					transform:translateX(-50%);
					margin-top:30px;
				`};
			}
		}
		.mail{
			width:25%;

			${media.desktop`width:20%;`};
			${media.phone`
				width:100%;
				margin:10px 0 0;
			`};
			input{
				text-align:left;
			}
		}
		.birthday{
			width:150px;
			${media.phone`
				width:100%;
				margin:10px 0 0;
			`};

			input{
				text-align:left;
			}
		}
		.card{
			width:13%;
			${media.desktop`width:13%;`};
			${media.phone`
				width:100%;
				margin:10px 0 0;
			`};

			input{
				text-align:left;
			}
		}
		.submitbox{
			float:right;
			margin:10px 0;
			width:7%;

			${media.tablet`width:8%;`};
			${media.phone`
				width:100%;
				margin:5% auto;
			`};
		}

		#pickerMember{
			caret-color: transparent;
			color: transparent;
			text-shadow: 0 0 0 #fff;
		}

		.react-datepicker-wrapper{
			width:100%;
			padding:0;
			display:block;

			.react-datepicker__input-container{
				display:block;
			}
		}

		.react-datepicker{
			border:none;
		}
		.react-datepicker__month{
			margin:10px 20px 20px;
		}

		.react-datepicker__navigation{
			top:54px;
			${media.phone`top:46px !important;`};
		}

		.react-datepicker__navigation--previous{
			display:none;
		}
		.react-datepicker__navigation--next{
			display:none;
		}

		.react-datepicker__year-read-view--selected-year{
			color:#fff;
			padding:20px 0;
		}

		.react-datepicker__header{
			background-color:#000;
			border:none;
			padding-top: 12px;
		}

		.react-datepicker__current-month{
		}

		.react-datepicker__day-name{
			color:#fff;
			font-weight:300;
		}
		.react-datepicker-popper{
			${media.phone`
				left:50% !important;
				transform: translate3d(-50%, 153px, 0px) !important;
			`};
		}
		.react-datepicker__triangle{
			${media.phone`display:none`};
		}


		.react-datepicker__month-container{
			background-color:#000;
			transform:scale(1.2) translateY(8%);

			${media.phone`transform:scale(1);`};
		}

		.react-datepicker__day--selected{
			background-color:#e7008c !important;
			border: 1px solid #000 !important;
			border-radius:50%;
			color:#fff !important;

		}
		.react-datepicker__day{
			color:#fff;
			font-weight:300;
			border: 1px solid #000;
			border-radius: 50%;

			&:hover{
				border-radius: 50%;
				color: #fff;
				background-color: #000000;
				border: 1px solid #fff;

			}
		}
		.react-datepicker__year-dropdown-container,.react-datepicker__month-dropdown-container{
			margin:0;
			padding:5px;
		}
		.react-datepicker__month-read-view,.react-datepicker__year-read-view{
			background-color:#434343;
			border-radius:0px;
			padding: 5px 10px;
			border:none;
			height:20px;
			line-height:20px;
		}
		.react-datepicker__month-read-view--selected-month,.react-datepicker__year-read-view--selected-year{
			color:#fff;
			font-weight:300;
			font-size:1rem;
		}
		.react-datepicker__day--today{
			background-color:#000;
			border-radius:50%;
		}
		.react-datepicker-popper[data-placement^="top"]{

			.react-datepicker__triangle{
				border-bottom-color:#000;

				&::before{
					border-top-color:#000 !important;
					bottom: 0px;
				}
			}

		}
		.react-datepicker-popper[data-placement^="bottom"]{

			.react-datepicker__triangle{
				border-bottom-color:#000;

				&::before{
					border-top-color:#000 !important;
				}
			}
		}
		.react-datepicker__month-read-view--down-arrow,.react-datepicker__year-read-view--down-arrow{
			border-top-color: #fff;
			border-width: 0.25rem;

		}
		.react-datepicker__day-names div:nth-child(1),.react-datepicker__day-names div:nth-child(7){
			color:#e7008c;
		}
		.react-datepicker__navigation--years-previous{
			top: initial;
		    bottom: 2%;
		    left: 7%;
		}
		.react-datepicker__navigation--years-upcoming{
		    top: 11%;
		    left: 7%;
		}
		.react-datepicker__year-dropdown--scrollable,.react-datepicker__month-dropdown--scrollable{
			height:260px;
			box-sizing:border-box;
			padding:5px;
		}
	}
	.phone{
		height:50px;
		border-radius: 8px;
  		background-color: #2b2b2b;
  		margin-top:10px;
  		box-sizing:border-box;
  		padding:0 10px 0 15px;
  		font-size:16px;

  		${media.tablet`font-size:14px;`};
  		${media.phone`width:60%;margin:10px 20%;`};
		${media.xphone`width:80%;margin:10px 10%;`};

  		.text{
  			float:left;
  			color:#cacaca;
  			font-size:16px;
  			font-weight:300;
  			line-height:50px;
  			letter-spacing:1.5px;

  			${media.tablet`font-size:14px;`};
  			${media.phone`font-size:14px;`};

  			span{
  				margin-right:12px;
  				letter-spacing:1px;
  				font-weight:300;

  				${media.phone`font-size:16px;`};
  			}
  		}
  		.pswBtn{
  			float:right;
  			width:90px;
  			height:30px;
  			margin:10px 0;
  			line-height:30px;
  			font-size:16px;
  			color:#fff;
  			text-align:left;
  			border:0.7px solid #8e8e8e;
  			text-align:center;
  			border-radius: 1.5px;
  			letter-spacing:1.5px;
  			font-weight:300;
  			cursor:pointer;

  			${media.tablet`font-size:14px;`};
  			${media.phone`width:80px;font-size:12px;`};

  		}
	}
`;


export const MemberBonusWrapper = styled.div`
	float:left;
	width:28%;

	${media.phone`
		width:100%;
		margin-top:60px;
		display:${props => props.part ? 'block' : 'none'};
	`};


	.bonusWrapper{
		width: 100%;
		height: 260px;
		border-radius: 8px;
		background-color: #e50a84;
		box-sizing:border-box;
		padding:18px;
		position:relative;
		cursor: pointer;

		${media.phone`
			padding:0;
			height:60px;
			border-radius: 0;
		`};

		.titlebox{
			width:100%;
			height:30px;

			${media.phone`display:none;`}

			.title{
				color:#fff;
				font-size:18px;
				float:left;
				font-weight:300;
			}
			.tips{
				width:20px;
				height:20px;
				cursor:pointer;
				margin:3px 5px;
			}
			.tipsBox{
				width:200px;
				height:80px;
				font-size:12px;
				color:#3f3f3f;
				box-sizing:border-box;
				padding:10px;
				position:absolute;
				background-color:#fff;
				border: solid 1px #dcdcdc;
				border-radius:3px;

				&:before{
					z-index:5;
				    position:absolute;
				    left:83px;
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
			        left:82px;
				    top: -6px;
				    padding: 0;
				    border-style: solid;
				    border-width: 0 5px 6px;
			        border-color: transparent transparent #dcdcdc;
			        display: block;
			        content:'';
			    }
			}
			.listBtn{
				float:right;
				width:22px;
				height:22px;
				cursor:pointer;
			}
			.listtxt{
				float:right;
				color:#fff;
				font-size:14px;
				font-weight:300;
				cursor:pointer;

				${media.tablet`display:none;`};
			}
		}

		.titleboxRWD{
			display:none;

			${media.phone`
				display:block;
			`};
		}
		.sumPoint{
			width:157px;
			height:157px;
			margin:20px auto 0;
			border:3px solid #fff;
			border-radius:50%;

			${media.phone`display:none;`}

			.point{
				color:#fff;
				text-align:center;
				width:100%;
				font-size:44px;
				height:100px;
				font-weight:300;
				line-height:150px;
				letter-spacing:1.5px;
				font-family: HelveticaNeueLTPro-ThEx;
			}
			span{
				display:block;
				width:100%;
				text-align:center;
				font-size:14px;
				color:#fff;
				font-weight:300;
			}
		}
		.sumPointRWD{
			display:none;

			${media.phone`
				display:block;
			`};
			.icon{
				width:20px;
				height:20px;
				margin:20px;
				float:left;
			}
			.text{
				color:#fff;
				font-family: MicrosoftJhengHei;
  				font-size: 14px;
				float:left;
  				height:60px;
  				line-height:60px;
  				font-weight:300;
  				margin-right:10px;
  				letter-spacing:1.5px;

  				${media.xphone`font-size:12px;`};
			}
			.point{
				float:left;
				font-family: HelveticaNeueLTPro-LtEx;
  				font-size: 18px;
  				color:#fff;
  				height:60px;
  				line-height:60px;
  				font-weight:300;
  				margin-right:10px;
  				letter-spacing:1.5px;

  				${media.xphone`font-size:16px;`};
			}
			.tips{
				width:15px;
				height:14px;
				margin: 23px -8px;
			}
			.dot{
				font-size:12px;
			}
		}
	}
`;

export const MemberTicketWrapper = styled.div`
	float:left;
	margin-left:1.5%;
	width:28.5%;

	${media.phone`
		display:${props => props.part ? 'block' : 'none'};
		width:100%;
		margin:0;
		margin-top:80px;
		box-sizing:border-box;
		padding:10px;
	`};

	.ticketWrapper{
		width: 100%;
		height: 260px;
		border-radius: 8px;
		background-color: #2b2b2b;
		box-sizing:border-box;
		padding:18px;
		position:relative;

		.titlebox{
			width:100%;
			height:30px;

			.title{
				color:#fff;
				font-size:18px;
				float:left;
				font-weight:300;
			}
			.tips{
				width:20px;
				height:20px;
				cursor:pointer;
				margin:3px 5px;
			}
			.tipsBox{
				width:210px;
				font-size:12px;
				color:#3f3f3f;
				box-sizing:border-box;
				padding:10px;
				position:absolute;
				background-color:#fff;
				border: solid 1px #dcdcdc;
				border-radius:3px;

				&:before{
					z-index:5;
				    position:absolute;
				    left:100px;
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
			        left:99px;
				    top: -6px;
				    padding: 0;
				    border-style: solid;
				    border-width: 0 5px 6px;
			        border-color: transparent transparent #dcdcdc;
			        display: block;
			        content:'';
			    }
			}

			.listBtn{
				display:block;
				float:right;
				width:22px;
				height:22px;
				cursor:pointer;
				${media.phone`display:none;`};
			}
			.listtxt{
				float:right;
				color:#fff;
				font-size:14px;
				font-weight:300;
				cursor:pointer;

				${media.tablet`display:none;`};
			}
		}
		.box{

			input{
				display:block;
				margin:30px auto 20px;
				width:94%;
				height:40px;
				background-color:#2b2b2b;
				text-align:center;
				border:none;
				border-bottom:2px solid #e50a84;
				font-weight:300;
				font-size:18px;
				color:#fff;

				&:focus{
					outline:none;
				}
			}
			.submit{
				border-radius:2px;
				background-color:#e7008c;
				width:94%;
				height:40px;
				line-height:40px;
				margin:0 auto 10px;
				text-align:center;
				font-size:18px;
				font-weight:300;
				letter-spacing:1.5px;
				color:#fff;
				border:1px solid #e7008c;
				cursor:pointer;
			}
			.alert{
				color:#e7008c;
				text-align:center;
			}
		}
	}

`;

export const MemberRecordWrapper = styled.div`
	float:left;
	margin-left:1.5%;
	width:40.5%;

	${media.phone`display:${props => props.part ? 'block' : 'none'};`};

	.recordWrapper{
		width: 100%;
		height: 260px;
		border-radius: 8px;
		background-color: #2b2b2b;
		box-sizing:border-box;
		padding:18px;
		position:relative;

		.titlebox{
			width:100%;
			height:30px;

			.title{
				color:#fff;
				font-size:18px;
				float:left;
				font-weight:300;
			}
			.tips{
				width:20px;
				height:20px;
				cursor:pointer;
				margin:3px 5px;
			}
			.tipsBox{
				width:200px;
				font-size:12px;
				color:#3f3f3f;
				box-sizing:border-box;
				padding:10px;
				position:absolute;
				background-color:#fff;
				border: solid 1px #dcdcdc;
				border-radius:3px;

				&:before{
					z-index:5;
				    position:absolute;
				    left:82px;
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
			        left:81px;
				    top: -6px;
				    padding: 0;
				    border-style: solid;
				    border-width: 0 5px 6px;
			        border-color: transparent transparent #dcdcdc;
			        display: block;
			        content:'';
			    }
			}

			.listBtn{
				float:right;
				width:22px;
				height:22px;
				cursor:pointer;
			}
			.listtxt{
				float:right;
				color:#fff;
				font-size:14px;
				font-weight:300;
				cursor:pointer;

				${media.tablet`display:none;`};
			}
		}

		.recordbox{
			margin-top:10px;

			.poster{
				float:left;
				width: 134px;
	  			height: 180px;
	  			background:#3f3f3f no-repeat 50% 50%/cover;

	  			${media.tablet`
	  				width:33%;
					height:150px;
	  			`};
			}
			.record{
				float:left;
				width:60%;
				height:180px;
				margin-left: 2%;
				box-sizing:border-box;
				padding:5px;

				${media.tablet`width:65%;`};

				.box{
					width:100%;

					.title{
						width:30%;
						font-size:12px;
						color:#9e9e9e;
						float:left;
						height:20px;
						line-height:25px;

						${media.tablet`width:32%;`};
					}
					.content{
						width:70%;
						float:left;
						color:#e50a84;
						font-size:18px;
						height:20px;
						line-height:25px;

						${media.tablet`font-size:14px;width:68%;`};
					}
				}
				.movie{
					float:left;
					width:100%;
					color:#fff;
					font-weight:300;
					font-size:16px;
					margin-top:20px;
					height:20px;
					overflow:hidden;

					${media.tablet`font-size:14px;`};
				}
				.date,.time{
					float:left;
					color:#fff;
					font-size:16px;
					margin:5px 5px 5px 0;
					font-family: Helvetica;
					letter-spacing:1px;

					${media.tablet`font-size:14px;`};
				}
				.cinema{
					width:100%;
					float:left;
					margin:10px 0;

					.title{
						width:17%;
						font-size:12px;
						float:left;
						color:#9e9e9e;
						height:20px;
						line-height:20px;
					}
					.content{
						width:100%;
						font-size:16px;
						color:#fff;
						height:20px;
						line-height:20px;
						font-weight:300;

						${media.tablet`font-size:12px;`};
					}
				}
				.seats{
					width:100%;
					float:left;
					vertical-align:bottom;

					.title{
						width:17%;
						font-size:12px;
						float:left;
						color:#9e9e9e;
					}
					.content{
						width:83%;
						font-size:16px;
						color:#fff;
						font-weight:300;

						${media.tablet`font-size:12px;`};
					}
				}
			}
		}
	}

`;

export const MemberBonusListWrapper = styled.div`
	display:${props => props.part ? 'block' : 'none'};
	width:100%;
	margin:15px auto;
	min-height: 200px;
	border-radius: 8px;
	background-color: #2b2b2b;
	float:left;
	box-sizing:border-box;
	padding:20px;
	position:relative;

	${media.phone`
		margin:0 auto;
		background-color:transparent;
		height:auto;
		padding:10px;
	`};

	${media.xphone`
		height:auto;
		min-height:200px;
	`}

	&:before{
		z-index:5;
	    position:absolute;
	    left: 158px;
   		top: -11px;
	    content: "";
	    display: block;
	    width: 0px;
	    height: 0px;
	    border-style: solid;
	    border-width: 0 10px 12px;
	    border-color: transparent transparent #2b2b2b;

	    ${media.phone`display:none`};
	}

	.title{
		width:100%;
		font-size:18px;
		text-align:left;
		color:#fff;
		font-weight:300;
	}
	.tabBox{
		width:90%;
		margin:2% 5% 0;
		border-bottom:2px solid #8e8e8e;
		display: flex;
		justify-content: space-between;
		align-items: center;

		${media.phone`
			width:100%;
			height:100%;
			border-radius:8px;
			border:none;
			margin:0;
			background-color:#2b2b2b;
		`};

		${media.xphone`
			position: relative;
			min-height: 165px;
			justify-content: flex-start;
			align-items:flex-start;
		`};

		.tab{
			margin-bottom: -2px;
		    font-size: 16px;
		    color: #9e9e9e;
		    width: 50vw;
		    height: 48px;
		    line-height: 48px;
		    text-align: left;
		    font-weight: 300;
		    cursor: pointer;
			border-bottom:3px solid transparent;

			${media.phone`display:none`};
		}
		.active{
			border-bottom:3px solid #e7008c;
			color:#fff;

		}

		.date{
			display: block;
			width:120px;
			height:30px;
			background-color: #3f3f3f;
			border:none;
			text-align:center;
			font-size:16px;
			color: #9e9e9e;

			${media.phone`
				display: block;
				width:100%;
				height:40px;
				margin-top: 20px;
				margin-bottom: 20px;
			`};

			${media.xphone`
				display: block;
				width:100%;
				height:45px;
				margin-top: 20px;
				margin-right: 5vw;
				font-size:15px;
			`};
		}
		.dateBox{
			cursor:pointer;
			display:block;

			${media.phone`
				display:block;
				width: 95px;
				margin-left: 5vw;
				margin-right: 5vw;
			`}
			${media.xphone`
				display:block;
				width: 95px;
				margin-left: 0vw;
				margin-right: 6vw;
			`}
		}
		.right{
			${media.phone`
				width: 95px;
			    margin-left: 4vw;
			`}
			${media.xphone`
				width: 95px;
			    margin-left: 9vw;
				margin-right: 10vw;
			`}
		}
		.to{
			background-color: #707070;
		    height: 2px;
			width:10px;
			margin-left: 10px;
			margin-right: 10px;

			${media.phone`

			`};

			${media.xphone`
			    width: 20px;
			    margin: 0px;
			    margin-top: 40px;
				margin-right: 8vw;
			`};

		}
		.submit{
			width:90px;
			height:30px;
			border-radius: 1.4px;
  			border: solid 0.7px #8e8e8e;
  			color:#fff;
  			text-align:center;
  			line-height:30px;
  			font-weight:300;
  			margin-left:10px;
  			cursor:pointer;

  			${media.phone`
				width:15%;
				height:40px;
				line-height:40px;
				margin-right: 9vw;
			`};

			${media.xphone`
				width:82%;
				height:45px;
				line-height:45px;
				margin: 10px 32px 30px;
				position:absolute;
				bottom:0;
			`};

		}
		.react-datepicker-wrapper{
			width:100%;
			padding:0;
			display:block;
		}

		.react-datepicker{
			border:none;
		}

		.react-datepicker__input-container{
			${media.phone`width:100%;`};
		}
		.react-datepicker__month{
			margin:10px 20px 20px;
		}

		.react-datepicker__navigation{
			top:54px;
			${media.phone`top:46px !important;`};
		}

		.react-datepicker__navigation--previous{
			display:none;
		}
		.react-datepicker__navigation--next{
			display:none;
		}

		.react-datepicker__year-read-view--selected-year{
			color:#fff;
			padding:20px 0;
		}

		.react-datepicker__header{
			background-color:#000;
			border:none;
			padding-top: 12px;
		}

		.react-datepicker__current-month{
		}

		.react-datepicker__day-name{
			color:#fff;
			font-weight:300;
		}
		.react-datepicker-popper{
			${media.phone`
				left:50% !important;
				transform: translate3d(-50%, 75px, 0px) !important;
			`};
		}
		.react-datepicker__triangle{
			${media.phone`display:none`};
		}

		.react-datepicker__month-container{
			background-color:#000;
			transform:scale(1.2) translateY(8%);

			${media.phone`transform:scale(1);`};
		}

		.react-datepicker__day--selected{
			background-color:#e7008c !important;
			border: 1px solid #000 !important;
			border-radius:50%;
			color:#fff !important;

		}
		.react-datepicker__day{
			color:#fff;
			font-weight:300;
			border: 1px solid #000;
			border-radius: 50%;

			&:hover{
				border-radius: 50%;
				color: #fff;
				background-color: #000000;
				border: 1px solid #fff;
			}
		}
		.react-datepicker__year-dropdown-container,.react-datepicker__month-dropdown-container{
			margin:0;
			padding:5px;
		}
		.react-datepicker__month-read-view,.react-datepicker__year-read-view{
			background-color:#434343;
			border-radius:0px;
			padding: 5px 10px;
			border:none;
			height:20px;
			line-height:20px;
		}
		.react-datepicker__month-read-view--selected-month,.react-datepicker__year-read-view--selected-year{
			color:#fff;
			font-weight:300;
			font-size:1rem;
		}
		.react-datepicker__day--today{
			background-color:#000;
			border-radius:50%;
		}
		.react-datepicker-popper[data-placement^="top"]{

			.react-datepicker__triangle{
				border-bottom-color:#000;

				&::before{
					border-top-color:#000 !important;
					bottom: 0px;
				}
			}

		}
		.react-datepicker-popper[data-placement^="bottom"]{

			.react-datepicker__triangle{
				border-bottom-color:#000;

				&::before{
					border-top-color:#000 !important;
				}
			}
		}
		.react-datepicker__month-read-view--down-arrow,.react-datepicker__year-read-view--down-arrow{
			border-top-color: #fff;
			border-width: 0.25rem;

		}
		.react-datepicker__day-names div:nth-child(1),.react-datepicker__day-names div:nth-child(7){
			color:#e7008c;
		}
		.react-datepicker__navigation--years-previous{
			top: initial;
		    bottom: 2%;
		    left: 7%;
		}
		.react-datepicker__navigation--years-upcoming{
		    top: 11%;
		    left: 7%;
		}
		.react-datepicker__year-dropdown--scrollable,.react-datepicker__month-dropdown--scrollable{
			height:260px;
			box-sizing:border-box;
			padding:5px;
		}
	}

	.empty{
		width:200px;
		text-align:center;
		color:#dcdcdc;
		letter-spacing:1.5px;
		font-weight:300;
		font-size:16px;
		height:150px;
		float:left;
		position:relative;
		left:50%;
		transform:translateX(-50%);
		line-height:50px;

		${media.phone`margin-top:30px;`};

		.icon{
			width:20px;
			height:150px;
			color:#fff;
			top:15px;
			animation: ${rotate360} 1s infinite;
		}
		.iconEmpty{
			width:20px;
			height:150px;
			color:#fff;
			top:15px;
		}
	}
	.tabRWD{
		display:none;
		width:100%;
		margin:10px auto;
		border-bottom:2px solid #555;
		float:left;
		${media.phone`display:block;`};

		.tab{
			color:#fff;
			font-size:14px;
			width:90px;
			height:40px;
			line-height:40px;
			text-align:center;
			float:left;
			margin-bottom:-2px;
			border-bottom:2px solid #e7008c;
		}
	}
	.pages{
		margin-top:50px;

		${media.phone`display:none;`};
	}

	.scroll{
		width:100%;
		margin:0 auto 20px;
		cursor:pointer;
		display:none;

		${media.phone`display:block`};

		.icon{
			position:relative;
			left:50%;
			transform:translateX(-50%);
			color:#f2f4f8;
		}
		.load{
			position:relative;
			left:50%;
			transform:translateX(-50%);
			color:#f2f4f8;
			animation: ${rotate360} 1s infinite;
		}
	}
	.onTop{
		display:none;
		${media.phone`
			display:block;
			width:50px;
			height:50px;
			position:fixed;
			right:20px;
			bottom:20px;
			border-radius:50%;
			background-color:#e7008c;
			cursor:pointer;
		`};

		.icon{
			width:20px;
			height:20px;
			color:#fff;
			margin:15px;
		}
	}
`;

export const MemberTicketListWrapper = styled.div`
	display:${props => props.part ? 'block' : 'none'};
	width:100%;
	margin:15px auto 3%;
	min-height: 200px;
	border-radius: 8px;
	background-color: #2b2b2b;
	float:left;
	box-sizing:border-box;
	padding: 20px;
	position:relative;

	${media.phone`
		margin:0 auto;
		background-color:transparent;
		height:auto;
		padding:10px;
		min-height: auto;
	`};

	${media.xphone`
		height:auto;
		min-height:200px;
	`}

	&:before{
		z-index:5;
	    position:absolute;
	    left: 43%;
   		top: -11px;
	    content: "";
	    display: block;
	    width: 0px;
	    height: 0px;
	    border-style: solid;
	    border-width: 0 10px 12px;
	    border-color: transparent transparent #2b2b2b;

	    ${media.phone`display:none`};
	}
	.title{
		width:100%;
		font-size:18px;
		text-align:left;
		color:#fff;
		font-weight:300;

		${media.phone`display:none;`}
	}
	.tabBox{
		width:90%;
		margin:2% 5% 0;
		float:left;
		border-bottom:2px solid #8e8e8e;

		${media.phone`
			width:100%;
			height:40px;
			border:none;
			margin:0 0 10px;
			background-color:transparent;
			border-bottom:2px solid #8e8e8e;
		`};

		${media.xphone`
			position:relative;
			min-height:auto;
		`};

		.ticketTab{
			margin-bottom:-2px;
			font-size:16px;
			color:#9e9e9e;
			float:left;
			width:100px;
			height:48px;
			line-height:48px;
			text-align:center;
			font-weight:300;
			cursor:pointer;
			border-bottom:3px solid transparent;

			${media.phone`
				width:calc(100% / 3);
				height:40px;
				line-height:40px;
			`};

		}
		.active{
			border-bottom:3px solid #e7008c;
			color:#fff;
		}
	}
	.pages{
		margin-top:50px;

		${media.phone`display:none;`};
	}

	.scroll{
		width:100%;
		cursor:pointer;
		display:none;
		margin:0 auto 20px;

		${media.phone`display:block`};

		.icon{
			position:relative;
			left:50%;
			transform:translateX(-50%);
			color:#f2f4f8;
		}
		.load{
			position:relative;
			left:50%;
			transform:translateX(-50%);
			color:#f2f4f8;
			animation: ${rotate360} 1s infinite;
		}
	}
	.onTop{
		display:none;
		${media.phone`
			display:block;
			width:50px;
			height:50px;
			position:fixed;
			right:20px;
			bottom:20px;
			border-radius:50%;
			background-color:#e7008c;
			cursor:pointer;
		`};

		.icon{
			width:20px;
			height:20px;
			color:#fff;
			margin:15px;
		}
	}

	.empty{
		float:left;
		text-align:center;
		margin:30px auto 0;
		color:#dcdcdc;
		font-size:16px;
		letter-spacing:1.5px;
		position:relative;
		left:50%;
		transform:translateX(-50%);

		${media.phone`
			margin:50px auto;
		`};

		img{
			width:30px;
			height:20px;
			position:absolute;
			left:-50px;
		}
	}
`;

export const MemberRecordListWrapper = styled.div`
	display:${props => props.part ? 'block' : 'none'};
	width:100%;
	margin:15px auto 3%;
	min-height: 200px;
	border-radius: 8px;
	background-color: #2b2b2b;
	float:left;
	box-sizing:border-box;
	padding: 20px;
	position:relative;

	${media.phone`
		display:${props => props.infor ? 'none' : 'block'};
		margin:110px auto 0;
		background-color:transparent;
		height:auto;
		padding:0px 5%;
		width:100%;
		min-height: auto;
		box-sizing:border-box;
	`};

	${media.xphone`
		height:auto;
		min-height:200px;
	`}

	&:before{
		z-index:5;
	    position:absolute;
	    left: 70%;
   		top: -11px;
	    content: "";
	    display: block;
	    width: 0px;
	    height: 0px;
	    border-style: solid;
	    border-width: 0 10px 12px;
	    border-color: transparent transparent #2b2b2b;

	    ${media.phone`display:none`};
	}
	.title{
		width:100%;
		font-size:18px;
		text-align:left;
		color:#fff;
		font-weight:300;

		${media.phone`display:none;`}
	}
	.tabBox{
		width:90%;
		margin:2% 5% 0;
		float:left;
		border-bottom:2px solid #8e8e8e;

		${media.phone`
			width:100%;
			height:40px;
			border:none;
			margin:0 0 10px;
			background-color:transparent;
			border-bottom:2px solid #8e8e8e;
		`};

		${media.xphone`
			position:relative;
			min-height:auto;
		`};

		.recordTab{
			margin-bottom:-2px;
			font-size:16px;
			color:#9e9e9e;
			float:left;
			width:100px;
			height:48px;
			line-height:48px;
			text-align:center;
			font-weight:300;
			cursor:pointer;
			border-bottom:3px solid transparent;

			${media.phone`
				width:calc(100% / 2);
				height:40px;
				line-height:40px;
			`};

		}
		.tabInvoice{
			color: #ffffff;
			font-size: 16px;
			position: absolute;
			right: 72px;
			cursor: pointer;
			display: flex;
			align-items: center;
			height: 60px;

			&:after{
				content: "";
				display: inline-block;
				width: 32px;
				height: 32px;
				background-image: url("../../static/member/iconInvoice.png");
				background-size: cover;
				background-position: center;
			}
			${media.phone`
				top: -50px;
				right: 20px;
			`};
			${media.xphone`
				top: -50px;
				right: -6px;
			`};
		}
		.active{
			border-bottom:3px solid #e7008c;
			color:#fff;
		}
	}
	.pages{
		margin-top:50px;

		${media.phone`display:none;`};
	}

	.scroll{
		width:100%;
		cursor:pointer;
		display:none;
		margin:0 auto 20px;

		${media.phone`display:block`};

		.icon{
			position:relative;
			left:50%;
			transform:translateX(-50%);
			color:#f2f4f8;
		}
		.load{
			position:relative;
			left:50%;
			transform:translateX(-50%);
			color:#f2f4f8;
			animation: ${rotate360} 1s infinite;
		}
	}
	.onTop{
		display:none;
		${media.phone`
			z-index:10;
			display:block;
			width:50px;
			height:50px;
			position:fixed;
			right:20px;
			bottom:80px;
			border-radius:50%;
			background-color:#e7008c;
			cursor:pointer;
		`};

		${media.phone414`
			bottom:55px;
		`};

		.icon{
			width:20px;
			height:20px;
			color:#fff;
			margin:15px;
		}
	}

	.empty{
		float:left;
		text-align:center;
		margin:30px auto 0;
		color:#dcdcdc;
		font-size:16px;
		letter-spacing:1.5px;
		position:relative;
		left:50%;
		transform:translateX(-50%);

		${media.phone`
			margin:50px auto;
		`};

		img{
			width:30px;
			height:20px;
			position:absolute;
			left:-50px;
		}
	}

`;

export const DetailWrapper = styled.div`
	float:left;
	margin:0 5% 3%;
	width:90%;

	${media.phone`
		width:100%;
		margin:0;
		float:left;
	`};

	.detailWrapper{

		${media.phone`
			display:none;
			float:left;
			width:100%;
		`};

		.cancelAlert{
			position: fixed;
			width: 100vw;
			height: 100vh;
			top: 0;
			left: 0;
			opacity: 0.6;
			background-color: #000;
			z-index: 202;
		}
		.cancelBox{
			width: 280px;
			height: 162px;
			border-radius: 8px;
			background-color: #fff;
			position: fixed;
			top: 50%;
			left: 50%;
			margin-left: -140px;
			margin-top: -81px;
			color: #000000;
			z-index: 202;

			.mainText{
				font-size: 18px;
				font-weight: 600;
				margin: 28px 0 5px 24px;
			}
			.subText{
				font-size: 14px;
				margin: 0 0 29px 24px;
			}
			.btnArea{
				display: flex;
				border-top: 1px solid #e3e3e3;

				.btn{
					font-size: 14px;
					width: 140px;
					height: 53px;
					text-align: center;
					line-height: 53px;
					cursor: pointer;
					font-weight: bold;
				}
				.btn:first-child{
					color: #e50081;
					border-right: 1px solid #e3e3e3;
				}
			}
		}

		.resultTitle{
			width:100%;
			height:40px;
			background-color:#313131;

			.bonusText{
				color:#b4b4b4;
				font-size:12px;
				line-height:40px;
				width:55%;
				float:left;
				height:40px;
				text-align:left;
				box-sizing:border-box;
				padding-left:3%;
				font-weight:300;
			}
			.recordMovie{
				width:10%;
			}
			.recordName{
				width:35%;
				overflow:hidden;
			}
			.date{
				text-align:center;
				padding-right:2%;
				width:15%;
			}
			.bonus,.num{
				text-align:right;
				padding-right:2%;
				width:15%;
			}
			.recordMore{
				width:10%;
				text-align:center;
			}
		}
		.resultBox{
			min-height:60px;
			width:100%;
			float:left;
			border-bottom:1px solid #3f3f3f;

			${media.phone`
				width:100%;
				height:150px;
				margin-bottom:10px;
				border:none;
				border-radius: 8px;
  				background-color: #2b2b2b;
  				box-sizing:border-box;
  				position:relative;
			`};

			.title{
				width:${props => props.ticket ? '0%' : '20%'};
				float:left;
				line-height:60px;
				height:60px;
				text-align:left;
				box-sizing:border-box;
				padding-left:3%;
				color:#fff;
				font-size:18px;
				font-weight:300;

				${media.phone`
					padding:0;
					height:auto;
					line-height:1;
					position:absolute;
					left:15px;
					top:15px;
				`};
				${media.xphone`
					width:30%;
				`};
			}
			.recordMovie{
				width:10%;
				padding-left:0;

				${media.phone`
					display:block;
					position:absolute;
					width:46px;
					height:62px;
					left:15px;
				`}

				.poster{
					width:40px;
					height:60px;
					margin:auto;
					background:#3f3f3f no-repeat 50% 50%/cover;

					${media.phone`
						width:46px;
						height:62px;
					`}
				}
			}
			.detail{
				float:left;
				width:${props => props.ticket ? '52%' : '35%'};
				line-height:60px;
				height:60px;
				text-align:left;
				color:#fff;
				font-weight:300;
				font-size:14px;

				${media.phone`
					width:92.5%;
					padding:0;
					height:auto;
					line-height:1;
					position:absolute;
					left:15px;
					top:50px;
					overflow:hidden;
					font-size:12px;
				`};
			}
			.recordName{
				box-sizing: border-box;
    			padding-left: 3%;
    			overflow:hidden;

    			${media.phone`
					font-size:15px;
					top:15px;
					left:75px;
					padding:0;
					width:80%;
					overflow:hidden;
    			`};
    			${media.phone414`display:none;`};
    			${media.xphone`
					font-size:14px;
					height:14px;
					width:74%;
					overflow:hidden;
    			`}
			}
			.recordNameRWD{
				display:none;
				${media.phone414`display:block;`}
			}
			.bonus{
				float:left;
				width:15%;
				box-sizing:border-box;
				padding-right:2%;
				height:60px;

				${media.phone`
					padding:0;
					height:auto;
					position:absolute;
					right:${props => props.ticket ? 'initial' : '15px'};
					left:${props => props.ticket ? '15px' : 'initial'};
					top:15px;
					width:50%;
				`};

				.icon{
					float:right;
					font-size:14px;
					color:#fff;
					height:60px;
					width:20px;

					${media.phone`
						height:30px;
						line-height:30px;
					`};
				}
				.point{
					float:right;
					font-size:20px;
					color:#e7008c;
					height:60px;
					line-height:60px;

					${media.phone`
						height:30px;
						line-height:30px;
						float:${props => props.ticket ? 'left' : 'right'};
					`};
				}
				.remove{
					color:#969696;
				}
				.text{
					float:right;
					font-size:14px;
					color:#fff;
					line-height:65px;
					height:60px;
					margin:0 0 0 3px;
					font-weight:300;

					${media.phone`
						height:30px;
						line-height:35px;
					`};
				}
			}
			.recordBonus{
				height:auto;
				position:absolute;
				left:75px;
				top:55px;
				width:70%;
				padding:0;

				.text{
					float:left;
					font-size:14px;
					color:#9e9e9e;
					height:20px;
					line-height:20px;
					margin:0;
				}
				.point{
					font-size:14px;
					float:left;
					height:20px;
					line-height:20px;
					margin-left:10px;
				}
			}

			.date{
				width:15%;
				height:60px;
				float:left;
				box-sizing:border-box;
				padding-right:1.5%;

				${media.phone`
					position:absolute;
					left:15px;
					bottom:5px;
					width:90px;
					padding-right:0;
				`};

				${media.xphone`
					width:90px;
				`};

				.dateTitle{
					width:100%;
					display:block;
					font-size:12px;
					color:#b4b4b4;

				}

				.month{
  					font-size: 20px;
  					float:right;
  					color:#fff;
  					height:60px;
  					line-height:60px;
  					font-weight:300;

  					${media.phone`
  						position:absolute;
  						left:0;
						height:40px;
						line-height:40px;
					`};
				}
				.year{
					font-size:12px;
  					font-family: Helvetica;
  					float:right;
  					color:#969696;
  					height:60px;
  					line-height:65px;
  					margin-left:5px;
  					font-weight:300;

  					${media.phone`
  						right:0;
						height:40px;
						line-height:45px;
					`};
				}
				.no{
					opacity:0;
				}
			}
			.recordDate{
				left:75px;
				top:35px;
				height:20px;
				line-height:20px;

				.month{
					font-size:16px;
					float:left;
					height:20px;
					line-height:20px;
				}
				.session{
					float:left;
					font-size:16px;
					height:20px;
					line-height:20px;
					left:50px;
				}
			}
			.over{
				${media.phone`
					left:initial;
					right:15px;
				`};
			}
			.recordMore{
				width:10%;
				float:left;
				height:60px;
				padding:0;

				.text{
					text-align:center;
					width:60px;
					margin:20px auto;
					height:20px;
					line-height:20px;
					border:1px solid #dcdcdc;
					color:#fff;
					font-weight:300;
					letter-spacing:1.5px;
					font-size:12px;
					border-radius:10px;
					cursor:pointer;
					transition:.2s;

					&:hover{
						background-color:#e7008c;
						border:1px solid #e7008c;
					}
				}
			}
		}
		.recordBox{
			float:left;
			${media.phone`
				cursor:pointer;
				height:95px;
				border-radius:0;
				border-bottom:1px solid #555;
				background-color:transparent;
			`}

			.detailBox{
				display:block;
			}
			.detailBoxOpen{
				display:none;
				width:100%;
				min-height: 490px;
				margin:5px 0;
  				background-color: #3f3f3f;
  				box-sizing:border-box;
  				padding:5%;
  				position:relative;

				${media.phone`
					width:95vw;
					height:95vh;
					z-index:5;
				`}

  				.closeBox{
  					cursor:pointer;
  					width:30px;
  					height:30px;
  					position:absolute;
  					top:50px;
  					right:50px;
  					border-radius:50%;
  					border:1.5px solid #dcdcdc;
  					transition:.2s;

					&:hover{
						background-color:#e7008c;
						border:1.5px solid #e7008c;
					}

  					.closeIcon{
						width:16px;
						height:16px;
						margin:7px;
						color:#fff;
  					}
  					.closeIconRWD{
  						width:15px;
						height:15px;
						margin:7px;
						color:#fff;
  					}
  				}

  				.detailTopBox{
  					width:100%;
  					display:inline-flex;
  					justify-content:flex-start;

  					.poster{
  						background:#2b2b2b no-repeat 50% 50%/cover;
  						width:50px;
  						height:70px;
  						margin-right:3%;
  					}
  					.movieName{
  						width:250px;

  						.movieTitle{
  							width:100%;
  							font-size:14px;
  							color: #b4b4b4;
  							height:30px;
  							line-height:30px;
  						}
  						.content{
  							width:100%;
  							font-size:14px;
  							color:#fff;
  							height:30px;
  							font-weight:300;
  						}

  					}
  					.num{

  						.content{
  							color:#ff80c8;
							  font-size:18px;
							  font-weight: bold;
  						}
  					}
  					.date{
  						width:130px;

  						.year{
							float:left;
							height:30px;
							line-height:35px;
  						}
  						.month{
							float:left;
							height:30px;
							line-height:30px;
							font-family: HelveticaNeueLTPro-LtEx;
  							font-size: 20px;
  						}
  					}
  				}

  				.detailTab{
  					width:100%;
  					height:40px;
  					line-height:40px;
  					border-bottom:2px solid #555;
  					margin-top:20px;

  					.recordDetailTab{
  						margin-bottom:-2px;
  						width:150px;
  						font-size:14px;
						color:#9e9e9e;
  						text-align:center;
  						float:left;
  						border-bottom:2px solid transparent;
  						font-weight:300;
  						cursor:pointer;
  					}
  					.active{
  						color:#fff;
						border-bottom:2px solid #e7008c;
  					}
  				}

  				.detailMore{
					width:100%;
					box-sizing:border-box;
					padding:3%;
					float:left;

					.loading{
						animation: ${rotate360} 1s infinite;
						color:#dcdcdc;
						width:30px;
						height:200px;
						position: relative;
    					left: 50%;
					}

					.leftBox{
						float:left;
						width:45%;
						height:250px;
						border-right:2px solid #555;
						position:relative;

						.cinemaBox{
							width:90%;
							display:inline-flex;
							justify-content:flex-start;
							margin-bottom:15px;

							.cinema{
								width:20%;
								font-size:14px;
								color:#9e9e9e;
								font-weight:300;
								height:30px;
								line-height:30px;
							}
							.cinemaName{
								width:80%;
								font-size:16px;
								color:#fff;
								font-weight:300;
								height:30px;
								line-height:30px;
							}
						}
						.cancelText{
							width:80%;
							height:20px;
							color:#e7008c;
							text-align:center;
							letter-spacing:1.5px;
							font-size:12px;
							font-weight:300;
							margin-top:30px;
						}
						.cancelBtn{
							width:80%;
							height:45px;
							line-height:45px;
							border:1px solid #8e8e8e;
							text-align:center;
							font-size:18px;
							color:#fff;
							position:absolute;
							letter-spacing:1.5px;
							bottom:10px;
							font-weight:300;

							.loadIcon{
								color:#fff;
								width:20px;
								height:20px;
								margin:10px;
								animation: ${rotate360} 1s infinite;
							}
						}
						.cancelBtn0{
							cursor:pointer;
						}
						.cancelBtn1{

						}
						.cancelBtn2{
							background-color:#555;
							border:1px solid transparent;
						}

						.bookDateBox{
							width:100%;
							float:left;
							height:30px;

							.dateTitle{
								font-size:12px;
								color:#787878;
								float:left;
								width:40%;
								text-align:right;
								font-weight:300;
								height:30px;
								line-height:40px;
							}
							.dateDate{
								width:60%;
								float:left;
								box-sizing:border-box;
								padding-left:3%;
								height:30px;

								.month{
									text-align:left;
									font-family: HelveticaNeueLTPro-LtEx;
  									font-size: 20px;
  									color:#fff;
  									font-weight:300;
  									height:30px;
  									line-height:40px;
									float:left;

									.removeIcon{
										width:20px;
										height:20px;
										color:#dcdcdc;
										font-size:18px;
									}

								}
								.year{
									font-family: Helvetica;
  									font-size: 12px;
  									font-weight:300;
  									text-align:left;
  									color:#969696;
  									height:30px;
  									line-height:45px;
  									float:left;
  									margin-left:5px;
								}
							}
							.invNum{
								box-sizing:border-box;
								padding-left:3%;
								float:left;
								color:#fff;
								font-size:16px;
								height:30px;
								line-height:40px;
								letter-spacing:1.5px;

								.removeIcon{
									width:20px;
									height:20px;
									color:#dcdcdc;
									font-size:18px;
								}
							}
						}
						.leftBottmBox{
							float:left;
							width:70%;
							margin:20px 15%;
							height:100px;
							font-size:12px;
							border-top:2px solid #555;
							color:#979797;
							padding-top:20px;
							font-weight:300;
						}

					}
					.rightBox{
						float:left;
						width:54%;
						height:250px;
						box-sizing:border-box;
						padding:0 1%;
						overflow-y: auto;

						.productBox{
							width:100%;
							min-height:30px;
							float:left;

							.preTitle{
								width:25%;
								font-size:14px;
								color:#9e9e9e;
								text-align:right;
								float:left;
								font-weight:300;
							}
							.bank{
								width:75%;
								font-size:14px;
								color:#fff;
								text-align:left;
								float:left;
								box-sizing:border-box;
								padding-left:3%;
								font-weight:300;
							}
							.products{
								float:right;
								width:75%;
								box-sizing:border-box;
								padding-left:3%;
								display:inline-flex;
								justify-content:space-between;
								margin-bottom:10px;
								position:relative;

								.name{
									color: #ffffff;
									font-weight:300;
									font-size:14px;
									width:50%;
								}
								.priceAndPoint{
									padding-top: 1px;
									width: 40%;
									display: flex;
									flex-wrap: wrap;
									justify-content:flex-end;
									align-content: flex-start;
									font-size: 14px;
									line-height: 1.14;
									color: #8e8e8e;

									.inPoint{
										height: 17px;
									}
									.inPrice{
										height: 17px;
										font-weight: 600;
									}
								}
								.price{
									color:#8e8e8e;
									font-size:14px;
									width:25%;
									text-align:right;

									span{
										font-size:14px;
										color:#8e8e8e;
									}
								}
								.icon{
									color:#8e8e8e;
									width:20px;
									height:20px;
									position:absolute;
									right:16%;
								}
								.quantity{
									font-size: 14px;
									line-height: 1.29;
									color: #8e8e8e;
									width: 20%;
									text-align: center;

									span{
										font-size:12px;
										color:#8e8e8e;
									}
								}
								.mainNum{
									width: 35%;
									font-size: 20px;
									font-weight: bold;
									color: #ff80c8;
									text-align: right;
									
									span{
										font-size: 14px;
										color: #8e8e8e;
									}
								}
							}
						}
						.box{
							background-color:#444;
							padding:10px 25px 0 0;
							width:99%;
							margin-left:1%;
							min-height:25px;
							border-radius:2px;

							.preTitle{
								width:24%;
							}
							.products{
								width:76%;
								margin-bottom:10px;

								.quantity{
									font-size: 20px;
									font-weight: bold;
									color: #ff80c8;
									text-align: right;
									width: 32%;
								}
							}
						}

						.provBox{
							width:200px;
							margin:auto;
							height:200px;
							background:transparent no-repeat 50% 50%/cover;
						}
						.text{
							text-align:center;
							width:100%;
							margin:15px auto 0;
							color:#8e8e8e;
							font-size:18px;
							font-weight:300;
						}
					}
  				}

			}
			.show{
				display:block;
			}
			.hide{
				display:none;
			}
		}
		.detailBoxOpenRWD{
			display:none;
			width:100%;
			min-height: 490px;
			margin:5px 0;
			background-color: #3f3f3f;
			box-sizing:border-box;
			padding:5%;
			position:relative;

			${media.phone`
				position:fixed;
				width:100vw;
				height:100vh;
				z-index:201;
				background-color:rgba(0,0,0,.8);
				left:0;
				top:0;
				margin:0;
			`}

			.boxBackGround{
				width:90vw;
				height:90vh;
				box-sizing:border-box;
				padding:30px 42px;
				background-color:#3f3f3f;
				border-radius:8px;
				position:relative;
				overflow:auto;

				${media.xphone`padding:30px 20px;`};
			}

			.closeBox{
				cursor:pointer;
				width:30px;
				height:30px;
				position:absolute;
				top:10px;
				right:10px;

				.closeIconRWD{
					width:25px;
					height:25px;
					margin:0;
					color:#fff;
					position:fixed;

				}
			}

			.detailTopBox{
				width:100%;
				float:left;

				.poster{
					background:#dcdcdc no-repeat 50% 50%/cover;
					width:27%;
					height:150px;
					margin-right:3%;
					float:left;

					${media.xphone`
						width:63px;
						height:86px;

					`};
				}
				.movieName{
					width:70%;
					float:left;

					${media.xphone`width:65%`};

					.movieTitle{
						width:100%;
						font-size:12px;
						color: #b4b4b4;
						height:30px;
						line-height:30px;

						${media.xphone`
							height:20px;
							line-height:20px;
						`};
					}
					.content{
						width:100%;
						font-size:14px;
						color:#fff;
						height:30px;
						line-height:30px;
						font-weight:300;
						overflow:hidden;

						${media.xphone`
							height:20px;
							line-height:20px;
						`};
					}
				}
				.num{
					float:left;
					.content{
						color:#ff80c8;
						font-size:18px;
						font-weight: bold;

						${media.xphone`
							height:20px;
							line-height:20px;
							font-size:14px;
						`};
					}
				}
				.date{
					width:130px;

					.month{
						float:left;
						height:30px;
						line-height:30px;
						font-family: HelveticaNeueLTPro-LtEx;
						font-size: 18px;
						color:#fff;
						font-weight:300;
						margin-right:10px;

						${media.xphone`
							height:20px;
							line-height:20px;
							font-size: 16px;
						`};
					}
				}
			}

			.detailTab{
				width:100%;
				height:40px;
				line-height:40px;
				border-bottom:2px solid #555;
				margin-top:20px;
				float:left;

				${media.xphone`margin-top:10px;`};

				.recordDetailTabRWD{
					margin-bottom:-2px;
					width:50%;
					font-size:14px;
					color:#9e9e9e;
					text-align:center;
					float:left;
					border-bottom:2px solid transparent;
					font-weight:300;
					cursor:pointer;
				}
				.active{
					color:#fff;
					border-bottom:2px solid #e7008c;
				}
			}

			.detailMore{
				width:100%;
				box-sizing:border-box;
				padding:3% 0;
				float:left;

				.loading{
					animation: ${rotate360} 1s infinite;
					color:#dcdcdc;
					width:30px;
					height:200px;
					position: relative;
					left: 50%;
				}

				.leftBox{
					float:left;
					width:100%;
					position:relative;

					.cinemaBox{
						width:100%;
						margin-bottom:10px;

						.cinema{
							width:100%;
							font-size:14px;
							color:#9e9e9e;
							font-weight:300;
							height:20px;
							line-height:20px;
						}
						.cinemaName{
							width:100%;
							font-size:16px;
							color:#fff;
							font-weight:300;
							min-height:20px;
							line-height:20px;
						}
					}


					.bookDateBox{
						width:100%;
						float:left;
						height:30px;

						.dateTitle{
							font-size:12px;
							color:#787878;
							float:left;
							width:40%;
							text-align:right;
							font-weight:300;
							height:30px;
							line-height:40px;
						}
						.dateDate{
							width:60%;
							float:left;
							box-sizing:border-box;
							padding-left:3%;
							height:30px;

							.month{
								text-align:left;
								font-family: HelveticaNeueLTPro-LtEx;
								font-size: 20px;
								color:#fff;
								font-weight:300;
								height:30px;
								line-height:40px;
								float:left;

								.removeIcon{
									width:20px;
									height:20px;
									color:#dcdcdc;
									font-size:18px;
								}

							}
							.year{
								font-family: Helvetica;
								font-size: 12px;
								font-weight:300;
								text-align:left;
								color:#969696;
								height:30px;
								line-height:45px;
								float:left;
								margin-left:5px;
							}
						}
						.invNum{
							box-sizing:border-box;
							padding-left:3%;
							float:left;
							color:#fff;
							font-size:16px;
							height:30px;
							line-height:40px;
							letter-spacing:1.5px;

							.removeIcon{
								width:20px;
								height:20px;
								color:#dcdcdc;
								font-size:18px;
							}
						}
					}
					.leftBottmBox{
						float:left;
						width:90%;
						margin:20px 5%;
						height:100px;
						font-size:12px;
						border-top:2px solid #555;
						color:#979797;
						padding-top:20px;
						font-weight:300;
					}

				}
				.rightBox{
					float:left;
					width:100%;
					box-sizing:border-box;

					.productBox{
						width:100%;
						min-height:30px;
						float:left;

						.preTitle{
							width:100%;
							font-size:14px;
							color:#9e9e9e;
							text-align:left;
							float:left;
							font-weight:300;
						}
						.bank{
							width:100%;
							font-size:14px;
							color:#fff;
							text-align:left;
							float:left;
							box-sizing:border-box;
							padding-left:3%;
							font-weight:300;
						}
						.products{
							float:left;
							width:100%;
							display:inline-flex;
							justify-content:space-between;
							margin-bottom:10px;
							position:relative;

							.name{
								color:#fff;
								font-weight:300;
								font-size:14px;
								width:50%;
							}
							.priceAndPoint{
								padding-top: 1px;
								width: 40%;
								display: flex;
								flex-wrap: wrap;
								justify-content:flex-end;
								align-content: flex-start;
								font-size: 14px;
								line-height: 1.14;
								color: #8e8e8e;

								.inPoint{
									height: 17px;
								}
								.inPrice{
									height: 17px;
									font-weight: 600;
								}
							}
							.price{
								color:#8e8e8e;
								font-size:14px;
								width:25%;
								text-align:right;

								span{
									font-size:14px;
									color:#8e8e8e;
								}
							}
							.icon{
								color:#8e8e8e;
								width:20px;
								height:20px;
								position:absolute;
								right:16%;
							}
							.quantity{
								color:#8e8e8e;
								font-weight:300;
								font-size:14px;
								width:25%;
								text-align: center;

								span{
									font-size:12px;
									color:#8e8e8e;
								}

							}
							.mainNum{
								width: 35%;
								font-size: 20px;
								font-weight: bold;
								color: #ff80c8;
								text-align: right;
								
								span{
									font-size: 14px;
									color: #8e8e8e;
								}
							}
						}
					}
					.preTitleRWD{
						.preTitle{
							width:20%;

							${media.xphone`width:20%`};
						}
						.products{
							width:50%;
							float:right;

							${media.xphone`width:60%`};

							.quantity{
								position: absolute;
								right: 0;
								font-weight: 600;
								font-size: 20px;
								width: 50%;
								text-align: right;
								color: #ff80c8;
							}
							.icon{
								right:38%;
							}
						}
					}
					.box{
						background-color:#444;
						margin:10px 0 0 -10px;
						width:100%;
						border-radius:2px;
						padding:10px;

						.preTitle{
							width:100%;
						}
						.products{
							width:100%;
							margin-bottom:10px;

							.quantity{
								font-size: 20px;
								font-weight: bold;
								color: #ff80c8;
								text-align: right;
								width: 32%;
							}
						}
					}
					.cancelText{
						width:100%;
						height:20px;
						color:#e7008c;
						text-align:center;
						letter-spacing:1.5px;
						font-size:12px;
						font-weight:300;
						float: left;
    					margin: 10px 0;
					}
					.cancelBtn{
						width:100%;
						height:45px;
						line-height:45px;
						border:1px solid #8e8e8e;
						text-align:center;
						font-size:16px;
						color:#fff;
						letter-spacing:1.5px;
						font-weight:300;
						margin:10px 0 0 -10px;
						float:left;
						padding:0 10px;

						.loadIcon{
							color:#fff;
							width:20px;
							height:20px;
							margin:10px;
							animation: ${rotate360} 1s infinite;
						}
					}
					.cancelBtn0{
						cursor:pointer;
					}
					.cancelBtn1{

					}
					.cancelBtn2{
						background-color:#555;
						border:1px solid transparent;
					}

					.provBox{
						width:150px;
						margin:20px auto 0;
						height:150px;
						background:transparent no-repeat 50% 50%/cover;
					}
					.text{
						text-align:center;
						width:100%;
						margin:15px auto 0;
						color:#8e8e8e;
						font-size:18px;
						font-weight:300;
					}
				}
			}

		}
		.show{
			display:block;
		}
		.hide{
			display:none;
		}
	}

	.mobilePart{
		display:none;
		${media.phone`display:block;`};
	}
`;
