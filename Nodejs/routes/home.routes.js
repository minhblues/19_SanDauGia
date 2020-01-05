var express = require('express');
const categoryModel = require('../models/category.model');
const productModel = require('../models/product.model');
const auctionModel = require('../models/auctions.model');
const userModel = require('../models/users.model')
const favoritesModel = require('../models/favorites.model')
const auth = require('../middlewares/auth.mdw')
const sleep = require('sleepjs')
const config = require('../config/default.json');
var router = express.Router();

/* GET home page. */
router.get('/', async(req, res) => {
    const [popular, nearFinish, mostExpensive, favoriteList] = await Promise.all(
        [
            productModel.popular(),
            productModel.nearFinish(),
            productModel.mostExpensive(),
            favoritesModel.all()
        ]
    )
    data = [popular, nearFinish, mostExpensive];
    data.forEach(i => {
        i.forEach(j => {
            favoriteList.forEach(k => {
                if (k.User == req.session.authUser && k.Product == j.ProductID)
                    j.isFavorite = true;
            });
        });
    });
    res.render('home', {
        title: 'Sàn đấu giá',
        popular,
        nearFinish,
        mostExpensive,
    });
});

router.get('/logout', (req, res) => {
    req.session.isAuthenticated = false;
    if (req.session.authUser)
        delete req.session.authUser;
    res.redirect('/login');
})

router.get('/search', async(req, res) => {

    const limit = config.paginate.limit
    const page = req.query.page || 1;
    if (page < 1) page = 1;
    const offset = (page - 1) * limit;
    [products, total, favoritesList] = await Promise.all(
        [
            productModel.search(req.query.searchKey, offset),
            productModel.countBySearch(req.query.searchKey),
            favoritesModel.all()
        ]
    )

    products.forEach(j => {
        favoritesList.forEach(k => {
            if (k.User == req.session.authUser && k.Product == j.ProductID)
                j.isFavorite = true;
        });
    });
    nPages = Math.floor(total / limit);
    if (total % limit > 0) nPages++;
    const page_numbers = [];
    for (i = 1; i <= nPages; i++) {
        page_numbers.push({
            value: i,
            isCurrentPage: i === +page
        })
    }
    res.location('/search')
    res.render('product', {
        title: 'Result ' + req.query.searchKey,
        searchKey: req.query.searchKey,
        products,
        empty: products.length === 0,
        page_numbers,
        prev_value: +page - 1,
        next_value: +page + 1,
    })
});

module.exports = router;