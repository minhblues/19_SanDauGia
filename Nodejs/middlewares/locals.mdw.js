categoryModel = require('../models/category.model')

module.exports = async(req, res, next) => {
    if (!res.locals.lsCategories)
        res.locals.lsCategories = await categoryModel.all();

    next();
}