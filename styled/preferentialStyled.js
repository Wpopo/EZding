import styled , { css }from 'styled-components';

const sizes = {
	desktop: 1980,
	tablet: 1080,
	phone: 768,
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


export const PreferentialWrapper = styled.div`
	width:100%;
	padding-top:135px;
	background-color: #dcdcdc;
	min-height: 600px;
	padding-bottom:40px;

	${media.phone`
		height:auto;
		padding-top:90px;
		padding-bottom:9vw;
	`}

	.wrapper{
		width:100%;
		margin:auto;
		text-align:center;
		height:aoto;
		color:#fff;
		font-size:50px;

		.title{
			width: 400px;
			display: flex;
			justify-content: center;
			flex-wrap: wrap;
			position: relative;
			margin: 0 auto;
			border-bottom: 2px solid #c4c4c4;

			${media.phone`
				width: 260px;
				margin-bottom: 15px;
			`}
		}
	}
`;

export const PreferentialTitleList = styled.div`
	width:100%;
	background-color: #dcdcdc;
	height:auto;

	${media.phone`
		height:auto;
		padding-top:1vw;
		padding-bottom:9vw;
	`}

	.contentGropu{
		width: 960px;
		margin: auto;
		display: flex;
		justify-content: flex-start;
		flex-wrap: wrap;
		margin-top: 40px;

		${media.phone`
			width: 82.02vw;
			margin-top: 5vw;
		`}

		.grid{
			width: 300px;
			height: 100px;
			margin-right: 27px;
			margin-bottom: 30px;
			border-radius: 2.2px;
			background-color: #fff;
			cursor: pointer;
			display: flex;
			justify-content: center;
			flex-direction: column;
			align-items: center;
			position: relative;

			${media.phone`
				width: 39.06vw;
				margin-right: 3vw;
			`}

			.wrap{
				display: flex;
				flex-direction: column;
				align-items: center;

				.bank{
					max-width: 260px;
					margin-bottom: 10px;
					font-size: 1.125rem;
					color: #787878;
				}

				.planDec{
					height: 20px;
					padding: 0 8px;
					border-radius: 100px;
					background-color: #fff;
					font-size: .875rem;
					color: #3f3f3f;
					text-align: center;
					border: 1px solid #dcdcdc;
					line-height: 21px;
				}
			}
		}
		.grid:hover{
			background-color: #e7008c;
			border-color: #e7008c;

			${media.phone`
				background-color: #fff;
				border-color: #fff;
			`}

			.wrap{
				.bank{
					color: #fff;

					${media.phone`
						color: #787878;
					`}
				}
			}
		}

		.grid:nth-child(3n){
			margin-right: 0px;

			${media.phone`
				margin-right: 3vw;
			`}

		}

		.grid:nth-child(2n){

			${media.phone`
				margin-right: 0vw;
			`}

		}
	}
`;


export const ChooseBtn = styled.div`
	width: 200px;
	height: 50px;
	cursor:pointer;
	font-size: 1.125rem;
	line-height: 50px;
	text-align: center;
	color: ${props=>props.choice ? '#4a4a4a':'#9c9c9c'};

	${media.phone`
		width: 130px;
		height: 40px;
		font-size: 1rem;
		line-height: 35px;
	`}

`;

export const ChooseBorder = styled.div`
	width: 200px;
	height: 6px;
	background-color: #e6008a;
	position: absolute;
	left: 0;
	bottom: -1px;
	transform: ${props=>props.choice ? 'translateX(0%)':'translateX(100%)'};
	transition: transform .3s;

	${media.phone`
		width: 130px;
	`}

`;


export const MoviePrice = styled.div`
	margin-top: 20px;

	.wrapper{
		margin-bottom: 20px;
	    padding-left: 120px;
	    box-sizing: border-box;
	    border-bottom: 1px solid #979797;
	    display: flex;
		${media.phone`
			padding-left: 8vw;
		`}


		.rank-btn{
			width: 135px;
			height: 50px;
			font-size: .875rem;
			color: #9b9b9b;
			text-align: center;
			line-height: 50px;
			cursor: pointer;
			${media.phone`
				height: 7vw;
				line-height: 8vw;
			`}

		}
		.checked{
			color: #000;
		    border: 1px solid #979797;
		    border-bottom: 1px solid #c4c4c4;
			margin-bottom: -1px;
		}
	}

`;


export const MoviePriceList = styled.div`
	height: auto;
	font-size: 0.925em;
	background-color: #d8d8d8;
	text-align: center;
	${media.phone`
		font-size: 11px;
	`}

		.menuTitle{
			height: 50px;
			display: flex;
			justify-content: space-between;
			color: #4a4a4a;
			font-weight: 700;
			line-height: 50px;
			text-align: center;
			border-bottom: 2px solid #c4c4c4;
			margin-bottom: 0px;
			padding-left: 0px;

			li{
				list-style: none;
			}

			li:nth-of-type(1){
				flex: 0 1 10.888%;

			}

			li:nth-of-type(2){
				flex: 0 1 32.37%

			}

			li:nth-of-type(3){
				flex: 0 1 41.37%

			}

			li:nth-of-type(4){
				flex: 0 1 15.37%;

			}

		}

		.priceGroup{
			.group{
				display: flex;
				border-bottom: 4px solid #c4c4c4;
				color: #4a4a4a;

				.area{
					width: 8.888%;
					font-size: 1rem;
					color: #4a4a4a;
					border-right: 2px solid #c4c4c4;
					border-radius: 4px 0 0 4px;
					display: flex;
					justify-content: center;
					align-items: center;
					${media.phone`
						font-size: 11px;
					`}
				}

				.detailList{
					width: 91.062%;
					line-height: 50px;
					${media.phone`
						line-height: 4vw;
					`}

					ul{
						display: flex;
						align-items:center;
						border-bottom: 2px solid #c4c4c4;
						list-style: none;
						margin: 0;
						padding-left: 1px;
						padding-right: 1px;

						li:first-of-type{
							flex: ${props=>props.blockValue === 1 ? '0 1 55%':'0 1 37.931%'};
							${media.xphone`
								line-height: 14px;
							`}
						}

						li:nth-of-type(2){
							flex: 0 1 45.977%
						}

						li:last-of-type{
							flex: ${props=>props.blockValue === 1 ? '0 1 44%':'0 1 16.091%'};
						}

						li>.box{
							${media.phone`
								width:70%;
								margin: 0 auto;
							`}
							span{
								color: #e6008a;
							}
						}
					}

					ul:last-child{
						border-bottom: none;
					}
				}
			}
		}
		.emptyArea{
			height: 500px;
			padding-top: 50px;
			background-color: #c4c4c4;

			.emptyImg{
				display: block;
			    margin: 20px auto;
			    width: 100px;
			}
		}

`;
