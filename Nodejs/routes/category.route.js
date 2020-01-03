const express = require('express');
const productModel = require('../models/product.model');
const categoryModel = require('../models/category.model');
const config = require('../config/default.json');

const router = express.Router();

//
// xem ds sản phẩm thuộc danh mục :id

router.get('/:name/products/', async(req, res) => {
    if (!req.session.categories)
        req.session.categories = await categoryModel.all();
    categories = req.session.categories;

    const catName = req.params.name;
    const limit = config.paginate.limit;

    const page = req.query.page || 1;
    if (page < 1) page = 1;
    const offset = (page - 1) * config.paginate.limit;

    const [total, rows] = await Promise.all([
        productModel.countByCat(catName),
        productModel.pageByCat(catName, offset)
    ]);

    // const total = await productModel.countByCat(catId);
    let nPages = Math.floor(total / limit);
    if (total % limit > 0) nPages++;
    const page_numbers = [];
    for (i = 1; i <= nPages; i++) {
        page_numbers.push({
            value: i,
            isCurrentPage: i === +page
        })
    }

    // const rows = await productModel.pageByCat(catId, offset);
    res.render('product', {
        categories,
        catName,
        products: rows,
        empty: rows.length === 0,
        page_numbers,
        prev_value: +page - 1,
        next_value: +page + 1,
    });

    // const rows = await productModel.allByCat(req.params.id);
    // res.render('vwProducts/allByCat', {
    //   products: rows,
    //   empty: rows.length === 0
    // });
})

router.get('/', (req, res) => {
    res.send('abc');
})

module.exports = router;