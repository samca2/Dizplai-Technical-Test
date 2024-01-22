exports.route = (req, res) => {
    res.render("index", {title : "Home", polls : req.app.locals.polls })
}
