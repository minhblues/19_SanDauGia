const hbs_sections = require('express-handlebars-sections');
const numeral = require('numeral')
const moment = require('moment')

module.exports = {
    section: hbs_sections(),
    Numberformat: val => {
        return numeral(val).format('0,0')
    },
    Percentformat: val => {
        if (val)
            return numeral(val).format('0.00%');
        return "__";
    },
    DateTimeFormat: date => moment(date).format('DD/MM/YYYY h:mm'),
    SpecialTimeFormat: date => {
        if ((date - new Date()) < 0)
            return 'Sản Phẩm đã kết thúc';
        if ((date - new Date()) < 3 * 24 * 3600000) {
            day = new Date(date - new(Date));
            ret = 'Còn ';
            if (day.getUTCDate() > 1)
                ret += '<span id="day">' + (day.getUTCDate() - 1) + '</span>' + ' ngày ';
            if (day.getUTCHours() > 0)
                ret += '<span id="hour">' + day.getUTCHours() + '</span>' + ' giờ ';
            if (day.getUTCMinutes() > 0)
                ret += '<span id="minute">' + day.getUTCMinutes() + '</span>' + ' phút ';
            ret += '<span id="second">' + day.getUTCSeconds() + '</span>' + ' giây ';
            return ret;
        }
        return moment(date).format('DD/MM/YYYY h:mm');
    },
    EndTimeFormat: date => {
        if ((date - new Date()) < 0)
            return 'Sản Phẩm đã kết thúc';
        day = new Date(date - new(Date));
        ret = 'Còn ';
        if (day.getUTCFullYear() > 1970)
            ret += day.getUTCFullYear() - 1970 + ' năm ';

        if (day.getUTCMonth() > 1)
            ret += day.getUTCMonth() - 1 + ' tháng ';
        if (day.getUTCDate() > 1)
            ret += day.getUTCDate() - 1 + ' ngày ';
        if (day.getUTCHours() > 0)
            ret += day.getUTCHours() + ' giờ ';
        if (day.getUTCMinutes() > 0)
            ret += day.getUTCMinutes() + ' phút ';
        if (ret == 'Còn ')
            ret += day.getUTCSeconds() + ' giây ';
        return ret;
    }
}