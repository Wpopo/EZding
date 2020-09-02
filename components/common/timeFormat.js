var moment = require('moment');


moment.updateLocale('en', {
    months : [
        "January", "February", "March", "April", "May", "June", "July",
        "August", "September", "October", "November", "December"
    ]
});

moment.updateLocale('zh-tw', {
    months : [
        "1月", "2月", "3月", "4月", "5月", "6月", "7月",
        "8月", "9月", "10月", "11月", "12月"
    ]
});

var timeFormat = {

    timeAgo: function (time, lang) {
      	var aDay = 86400000,
            date = new Date(time),
            now = new Date();

        if(lang) {
            // TODO 未來要預設已裝置的語言為主或是使用者的語言設定為主
        }

        if(date.getFullYear() === now.getFullYear()){
            if (now.getTime() - date.getTime() >= aDay) {
                return moment(time).utcOffset('+0800').format('LLLL');
            } else{
                return moment(time).utcOffset('+0800').fromNow();
            }
        } else{
            return moment(time).utcOffset('+0800').format('LLLL');
        }
    },

    simpleTimeAgo: function (time, lang) {
        var aDay = 86400000,
            date = new Date(time),
            now = new Date();

        if(lang) {
            // TODO 未來要預設已裝置的語言為主或是使用者的語言設定為主
        }

        if(date.getFullYear() === now.getFullYear()){
            if (now.getTime() - date.getTime() >= aDay) {
                return moment(time).utcOffset('+0800').format('LLLL');
            } else{
                return moment(time).utcOffset('+0800').fromNow();
            }
        } else{
            return moment(time).utcOffset('+0800').format('LLLL');
        }
    },

    sessionDate:function (time , lang) {
        if(lang) {
            // TODO 未來要預設已裝置的語言為主或是使用者的語言設定為主
        }

        var date = [
        	{
        		week:moment(time).utcOffset('+0800').format('dddd'),
        		date:moment(time).utcOffset('+0800').format('D'),
        		month:moment(time).utcOffset('+0800').format('MMMM')
        	}
        ];

        return date;

    },
    sessionOfRecords:function(time, lang) {
        var session =
            {
                year:moment(time).utcOffset('+0800').format('YYYY'),
                date:moment(time).utcOffset('+0800').format('MM.DD'),
                time:moment(time).utcOffset('+0800').format('HH:mm')
            }

        return session;
    },

    sessionTime:function (time , lang) {
        if(lang) {
            // TODO 未來要預設已裝置的語言為主或是使用者的語言設定為主
        }
        return moment(time).utcOffset('+0800').format('HH:mm');

    },
    seatMapDate:function (time) {
        return moment(time).utcOffset('+0800').format('MM.DD');

    },

    newsDate:function (time) {
        return moment(time).utcOffset('+0800').format('YYYY/MM/DD');

    },

    newsDate2:function (time) {
        return moment(time).utcOffset('+0800').format('YYYY-MM-DD');

    },

    birthday:function (time) {
        return moment(time).utcOffset('+0800').format('YYYY'+'年'+'MM'+'月'+'DD'+'日');

    },
    bonusDate:function (time) {
        var date =
            {
                year:moment(time).utcOffset('+0800').format('YYYY'),
                month:moment(time).utcOffset('+0800').format('MM.DD'),
            }
        ;

        return date;

    },

}

module.exports = timeFormat;
