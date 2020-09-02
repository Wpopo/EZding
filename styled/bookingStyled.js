import styled , { css , keyframes }from 'styled-components';

const sizes = {
	bigSize:1200,
	desktop: 1024,
	tablet: 992,
	phone: 768,
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

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
  `;

export const BookingWrapper = styled.div`
	width:100%;
	padding-top:117px;
	background-color:#404040;

	${media.phone`padding-top:80px;`};
	${media.xphone`padding-top:60px;`};

	.wrapper{
		max-width:1080px;
		width:100%;
		margin:auto;
		text-align:center;
		height:90px;
		cursor:pointer;

		${media.phone414`max-width:100%;height:100px;`};

		.title{
			width:47%;
			float:left;
			color:#fff;
			text-align:left;
			padding:15px 0 0 2%;
			height:47px;
			margin-top:25px;
			font-weight:300;
			letter-spacing:1.5px;
			position:relative;

			${media.phone`width:46%;padding:15px 0 0 2%;;margin-left:1%;font-size:.9rem`};
			${media.phone414`text-align:center;margin-top:20px;padding: 1% 1% 3%;`};

			.icon{
				width:20px;
				height:20px;
				margin:0 15px 0 0;
				float:right;
				cursor:pointer;
				position:absolute;
				right:15px;

				${media.phone`right:10px;`};
				${media.phone414`
					right:initial;
					left: 50%;
    				transform: translateX(-50%);
    				bottom: -15%;
				`};
				${media.xphone`bottom:-28%;`};
			}
		}
		.line{
			border-right:2px solid #2b2b2b;

			${media.phone`border-right:1px solid #2b2b2b;`};
		}
	}
`;


export const CinemaPart = styled.div`
	position:absolute;
	transition:1s;
	min-height:${props=>props.toggle? '300px':'0'};
	width:100%;
	background-color:rgba(0,0,0,.8);
	z-index:500;

	.cinema-wrapper{
		max-width:1080px;
		width:100%;
		margin:auto;
		${media.phone`padding-top:30px;`};

		.loc-part{
			float:left;
			text-align:center;
			min-width:200px;
			width:calc(100% / 4 - 5%);
			margin:2.5%;

			${media.phone`display:none;`};

			.big-title{
				font-size:1.375rem;
				color:#9e9e9e;
				font-weight:300;
				text-align:left;
				height:35px;
				float:left;
			}
			.cinema{
				width:100%;
				float:left;
				min-width:100px;
				color:#fff;
				font-weight:300;
				text-align:left;
				height: auto;
				cursor:pointer;
				font-size:16px;
				margin-bottom: 8px;

				&:hover{
					color:#9e9e9e;
				}
			}

		}
		.location{
			cursor:pointer;
			color:#fff;
			width:calc(100% / 4 - 5%);
			float:left;
			margin:10px 0 ;
			padding-left:5%;
			height:65px;
			line-height:65px;



			&:hover{
				background-color:#2b2b2b;
			}
		}
		.rwd-loc-part{
			display:none;
			overflow:hidden;

			${media.phone`display:block;`};

			.rwd-title{
				display:block;
				width:100%;
				cursor:pointer;
				margin:0;
				color:#fff;
				text-align:left;
				padding:20px 0 20px 10%;
				font-size:1rem;
				position:relative;

				&:hover{
					color:#e7008c;
				}
				.icon{
					position:absolute;
					right:100px;
				}

			}
			.rwd-title-color{
				color:#e7008c;
			}

			.box{
				padding-bottom:30px;

				.rwd-cinema{
					color:#fff;
					width:100%;
					text-align:left;
					padding:10px 0 10px 15%;
					font-size:.9rem;
					font-weight:300;
					cursor:pointer;

					&:hover{
						color:#9e9e9e;
					}
				}
			}
			.box-hide{
				display:none;
			}
		}
	}

`;

export const ChoiceDateWrapper = styled.div`
	width:100%;
	padding:80px 0;
	background-color:#2b2b2b;

	${media.phone`padding:40px 0;`};
	${media.phone414`padding:40px 0;`};
	${media.xphone`padding:40px 0;`};

	.loading{
		display: block;
		margin: 0 auto;
		color:#fff;
		opacity:.5;
		animation: ${rotate360} 2s linear infinite;
		width:50px;
		height:50px;
	}

	.wrapper{
		max-width:1080px;
		height:100%;
		margin:auto;
		text-align:center;
		position:relative;
		overflow:hidden;

		.box{
			margin:auto;
			text-align:center;
			width:80%;

			.slick-track{
				min-width:5000px !important;
			}

			.choiceDate{


				.dateBox{
					float:left;
					width:100px !important;
					height:100px !important;
					border-radius:50%;
					color:#fff;
					margin:0px 20px 0;
					cursor:pointer;
					background-color:transparent;
					border:1px solid transparent;

					${media.tablet`
						width:80px !important;
						height:80px !important;
						margin-top:0px;
					`};
					${media.phone`
						width:80px !important;
						height:80px !important;
						margin-top:0px;
					`};

					${media.phone414`
						width:60px !important;
						height:60px !important;
						margin-top:0px;
					`};

					${media.xphone`
						width:60px !important;
						height:60px !important;
						margin-top:0px;
					`};

					&:hover{
						border:1px solid #e7008c;

						${media.tablet`border:1px solid transparent;`};

						.month-date{
							color:#fff;

							${media.tablet`color:#fff;`};
						}
					}

					.week{
						height:20px;
						line-height:40px;
						font-size:.75rem;

						${media.tablet`line-height:25px;height:20px;font-size:.7rem;`};
						${media.phone`line-height:25px;height:20px;font-size:.7rem;`};
						${media.phone414`line-height:23px;height:14px;font-size:11px;`};
						${media.xphone`line-height:23px;height:14px;font-size:11px;`};
					}
					.month-date{
						height:60px;
						line-height:60px;
						font-size:2rem;
						font-weight:700;
						color:#aaa;

						${media.tablet`height:40px;line-height:40px;`};
						${media.phone`line-height:40px;height:40px;color:#fff;`};
						${media.phone414`line-height:35px;height:33px;font-weight:400;font-size:1.75rem;`};
						${media.xphone`line-height:35px;height:33px;font-weight:400;font-size:1.75rem;`};
					}
					.month{
						height:20px;
						line-height:5px;
						font-size:.8rem;

						${media.tablet`height:20px;line-height:15px;`};
						${media.phone`height:20px;line-height:15px;font-size:.7rem;`};
						${media.phone414`height:15px;line-height:10px;font-size:.7rem;`};
					}
				}
				.checked{
					background-color:#e7008c;
					color:#fff;

					.month-date{
						color:#fff;
					}
				}
			}

		}
		.iconRWD{
			display:none;
			color:#fff;
			position: absolute;
		    right: 30px;
		    top: 40%;
		    width: 30px;
    		height: 30px;

		    ${media.phone414`display:block`};
		    ${media.phone320`right: 10px;`};
		}

	}

`;
export const ChoiceDateEmpty = styled.div`
	width:100%;
	padding:80px 0;
	background-color:#2b2b2b;
	margin:auto;

	.wrapper{
		width:100%;
		max-width:1080px;
		font-size:16px;
		color:#fff;
		font-weight:500;
		text-align:center;
		letter-spacing:2px;
	}

`;

export const ChoiceDateBtn = styled.div`
	float:${props=>props.right? 'right':'left'};
	width:10%;
	height:100px;
	position:absolute;
	top:0;
	${props=>props.right? 'right:0':'left:0'};

	${media.tablet`width:10%;height:80px;`};
	${media.phone`display:none;`};
	${media.xphone`display:none;`};

	.icon{
		width:60%;
		height:60%;
		color:#555;
		margin-top:25px;
		cursor:pointer;

		&:hover{
			color:#fff;
		}
	}
`;


export const BookingSessionWrapper = styled.div`
	width:100%;
	padding:86px 0 60px;
	background-color: #404040;
	position:relative;

	#peopleScroll{
		position:absolute;

		${media.phone`bottom:50px;`}
	}

	${media.phone`padding:40px 0;min-height:25vh;`};
	${media.phone414`min-height:60vh;`};
	${media.xphone`padding:30px 0;min-height:60vh;`};

	.loading{
		position:absolute;
		left:50%;
		top:50%;
		transform:translate(-50%,-50%);
		color:#fff;
		opacity:.5;
		animation: ${rotate360} 2s linear infinite;
		width:50px;
		height:50px;
		line-height:50px;
	}

	.wrapper{
		max-width:1080px;
		width:100%;
		height:100%;
		margin:auto;
		text-align:center;

		.versionList{
			display:block;

			${media.phone`display:none;`};

			.version{
				display:inline-block;
				margin:0 auto 20px;
				width:150px;
				height:60px;
				color:#646464;
				border-bottom:1px solid #2b2b2b;
				line-height:60px;
				font-size:1.1rem;
				cursor:pointer;

			}
			.linebox{
				width:${props=>props.length*150}px;
				margin:-23px auto 40px;
				z-index:300;

				.line{
					width:150px;
					height:6px;
					background-color:#e7008c;
					z-index:300;
					transition:.3s;
					transform:translateX(${props=>props.line*100}%);

				}

			}
		}

		.versionList-rwd{
			display:none;

			${media.phone`display:block;`};

			.version{
				display:inline-block;
				margin:0 auto 20px;
				width:150px;
				height:60px;
				color:#646464;
				border-bottom:1px solid #2b2b2b;
				line-height:60px;
				font-size:1.1rem;
				cursor:pointer;
				position:relative;


				&:before{
					position:absolute;
					content:'';
					width:100%;
					height:4px;
					bottom:0;
					left:0;
				}
			}
			.slick-center{
				color:#fff;

				&:before{
					background-color:#e7008c;
				}
			}

		}

		.add{
			color:#fff !important;
		}


		.part{
			font-size:.75rem;
			color:#9e9e9e;
			height:15px;
			margin:auto;

		}

		.session{
			width:90px;
			height:90px;
			border-radius:50%;
			cursor:pointer;
			display:inline-block;
			margin:10px 15px;
			background-color:transparent;
			color:#fff;
			border:1px solid transparent;

			&:hover{
				border:1px solid #e7008c;
				${media.tablet`
					border:1px solid transparent;
				`};
			}

			.time{
				color:#fff;
				height:50px;
				line-height:70px;
				font-size:1.5rem;
			}
			.seat{
				width:40px;
				color:#e7008c;
				border-radius:5px;
				margin:5px auto;
				background-color:#464646;
				height:20px;
				line-height:20px;
				font-size:.75rem;
			}
		}
		.checked{
			background-color:#e7008c;
			color:#fff;

			&:hover{
				background-color:#e7008c;
				color:#fff;
			}
			.seat{
				background-color:#e7008c;
				color:#fff;
			}
		}
	}
