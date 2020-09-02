import React from 'react';
import 'isomorphic-unfetch';
import Router from 'next/router';
import { FAQQuestionsWrapper } from '../../styled/faqStyled';
import FAQAnswer from './faqAnswer';

class FAQQuestions extends React.Component {
	constructor(props){
		super(props);

		this.click = this.click.bind(this);
		this.closePopUp = this.closePopUp.bind(this);

		this.state={
			visible:false,
			value:""
		}
	}

	click(value){
		this.setState({
			visible:true,
			value
		});
	}

	closePopUp(){
		document.getElementById("scrollHideFaq").style.position="relative";
		this.setState({
			visible:false
		});
	}


  	render() {

	    return (
			<div>
				<FAQQuestionsWrapper>
		    		<div className="wrapper">
						<div className="faqBox" onClick={()=>this.click(0)}>
							<div className="icon a"></div>
								<a>訂票問題</a>
						</div>
						<div className="faqBox" onClick={()=>this.click(1)}>
							<div className="icon b"></div>
								<a>取票問題</a>
						</div>
						<div className="faqBox" onClick={()=>this.click(2)}>
							<div className="icon c"></div>
								<a>取消訂票、退票、退款問題</a>
						</div>
						<div className="faqBox" onClick={()=>this.click(3)}>
							<div className="icon d"></div>
								<a>會員問題</a>
						</div>
						<div className="faqBox" onClick={()=>this.click(4)}>
							<div className="icon e"></div>
								<a>優待卷/招待卷訂票問題</a>
						</div>
						<div className="faqBox" onClick={()=>this.click(5)}>
							<div className="icon f"></div>
								<a>電子發票問題</a>
						</div>
					</div>
					{	this.state.visible
						?
						<FAQAnswer value={this.state.value} closePopUp={this.closePopUp} btnClick={this.props.btnClick}/>
						:
						null
					}

		    	</FAQQuestionsWrapper>
			</div>
	    )
	}
}



export default FAQQuestions;
