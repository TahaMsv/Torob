const jwt = require("jsonwebtoken");
const error = require("../utilities/errorFunction");

function checkAuthorization(req, res, next) {
    if (!req.headers.authorization)
        return error(res, "Token in NULL", 400);
    const authParts = req.headers.authorization.split(" ");
    if (authParts[0] === 'Bearer') {
        try {
            const decodedToken = jwt.verify(authParts[1], "secret");
            req.user = decodedToken;
            req.token = authParts[1];
        } catch (err) {
            return error(res, "Authentication failed", 400);
        }
    }
    return next();
}

module.exports = checkAuthorization;