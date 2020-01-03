module.exports = async(req, res, next) => {
    if (!req.session.categories)
        req.session.categories = await categoryModel.all();

    next();
}