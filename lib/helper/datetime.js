import moment from 'moment';

const Helper = {
  //  格式化日期
  format: (dateString, pattern = 'YYYY.MM.DD') => {
    if (moment.isMoment(dateString)) {
      return dateString.format(pattern);
    }

    // is not a valid date string
    if (isNaN(Date.parse(dateString))) {
      return dateString;
    }

    let datetime = new Date(dateString);

    return moment(datetime).format(pattern);
  },

  //  Milliseconds格式化日期
  MsToformat: (dateString, pattern = 'YYYY.MM.DD') => {
    if (moment.isMoment(dateString)) {
      return dateString.format(pattern);
    }

    // Unix Timestamp (milliseconds)
    dateString = moment(dateString);

    // is not a valid date string
    if (isNaN(Date.parse(dateString))) {
      return dateString;
    }

    let datetime = new Date(dateString);

    return moment(datetime).format(pattern);
  },
};

export default Helper;
