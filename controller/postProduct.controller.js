const productModel = require('../models/product.model');
const categoryModel = require('../models/category.model');

Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

module.exports = {
    postProduct: async (req, res) => {
        const entity = req.body;
        entity.Seller = req.session.authUser;
        var now = new Date();
        entity.StartTime = now;
        entity.EndTime = now.addDays(7);
        const category = await categoryModel.getIdByCatName(entity.CatName);
        entity.Category = category.CatId;
        entity.ProductID = (await productModel.getMaxId()).ID;
        delete entity.CatName;
        const add = productModel.add(entity);
    }

}