`;

export const BookingPersonWrapper = styled.div`
	background-color: #464646;
	width:100%;
	padding:40px 0 50px;
	position:relative;

	.wrapper{
		max-width:1080px;
		width:100%;
		margin:auto;
		text-align:center;

		${media.phone`width:250px;margin:auto`};

		.people{
			margin:0 auto 20px;
			width:150px;
			height:60px;
			color:#fff;
			line-height:60px;
			font-size:1.1rem;
			text-align:center;

			${media.phone`height:40px;line-height:40px;`};
		}
		.dot{
			display:inline-block;
			width:60px;
			height:60px;
			margin:30px 20px;
			position:relative;
			text-align:center;

			${media.phone`margin:11px;`};

			.num{
				width:40px;
				height:40px;
				line-height:40px;
				border-radius:50%;
				font-size:1.375rem;
				cursor:pointer;
				color:#fff;
				background-color:#3f3f3f;
				position:absolute;
				top:50%;
				left:50%;
				transform:translate(-50%,-50%);

				&:hover{
					background-color:#e7008c;

					${media.phone`background-color:#3f3f3f;`};

				}
			}


			.checked{
				background-color:#e7008c !important;
				width:60px;
				height:60px;
				line-height:60px;
				border-radius:50%;
			}
		}

		.submit{
			margin:30px auto 0;
			width:130px;
			min-width:130px;
			height:45px;
			border-radius:2px;
			border:1px solid #e7008c;
			text-align:center;
			color:#fff;
			line-height:45px;
			cursor:pointer;
			font-weight:300;
			letter-spacing:1.5px;
		}
		.addSubmit{
			background-color:#e7008c;
			box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
		}
	}

