import React, { Component } from 'react'
import {NoticeWrapper} from '../../styled/homePageStyled';


export default class Notice extends Component{
    state = {
        show: true
    }

    closeNotice = ()=>{
         this.setState({ show: false })
    }

    render() {
        if(this.props.text && this.state.show){
            const str = this.props.text.result[0].ad_content
            const content = str.replace(/\r\n/g, '<br/>')
            return(
                    <NoticeWrapper>
                        <div className="noticeWrapper" onClick={()=>this.closeNotice()}></div>
                        <div class="box">
                            <img className="icon" src="/static/common/notice-icon.png"/>
                            <span dangerouslySetInnerHTML = {{ __html: content}}></span>
                            <div className="button" onClick={()=>this.closeNotice()}>確認</div>
                        </div>
                    </NoticeWrapper>
            )
        }else{
            return <NoticeWrapper/>
        }
    }
}
