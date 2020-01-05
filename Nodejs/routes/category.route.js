const express = require('express');
const controller = require('../controller/category.controller')

const router = express.Router();

//
// xem ds sản phẩm thuộc danh mục :id

router.get('/:name/products/', async(req, res) => {
    controller.showProductByCat(req, res);
})

module.exports = router;