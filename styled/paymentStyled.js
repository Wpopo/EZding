import styled , { css , keyframes }from 'styled-components';

const sizes = {
    desktop: 1024,
    tablet: 992,
    phone: 768,
    xphone: 486
}


const media = Object.keys(sizes).reduce((acc, label) =>{
	acc[label] = (...args) => css`
		@media (max-width: ${sizes[label] / 16}em) {
			${css(...args)}
		}
	`

	return acc
}, {});


export const PaymentWrapper = styled.div`
	min-height: 700px;
    background-color: #3f3f3f;
    ${media.phone`
        min-height: 580px;
    `};

    .loadingWrap{
        width: 100vw;
        padding-top: 80px;
        ${media.desktop`
            padding-top: 70px;
        `};
        ${media.phone`
            padding-top: 60px;
        `};

        &.hide{
            display: none;
        }

        .imgWrap{
            height: 620px;
            display: flex;
            justify-content: center;
            align-items: center;
            ${media.phone`
                height: 457px;
            `};

            img{
                max-width: 88px;

                ${media.phone`
                    max-width: 63px;
                `};
            }
        }

        .buffer{
            position: absolute;
    		top: 0;

            iframe{
                width: 100vw;
        		height: 620px;
        		padding: 80px 0 0;
        		overflow: hidden;
        		border: none;

                ${media.desktop`
                    padding: 70px 0 0;
                `};
                ${media.phone`
                    padding: 60px 0 0;
                `};
            }
        }
    }
`;

export const Banner = styled.div`
    height: 100%;
    display: block;
    background-size: cover;
	background-image: ${props=> `url(${props.imgUrl[0]})`};

	${media.tablet`
		background-image: ${props=> `url(${props.imgUrl[1]})`};
	`};

	${media.phone`
		background-image: ${props=> `url(${props.imgUrl[2]})`};
	`};

`;

