var express = require('express');
const userModel = require('../models/users.model');
const categoriesModel = require('../models/category.model');
var router = express.Router();


router.get('/nguoidung', async(req, res) => {
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

router.get('/danhmuc', async(req, res) => {
    const list = await categoriesModel.all();
    res.render('admin_categories', {
        title: 'Admin',
        categories: list
    });
});

router.get('/', async(req, res) => {
    const list = await userModel.all();
    res.render('admin_upgrade', {
        title: 'Admin',
        users: list
    });
});

router.get('/danhmuc/them', async(req, res) => {
    const list = await userModel.all();
    res.render('add_categories', {
        title: 'Thêm danh mục',
        users: list
    });
});


router.post('/danhmuc/them', (req, res) => {
    res.end();
});

module.exports = router;