var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {

    res.render('cart', {
        title: 'Giỏ hàng',
        categories: res.locals.lsCategories
    });
});

module.exports = router;