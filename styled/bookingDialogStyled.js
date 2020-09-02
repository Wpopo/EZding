import styled , { css , keyframes }from 'styled-components';

const sizes = {
	dialog:1200,
	desktop: 1024,
	tablet: 992,
	phone: 768,
	phone414:414,
	xphone:375
}


const media = Object.keys(sizes).reduce((acc, label) =>{
	acc[label] = (...args) => css`
		@media (max-width: ${sizes[label] / 16}em) {
			${css(...args)}
		}
	`

	return acc
}, {});


//clear float
export const Clearfix = styled.div`
	clear:both;
`;


export const BookingDialogWrapper = styled.div`
	position:fixed;
	width:100%;
	min-height:100vh;
	height:100vh;
	background-color:#2b2b2b;
	z-index:2000;
	padding-bottom:100px;
	overflow:auto;

	.wrapper{
		max-width:1200px;
		width:100%;
		margin:auto;
		text-align:center;
		position:relative;

		.cancel-icon{
			position:absolute;
			top:20px;
			right:1%;
			width:30px;
			height:30px;
			cursor:pointer;
			z-index:1000;
			transform:rotate(-45deg);
			z-index:2000;

			${media.desktop`right:5%;`};
			${media.tablet`right:5%;`};
			${media.phone`right:5%;`};

			span{
				display:block;
				width:30px;
				height:0.5px;
				border-bottom:1px solid #fff;
				position:absolute;
				top:50%;
				transform:translateY(-50%);
			}
			.cancel1{
				transform:rotate(90deg);
			}

		}

		.movie-name{
			width:100%;
			height:85px;
			position:relative;
			border-bottom:1px solid rgba(255,255,255,.3);
			box-sizing:border-box;
			padding-left: 20px;

			.title{
				font-size:1rem;
				color:#fff;
				float:left;
				font-weight:300;
				line-height:90px;
				cursor:pointer;
				white-space: nowrap;
			    overflow: hidden;
			    text-overflow: ellipsis;
			    text-align: left;

			    ${media.xphone`width:80%`};

			}
			.movie-icon{
				width:30px;
				height:30px;
				color:#fff;
				float:left;
				cursor:pointer;
				margin-top:40px;
			}
		}
		.find-part{
			width:96px;
			float:left;
			height:500px;

			${media.phone`
				display: none;
			`};
		}
		.mobileGroup{
			display: none;

			${media.phone`
				display: block;
				padding-left: 15px;
				box-sizing:border-box;
				height: 90vh;
			    overflow: scroll;
			`};
		}

		.mobileCinema{
			display: none;

			${media.phone`
				display: none;
			`};
		}

		.mobileEmptySeat{
			display: none;

			${media.phone`
				display: none;
				padding-left: 15px;
			`};
		}
		.mobileSpace{
			display: none;

			${media.phone`
				display: block;
    			height: 60px;
			`};
		}
	}

`;

//選電影或地方動效
export const ChoiceBtn = styled.div`
	width:50%;
	display:inline-block;

	.text{
		width:calc(100% - 25px);
		color: ${props=>props.choice ? '#fff':'#9e9e9e'};
		box-sizing:border-box;
		padding:50px 0 10px 5%;
		cursor:pointer;
		text-align:left;
		font-weight:300;
		font-size:1.125rem;

		${media.desktop`width:calc(100% - 25px);float:right;`};
		${media.phone`width:calc(100% - 25px);float:right;`};
		${media.xphone`float:right;text-align:center;width:100%;`};

	}
	.right{
		${media.desktop`width:calc(100% - 25px);float:left;`};
		${media.phone`width:calc(100% - 25px);float:left;`};
		${media.xphone`float:left;text-align:center;width:100%;`};
	}

`;

export const ChoiceBtnBottom = styled.div`
	width:100%;
	border-bottom:1px solid rgba(255,255,255,.3);

	.choiceWrapper{
		width:100%;
		margin:auto;

		${media.desktop`width:96%;`};
		${media.phone`width:96%;`};

		.bottom{
			border-radius:3px;
			float:left;
			transform:${props=>props.choice ?'translateX(0%)':'translateX(100%)'};
			width:50%;
			height:5px;
			background-color:#e50081;
			transition:.3s;
			margin-top:-2px;

			${media.desktop`
				width:50%;
				transform:${props=>props.choice ?'translateX(0%)':'translateX(100%)'};
			`};
			${media.phone`width:50%;`};
		}
	}

`;

