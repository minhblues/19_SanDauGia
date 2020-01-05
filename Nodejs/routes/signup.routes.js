var express = require('express');
var bcrypt = require('bcryptjs');
<<<<<<< HEAD
const moment = require('moment');
=======
>>>>>>> parent of adeab00... Thêm quản lý danh sách người dùng
const userModel = require('../models/users.model');
var router = express.Router();

/* GET home page. */
router.get('/', async(req, res, next) => {
    res.render('signup', {
<<<<<<< HEAD
        title: 'Đăng kí tài khoản',
        err_message
=======
        title: 'Đăng kí tài khoản'
>>>>>>> parent of adeab00... Thêm quản lý danh sách người dùng
    });
});


router.post('/', async(req, res) => {
    const N = 10;
    const hash = bcrypt.hashSync(req.body.f_Newpassword, N);
    const email = await userModel.singleByEmail(req.body.Email);
<<<<<<< HEAD
=======

>>>>>>> parent of adeab00... Thêm quản lý danh sách người dùng
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
<<<<<<< HEAD
    const dob = moment(req.body.Date, 'MM/DD/YYYY').format('YYYY-MM-DD');
=======

>>>>>>> parent of adeab00... Thêm quản lý danh sách người dùng
    const entity = req.body;
    entity.Password = hash;
    entity.IsBidder = 0;
    entity.Score = 0;
    entity.Name = req.body.Firstname + ' ' + req.body.Lastname;
<<<<<<< HEAD
    entity.Date = dob;
=======
>>>>>>> parent of adeab00... Thêm quản lý danh sách người dùng
    delete entity.Firstname;
    delete entity.Lastname;
    delete entity.cfmpassword;
    delete entity.f_Newpassword;
    delete entity.result;
<<<<<<< HEAD
=======
    console.log(entity);
>>>>>>> parent of adeab00... Thêm quản lý danh sách người dùng
    const result = await userModel.add(entity);
    res.redirect('/');
});



module.exports = router;