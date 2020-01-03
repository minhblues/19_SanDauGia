var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    console.log(res.locals.lsCategories);
    res.render('profile', {
        title: 'Thông tin cá nhân',
        categories: res.locals.lsCategories,
        name: 'Phạm Bá Minh',
        phone: '01234656',
        email: 'phambaminh@gmail.com',
        address: 'Hà Tĩnh'
    });
});

module.exports = router;