var express = require('express');
const productModel = require('../models/product.model');
const categoryModel = require('../models/category.model');
const multer = require('multer');
var i = 0;
const storage = multer.diskStorage({
    filename: function(req, file, cb) {
        if (i === 0) file.originalname = 'main.jpg';
        else file.originalname = `${i}.jpg`;
        i++;
        cb(null, file.originalname)
    },
    destination: async(req, file, cb) => {
        const id = (await productModel.getMaxId()).ID;
        var fs = require('fs');
        var dir = `./public/images/product/${id}`;
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        cb(null, `./public/images/product/${id}`);
    },
});
const upload = multer({ storage });

var router = express.Router();


router.get('/', function(req, res, next) {
    res.render('postProduct', {
        title: 'Đăng sản phẩm',
    });
});

Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

router.post('/', upload.array('fuMain', 4), async(req, res) => {

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

    upload.single('fuMain')(req, res, err => {
        if (err) {}
        res.send('ok');
    });
    i = 0;
})


module.exports = router;