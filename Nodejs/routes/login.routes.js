var express = require('express');
var bcrypt = require('bcryptjs');
const userModel = require('../models/username.models');
var router = express.Router();

router.get('/login', function (req, res, next) {
  res.render('login', {
    title: 'Đăng nhập'
  });
});

router.post('/login', async (req, res) => {

  const user = await userModel.singleByUserName(req.body.username);
  if (user === null)
    throw new Error('Invalid username or password');

  const rs = bcrypt.compareSync(req.body.password, user.Password);
  if (rs === false) {
    return res.render('login', {
      title: 'Đăng nhập',
      err_message:'Login failed'
    });
  }
  
  delete user.Password;
  // req.session.isAuthenticated = true;
  // req.session.authUser = user;

  const url = req.query.retUrl || '/';
  res.redirect(url);
})

module.exports = router;
