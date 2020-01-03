var express = require('express');
var bcrypt = require('bcryptjs');
const userModel = require('../models/username.models');
var router = express.Router();

/* GET home page. */
router.get('/', async(req, res, next) => {
    res.render('signup', {
        title: 'Đăng kí tài khoản'
    });
});


router.post('/', async(req, res) => {
    const N = 10;
    const hash = bcrypt.hashSync(req.body.f_Newpassword, N);
    const email = await userModel.singleByEmail(req.body.Email);

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

    const entity = req.body;
    entity.Password = hash;
    entity.IsBidder = 0;
    entity.Score = 0;
    entity.Name = req.body.Firstname + ' ' + req.body.Lastname;
    delete entity.Firstname;
    delete entity.Lastname;
    delete entity.cfmpassword;
    delete entity.f_Newpassword;
    delete entity.result;
    console.log(entity);
    const result = await userModel.add(entity);
    res.redirect('/');
});



module.exports = router;