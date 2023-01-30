const Router = require('express')
const router = new Router()
const AuthController = require('../controller/auth.conntroller')
const {check} = require('express-validator');
const {errorMsg} = require('../scripts/checkReqError');

router.post('/registration', [] , errorMsg, AuthController.registration)
router.post('/login', [] , errorMsg, AuthController.login)

module.exports = router
