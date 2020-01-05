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

router.get('/detail/:id*', async(req, res) => {
    const ID = req.params.id;
    const [product, auction, properties, favoriteList] = await Promise.all(
        [productModel.single(ID),
            auctionModel.getAuctionByProductId(ID),
            productModel.properties(ID),
            favoritesModel.all()
        ]);
    favoriteList.forEach(k => {
        if (k.User == req.session.authUser && k.Product == product.ProductID)
            product.isFavorite = true;
    });
    const [catName, sellScore, alikeProduct] = await Promise.all(
        [categoryModel.single(product.Category),
            userModel.getScore(product.Seller),
            productModel.popularByCat(product.Category)
        ]);
    bidScore = 0;
    if (auction.length != 0)
        bidScore = await userModel.getScore(auction[0].Bidder)
    i = 1;
    auction.forEach(element => {
        element.STT = i;
        i++;
    });
    alikeProduct.forEach(j => {
        favoriteList.forEach(k => {
            if (k.User == req.session.authUser && k.Product == j.ProductID)
                j.isFavorite = true;
        });
    });
    subIMG = []
    for (i = 1; i <= product.ImageCount; i++)
        subIMG.id = i;
    res.render('detail', {
        ID,
        title: product.Name,
        product,
        auction,
        subIMG,
        properties,
        catName,
        bidScore,
        sellScore,
        alikeProduct,
        Auction: req.query.Auction || false
    });
})

router.post('/detail/:id/Auction', auth, async(req, res) => {
    [entity, product] = await Promise.all(
        [
            auctionModel.getHighestPrice(req.params.id),
            productModel.single(req.params.id)
        ]);
    res.type('html');
    res.charset = 'utf-8';
    if (+req.body.Price < +product.Price + (+product.StepPrice)) {
        res.status(304);
        res.statusMessage('failed');
        return res.send("Giá không hợp lệ (Giá phải cao hơn giá gốc ít nhất một khoảng bước giá)");
    }
    product.AuctionTime = +product.AuctionTime + 1;
    if (entity)
        if (req.body.Price > entity.Price) {
            product.Price = +entity.Price + +req.body.StepPrice;
            product.PriceHolder = req.session.authUser;
            await Promise.all(
                [
                    auctionModel.patchHighestPrice({
                        Product: req.params.id,
                        User: req.session.authUser,
                        Price: req.body.Price
                    }),
                    auctionModel.add({
                        Product: req.params.id,
                        Bidder: req.session.authUser,
                        Price: product.Price,
                        Time: new Date()
                    }),
                    productModel.patch(product)
                ]);
        } else {
            product.Price = +req.body.Price + +product.StepPrice;
            await auctionModel.add({
                Product: req.params.id,
                Bidder: req.session.authUser,
                Price: req.body.Price,
                Time: new Date()
            });
            await (sleep(1000))
            await Promise.all(
                [
                    auctionModel.add({
                        Product: req.params.id,
                        Bidder: entity.User,
                        Price: product.Price,
                        Time: new Date()
                    }),
                    productModel.patch(product),
                ]);
        }
    else {
        product.Price = +product.Price + +product.StepPrice;
        product.PriceHolder = req.session.authUser;
        await Promise.all(
            [
                auctionModel.addHighestPrice({
                    Product: req.params.id,
                    User: req.session.authUser,
                    Price: req.body.Price
                }),
                auctionModel.add({
                    Product: req.params.id,
                    Bidder: req.session.authUser,
                    Price: product.Price,
                    Time: new Date()
                }),
                productModel.patch(product),
            ])
    }
    res.status(200);
    res.send("Đấu giá thành công!!!");
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
})
module.exports = router;