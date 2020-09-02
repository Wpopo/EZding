import styled , { css , keyframes }from 'styled-components';

const sizes = {
	cinemaEntry: 1280,
	desktop: 1024,
	tablet: 992,
	phone: 768,
	faq957: 957,
	faq620: 620,
	xphone414:414,
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


export const HomeWrapper = styled.div`
    background-color: #000000;
	width: 100vw;
	height: 100vh;
	padding-top: 50px;

	.one{
		cursor: pointer;
		display: block;

		img{
			width: 500px;
			margin: 0 auto;
			display: block;

			${media.faq620`
				width:90%;
			`};
		}
	}

	.two{
		cursor: pointer;
		display: block;
		margin-top: 30px;

		${media.faq620`
			margin-top: 20px;
		`};

		img{
			width: 250px;
			margin: 0 auto;
			display: block;
		}
	}

`;
