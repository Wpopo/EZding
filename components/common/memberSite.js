
export const memberSite = function(site){

    switch(site){
		// localhost, alpha
		case "localhost:3000":
        case "alpha-next.ezding.com.tw":
			return location.protocol + "//alpha-api-member.fullerton.com.tw"
		break;
		// beta
		case "beta2.ezding.com.tw":
        case "beta3.ezding.com.tw":
			return "http://beta-api-member.fullerton.com.tw"
		break;
		// production testing environment
		case "p1.ezding.com.tw":
		case "p2.ezding.com.tw":
		case "p3.ezding.com.tw":
		case "p4.ezding.com.tw":
		case "www.ezding.com.tw":
		case "ezding.com.tw":
		case "test.ezding.com.tw":
		case "next.ezding.com.tw":
		case "next2.ezding.com.tw":
			return location.protocol + "//member.fullerton.com.tw"
		break;
		default:
			return location.protocol + "//alpha-api-member.fullerton.com.tw"
		break;
    }
};
