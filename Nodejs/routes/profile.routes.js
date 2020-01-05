var express = require('express');
const moment = require('moment');
var bcrypt = require('bcryptjs');
const userModel = require('../models/users.model');
var router = express.Router();


router.get('/', async (req, res) => {
    const user = await userModel.singleByUserName(req.session.authUser);
    const dob = moment(user.Date, 'YYYY-MM-DD').format('MM/DD/YYYY');
    if (req.query.error)
        err_message = "SignUp failed!";
    res.render('profile', {
        title: 'Thông tin cá nhân',
        categories: res.locals.lsCategories,
        name: user.Name,
        phone: user.Phone,
        email: user.Email,
        address: user.Address,
        date: dob
    });
});


router.post('/', async (req, res) => {

    const user = await userModel.singleByUserName(req.session.authUser);
    const dob = moment(user.Date, 'YYYY-MM-DD').format('MM/DD/YYYY');
    if (user === null) {
        return res.redirect('?error=true');
    }
    if (req.body.NewPassword !== req.body.ConfirmPassword) {
        return res.render('profile', {
            title: 'Thông tin cá nhân',
            name: user.Name,
            phone: user.Phone,
            email: user.Email,
            address: user.Address,
            date: dob,
            err_message: 'Mật khẩu không khớp.'
        });
    }

    const rs = bcrypt.compareSync(req.body.OldPassword, user.Password);
    if (rs === false) {
        return res.redirect( {
            err_message: 'Mật khẩu cũ không đúng',
        });
    }

    const rd = bcrypt.compareSync(req.body.NewPassword, user.Password);
    if (rd === true) {
        return res.render('profile', {
            title: 'Thông tin cá nhân',
            name: user.Name,
            phone: user.Phone,
            email: user.Email,
            address: user.Address,
            date: dob,
            err_message: 'Mật khẩu mới không được trùng với mật khẩu cũ.'
        });
    }
    const entity = req.body;
    entity.Password = bcrypt.hashSync(entity.NewPassword, 10);
    entity.Username = req.session.authUser;
    entity.Date = moment(req.body.Date, 'MM/DD/YYYY').format('YYYY-MM-DD');
    delete entity.OldPassword;
    delete entity.NewPassword;
    delete entity.ConfirmPassword;
    console.log(entity);
    const result = await userModel.patch(entity);
    res.redirect('/');
})


module.exports = router;