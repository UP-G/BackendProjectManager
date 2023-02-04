const Router = require('express')
const router = new Router()
const TeamController = require('../controller/team.conntroller')
const {check} = require('express-validator');
const {errorMsg} = require('../scripts/checkReqError');

router.get('/userOnTeam/:id', TeamController.getUserOnTeam)

module.exports = router