`;

// cinemaEntryStyled
export const CinemaEntryWrapper = styled(BookingWrapper)`
	height:144px;
	background-color:#1e1e1e;
	.wrapper{
		.cinematitle{
			margin:30px auto 0;
			font-size:1.75rem;
			color:#fff;
		}
		.info-part{
			display:inline-block;
			margin:10px 10px 0 10px;
			font-size:.75rem;

			span{
				color:#fff;
			}
			.red{
				color:#e7008c;
			}
		}
		.
	}
`;


export const CinemaEntryMovieWrapper = styled.div`
	padding:50px 0 60px;
	position:relative;
	background-color:#1e1e1e;

	#sessionPart{
		position:absolute;
		bottom:-480px;
		${media.phone414`bottom:-260px;`}
		${media.xphone`bottom:-300px;`}
	}
	.loading{
		position:absolute;
		left:50%;
		top:50%;
		transform:translate(-50%,-50%);
		color:#fff;
		opacity:.5;
		animation: ${rotate360} 2s linear infinite;
		width:50px;
		height:50px;
		line-height:50px;
	}

	.wrapper{
		position:relative;
		width:100%;

		.title{
			width:100%;
			color:#fff;
			text-align:center;
			font-weight:500;
			font-size:1.5rem;
			height:60px;
			line-height:60px;
			cursor:pointer;

			.icon{
				width:20px;
				height:20px;
				margin-left:10px;
				color:#ddd;
			}
		}
		.en{
			font-size:.75rem;
			font-weight:500;
			color:#9e9e9e;
			height:20px;
			line-height:20px;
			margin-bottom:30px;

		}
		.movielist{
			width:100%;
			z-index:1000;
			position:absolute;
			background-color:#000;
			padding:50px 0;

			${media.phone`background-color:#1e1e1e;padding:10px 0;`};

			.list{
				color:#fff;
				width:calc(100% / 4 - 20px);
				height:20px;
				font-size:.875rem;
				text-align:center;
				float:left;
				padding:20px 0;
				margin:0 10px;
				cursor:pointer;

				${media.phone`width:100%; margin:auto;border-top:1px solid #2b2b2b;font-size: 1.5rem;`};

				&:hover{
					background-color:#464646;

					${media.tablet`background-color:#1e1e1e;`};
				}
			}
		}

		.arrowbox{
			width:20%;
			height:300px;
			position:absolute;
			left:50%;
			transform:translate(-50%);
			z-index:500;

			${media.bigSize`width:30%;height:30vw;`};
			${media.phone`width:350px;height:400px;`};
			${media.phone414`display:none;`};
			${media.xphone`display:none;`};

			.prev{
				position:absolute;
				left:-5%;
				color:#fff;
				width:50px;
				height:50px;
				opacity:.5;
				top:40%;
				cursor:pointer;
				z-index:500;

				${media.bigSize`top:30%;`};
				${media.phone`top:40%;`};

				&:hover{
					opacity:1;
				}
			}
			.next{
				position:absolute;
				right:-5%;
				color:#fff;
				width:50px;
				height:50px;
				opacity:.5;
				top:40%;
				cursor:pointer;
				z-index:500;

				${media.bigSize`top:30%;`};
				${media.phone`top:40%;`};

				&:hover{
					opacity:1;
				}
			}
		}

		.box{
			transition:.5s;
			width:auto;
			height:300px;

			${media.bigSize`width:auto;height:30vw;`};
			${media.phone`width:280px;height:400px;`};
			${media.xphone`width:250px;height:370px;`};

			img{
				width:188px;
				height:266px;
				opacity:.3;
				margin:auto;
				cursor:pointer;

				${media.bigSize`width:auto;height:30vw;`};
				${media.phone`width:280px;height:400px;`};
				${media.xphone`width:250px;height:370px;`};
			}
			.posterNull{
				width:188px;
				max-height:266px;
				min-height:266px;
				opacity:1;
				margin:auto;
				background-color:#404040;
				text-align:center;
				padding:100px 0;
				color:#fff;
				cursor:pointer;
				box-sizing:border-box;

				${media.bigSize`width:200px;height:30vw;min-height:30vw;max-height:30vw;`};
				${media.phone`width:280px;height:400px;max-height:400px;min-height:400px;`};
			}
		}

		.slick-center{
			z-index:900;

			img{
				transition:.5s;
				opacity:1;
				z-index:900;
			}
		}


		.grade{
			text-align:center;
			width:50px;
			height:20px;
			color:#9e9e9e;
			margin:20px auto 0;
			font-size:.75rem;
			line-height:20px;
			border:1px solid #9e9e9e;
			border-radius:120px;
		}
		.infobox{
			width:100px;
			height:30px;
			line-height:30px;
			background-color:${props=>props.isInfoBoxShow?'#000':'#3f3f3f'};
			border-radius:120px;
			color:#fff;
			margin:20px auto 0;
			font-size:.875rem;
			cursor:pointer;
			padding:0 5px 0 15px;
			box-sizing:border-box;

			.icon{
				width:20px;
				height:20px;
				margin-top:-5px;
			}
		}
		.info{
			margin:auto;
			max-width:500px;
			text-align:center;

			.datebox{
				height:75px;
				width:100%;
				text-align:center;
				margin:20px auto 30px;

				.date{
					display:inline-block;
					margin:0 20px;
					width:50px;

					.text{
						height:30px;
						line-height:30px;
						font-size:.75rem;
						color:#9e9e9e;
					}
					.text2{
						height:30px;
						line-height:30px;
						font-size:1.2rem;
						color:#fff;
						font-weight:500;
					}
					.text3{
						height:15px;
						line-height:15px;
						font-size:.75rem;
						color:#fff;
						font-weight:500;
					}

				}
				.comment{
					vertical-align:text-bottom;
					display:inline-block;
					width:100px;
					margin: 0 30px;
					.star{
						height:15px;
						color:#e7008c;
					}
					.size{
						color:#e7008c;
						font-size:.75rem;
						height:40px;
						line-height:40px;
					}

				}

			}
			.staff{
				color:#fff;
				height:30px;
				text-align:left;
				font-size:.8rem;
				padding:15px;

				span{
					color:#fff;
				}
			}
			.desc{
				color:#fff;
				line-height:2;
				letter-spacing:1px;
				font-size:.8rem;
				margin-top:20px;
				text-align:left;
				padding:15px;
			}

		}
	}

