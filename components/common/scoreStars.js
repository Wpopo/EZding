import React from 'react';
import { MovieStars } from '../../styled/commonStyled';

export const movieStars = (score,bgcolor='#404040') =>{

    let star = parseInt(score); //star => how many perfact star
    let staro = parseInt(5 - score); //staro => how many empty star
    let helfstar = (score - star)*10; //helfstar =>  not enough 1 star
    let allstar = [];

    for(let i = 0 ; i < star ; i++){
        allstar.push(
            <div className="star" key={i} style={{backgroundImage:`url(../../static/stars/color_star.svg)`}}></div>
        );
    }

    if(helfstar >= 7 ){
        allstar.push(<div className="star FaStarHalf" key={star + 1} style={{backgroundImage:`url(../../static/stars/02_star.svg)`}}></div>);
    }else if(helfstar < 7 && helfstar >= 5){
        allstar.push(<div className="star FaStarHalf" key={star + 1} style={{backgroundImage:`url(../../static/stars/05_star.svg)`}}></div>);
    }else if(helfstar < 5 && helfstar > 0){
        allstar.push(<div className="star FaStarHalf" key={star + 1} style={{backgroundImage:`url(../../static/stars/07_star.svg)`}}></div>);
    }
    for(let j = 0 ; j < staro ; j++){
        allstar.push(
            <div className="star" key={j+100} style={{backgroundImage:`url(../../static/stars/black_star.svg)`}}></div>
        );
    }
    
    return (
        <MovieStars bgcolor={bgcolor}>{allstar}</MovieStars>
    );  
    

} 