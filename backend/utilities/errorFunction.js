const error = (res, message , statusCode) => {
    return res.status(statusCode).json({ error: { message } });
}

module.exports = error;