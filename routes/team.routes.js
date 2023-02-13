const Router = require('express')
const router = new Router()
const TeamController = require('../controller/team.controller')

router.get('/userOnTeam/:id', TeamController.getUserOnTeam)
router.post('/team', TeamController.createTeam)

module.exports = router