export const EndingPageWrapper = styled.div`
	min-height: 680px;
    background-color: #3f3f3f;

    ${media.phone`
        min-height: 457px;
    `};


    .loadingWrap{
        width: 100vw;
        padding-top: 80px;
        ${media.desktop`
            padding-top: 70px;
        `};
        ${media.phone`
            padding-top: 60px;
        `};

        .imgWrap{
            height: 680px;
            display: flex;
            justify-content: center;
            align-items: center;
            ${media.phone`
                height: 457px;
            `};

            img{
                max-width: 88px;

                ${media.phone`
                    max-width: 63px;
                `};
            }
        }
    }

    .endingPageWrap{
        padding-bottom: 70px;
        padding-top: 160px;
        width: 1100px;
        min-height: 680px;
        background-color: #3f3f3f;
        display: flex;
        margin: 0 auto;
        justify-content:space-between;
        flex-direction: row-reverse;

        ${media.desktop`
            width: 675px;
            display: block;
    	`};

        ${media.phone`
            width: 90%;
    	`};

        .endingPagePoster{
            width: 675px;
            height: 600px;
            background-color: #000000;

            ${media.desktop`
                width: 100%;
        	`};

            ${media.phone`
                height: 75vw;
        	`};
        }

        .endingPageArea{
            width: 400px;
            height: auto;
            background-color: #1e1e1e;
            overflow:hidden;

            ${media.desktop`
                width: 100%;
                padding: 20px 0 50px 0;
        	`};

            .block1{
                margin: 40px auto 0;
                width: 100%;

                .ticketNumber{
                    color: #8e8e8e;
                    text-align: center;
                    font-size: 14px;
                }

                .ticketNumberArea{
                    margin: 6px auto 0;
                    font-weight: 500;
                    font-size: 26px;
                    text-align: center;
                    color: #e50a84;
                }
            }

            .block2{
                height: auto;
                margin: 15px auto 0;
                padding-left: 40px;

                h1{
                    width: 320px;
                    margin: 0 auto;
                    color: #fff;
                    font-size: 18px;
                    padding-bottom: 5px;

                    ${media.xphone`
                        width: 240px;
                    `};
                }

                ul{
                    width: 320px;
                    margin: 0 auto;
                    list-style-type: none;
                    padding: 0;
                }

                li{
                    margin-bottom: 5px;
                    height: auto;

                    .endingPageTitle{
                        font-size: 14px;
                        line-height: 1.43;
                        color: #8e8e8e;
                        margin-right: 10px;
                        vertical-align: top;
                        display: inline-block;
                    }

                    .endingPageContent{
                        font-size: 18px;
                        text-align: left;
                        color: #ffffff;
                        display: inline-block;
                        max-width: 250px;
                        line-height: 1.3;

                        ${media.xphone`
                            max-width: 57vw;
                            line-height: 27px;
                        `};
                    }
                }

                .seat{
                    height: auto;

                    .endingPageTitle.snack{
                        margin-top: 2px;
                    }

                    .seatArea{
                        width: 260px;
                        display: inline-block;
                        height: auto;

                        ${media.xphone`
                             width: 200px;
                    	`};

                        ul{
                            width: 280px;
                            color: #ffffff;

                            ${media.xphone`
                                width: 200px;
                                margin: 0;
                        	`};
                        }

                        li{
                            display: inline-block;
                            width: 80px;
                            line-height: 1.5;
                        }
                    }
                }

                .endingSnackWrap{
                    height: auto;

                    .endingSnackItem{
                        display: inline-block;

                        .endingSnackArea{
                            width: 250px;
                            display: inline-block;
                            color: #ffffff;
                        }
                    }
                }
            }

            .block3{
                width: 349px;
                margin: 30px auto 0;
                border-top: 1px dotted #979797;

                ${media.desktop`
                    width: 580px;
            	`};
                ${media.phone`
                    width: 80%;
            	`};

                .circle{
                    width: 30px;
                    height: 30px;
                    border-radius: 30px;
                    background: #3f3f3f;
                    display: inline-block;
                }

                .circle.left {
                    float: left;
                    margin: -15px 0 0 -40px;

                    ${media.desktop`
                        margin: -15px 0 0 -60px;
                	`};

                    ${media.phone`
                        margin: -3vw 0 0 -11.5vw;
                	`};
                }

                .circle.right {
                    float: right;
                    margin: -15px -40px 0 0;

                    ${media.desktop`
                        margin: -15px -60px 0 0;
                	`};
                    ${media.phone`
                        margin: -3vw -11vw 0 0;
                	`};
                }
            }

            .block4{
                h5{
                    font-size: 14px;
                    text-align: center;
                    color: #969696;
                }

                .subBlock.prize{
                    display: flex;
                    justify-content:center;
                    border-bottom: 1px solid #323232;
                    padding-bottom: 25px;
                    width: 270px;
                    margin: 0 auto;
                }
                .subWrapPrize{
                    width: 140px;

                    .subPoint{
                        font-size: 24px;
                        text-align: center;
                        color: #e50a84;
                        padding-bottom: 5px;

                        .point{
                            font-size: 14px;
                            color: #d7d7d7;
                            display: inline-block;
                            padding-left: 3px;
                        }
                    }
                    .notice{
                        width: 127px;
                        margin: 0 auto;
                        font-size: 14px;
                        color: #d7d7d7;
                        text-align: center;
                    }
                    span{
                        margin: 0 auto;
                        display: block;
                        font-size: 12px;
                        text-align: center;

                        a{
                            color: #969696;
                        }
                    }
                }

                .subWrapPrize:first-child{
                    border-right: solid 1px #3c3c3c;
                }
            }

            .block5{
                margin: 20px 0 65px 0;

                ${media.desktop`
                    margin: 0 auto;
                    padding-top: 20px;
                `};

                .pointTicketImg{
                    width: 30px;
                    height: 30px;
                    margin: 0 auto;
                    display: block;
                    margin-bottom: 12px;
                }

                .pointTicketNumber{
                    font-size: 14px;
                    line-height: 1.5;
                    text-align: center;
                    color: #ffffff;
                }

                .pointTicketNumber.num{
                    font-size: 24px;
                    font-weight: 500;
                    line-height: 0.88;
                    letter-spacing: 1px;
                    color: #e50a84;
                }
                .pointTicketPrice{
                    font-size: 14px;
                    line-height: 1.5;
                    text-align: center;
                    color: #ffffff;
                    padding-bottom: 6px;
                }
                .pointTicketPrice.price{
                    color: #e50a84;
                }
                .pointNotice{
                    font-size: 12px;
                    line-height: 0.92;
                    text-align: center;
                    color: #969696;
                    width: 300px;
                    margin: 0 auto;
                    line-height: 1.5;

                    ${media.phone`
                        max-width: 230px;
                	`};

                    a{
                        font-size: 12px;
                        line-height: 0.92;
                        text-align: center;
                        color: #969696;
                        display: block;
                        padding-top: 7px;
                    }
                }
            }
        }
    }

`;
