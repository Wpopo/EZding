import React from 'react';
import Router from 'next/router';
import { NewsSliderWrapper, AdImg } from '../../styled/homePageStyled';
import ReactSlider from 'react-slick';
import LoadingCircle from '../common/loading';
import FaAngleLeft from 'react-icons/lib/fa/angle-left';
import FaAngleRight from 'react-icons/lib/fa/angle-right';
import FaExclamationCircle from 'react-icons/lib/fa/exclamation-circle';
//API
import * as activityAPI from '../../actions/activityAPI';

function SampleNextArrow(props) {
  const {className, style, onClick} = props
  return (
    <FaAngleRight
      className={className}
      style={{...style,
      			width: '40px',
				height: '40px',
				right:'32.5vw',
				background: '#e7008c',
				borderRadius:'50%',
				color:'#fff',
				padding:'5px',
				boxShadow:'0 3px 6px rgba(0,0,0,.5)',
				zIndex:1
      		}}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const {className, style, onClick} = props
  return (
    <FaAngleLeft
      className={className}
      style={{...style,
      		width: '40px',
			height: '40px',
			left:'31.5vw',
			background: '#e7008c',
			borderRadius:'50%',
			color:'#fff',
			padding:'5px',
			boxShadow:'0 3px 6px rgba(0,0,0,.5)',
			zIndex:1
      	}}
      onClick={onClick}
    />
  );
}


class NewsSlider extends React.Component {
	constructor(props){
		super(props);

		this.getSliderItem = this.getSliderItem.bind(this);
		this.gotoPage = this.gotoPage.bind(this);

		this.state = {
			isLoading:true,
			isError:false,
			newsItems:[],
            bannerObj:{ad_url_big:[],ad_url_medium:[],ad_url_small:[]},
			big_settings:{
				dots:false,
				infinite: true,
				slidesToShow: 3,
				slidesToScroll: 1,
				speed: 500,
      			autoplay:true,
      			nextArrow: <SampleNextArrow />,
      			prevArrow: <SamplePrevArrow />
			},
			mid_settings:{
				className: 'center',
				centerMode: true,
				infinite: true,
				centerPadding: '60px',
				slidesToShow: 1,
				speed: 500,
				nextArrow: <SampleNextArrow />,
      			prevArrow: <SamplePrevArrow />,
      			autoplay:true
			},
			small_settings:{
				dots:false,
				className: 'center',
				centerMode: true,
				infinite: true,
				centerPadding: 0,
				slidesToShow: 1,
				speed: 500,
				arrows:false,
				autoplay:true
			}
		}

	}
	componentDidMount(){
		this.getSliderItem(1);
	}

	getSliderItem(val){
		let ad_type = '1';
        let ad_size = val;
		let ad_category = 'ezding.rwd';
		let ad_channel = '5d5e5ed3184fedf201184fedf6eb0001';
		let page_code = 'home';
		let area_code = 'eventBanner';

        let obj = this.state.bannerObj

		activityAPI.getbanner(ad_type,ad_size,ad_category,ad_channel,page_code,area_code)
		.then(result=>{

            var mapping = [
                "ad_url_big",
                "ad_url_medium",
                "ad_url_small",
            ]

            if(!Array.isArray(result.result) || result.result.length == 0){

            }else{

                for(let i=0; i<mapping.length; i++){

                    var url = mapping[i]
                    var pattern = new RegExp("^\/photos");

                    if (url in result.result[0] && typeof result.result[0][url] === 'string' && pattern.test(result.result[0][url])) {

                        obj[url] = result.result
                        this.setState({
                            bannerObj:obj
                        });
                        break;
                    }else{

                    }
                }
            }

            if(ad_size<3){
                this.getSliderItem(ad_size+1)
            }else{
                this.setState({
        			isLoading:false
        		});
            }

		})
		.catch(error=>{
            this.setState({
                isLoading:false
            });
		});
	}

	gotoPage(item){
		Router.push({
			pathname:item.ad_link
		});
	}

	render () {
		const big_settings = this.state.big_settings;
		const mid_settings = this.state.mid_settings;
		const small_settings = this.state.small_settings;

		if(this.state.isLoading){
			return(
                <NewsSliderWrapper>
                    <div className="adLoadingBox">
                        <div className="adLoading"></div>
                        <div className="adLoading"></div>
                        <div className="adLoading"></div>
                    </div>
                    <div className="mobileAdLoadingBox">
                        <div className="mobileAdLoading"></div>
                    </div>
                </NewsSliderWrapper>
			)
		}
		else if(!this.state.isLoading){

			return (
			    <NewsSliderWrapper>
			    	<div className="wrapper">
			    		<div className="big">
			    			<ReactSlider {...big_settings}>
			    				{
                                    this.state.bannerObj.ad_url_big.length>0?
                                    this.state.bannerObj.ad_url_big.map((item,index)=>{
			    						return  <div key={index} className="post" onClick={()=>this.gotoPage(item)}>
			    									<AdImg imgUrl={`https://img.ezding.com.tw${item.ad_url_big}`}/>
			    								</div>
			    					})
                                    :
                                    <div className="post" onClick={()=>this.gotoPage({ad_link:"https://goo.gl/qgiFa7"})}>
                                        <img src='../static/common/errorImg-smallBanner-homePage.jpg'/>
                                    </div>
			    				}
			    			</ReactSlider>
			    		</div>
			    		<div className="mid">
			    			<ReactSlider {...mid_settings}>
			    				{
                                    this.state.bannerObj.ad_url_medium.length>0?
			    					this.state.bannerObj.ad_url_medium.map((item,index)=>{
			    						return <div key={index} className="post" onClick={()=>this.gotoPage(item)}>
			    									<AdImg imgUrl={`https://img.ezding.com.tw${item.ad_url_medium}`}/>
			    								</div>
			    					})
                                    :
                                    <div className="post" onClick={()=>this.gotoPage({ad_link:"https://goo.gl/qgiFa7"})}>
                                        <img src='../static/common/errorImg-smallBanner-homePage.jpg'/>
                                    </div>
			    				}
			    			</ReactSlider>
			    		</div>
			    		<div className="small">
			    			<ReactSlider {...small_settings}>
			    				{
                                    this.state.bannerObj.ad_url_small.length>0?
			    					this.state.bannerObj.ad_url_small.map((item,index)=>{
			    						return <div key={index} className="post" onClick={()=>this.gotoPage(item)}>
			    									<AdImg imgUrl={`https://img.ezding.com.tw${item.ad_url_small}`}/>
			    								</div>
			    					})
                                    :
                                    <div className="post" onClick={()=>this.gotoPage({ad_link:"https://goo.gl/qgiFa7"})}>
                                        <img src='../static/common/errorImg-smallBanner-homePage.jpg'/>
                                    </div>
			    				}
			    			</ReactSlider>
			    		</div>
			    	</div>
			    </NewsSliderWrapper>
			)
		}else if(this.state.isError){
			return(
                <NewsSliderWrapper>
					<div className="errorBox">
						<FaExclamationCircle className="errorIcon"/>
					</div>
				</NewsSliderWrapper>
			)
		}else{
			return(
				<NewsSliderWrapper>
                    <LoadingCircle height={'300px'}/>
				</NewsSliderWrapper>
			)
		}
	}
}



export default NewsSlider;
