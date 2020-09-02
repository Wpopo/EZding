import React from 'react';
import Router from 'next/router';
import { NewsArticleWrapper } from '../../styled/homePageStyled';
import FaVolumeUp from 'react-icons/lib/fa/volume-up';
import TiArrowRight from 'react-icons/lib/ti/arrow-right';
import timeFormat from '../common/timeFormat';
import LoadingBoxFB from '../common/loadingBoxFB';

//API
import * as articleAPI from '../../actions/articleAPI';

class NewsArticle extends React.Component {
	constructor(props){
		super(props);

		this.getNews = this.getNews.bind(this);
		this.gotoPage = this.gotoPage.bind(this);
		this.gotoMore = this.gotoMore.bind(this);

		this.state = {
			isLoading:true,
			isError:false,
			newsItems:[],
		}
	}

	componentDidMount(){
		this.getNews();
	}

	getNews(){
		this.setState({
			isLoading:true
		});

		let content_category = 'movie_express';
		let content_type = '';
		let valid = '1';
		let page = '1';
		let page_size = '12';
		let top = '0';
		let feature = '0';

		articleAPI.articleNews(content_category,content_type,valid,page,page_size,top,feature)
		.then(result=>{
			this.setState({
				isLoading:false,
				newsItems:result.result.list
			});
		})
		.catch(error=>{
			this.setState({
				isLoading:false,
				isError:true
			});
		});

	}

	gotoPage(item){
		Router.push({
			pathname:'/articlePage',
			query:{
				content_id: item.content_id,
			}
		});
	}

	gotoMore(){
		Router.push({
			pathname:'/article',
			search: '?type=0&page=1',
		});
	}

  	render () {
  		if(this.state.isLoading){
			let loadingArea = [];

			for(let i=0; i<12; i++){
				loadingArea.push(
					<LoadingBoxFB key={i} width={`3 - 70px`} height={`65px`} margin={`0 70px 18px 0`} size={`800px 65px`} midWidth={`2 - 70px`} smallWidth={`80%`} smallHeight={`70px`} smallMargin={`0 auto 14px auto`}/>
				)
			}

  			return(
				<NewsArticleWrapper>
					<div className="wrapper">
			    		<div className="title">
			    			<FaVolumeUp className="icon"/>
			    			新聞影評
			    		</div>
			    		<div className="content">
							{loadingArea}
			    		</div>
			    	</div>
				</NewsArticleWrapper>
			)
  		}
  		else if(this.state.newsItems.length > 0){
  			return (
			    <NewsArticleWrapper>
			    	<div className="wrapper">
			    		<div className="title">
			    			<FaVolumeUp className="icon"/>
			    			新聞影評
			    		</div>
			    		<div className="content">
			    			{this.state.newsItems.map((item,index)=>{
			    				let time = timeFormat.newsDate(item.created_time);
		    					return(
		    						<div className="newsbox" key={index} onClick={()=>this.gotoPage(item)}>
					    				<div className="newsTitle">{item.content_title}</div>
					    				<div className="newsdetail">{time}</div>
					    				<div className="newsdetail">{item.author.author_name}</div>
					    			</div>
		    					);
			    			})}
			    		<div className="more"  onClick={this.gotoMore}>
			    			<TiArrowRight className="icon"/>
			    			more
			    		</div>
			    		</div>
			    	</div>
			    </NewsArticleWrapper>
		    )
  		}
	    else if(this.state.isError){
	    	return(
				<NewsArticleWrapper>
					<div className="wrapper">
						<div className="title">
			    			<FaVolumeUp className="icon"/>
			    			新聞影評
			    		</div>
					</div>
					<div className="errorIcon"/>
				</NewsArticleWrapper>
			)
	    }
  	}
}



export default NewsArticle;
