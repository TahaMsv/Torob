const jwt = require("jsonwebtoken");

function checkAuthorization(req, res, next) {
    if (!req.headers.authorization) 
        return res.status(400).json({error: {message: "Bad Request!"}});
    const authParts =  req.headers.authorization.split(" ");
    if (authParts[0] === 'Bearer') {
        try {
            const decodedToken = jwt.verify(authParts[1], "secret");
            req.user = decodedToken.userId;
        } catch(err) {
            console.log(err)
            return res.status(400).json({error: {message: "Bad Request!"}});
        }
    }
    return next();
}

module.exports = checkAuthorization;