//找影城找空位動效
export const FindBtn = styled.div`
	width:96px;
	color:${props=>props.choice ? '#e7008c':'#fff'};
	font-weight:300;
	letter-spacing:1.2px;
	height:70px;
	line-height:70px;
	cursor:pointer;
	background-color:${props=>props.choice? 'rgba(255,255,255,.1)':'#2b2b2b'};

	&:hover{
		background:rgba(255,255,255,.1);
	}
`;

export const ChoiceFindBtn = styled.div`
	float:left;
	width:4px;
	height:500px;
	border-right:1px solid rgba(255,255,255,.2);

	${media.phone`display: none;`};

	.choice-right{
		border-radius:3px;
		float:left;
		width:4px;
		height:70px;
		background-color:#e7008c;
		transition:.3s;
		transform:${props=>props.choice ? 'translateY(0%)':'translateY(70px)'}
	}
`;

//選熱門電影
export const BookingDialogContent = styled.div`
	${media.dialog`max-width:1200px;width:96%;margin:auto;`};
	${media.desktop`max-width:900px;width:96%;margin:auto;`};
	${media.phone`width:96%;margin:auto;overflow:auto;`};
	overflow:auto;
	position:relative;

	.title{
		color:#e50081;
		font-size:1.375rem;
		padding:10px 0;
		text-align:left;
		font-weight:500;
		width:100%;
		margin: 5px 0;

		${media.desktop`padding:0;`};

	}
	.poster-wrapper{
		width:100%;
		display: flex;
		justify-content: space-between;

		${media.phone`width:100%;flex-flow:row wrap;`};
		.poster{
			width:210px;
			height:320px;
			background:#3f3f3f no-repeat 50% 50% / cover;

			${media.dialog`width:180px;height:300px;`};
			${media.desktop`width:160px;height:220px;`};
			${media.phone`
				width:48%;
				height:77vw;
				background-color:#000;
				background-size:100%;
				background-position:top;
				cursor:pointer;
				margin:0 0 20px 0;
				position:relative;
			`};
			${media.phone414`height:86vw;`};
			${media.xphone`height:92vw;`};

			&:hover .poster-info{
				display:block;

				${media.phone`display:block;`};
			}

			.poster-info{
				display:none;
				width:100%;
				height:100%;
				background-color:rgba(0,0,0,.9);
				cursor:pointer;
				position:relative;
				box-sizing:border-box;

				${media.phone`
					display:block;
					height:90px;
					position:absolute;
					bottom:0;
					background-color:#000;
				`}

				.movie-title{
					width:90%;
					padding:0 5%;
					position:absolute;
					top:26%;
					color:#fff;
					font-size:.875rem;
					text-align:center;
					margin:auto;
					${media.desktop`top:30%;`};
					${media.phone`
						top:10%;
						text-align:left;
						font-size:.825rem;
						height:18px;
						overflow:hidden;
					`};
					${media.xphone`height:18px;overflow:hidden;`};

				}
				.en{
					top:47%;
					font-size:.7rem;
					color:#9e9e9e;

					${media.desktop`top:45%;`};
					${media.phone`top:40%;font-size:11px;height:15px;overflow:hidden;`};
					${media.xphone`height:15px;font-size:11px;overflow:hidden;`};
				}
				.grade{
					width:48px;
					height:18px;
					color:#9e9e9e;
					border-radius:120px;
					font-size:.75rem;
					line-height:18px;
					position:absolute;
					top:65%;
					left:50%;
					transform:translateX(-50%);
					border:1px solid #9e9e9e;

					${media.phone`
						bottom:0;
						left:5%;
						transform:translateX(0%);
						text-align:center;
					`};
				}
			}
			.show{
				display:block;
			}
		}
	}
	.movie-rank-wrapper{
		width:100%;
		margin:auto;
		overflow:auto;
		display: flex;
		flex-flow: row wrap;
		justify-content: space-between;
		padding-bottom: 50px;

		${media.phone`padding-bottom:150px;`};
		${media.phone414`padding-bottom:150px;`};
		${media.xphone`padding-bottom:150px;`};

		.movie-rank{
			height:40px;
			font-size:16px;
			width:210px;
			color:#fff;
			text-align:left;
			font-weight:300;
			white-space:nowrap;
			overflow:hidden;
			cursor:pointer;
			text-overflow:ellipsis;

			${media.dialog`width:190px;`};
			${media.desktop`width:160px;font-size:14px;`};
			${media.phone`width:300px;font-size:16px;`};


			&:hover{
				color:#9e9e9e;
				${media.phone`color:#fff;`};
			}
		}

		.empty{
			cursor:default;
		}

	}

	.title-location{
		color:#9e9e9e;
		font-size:1.375rem;
		padding:50px
	}

