var express = require('express');
var router = express.Router();


router.post('/', async (req, res) => {
    console.log(req.body);
  //  console.log(req.files);
    const url = [];
    for (const file of req.files) {
        const result = await cloudinary.v2.uploader.upload(file.path);
        url.push(result.url);
    }
    console.log(url);
    res.send('ok');
})


router.get('/', function (req, res, next) {
    res.render('postProduct', {
        title: 'Đăng sản phẩm',
    });
});

module.exports = router;