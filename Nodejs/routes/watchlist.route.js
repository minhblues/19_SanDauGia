var express = require('express');
const farvoriteModel = require('../models/favorites.model');
const productModel = require('../models/product.model');
var router = express.Router();

router.get('/', async(req, res, next) => {
    products = await productModel.getFavoriteProductByUser(req.session.authUser.Username);
    products.forEach(element => {
        element.isFavorite = true;
    });
    res.render('watchlist', {
        title: 'Danh sách yêu thích',
        products,
        empty: products.length == 0
    });
});

router.get('/:id', async(req, res) => {
    check = await farvoriteModel.isFavorite(req.session.authUser.Username, req.params.id);
    if (check) {
        await farvoriteModel.del({ User: req.session.authUser.Username, Product: req.params.id });
        return res.send('unliked');
    } else {
        await farvoriteModel.add({ User: req.session.authUser.Username, Product: req.params.id })
        return res.send('liked');
    };
});
module.exports = router;