var express = require('express');
var nodemailer = require('nodemailer');
const userModel = require('../models/users.model');
const categoriesModel = require('../models/category.model');
var router = express.Router();

router.get('/nguoidung', async (req, res) => {
    const list = await userModel.all();
    list.forEach(element => {
        switch (element.Status) {
            case 0:
                element.UserMode = 'Bidder';
                break;
            case 1:
                element.UserMode = 'Seller';
                break;
            case 2:
                element.UserMode = 'Waiting';
                break;
            case 3:
                element.UserMode = 'Admin';
                break;
            default:
                element.UserMode = 'Error';

        }
    });
    res.render('admin_users', {
        title: 'Admin',
        users: list
    });
});

router.get('/danhmuc', async (req, res) => {
    const list = await userModel.all();
    res.render('admin_categories', {
        title: 'Admin',
        users: list
    });
});

router.get('/danhmuc/them', (req, res) => {
    res.render('add_categories', {
        title: 'Thêm danh mục'
    });
});

router.post('/danhmuc/them', async (req, res) => {
    const entity = {
        CatName: req.body.txtCatName,
    }
    const result = await categoriesModel.add(entity);
    console.log(result);
    res.render('add_categories', {
        title: 'Thêm danh mục'
    });
});

router.get('/danhmuc/edit/:id', async (req, res) => {
    const rows = await categoriesModel.single(req.params.id);
    res.render('edit_categories', {
        title: 'Sửa danh mục',
        category: rows
    });
});

router.post('/danhmuc/patch', async (req, res) => {
    const result = await categoriesModel.patch(req.body);
    res.redirect('/admin/danhmuc');
});

router.post('/danhmuc/del', async (req, res) => {
    const result = await categoriesModel.del(req.body.CatId);
    res.redirect('/admin/danhmuc');
});

router.get('/capquyen', async (req, res) => {
    const list = await userModel.allWaiting();
    res.render('admin_upgrade', {
        title: 'Admin',
        users: list
    });
});

router.get('/capquyen/:username/accept', async (req, res) => {
    const result = await userModel.waitingToSeller(req.params.username);
    res.redirect('/admin/capquyen');
});

router.get('/capquyen/:username/delete', async (req, res) => {
    const result = await userModel.waitingToBidder(req.params.username);
    res.redirect('/admin/capquyen');
});

module.exports = router;