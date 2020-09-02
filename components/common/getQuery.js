import Router from 'next/router';

export const getQuery = ()=>{

    let str = sessionStorage.thirdPartyQuery
    if(typeof str == 'string' && str.length>0){
        // sessionStorage已經有thirdPartyQuery這個key
        let totalValue = Object.assign(JSON.parse(sessionStorage.thirdPartyQuery), Router.router.query)
        sessionStorage.setItem("thirdPartyQuery", JSON.stringify(totalValue));
    }else{
        sessionStorage.setItem("thirdPartyQuery", JSON.stringify(Router.router.query));
    }
}
