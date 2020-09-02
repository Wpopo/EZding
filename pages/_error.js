import React from 'react'
import Error from 'next/error'
import HeadMeta from '../components/headMeta';
import Navbar from '../components/common/navbar';
import CinemaEntry from '../components/common/cinemaEntry';
import Footer from '../components/common/footer';


export default class InitialError extends React.Component {

    render(){
        const divStyle = {
            width: "100%", height: 600, backgroundColor: '#404040'
        };

        const imgStyle = {
            width:300, margin: "0 auto", display: "block", paddingTop: 230
        };

        return(
            <div>
                <HeadMeta/>
                <Navbar url={this.props.url}/>
                <div style={divStyle}>
                    <img src={'/static/common/404.png'} style={imgStyle}/>
                </div>
                <CinemaEntry />
                <Footer />
            </div>
        )
    }
}
