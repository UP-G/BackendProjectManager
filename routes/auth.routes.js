const Router = require('express')
const router = new Router()
const AuthController = require('../controller/auth.conntroller')
const authMiddleware = require('../middleware/auth.middleware');
const {check} = require('express-validator');
const {errorMsg} = require('../scripts/checkReqError');

router.post('/registration', [
    check('email', "Некоректный email").isEmail(),
    check('password', 'Пароль доленж быть длинее 6 символов и короче 24').isLength({min:6, max:24})],
    errorMsg, AuthController.registration)

router.post('/login', AuthController.login)
router.get('/auth', authMiddleware, AuthController.auth)

module.exports = router