`;

//location booking
export const LocationWrapper = styled.div`
	width:100%;
	margin:auto;
	background-color:#404040;
	position:relative;

	#peopleScroll{
		position:absolute;
		bottom:100px;
	}

	.wrapper{
		max-width:1080px;
		width:100%;
		margin:auto;
		padding:30px 0 50px;

		${media.phone`width:100%;`};

		.noMovie{
			color:#646464;
			font-size:1.5rem;
			text-align:center;
			margin:auto;
		}
		.verList{
			width:${props=>`calc(200px + ${props.size*100}px)`};
			height:45px;
			margin:auto;
			padding:15px 0 5px;
			border-bottom:2px solid #2b2b2b;
			position:relative;

			${media.desktop`width:100%;`};
			${media.phone`display:none;`};

			.list{
				width:${props=>`calc(100% / ${props.size})`};
				float:left;
				height:45px;
				line-height:40px;
				margin:auto;
				text-align:center;
				color:#646464;
				cursor:pointer;
				font-weight:500;
			}
			.add{
				color:#fff;
			}
			.line{
				width:${props=>`calc(100% / ${props.size})`};
				height:6px;
				background-color:#e7008c;
				position:absolute;
				bottom:-3px;
				transition:.3s;
				transform:${props=>`translateX(${props.line}%)`};

			}
		}
		.rwd-verList{
			display:none;
			padding:15px 0 0px;
			border-bottom:2px solid #2b2b2b;

			${media.phone`display:block;`};

			.list{
				height:50px;
				line-height:50px;
				text-align:center;
				color:#fff;
				opacity:.3;
				border-bottom:5px solid transparent;
				cursor:pointer;
			}

			.slick-center{
				border-bottom:5px solid #e7008c;
				opacity:1;
				transition:.3s;
			}
		}
		.box{
			margin:auto;
			max-width:500px;
			width:100%;
			min-height:450px;
			max-height:500px;
			overflow-y:auto;

			${media.phone`overflow:visible;min-height:auto;max-height:auto;height:auto`};

			.title{
				display:inline-block;
				width:calc(100% / 3);
				height:30px;
				line-height:30px;
				color:#646464;
				font-size:.875rem;
				text-align:center;
				padding:20px 0 5px;
				border-bottom:1px solid #646464;
				font-weight:500;
			}
			.sessionbox{
				cursor:pointer;

				&:hover{
					background-color:#e7008c;

					${media.tablet`background-color:transparent;`};
					.seat{
						color:#fff;

						${media.tablet`color:#e7008c;`};
					}
				}
				.session{
					height:30px;
					width:calc(100% / 3);
					color:#fff;
					font-weight:300;
					text-align:center;
					float:left;
					border-bottom:1px solid #646464;
					padding:20px 0;
				}
				.seat{
					color:#e7008c;
				}
			}
			.add{
				background-color:#e7008c !important;
				color:#000;

				.seat{
					color:#fff;
				}
			}
		}
	}
