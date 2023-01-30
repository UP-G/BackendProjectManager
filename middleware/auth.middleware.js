const jwt = require('jsonwebtoken')
require('dotenv').config()
const SECRET_KEY = process.env.PORT;

module.exports = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next()
    }

    try {
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            return res.status(401).json({message: 'Ошибка аутентификации'})
        }
        const decoded = jwt.verify(token, SECRET_KEY)
        req.user = decoded
        next()
    } catch (e) {
        return res.status(401).json({message: 'Ошибка аутентификации'})
    }
}
