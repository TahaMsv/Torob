const jwt = require("jsonwebtoken");

function checkAuthorization(req, res, next) {
    if (!req.headers.authorization) 
        return res.status(400).json({error: {message: "Token in NULL"}});
    const authParts =  req.headers.authorization.split(" ");
    if (authParts[0] === 'Bearer') {
        try {
            const decodedToken = jwt.verify(authParts[1], "secret");
            req.user = decodedToken.userId;
            req.token = authParts[1];
        } catch(err) {
            return res.status(400).json({error: {message: "Authentication failed"}});
        }
    }
    return next();
}

module.exports = checkAuthorization;