var express = require('express');
const categoryModel = require('../models/category.model');
const productModel = require('../models/product.model');
const cartModel = require('../models/cart.model');
const auctionModel = require('../models/auctions.model');
const userModel = require('../models/users.model')
const favoritesModel = require('../models/favorites.model')
const auth = require('../middlewares/auth.mdw')
const sleep = require('sleepjs')
var router = express.Router();


router.get('/:id', async(req, res) => {
    const ID = req.params.id;
    const [product, auction, properties, favoriteList] = await Promise.all(
        [productModel.single(ID),
            auctionModel.getAuctionByProductId(ID),
            productModel.properties(ID),
            favoritesModel.all()
        ]);
    if (!product)
        return res.redirect('/err');
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
    for (i = 1; i <= product.ImageCount; i++) {
        subIMG.push({
            ProductID: product.ProductID,
            id: i
        })
    }
    isSelling = (product.EndTime >= new Date()) && (product.Status == 0)
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
        Auction: req.query.Auction || false,
        isSelling
    });
})

router.post('/:id/Auction', auth, async(req, res) => {
    [entity, product] = await Promise.all(
        [
            auctionModel.getHighestPrice(req.params.id),
            productModel.single(req.params.id)
        ]);
    res.type('html');
    res.charset = 'utf-8';
    if (+req.body.Price < +product.Price + (+product.StepPrice))
        return res.send("Low Price");
    if (product.EndTime < new Date())
        return res.send("Time Up");
    if (product.Status == 1)
        return res.send("Sold Out")
    if (product.InstancePrice != null)
        if (+req.body.Price >= product.InstancePrice)
            return res.send("Buy");
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
            if (req.session.authUser == product.PriceHolder)
                return res.send("Price Holder")
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
    res.send("Success");
});

router.get('/:id/Buy', auth, async(req, res) => {
    product = await productModel.single(req.params.id);
    console.log(product)
    if (product.EndTime < new Date())
        return res.send("Time Up");
    if (product.Status == 1)
        return res.send("Sold Out")
    product.Status = 1;
    await Promise.all(
        [productModel.patch(product),
            cartModel.add({
                User: req.session.authUser,
                Product: req.params.id
            })
        ]);
    res.send("Success");
});
module.exports = router;