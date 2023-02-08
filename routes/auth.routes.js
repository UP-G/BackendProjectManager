const Router = require('express')
const router = new Router()
const AuthController = require('../controller/auth.controller')
const authMiddleware = require('../middleware/auth.middleware');
const {check} = require('express-validator');
const {errorMsg} = require('../scripts/checkReqError');

router.post('/registration', [
    check('email', "Некоректный email").isEmail(),
    check('password', 'Пароль доленж быть длинее 6 символов и короче 24').isLength({min:6, max:24})],
    errorMsg, AuthController.registration)

router.post('/login', [
    check('email', "Некоректный email").isEmail(),
    check('password', 'Некорректный пароль').isLength({min:4, max:24})],
    errorMsg, AuthController.login)

router.get('/auth', authMiddleware, AuthController.auth)

module.exports = router
