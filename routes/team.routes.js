const Router = require('express')
const router = new Router()
const authMiddleware = require('../middleware/auth.middleware')
const TeamController = require('../controller/team.controller')

router.get('/userOnTeam/:id', TeamController.getUserOnTeam)
router.get('/team/', authMiddleware, TeamController.getTeam)
router.post('/team', authMiddleware, TeamController.createTeam)
router.post('/addUserInTeam', authMiddleware, TeamController.addUserInTeam)

module.exports = router