`;

// seatMap
export const SeatMapWrapper = styled.div`
	width:100%;
	padding:${props=>props.lineShow? "50px 0px 100px 0px": "130px 0px 100px 0px"};
	background-color:#404040;

	${media.phone414`
		padding:${props=>props.lineShow? "40px 0px 100px 0px": "80px 0px 100px 0px"};

	`};

	.loading{
		position:absolute;
		left:50%;
		top:50%;
		transform:translate(-50%,-50%);
		color:#fff;
		opacity:.5;
		animation: ${rotate360} 2s linear infinite;
		width:50px;
		height:50px;
		line-height:50px;
	}

	.wrapper{
		margin:auto;
		text-align:center;
		color:#fff;

		.bookinginfo{
			width:100%;
			text-align:center;
			margin:auto;

			${media.tablet`width:90%;`};
			${media.phone`width:90%;`};

			.box{
				display:inline-block;
				height:60px;
				width:196px;
				border-left:1px solid #4a4a4a;
				vertical-align:text-top;

				${media.tablet`width:130px;`};
				${media.phone`width:100px;margin:20px 0;`};
				${media.phone414`height:auto;width:150px;margin:10px 0;border-right:1px solid #4a4a4a;`};
				${media.phone320`width:140px;`}
				.name{
					width:100%;
					font-size:.75rem;
					color:#adadad;
					height:15px;
					line-height:15px;
				}
				.content{
					text-align:center;
					margin:10px auto 0;
					width:80%;
					font-size:14px;
					color:#fff;
					word-wrap: break-word;
					letter-spacing:1px;

					${media.phone414`height:auto;`}
				}
			}
			.mid{
				width:100px;

				${media.tablet`width:80px;`};
				${media.phone`min-width:60px;`};

				.content{
					width:100%;
				}
			}
			.small{
				width:55px;
				border-right:1px solid #4a4a4a;

				${media.tablet`width:60px;`};
				${media.phone`width:40px;`};

				.content{
					width:100%;
				}
			}
		}
	}
	.seatMapWrapper{
		width:100%;
		margin:60px auto 0;
		text-align:center;

		${media.xphone`margin:30px auto 0;`};

		.seatSample{
			margin:auto;
			text-align:center;

			.dot{
				width:15px;
				height:15px;
				display:inline-block;
				background-color:#fff;
				border-radius:50%;
				margin:0px 10px;
			}
			.yours{
				background-color:#e7008c;
			}
			.saled{
				background-color:#646464;
			}
			.sampleName{
				height:15px;
				color:#787878;
				font-size:.875rem;
				display:inline-block;
			}
		}

		.seatMap{
			width:100%;
			margin:20px auto;
			text-align:center;

			.screen{
				width:300px;
				color:#8e8e8e;
				border:1px solid #8e8e8e;
				font-size:.75rem;
				height:26px;
				line-height:26px;
				margin:0 auto 30px;
			}
		}

	}

	.reset{
		display:inline-block;
		width:290px;
		height:45px;
		line-height:45px;
		text-align:center;
		margin-right:10px;
		color:#fff;
		background-color:#9e9e9e;
		cursor:pointer;

		${media.phone`
			width:50%;
			position:fixed;bottom:0;
			left:0;
			z-index:500;
			height:50px;
			line-height:50px;
			font-size:1.5rem;
		`};
	}
	.submit{
		display:inline-block;
		width:290px;
		height:45px;
		line-height:45px;
		text-align:center;
		background-color:#e7008c;
		color:#fff;
		cursor:pointer;
		font-weight:300;
		letter-spacing:1.5px;

		${media.phone`
			width:50%;
			position:fixed;bottom:0;
			right:0;
			z-index:500;
			height:50px;
			line-height:50px;
			font-size:1.5rem;
		`};

		.icon{
			color:#fff;
			width:20px;
			height:20px;
			margin-top:-3px;
		}
	}
	.submitSingle{
		display:inline-block;
		width:290px;
		height:45px;
		line-height:45px;
		text-align:center;
		background-color:#e7008c;
		color:#fff;
		cursor:pointer;
		font-weight:300;
		letter-spacing:1.5px;

		${media.phone`
			width:100%;
			position:fixed;bottom:0;
			right:0;
			z-index:500;
			height:50px;
			line-height:50px;
			font-size:1.5rem;
		`};

		.icon{
			color:#fff;
			width:20px;
			height:20px;
			margin-top:-3px;
		}
	}
