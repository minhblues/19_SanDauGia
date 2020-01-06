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

    showCategory: async(req, res) => {},

    getCategoryById: async(req, res) => {
        const rows = await categoriesModel.single(req.params.id);
        res.render('edit_categories', {
            title: 'Sửa danh mục',
            category: rows
        });
    },

    editCategory: async(req, res) => {
        const result = await categoriesModel.patch(req.body);
        res.redirect('/admin/danhmuc');
    },

    deleteCategory: async(req, res) => {
        const result = await categoriesModel.del(req.body.CatId);
        res.redirect('/admin/danhmuc');
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