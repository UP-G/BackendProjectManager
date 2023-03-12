const client = require("../clientDb");
const ApiError = require("../scripts/exceptions/api.error");
const _ = require("lodash/core");

class TaskService {
    async createTask (task) {

        const newTask = await client.task.create({
            data: {
                ...task
            }
        })

        return {...newTask}
    }
}

module.exports = new TaskService
