const jwt = require('jsonwebtoken');

const verifyToken = async (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).send('Authentication failed.')
    }
    try {
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
        next();
    }
    catch (error) {
        return res.status(500).send(error)
    }
};

module.exports = verifyToken;