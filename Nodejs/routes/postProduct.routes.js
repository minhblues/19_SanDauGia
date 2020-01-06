var express = require('express');
const multer = require('multer')

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  },
  destination: function (req, file, cb) {
    cb(null, `./public/images/`);
  },
});
const upload = multer({ storage });

var router = express.Router();


router.get('/', function (req, res, next) {
    res.render('postProduct', {
        title: 'Đăng sản phẩm',
    });
});

router.post('/', function (req, res) {
    console.log(req.body);
    upload.single('fuMain')(req, res, err => {
      if (err) { }
  
      res.send('ok');
    });
  })
// router.post('/', async (req, res) => {
//     console.log(req.body);
//   //  console.log(req.files);
//   upload.single('fuMain')(req, res, err => {
//     if (err) { }

//     res.send('ok');
//   });
//     // const url = [];
//     // for (const file of req.files) {
//     //     console.log(file);
//     //     const result = await cloudinary.v2.uploader.upload(file.path);
//     //     url.push(result.url);
//     // }
//     // console.log(url);
//     // res.send('ok');
// });

module.exports = router;