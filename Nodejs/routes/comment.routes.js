var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('comment', {
        title: 'Đánh giá',
        categories: res.locals.lsCategories
    });
});

module.exports = router;