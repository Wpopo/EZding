export const gradeScore = (grade) => {
    switch (grade){
    	case 0:
	    	return '普遍級';
	    	break;

	    case 1:
	    	return '保護級';
	    	break;

	    case 2:
	    	return '輔12級';
	    	break;

	    case 3:
	    	return '輔15級';
	    	break;

	    case 4:
	    	return '限制級';
	    	break;

    }
}
