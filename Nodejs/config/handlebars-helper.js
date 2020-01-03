const hbs_sections = require('express-handlebars-sections');
const categoriesModel = require('../models/category.model')
const numeral = require('numeral')
const moment = require('moment')

module.exports = {
    section: hbs_sections(),
    Numberformat: val => {
        return numeral(val).format('0,0')
    },
    Percentformat: val => numeral(val).format('0.00%'),
    DateTimeFormat: date => moment(date).format('DD/MM/YYYY h:mm'),
    EndTimeFormat: date => {
        if ((date - new Date()) < 3 * 24 * 3600000) {
            day = new Date(date - new(Date));
            console.log(day);
            ret = "Còn ";
            if (day.getDate() > 1)
                ret += day.getDate() - 1 + " ngày ";
            if (day.getHours() > 0)
                ret += day.getUTCHours() + " giờ ";
            if (day.getMinutes() > 0)
                ret += day.getUTCMinutes() + " phút ";
            ret += day.getUTCSeconds() + " giây ";
            return ret;
        }
        console.log(date - new Date());
        return moment(date).format('DD/MM/YYYY h:mm');
    }
}