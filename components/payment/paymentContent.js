import React from 'react';
import 'isomorphic-unfetch';
import Router from 'next/router';
import { PaymentWrapper } from '../../styled/paymentStyled';

import * as movieAPI from '../../actions/movieAPI';
import * as memberAPI from '../../actions/memberAPI';

class PaymentContent extends React.Component{
    constructor(props){
        super(props);

        //this.updateIframe = this.updateIframe.bind(this);
        this.callBookingSlectedSeats = this.callBookingSlectedSeats.bind(this);
        this.webCodeGetToken = this.webCodeGetToken.bind(this);

        this.state = {
            isLoading:true,
            isError:false,
            iframeHeight:'',
            isToken: false
        }
    }


    // 根據iframe回傳的postmessage做處理
    // updateIframe(event){
    //
    //     const currentUrl = originSource();
    //
    //     The data must has been sent from ezding paymemt iframe
    //     if(event.origin.indexOf(currentUrl) > -1 ){
    //         if(event.data.type === "height"){
    //             var value = (event.data.value === 0) ? 620 : (event.data.value);
    //             this.setState({
    //                 iframeHeight: value
    //             });
    //         }
    //         //在每一步scroll to top
	// 		if (event.data.type === "scrollTop" && event.data.value === true) {
	// 			window.scrollTo(0, 0);
	// 		}
    //         //付款頁 錯誤導頁(再確認)
    //         if (event.data.type === "parentForward") {
	// 			if (event.data.value === "index") {	//導回首頁
	// 				location.href = location.origin;
	// 			} else if (event.data.value === "selectSeats") {	//導回選位頁
	// 				let seatMapURL = JSON.parse(localStorage.getItem("seatMapURL"));
	// 				location.href = `${document.location.origin}/seatMap?date=${seatMapURL.date}&time=${seatMapURL.time}&tickets=${seatMapURL.people}&session_id=${seatMapURL.session}`;
	// 			}
	// 			window.scrollTo(0, 0);
	// 		}
    //         //iframe本身的轉址
    //         if (event.data.type === "iFrameForward") {
    //             let iframe = document.querySelector(".iframe") ? true: false;
	// 			if (iframe && event.data.value) {
	// 				iframe.src = event.data.value;
	// 			}
	// 		}
    //
	// 		//訂單完成最後一頁，區分去line完成頁和ezding完成頁
	// 		if (event.data.type === "finishOrder") {
	// 			var orderID = event.data.value;
	// 			sessionStorage.setItem("orderID", orderID);
    //             //判斷導line完成頁還是ezding完成頁
    //             if(sessionStorage.getItem("channel") === "line"){
    //                 let urlLine = encodeURI(`mypage/movie?orderId=${orderID}`);
    //                 location.href = `line://nv/news?page=${urlLine}`;
    //             }else{
    //                 Router.push({
    //     	            pathname:'/endingPage'
    //     	        });
    //             }
    //             window.scrollTo(0, 0);
	// 		}
    //     }else{
	// 	    return;
    //     }
    // }

    //呼叫 booking_selected_seats
    callBookingSlectedSeats(){

        let partPaymentUrl = sessionStorage.getItem("paymentUrl");
        let source = sessionStorage.getItem("bodyData");
        let userToken = localStorage.getItem("accessToken");

		movieAPI.getSelectedSeats(source, userToken)
		.then(result=>{

            if(result.code === "200"){
                let selectedSeatsTrim =  result.result.selected_seats.replace(/\s+/g, "");
                let paymentUrl = `${partPaymentUrl}&userToken=${userToken}&selectedSeats=${selectedSeatsTrim}`;
                //alert('paymentUrl: '+paymentUrl);
                //如果是test.ezding.com.tw就導新頁
                //如果不是就走舊的
                location.href = paymentUrl;

                // if(window.location.host == "test.ezding.com.tw" || window.location.host == "beta3.ezding.com.tw" || window.location.host == "alpha-next.ezding.com.tw"){
                //     location.href = paymentUrl;
                // }else{
                //     this.setState({
                //         paymentUrl
                //     });
                // }
            }else{
                alert("訂票時間逾時");
                location.href = "/";
            }
		})
		.catch(error=>{
            alert("系統忙碌中，請重試!");
			window.history.go(-1);
		})
    }

    //member token get
	webCodeGetToken(code){

		memberAPI.webCodeGetToken(code)
		.then(result=>{
			this.setState({
				isAccessToken:true
			},()=>{

				localStorage.setItem('accessToken',result.result.access_token);
                this.callBookingSlectedSeats();
			});
		})
		.catch(error=>{

		})
	}


    componentWillReceiveProps(nextProps){
		//登入完直接進payment，要先確認token有了，在去執行callBookingSlectedSeats

    	if(nextProps.isToken !== this.state.isToken){
    		this.setState({
    			isLoading:nextProps.isToken
    		},()=>{
                this.callBookingSlectedSeats();
            });
         }
     }


    componentDidMount(){

        if(localStorage.getItem("accessToken")){
            this.callBookingSlectedSeats();
        }

        //line change token

		if(this.props.url.asPath.match(/code/)){

            let pathname = this.props.url.pathname;
            this.webCodeGetToken(this.props.url.query.code);

			Router.replace(pathname, pathname ,{ shallow: true });
		}

        //接收iframe吐出來的高
        //window.addEventListener("message", this.updateIframe, false);

    }

    render(){

        if(this.state.isLoading){
            return (
                    <PaymentWrapper>

                    </PaymentWrapper>

            )
        }else if(this.state.isError){
            return (
			    <PaymentWrapper>
                    <div className="errorBox">
                        isError
                    </div>
			    </PaymentWrapper>
		    )
        }else{
            return (
			    <PaymentWrapper>

			    </PaymentWrapper>
		    )
        }
    }
}

export default PaymentContent;
