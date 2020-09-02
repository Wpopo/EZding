var EZ_WEBSITE = "www.ezding.com.tw";
var CAMPAIGN_CODE = "yahoo";
var weekdays = ["(日)","(一)","(二)","(三)","(四)","(五)","(六)"];

function goBooking(){
	if (jez("select#ez_cinema").val() == ""){
		alert("請選擇戲院!");
		jez("select#ez_cinema").focus();
		return false;
	}
	if (jez("select#ez_movie").val() == ""){
		alert("請選擇影片!");
		jez("select#ez_movie").focus();
		return false;
	}
	if (jez("select#ez_date").val() == ""){
		alert("請選擇日期!");
		jez("select#ez_date").focus();
		return false;
	}
	if (jez("select#ez_session").val() == ""){
		alert("請選擇場次!");
		jez("select#ez_session").focus();
		return false;
	}
	if (jez("select#ez_quantity").val() == ""){
		alert("請選擇座位數!");
		jez("select#ez_quantity").focus();
		return false;
	}

	var url = "http://" + EZ_WEBSITE + "/yahoo/mb.do?action=auto.reserved.seats";
	url += "&campaign_code=" + CAMPAIGN_CODE;
	url += "&cinemaId=" + jez("select#ez_cinema").val();
	url += "&movieId=" + jez("select#ez_movie").val();
	url += "&showDate=" + jez("select#ez_date").val();
	url += "&sessionId=" + jez("select#ez_session").val();
	url += "&ticketQuantity=" + jez("select#ez_quantity").val();
	window.open(url, "_blank");
	return true;
}

function cbShowingMovies(array){
	$("#ez_movie").empty();
	$("#ez_movie").append("<option>片名</option>");
	for(var i=0;i<array.length;i++){
		var key = Object.keys(array[i]);
		var value = array[i][key];
		$("#ez_movie").append('<option value="' + key + '">' + value + '</option>');
	}
}

function cbShowingShowdates(array){
	$("#ez_date").empty();
	$("#ez_date").append("<option>日期</option>");
	for(var i=0;i<array.length;i++){
		var value = array[i];
		var date = new Date(value);
		var year = date.getFullYear();
		var month = date.getMonth() + 1;
		var movieDate = date.getDate();
		$("#ez_date").append('<option value="' + value + '">' + year + "/" + (month > 9 ? '' : '0') + month + "/" + (date > 9 ? '' : '0') + (movieDate > 9 ? '' : '0') + movieDate + " " + weekdays[date.getDay()] + '</option>');
	}
}

function cbShowingSessions(array){
	$("#ez_session").empty();
	$("#ez_session").append("<option>場次</option>");
	for(var i=0;i<array.length;i++){
		var key = Object.keys(array[i]);
		var value = array[i][key];
		var date = new Date(value);
		var hour = date.getHours();
		var minute = date.getMinutes();
		$("#ez_session").append('<option time="' + value + '" value="' + key + '">' + (hour > 9 ? '' : '0') + hour + ":" + (minute > 9 ? '' : '0') + minute + '</option>');
	}

}

function findShowingMovies(cinemaId){
	if (cinemaId == "") return;
	$.ajax({
		type: "GET",
		dataType: "json",
		url: "https://www.ezding.com.tw/new_ezding/orders/find_showing_movies?cinema_id=" + cinemaId,
		success: function(data){
			cbShowingMovies(data['result']);
		}
	});
}

function findShowingShowdates(movieId, cinemaId){
	if (movieId == "") return;
	$.ajax({
		type: "GET",
		dataType: "json",
		url: "https://www.ezding.com.tw/new_ezding/orders/find_showing_movie_dates?cinema_id=" + cinemaId + "&movie_id=" + movieId,
		success: function(data){
			cbShowingShowdates(data['result']);
		}
	});
}

function findShowingSessions(showDate, cinemaId, movieId){
	if (showDate == "") return;
	$.ajax({
		type: "GET",
		dataType: "json",
		url: "https://www.ezding.com.tw/new_ezding/orders/find_showing_movie_sessions?cinema_id=" + cinemaId + "&movie_id=" + movieId + "&date=" + showDate,
		success: function(data){
			cbShowingSessions(data['result']);
		}
	});
}
