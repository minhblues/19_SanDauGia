const userModel = require('../models/users.model');
const categoriesModel = require('../models/category.model');
module.exports = {
    showUserList: async(req, res) => {
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
    },

    showCategory: async(req, res) => {
        const list = await userModel.all();
        res.render('admin_categories', {
            title: 'Admin',
            users: list
        });
    },

    getCategoryById: async(req, res) => {
        const rows = await categoriesModel.single(req.params.id);
        res.render('edit_categories', {
            title: 'Sửa danh mục',
            categories: rows
        });
    },

    editCategory: async(req, res) => {
        const result = await categoriesModel.patch(req.body);
        res.redirect('/admin/danhmuc');
    },

    deleteCategory: async(req, res) => {
        console.log(CatId);
        const result = await categoriesModel.del(req.body.CatId);
        res.redirect('/admin/danhmuc');
    },
    addCategoryShow: (req, res) => {
        res.render('add_categories', {
            title: 'Thêm danh mục'
        });
    },
    addCategory: async(req, res) => {
        const entity = {
            CatName: req.body.txtCatName,
        }
        const result = await categoriesModel.add(entity);
        console.log(result);
        res.render('add_categories', {
            title: 'Thêm danh mục'
        });
    },

    getWaitingUser: async(req, res) => {
        const list = await userModel.allWaiting();
        res.render('admin_upgrade', {
            title: 'Admin',
            users: list
        });
    },

    acceptWaitingUser: async(req, res) => {
        const result = await userModel.waitingToSeller(req.params.username);
        res.redirect('/admin/');
    },

    declineWaitingUser: async(req, res) => {
        const result = await userModel.waitingToBidder(req.params.username);
        res.redirect('/admin/');
    }
}