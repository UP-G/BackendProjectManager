const Router = require('express')
const router = new Router()
const PlanController = require('../controller/plan.controller')
const authMiddleware = require('../middleware/auth.middleware')

router.post('/plan/', authMiddleware, PlanController.createPlan)
router.post('/addTask', PlanController.addTaskInPlan)

module.exports = router
