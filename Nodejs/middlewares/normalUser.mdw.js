module.exports = (req, res, next) => {
    if (req.session.authUser.Status != 3)
        res.redirect('/');
    next();
}