const error = (res, message) => {
    return res.status(401).json({ error: { message } });
}

module.exports = error;