module.exports = (req, res, next) => {
    if (!req.session.isAuthenticated) {
        if (req.query.retUrl)
            retUrl = req.query.retUrl;
        else retUrl = req.originalUrl;
        console.log(retUrl, req.originalUrl, req.query.retUrl)
        return res.redirect(`/login?retUrl=${retUrl}`);
    }
    next();
}