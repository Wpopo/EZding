    var uuidRex = /^([a-zA-Z0-9-]{32})$/;

    function validate() {
      var movieId = $("#ez_movie").val();
      var cinemaId = $("#ez_cinema").val();
      var showDate = $("#ez_date").val();
      var sessionId = $("#ez_session").find(":selected").val();
      var time = $("#ez_session").find(":selected").attr("time");
      var ticketQuantity = $("#ez_quantity").val();      
      
      if (!uuidRex.test(cinemaId)) {
        alert("請選擇戲院!");
        $("#ez_cinema").focus();
        return false;
      } else if (!uuidRex.test(movieId)) {
        alert("請選擇影片!");
        $("#ez_movie").focus();
        return false;
      } else if (!showDate || isNaN(showDate)) {
        alert("請選擇日期!");
        $("#ez_date").focus();
        return false;
      } else if (!uuidRex.test(sessionId)) {
        alert("請選擇場次!");
        $("#ez_session").focus();
        return false;
      } else if (!ticketQuantity || isNaN(ticketQuantity) || ticketQuantity>7 || ticketQuantity<0) {
        alert("請選擇座位數!");
        $("#ez_quantity").focus();
        return false;
      } else {
        return true;
      }
    }