var homeRouter = require('../routes/home.route')
var loginRouter = require('../routes/login.route')
var signupRouter = require('../routes/signup.route')
var profileRouter = require('../routes/profile.route')
var wonlistRouter = require('../routes/wonlist.route')
var watchlistRouter = require('../routes/watchlist.route')
var commentRouter = require('../routes/comment.route')
var postProductRouter = require('../routes/postProduct.route')
var Category = require('../routes/category.route')
var detailRouter = require('../routes/detail.route')
var mybidRouter = require('../routes/mybid.route')
var commentRouter = require('../routes/comment.route')
var Category = require('../routes/category.route')
var Admin = require('../routes/admin.route')
var Category = require('../routes/category.route')
var Admin = require('../routes/admin.route')
var postProductRouter = require('../routes/postProduct.route')
var detailRouter = require('../routes/detail.route')
var mybidRouter = require('../routes/mybid.route')
var myproductRouter = require('../routes/myproduct.route')

const auth = require('../middlewares/auth.mdw')
const lsCategories = require('../middlewares/locals.mdw')
const authAdmin = require('../middlewares/normalUser.mdw')

module.exports = app => {

    app.use('/', lsCategories, homeRouter);
    app.use('/detail', lsCategories, detailRouter);
    app.use('/login', loginRouter);
    app.use('/signup', signupRouter);
    app.use('/Category', lsCategories, Category);
    app.use('/profile', auth, lsCategories, profileRouter);
    app.use('/wonlist', auth, lsCategories, wonlistRouter);
    app.use('/watchlist', auth, lsCategories, watchlistRouter);
    app.use('/postProduct', auth, lsCategories, postProductRouter);
    app.use('/mybid', auth, lsCategories, mybidRouter);
    app.use('/comment', auth, lsCategories, commentRouter);
    app.use('/admin', auth, authAdmin, Admin);
    app.use('/myproduct', auth, myproductRouter)
}