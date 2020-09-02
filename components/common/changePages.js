import React from 'react';
import { ChangePagesWrapper } from '../../styled/commonStyled';

export default class changePages extends React.Component{
    constructor(props){
        super(props);

        this.pageClick = this.pageClick.bind(this);

        this.state = {
            pages: this.props.pages,
            nowIndex:this.props.page ? this.props.page : 1,
            splitStart:1,
            splitEnd:5,
        }
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.pages !== this.state.pages){
            this.setState({
                pages:nextProps.pages,
                nowIndex:this.props.page ? this.props.page : 1,
            },()=>{
                if(this.state.pages !== 0){
                    let circleClick = document.getElementsByClassName('numIndex');
                    for(let i = 0 ; i < circleClick.length ; i++){
                        circleClick[i].classList.remove('add');
                    }
                    circleClick[this.state.nowIndex-1].classList.add('add');
                }
               
            });
        }
        if(nextProps.page !== this.state.nowIndex && nextProps.page){
            this.setState({
                nowIndex:nextProps.page
            },()=>{
               this.pageClick(this.state.nowIndex);
            })
        }
    }

    componentDidMount(){
        this.pageClick(this.state.nowIndex);
    }

    pageClick(nowIndex){
        nowIndex = nowIndex <= 1 ? 1 : nowIndex;
        nowIndex = nowIndex >= this.state.pages ? this.state.pages : nowIndex;

        let circleClick = document.getElementsByClassName('numIndex');
        for(let i = 0 ; i < circleClick.length ; i++){
            circleClick[i].classList.remove('add');
        }

        let cssIndex = nowIndex % 5 !== 0 ? nowIndex % 5 : 5;

        this.setState({
            nowIndex,
        },()=>{
            circleClick[cssIndex-1].classList.add('add');
        })

        //要回傳實際畫面要render第幾頁(page) 
        this.props.fetchFunc(nowIndex);
    };

    render(){
        let splitStart = Math.ceil(this.state.nowIndex / 5)*5 - 4;
        let endPage = Math.ceil(this.state.nowIndex / 5)*5 <= this.state.pages ? Math.ceil(this.state.nowIndex / 5)*5 : this.state.pages;
        let splitEnd = this.state.pages > 5 ? endPage : this.state.pages;

        let renderPages = [];
        for(let i = splitStart ; i <= splitEnd ; i++){
            renderPages.push(<div className="circle numIndex" key={i} onClick={()=>this.pageClick(i)}>{i}</div>);
        };

        let nowIndex = this.state.nowIndex;
        renderPages.splice(0,0,<div className={`circle ${nowIndex == 1 ? 'nowIndex1': ''}`} key={-1} onClick={()=>this.pageClick(parseInt(nowIndex)- 1)}><img src="../../static/common/changepage-icon1.svg"/></div>);
        renderPages.splice(0,0,<div className={`circle ${nowIndex == 1 ? 'nowIndex1': ''}`} key={-2} onClick={()=>this.pageClick(1)}><img src="../../static/common/changepage-icon0.svg"/></div>);
        renderPages.push(<div className={`circle ${nowIndex == this.state.pages ? 'nowIndex1': ''}`} key={9999} onClick={()=>this.pageClick(parseInt(nowIndex) + 1)}><img src="../../static/common/changepage-icon.svg"/></div>)
        renderPages.push(<div className={`circle ${nowIndex == this.state.pages ? 'nowIndex1': ''}`} key={10000} onClick={()=>this.pageClick(this.state.pages)}><img src="../../static/common/caret-up.svg"/></div>) 
        
        return (
            <ChangePagesWrapper>
               {renderPages} 
            </ChangePagesWrapper>
        );  
    }
    

    

} 