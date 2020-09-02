import React from 'react';
import Router from 'next/router';
import 'isomorphic-unfetch';
import { SliderWrapper, BoxImg } from '../../styled/homePageStyled';
import UrlChange from '../common/urlChange';
import ReactSlider from 'react-slick';

//API
import * as activityAPI from '../../actions/activityAPI';

class Slider extends React.Component {
	constructor(props){
		super(props);

		this.getBannerList = this.getBannerList.bind(this);
		this.gotoPage = this.gotoPage.bind(this);

		this.state = {
			isLoading:true,
			isError:false,
			items:[],
		}
	}



	getBannerList(value){
		this.setState({
			isLoading:true
		});

		let ad_type = '1';
		let ad_size = value;
		let ad_category = 'ezding.rwd';
		let ad_channel = '5d5e5ed3184fedf201184fedf6eb0001';
		let page_code = 'home';
		let area_code = 'mainBanner';

		activityAPI.getbanner(ad_type,ad_size,ad_category,ad_channel,page_code,area_code)
		.then(result=>{
			//如果為空值
			if(result.result ==  null || result.result.length ==  0){
				this.setState({
					isLoading:false,
					isError:true
				});
			}else{
				let items = this.state.items;

			   result.result.map((item, index)=>{

				   let arry2 = [];
				   if(value == 1){
					   arry2.push(item.ad_link);
					   arry2.push('https://img.ezding.com.tw'+item.ad_content);
					   items.push(arry2)
					   return items;
				   }
				   else{
					   items[index].unshift(item.ad_link);
					   items[index].push('https://img.ezding.com.tw'+item.ad_content);
					   return items;
				   }
			   });

			   //console.log(items);

			   if(value < 3){
				   this.getBannerList(value + 1)
			   }else{
				   this.setState({
					 isLoading:false,
					 items,
				 })
			   }
			}

		})
		.catch(error=>{
			this.setState({
				isLoading:false,
				isError:true
			});
		});

	}

	gotoPage(item){
		// Router.push({
        //     pathname:item
        // });

		if(navigator.userAgent.match(/(iphone|ipad|ipod|Android);?/i)){
			window.open(item[0]);
		}else{
		    window.open(item[2]);
		}
	}

	componentDidMount(){
		this.getBannerList(1);
	}

  	render() {
  		if(this.state.isLoading){
  			//loading
  			return(
  				<SliderWrapper homepage>
					<div className="bannerLoading">
						<img  src={'/static/common/loading.gif'}/>
					</div>
		    	</SliderWrapper>
  			);
  		}else if(this.state.items.length > 0){
  			//fetch success
  			const settings = {
				dots: true,
				infinite: true,
				speed: 500,
				slidesToShow: 1,
				slidesToScroll: 1,
				arrows:false,
				autoplay: true
  			};
		   return(
		   		<SliderWrapper homepage>
			    	<div className="box-contain">
			    		<ReactSlider {...settings}>
							{this.state.items.map((item,index)=>{
								return <BoxImg className="box" key={index} onClick={()=>this.gotoPage(item)} imgUrl={item}></BoxImg>
							})}
			    		</ReactSlider>
			    	</div>
		    	</SliderWrapper>
		   	)
  		}else if(this.state.isError){
  			//fetch error
  			return(
  				<SliderWrapper homepage>
			    	<div className="box-contain error">
			    		<div className="box"></div>
			    	</div>
		    	</SliderWrapper>
  			);
  		}else {
  			return(
  				<SliderWrapper homepage>
			    	<div className="box-contain">
			    		<div className="box"></div>
			    	</div>
		    	</SliderWrapper>
  			);
  		}

  	}
}



export default Slider;
