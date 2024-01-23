exports.index = (req, res) => {
    const title = "Home"

    res.render("index", {title : title})
}

exports.voting = (req, res) => {
    const poll = req.app.locals.polls[req.params.id]
    const title = poll.name

    res.render("voting", {title : title, poll : poll, error : undefined})
}

exports.vote = (req, res) => {
    const redirectUrl = req.originalUrl + "/results"
    
    const pollId = req.params.id
    const optionId = req.body["optionId"]
    
    // check if poll does not exist
    const poll = req.app.locals.polls[pollId]
    if (poll == undefined) {
        const title = poll.name

        res.render("voting", {title : title, poll : poll, error : undefined})
    }

    // validate form submission 
    if (optionId == undefined || poll.options[optionId] == undefined ) {
        const title = poll.name
        const errorMsg = "Please select an option"

        res.render("voting", {title : title, poll : poll, error : errorMsg})
    }
    
    // increment votes for selected option of current poll
    req.app.locals.polls[pollId].options[optionId].votes += 1

    res.redirect(redirectUrl)
}

exports.results = (req, res) => {
    let poll = req.app.locals.polls[req.params.id]
    const title = poll.name + " Results"
    const options = poll.options

    // get each option's percentage share of votes
    // TODO sort options by percent
    voteSum = 0
    for (id in options) {
        voteSum += options[id].votes
    }

    for (id in options) {
        options[id].percent = Math.round((options[id].votes / voteSum) * 100)
    }

    res.render("results", {title : title, options : options})
}

exports.error = (req, res) => {
    const title = "Something Went Wrong"

    res.render("error", {title : title})
}
