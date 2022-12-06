const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
    try {
        const token = req.header("x-auth-key");
        if (!token) {
            return res.status(403).send({ status: false, message: 'Missing in authentication token in request' })
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if (!decoded) {
            return res.status(403).send({ status: false, message: 'Invalid authentication token in request' })
        }
        req.userId = decoded.userId
        next()
    } catch (error) {
        res.status(500).send({ status: false, message: error })
    }
}

module.exports = { auth }