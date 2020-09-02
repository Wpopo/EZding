import styled , { css , keyframes } from 'styled-components';
import { WrapperSample , WrapperSampleNoContent } from './commonStyled';


const sizes = {
	desktop: 1024,
	tablet: 992,
	phone: 768,
	xphone414:414
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


export const FaqWrapper = styled.div`
	padding-top:130px;
	background-color:#dcdcdc;
	height:100%;

	.wrapper{
		width: 100%;
		margin:auto;
		text-align:center;

		${media.tablet`
			width: 100vw;
		`}

		.lineBox{
			margin:auto;
			width:400px;
			height:4px;
			background-color:#ccc;
			${media.phone`
				width: 340px;
			`}

			${media.xphone414`
				width: 260px;
			`}

			.line{
				width:200px;
				height:100%;
				background-color:#e7008c;
				transition:.3s;
				transform:${props=>props.btnClick ? 'translateX(0)':'translateX(100%)'};

				${media.phone`
					width: 170px;
				`}

				${media.xphone414`
					width: 130px;
				`}
			}
		}
	}
`;

export const ChoiceBtn = styled.div`
	width:200px;
	height:45px;
	line-height:45px;
	color:${props=>props.btnClick ? '#555':'#aaa'};
	font-weight:500;
	font-size:16px;
	display:inline-block;
	cursor:pointer;

	${media.phone`
		width: 170px;
	`}

	${media.xphone414`
		width: 130px;
	`}

`;

export const FAQQuestionsWrapper = styled.div`
	${media.tablet`
		width: 100vw;
	`}


	.wrapper{
		width: 970px;
		margin: 30px auto;
		display: flex;
	    flex-wrap: wrap;
	    justify-content: space-between;

		${media.tablet`
			width: 750px;
			margin: 0 auto;
			justify-content: space-evenly;
			margin-top: 30px;
		`}

		${media.phone`
			margin: 30px auto;
			width: 300px;
		`}

		.faqBox{
			background-color: #fff;
			width: 280px;
			height: 250px;
			margin-bottom: 30px;
			cursor: pointer;
			padding-left: 10px;
			padding-right: 10px;

			${media.xphone414`
				height: 150px;
			`}

			.icon{
				width: 80px;
			    height: 80px;
			    margin: 62px auto 6px auto;
				background-size: cover;

				${media.xphone414`
					margin: 9px auto 0 auto;
				`}
			}

			a{
				font-size: 18px;
				color: #4a4a4a;
				border: 1px solid #dcdcdc;
				border-radius: 100px;
				padding: 4px 23px;
				display: inline-block;

				${media.xphone414`
					padding: 2px 23px;
				`}
			}
   	 	}
		.icon.a{
			background-image: url("../../static/common/faq-booking.png");
		}
		.icon.b{
			background-image: url("../../static/common/faq-ticket-collection.png");
		}
		.icon.c{
			background-image: url("../../static/common/faq-refund.png");
		}
		.icon.d{
			background-image: url("../../static/common/faq-mber.png");
		}
		.icon.e{
			background-image: url("../../static/common/faq-coupon.png");
		}
		.icon.f{
			background-image: url("../../static/common/faq-elec-invoices.png");
		}
	}

`;

export const FAQConnectWrapper = styled.div`
	height:300px;
	padding-top: 70px;
	width: 280px;
	margin: 0 auto;

	div{
		    float: left;
		a{
			float: none;
		}
	}

	a{
		float: left;
	}

`;

export const FAQAnswerWrapper = styled.div`
	position: absolute;
	height: 646px;
	top: 126px;
	background: #dcdcdc;
	width: 100%;

	${media.tablet`
		height: 100%;
	`}
`;
