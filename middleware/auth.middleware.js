const jwt = require('jsonwebtoken')
require('dotenv').config()
const SECRET_KEY = process.env.PORT;

module.exports = (req, res, next) => {
    if (req.method === 'POST' && (req.originalUrl === "/apiV0/login" || req.originalUrl === '/apiV0/registration')) {
        if (req.headers.authorization === undefined) {
            return next()
        } else {
            return res.status(401).json({message: 'Ошибка headers.authorization'})
        }
    }

    try {
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            return res.status(401).json({message: 'Ошибка аутентификации'})
        }
        req.user = jwt.verify(token, SECRET_KEY)
        next()
    } catch (e) {
        return res.status(401).json({message: 'Ошибка аутентификации'})
    }
}
