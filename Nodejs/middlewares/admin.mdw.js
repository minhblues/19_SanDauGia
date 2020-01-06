module.exports = (req, res, next) => {
    if (req.session.authUser.Status == 3)
        return res.redirect('/admin/nguoidung');
    next();
}