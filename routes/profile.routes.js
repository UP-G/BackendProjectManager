const Router = require('express')
const router = new Router()
const ProfileController = require('../controller/profile.controller')
const authMiddleware = require('../middleware/auth.middleware')

router.post('/photo/', authMiddleware, ProfileController.uploadPhoto)

router.get('/photo/:userId', ProfileController.getPhoto)

module.exports = router
