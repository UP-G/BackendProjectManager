const PlanService = require('../services/plan.service')

class PlanController {
    async createPlan(req, res, next) {
        try {
            const {plan} = req.body
            plan.creator_id = req.user.user_id
            const newPlan = await PlanService.createPlan(plan)
            res.json(newPlan)
        } catch (e) {
            next(e)
        }
    }
    async addTaskInPlan(req, res, next) {
        try {
            const {dataTask} = req.body
            const addTask = await PlanService.addTaskInPlan(dataTask)
            res.json(addTask)
        } catch (e) {
            next(e)
        }

    }
}

module.exports = new PlanController
