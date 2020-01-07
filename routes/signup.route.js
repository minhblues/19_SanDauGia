var express = require('express');
var bcrypt = require('bcryptjs');
const moment = require('moment');
const userModel = require('../models/users.model');
var router = express.Router();

/* GET home page. */
router.get('/', async(req, res, next) => {
    res.render('signup', {
        title: 'Đăng kí tài khoản',
        err_message
    });
});


router.post('/', async(req, res) => {
    const N = 10;
    const hash = bcrypt.hashSync(req.body.f_Newpassword, N);
    const email = await userModel.singleByEmail(req.body.Email);
    if(req.body.Firstname.length === 0 || req.body.Lastname.length === 0  || req.body.f_Newpassword.length === 0  ||
         req.body.cfmpassword.length === 0 || req.body.Email.length === 0 || req.body.Phone.length === 0  || req.body.Username.length === 0 
         || req.body.Address.length === 0  || req.body.Date.length === 0  || req.body.result.length === 0  )
    {
        return res.render('signup', {
            title: 'Đăng kí tài khoản',
            err_message: 'Vui lòng điền đầy đủ thông tin.'
        });
    }
    if (req.body.f_Newpassword !== req.body.cfmpassword) {
        return res.render('signup', {
            title: 'Đăng kí tài khoản',
            err_message: 'Mật khẩu không khớp.'
        });
    }
    if (email !== null) {
        return res.render('signup', {
            title: 'Đăng kí tài khoản',
            err_message: 'Email đã tồn tại.'
        });
    }
    const user = await userModel.singleByUserName(req.body.Username);
    if (user !== null) {
        return res.render('signup', {
            title: 'Đăng kí tài khoản',
            err_message: 'Tên đăng nhập đã tồn tại.'
        });
    }
    const dob = moment(req.body.Date, 'MM/DD/YYYY').format('YYYY-MM-DD');
    const entity = req.body;
    entity.Password = hash;
    entity.Name = req.body.Firstname + ' ' + req.body.Lastname;
    entity.Date = dob;
    delete entity.Firstname;
    delete entity.Lastname;
    delete entity.cfmpassword;
    delete entity.f_Newpassword;
    delete entity.result;
    const result = await userModel.add(entity);
    req.session.isAuthenticated = true
    req.session.authUser = entity;
    res.redirect('/');
});



module.exports = router;