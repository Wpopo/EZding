import React from 'react'
import Router from 'next/router';
import HeadMeta from '../components/headMeta';
import Navbar from '../components/common/navbar';
import CinemaEntry from '../components/common/cinemaEntry';
import Footer from '../components/common/footer';
import { RepairWrapper } from '../styled/commonStyled';


export default class RepairPage extends React.Component {

    render(){
        return(
            <div>
                <HeadMeta/>
                <Navbar url={this.props.url}/>
                <RepairWrapper>
                    <img src={'/static/common/repair.png'} />
                    <div>該頁面暫時維護中 請稍後再試</div>
                    <a href={'/'}>回首頁</a>
                </RepairWrapper>
                <CinemaEntry />
                <Footer />
            </div>
        )
    }
}
