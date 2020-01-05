const express = require('express');
<<<<<<< HEAD
const controller = require('../controller/category.controller')
=======
const controller=require('../controller/category.controller')
>>>>>>> parent of adeab00... Thêm quản lý danh sách người dùng

const router = express.Router();

//
// xem ds sản phẩm thuộc danh mục :id

router.get('/:name/products/', async(req, res) => {
<<<<<<< HEAD
    controller.showProductByCat(req, res);
=======

    controller.showProductByCat(req,res);

    // const rows = await productModel.allByCat(req.params.id);
    // res.render('vwProducts/allByCat', {
    //   products: rows,
    //   empty: rows.length === 0
    // });
>>>>>>> parent of adeab00... Thêm quản lý danh sách người dùng
})

module.exports = router;