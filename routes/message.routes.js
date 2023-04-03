const Router = require('express')
const router = new Router()
const MessageController = require('../controller/message.controller')
const authMiddleware = require('../middleware/auth.middleware')

router.get('/message/:id', MessageController.getMessage)

module.exports = router