`;

export const MobileBtn = styled.div`
		display: none;

		${media.phone`
			padding: 20px;
			text-align: left;
			display: block;
			cursor: pointer;
			color:${props=>props.mobileShow?'#e7008c':'#ffffff'};
			font-weight: bold;
			font-size:18px;
			font-weight:300;
			position:relative;

			&:hover{
				color:#e7008c;
				font-weight: 500;
			}

			&:before{
				position:absolute;
				content:'';
				width:90%;
				height:100%;
				left:0;
				top:0;
				border-top:${props=>props.seat ? '0.5px solid #3b3b3b' : 'none'};
			}
		`};

		.icon{
			float: right;
			padding-right: 9vw;
		}

`;


//選該電影有上映的地區>影廳 or 空位 && 想到哪看(loc)
export const ChoiceLocationCinema = styled.div`
	float:${props=>props.loc?'none':'left'};
	width:${props=>props.loc? '100%' : 'calc(100% - 210px)'};
	margin:${props=>props.loc?'20px auto':'20px 0 0 20px'};

	${media.phone`
		box-sizing:border-box;
		float:none;
		margin:${props=>props.loc?'20px 0 26px 30px;':'0 0 0 20px'};
		width: calc(100% - 50px);
	`};

	.wrapper{
		max-width:1200px;
		margin:auto;
		display:flex;
		justify-content:space-between;
		box-sizing:border-box;
		padding:0 3% 0 4%;

		${media.dialog`box-sizing:border-box;padding:0;`};
		${media.phone`
			display:block;
		`};

		.loc-part{
			min-width:180px;
			width:20%;
			min-height:80vh;
			display:inline-flex;
			justify-content:flex-start;
			flex-wrap: wrap;
			align-content:flex-start;
			vertical-align: top;

			${media.desktop`
				min-width:180px;
				width:20%;
			`};
			${media.tablet`
				min-width:100px;
				width:calc(100% / 4 - 4%);
				min-width:150px;
			`};
			${media.phone`display:none;`};

			.big-title{
				width:100%;
				font-size:1.375rem;
				color:#9e9e9e;
				font-weight:300;
				text-align:left;
				height:50px;
				float:left;
				margin:0;
			}
			.cinema{
				width:100%;
				color:#fff;
				font-weight:300;
				text-align:left;
				cursor:pointer;
				height:50px;

				${media.tablet`font-size:14px`};

				&:hover{
					color:#9e9e9e;
				}
			}
		}
		.north{
			width:35%;

			.cinema{
				width:50%;
			}
		}

		.rwd-loc-part{
			display:none;

			${media.phone`display:block;`};

			.rwd-title{
				display:block;
				width:100%;
				cursor:pointer;
				margin:0;
				color:#fff;
				text-align:left;
				padding:20px 0 20px 5%;
				font-size:1rem;
				position:relative;
				font-weight:300;

				&:hover{
					color:#e7008c;
				}
				.icon{
					position:absolute;
					right:9vw;
				}

				${media.phone`
					padding:20px 0 20px 0px;
				`};

			}
			.rwd-title-color{
				color:#e7008c;
			}

			.box{

				.rwd-cinema{
					color:#dcdcdc;
					width:100%;
					text-align:left;
					padding:10px 0 10px 3%;
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

		.empty-seat{
			width:90%;
			margin-left:5%;

			.part{
				cursor:pointer;
				width:calc(100% / 4 - 3%);
				height:65px;
				line-height:65px;
				color:#fff;
				font-size:1rem;
				text-align:left;
				padding:0 0 0 3%;
				float:left;

				&:hover{
					background-color:#2b2b2b;
				}
			}
		}
	}

`;

//選空位
export const ChoiceSeatCinema = styled.div`
	float: left;
	width: calc(100% - 120px);

	${media.phone`
		margin: 0;
		float: none;
	`};


	.area{
		width: 100%;
		padding: 0 0 50px;
		display: flex;
		flex-wrap: wrap;

		.location{
			color: #fff;
			padding: 24px 160px 19px 40px;
			cursor:pointer;

			&:hover{
				color: #e6008a;
			}

			${media.phone`display:none;`};

		}

		.rwd-location{
			display:none;

			${media.phone`
				display:block;
				color: #fff;
				padding: 24px 0px 19px 20px;
				text-align: left;
				width: 100%;

				&:hover{
					color: #e6008a;
				}
			`};
	   	}
	}

`;
