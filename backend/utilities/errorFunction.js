const error = (res, message) => {
    return res.status(400).json({ error: { message } });
}

module.exports = error;