function log(req, res, next) {
    console.log('Logging'); //for json object req.body
    next();
};

function authentication(req, res, next) {
    console.log('Authentication'); //for json object req.body
    next();
};

module.exports = { log, authentication};
