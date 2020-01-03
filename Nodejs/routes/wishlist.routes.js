var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('wishlist', {
        title: 'Danh sách yêu thích'
    });
});

module.exports = router;