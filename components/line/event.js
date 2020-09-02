import React from 'react';
import { LineEventWraper } from '../../styled/lineBonusFaqStyled';

class LineEvent extends React.Component{
    constructor(props){
        super(props);

    }

    render(){
        return(
            <LineEventWraper>
                <div className="closeBtn" onClick={this.props.eventShow}></div>
                <div className="iframeWrapper"></div>
            </LineEventWraper>
        )
    }
}

export default LineEvent
