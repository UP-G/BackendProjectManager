const client = require("../clientDb");
const ApiError = require("../scripts/exceptions/api.error");
const _ = require("lodash/core");

class PlanService {
    async createPlan(plan) {

        const planName = await client.plan.findMany({
            where: {
                AND: [
                    {
                        creator_id: plan.creator_id
                    },
                    {
                        title: plan.title
                    }
                ]
            }
        })

        if (!_.isEmpty(planName)) {
            throw ApiError.BadRequest(`План с таким названием ${plan.title} вы уже создали`)
        }

        plan.date_of_creation = new Date()

        const newPlan = await client.plan.create({
            data: {
                ...plan
            }
        })

        return {...newPlan}
    }

    async addTaskInPlan(dataTask) {

        if (_.isEmpty(dataTask.task_id)) {
            throw ApiError.BadRequest(`Пустой список`)
        }

        const checkIdTask = await client.task.findMany ({
            where: {
                task_id: {in: dataTask.task_id}
            },
            select: {
              task_id: true
            }
        })

        if (_.size(checkIdTask) !== _.size(dataTask.task_id)) {
            throw ApiError.BadRequest(`Неверный список`)
        }

        //TODO переделать.
        const plan_id = Array(checkIdTask.length).fill(dataTask.plan_id, 0, checkIdTask.length)
        for (let i in checkIdTask) {
            checkIdTask[i]['plan_id'] = plan_id[i]
        }

        const addTask = await client.task_to_plan.createMany({
            data: [
                ...checkIdTask
            ]
        })

        return {...addTask}

    }

    async getTaskPlan() {
        return
    }

}

module.exports = new PlanService
