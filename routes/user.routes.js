const Router = require('express')
const router = new Router()
const {body} = require('express-validator');
const UserController = require('../controller/user.controller')
const authMiddleware = require("../middleware/auth.middleware");

router.post('/registration',
    // body('name').isLength({min: 2, max: 64}),
    // body('last_name').isLength({min: 2, max: 64}),
    // body('email').isEmail(),
    // body('password').isLength({min: 3, max: 32}),
    UserController.registration)
router.post('/login', UserController.login)
router.post('/logout', UserController.logout)
router.post('/addTokenGitLab', authMiddleware, UserController.addGitLabToken)
router.get('/refresh', UserController.refresh)

module.exports = router
