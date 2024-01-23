exports.index = (req, res) => {
    const title = "Home"

    res.render("index", {title : title})
}

exports.voting = (req, res) => {
    const poll = req.app.locals.polls[req.params.id]
    const title = poll.name

    // TODO check poll exists

    res.render("voting", {title : title, poll : poll})
}

exports.vote = (req, res) => {
    const redirectUrl = req.originalUrl + "/results"
    const pollId = req.params.id
    const optionId = req.body["optionId"]

    // TODO check poll exists
    
    // TODO validate req.body["optionId"]
    
    // increment votes for selected option of current poll
    req.app.locals.polls[pollId].options[optionId].votes += 1

    //res.redirect(redirectUrl)
}

exports.results = (req, res) => {
    const poll = req.app.locals.polls[req.params.id]
    const title = poll.name + " Results"


    res.render("results", {title : title})
}
