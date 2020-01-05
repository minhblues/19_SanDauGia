categoryModel = require('../models/category.model')

module.exports = async(req, res, next) => {
<<<<<<< HEAD
    if (req.session.isAuthenticated)
        res.locals.isAuthenticated = true;
    else res.locals.isAuthenticated = false;
    res.locals.categories = await categoryModel.all();
=======
    if (!res.locals.lsCategories)
        res.locals.lsCategories = await categoryModel.all();
>>>>>>> parent of adeab00... Thêm quản lý danh sách người dùng

    next();
}