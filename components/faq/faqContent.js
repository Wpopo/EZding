import React from 'react';
import 'isomorphic-unfetch';
import Router from 'next/router';
import { FaqWrapper , ChoiceBtn } from '../../styled/faqStyled';
import FAQQuestions from './faqQuestions';
import FAQConnect from './faqConnect';

//API
import * as movieAPI from '../../actions/movieAPI';

class FAQContent extends React.Component {
	constructor(props){
		super(props);

		this.btnClick = this.btnClick.bind(this);
		this.getFaqMenu = this.getFaqMenu.bind(this);
		this.state = {
			isLeftBtnClick:true
		}
	}

	componentDidMount(){
		this.getFaqMenu();
	}

	btnClick(boolean){
		this.setState({
			isLeftBtnClick:boolean
		});
	}

	getFaqMenu(){

	}

  	render () {

	    return (
		    <FaqWrapper btnClick={this.state.isLeftBtnClick}>
		    	<div className="wrapper">
		    		<ChoiceBtn btnClick={this.state.isLeftBtnClick} onClick={()=>this.btnClick(true)}>電影常見問題</ChoiceBtn>
		    		<ChoiceBtn btnClick={!this.state.isLeftBtnClick} onClick={()=>this.btnClick(false)}>聯絡我們</ChoiceBtn>
		    		<div className="lineBox">
		    			<div className="line"></div>
		    		</div>

		    		{this.state.isLeftBtnClick ? <FAQQuestions btnClick={this.btnClick}/> : <FAQConnect />}

		    	</div>
		    </FaqWrapper>
	    )
  }
}



export default FAQContent;
