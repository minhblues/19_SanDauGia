var express = require('express');
var router = express.Router();

router.get('/profile', function (req, res, next) {
    res.render('profile', {
      title: 'Thông tin cá nhân',
      name: 'Phạm Bá Minh',
      phone:'01234656',
      email: 'phambaminh@gmail.com',
      address: 'Hà Tĩnh'
    });
  });

  module.exports = router;
