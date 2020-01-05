var express = require('express');
var bcrypt = require('bcryptjs');
const userModel = require('../models/users.model');
var router = express.Router();

router.get('/', function(req, res, next) {
    err_message = false;
    if (req.query.error)
        err_message = "Login failed!";

    res.render('login', {
        title: 'Đăng nhập',
        err_message
    });
});

router.post('/', async(req, res) => {

    const user = await userModel.singleByUserName(req.body.username);
    if (user === null) {
        return res.redirect('?error=true');
    }
    const rs = bcrypt.compareSync(req.body.password, user.Password);
    if (rs === false)
        return res.redirect('?error=true');

    delete user.Password;
    req.session.isAuthenticated = true;
    req.session.authUser = user.Username;

    const url = req.query.retUrl || '/';
    if (req.query.method == 'post')
        res.redirect(307, url);
    else
        res.redirect(url);
})

module.exports = router;