var express = require('express');
var router = express.Router();

router.get('/cart', function (req, res, next) {
    res.render('cart', {
      title: 'Giỏ hàng',
      
    });
  });

  module.exports = router;