`;

// seatMapError
export const SeatMapErrorWrapper = styled.div`
	.errorBox{
		width:100%;
		height:${props=>props.cinema ? '40vh':'70vh'};
		color:#fff;
		font-size:1rem;
		background-image: url("../../static/common/errorBg.png");
		background-size: cover;
		background-position: center;
		display: flex;
		flex-direction: column;
		text-align: center;

		${media.phone`
			background-image: url("../../static/common/errorBg-mobile.png");
			background-position: top;
			font-size: 14px;
			height:${props=>props.cinema ? '43vh':'75vh'};
		`};

		.errorIcon{
			width: 130px;
			height: 100px;
			background-image: url("../../static/common/error-fixed.png");
			background-size: cover;
			margin:${props=>props.cinema ? '105px auto 18px':'265px auto 18px'};

			${media.phone`
				width: 118px;
				height: 88px;
				margin:${props=>props.cinema ? '10vh auto 18px':'30vh auto 18px'};
			`};
		}

		.errorText{
			${media.phone`
				width: 185px;
				margin: 0 auto;
			`};
		}
	}
`;

export const Dot = styled.div`
	.row{
		width:100%;
		${media.phone`
			height:${props=>props.dotSize ? '20px':'3vw'};
		`};

		.dot{
			display:inline-block;
			width:15px;
			height:15px;
			background-color:#646464;
			border-radius:50%;
			margin: 0.3vw;
			cursor:pointer;
			background-color:#fff;

			${media.tablet`
				width:${props=>props.dotSize ? '15px':'14px'};
				height:${props=>props.dotSize ? '15px':'14px'};
				margin:${props=>props.dotSize ? '0.4vw':'0.3vw'};
			`};
			${media.phone`
				width:${props=>props.dotSize ? '11px':'1.5vw'};
				height:${props=>props.dotSize ? '11px':'1.5vw'};
				margin:${props=>props.dotSize ? '0.4vw':'0.35vw'};
			`};
			${media.xphone`
				width:${props=>props.dotSize ? '8px':'6px'};
				height:${props=>props.dotSize ? '8px':'6px'};
				margin:${props=>props.dotSize ? '0.4vw':'0.3vw'};
			`};
		}


		.none{
			background-color:transparent;
		}
		.empty{
			background-color:#fff;
		}
		.saled{
			background-color:#646464;
		}
		.selected{
			background-color:#e7008c;
		}
	}


`;
