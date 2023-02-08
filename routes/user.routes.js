const Router = require('express')
const router = new Router()
const UserController = require('../controller/user.controller')

router.post('/registration', UserController.registration)
router.post('/login', UserController.login)
router.post('/logout', UserController.logout)
router.get('/refresh', UserController.refresh)

module.exports = router
