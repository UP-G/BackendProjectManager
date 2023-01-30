const client = require('../clientDb')
const {validationResult} = require('express-validator');

class TaskController {
    async createTask (req, res) {
        const {title, description, creatorId, responsibleId, dateOfCreation} = req.body

        const task = await client.task.create({
            data: {
                title: title,
                description: description,
                creator_id: creatorId,
                responsible_id: responsibleId,
                date_of_creation: dateOfCreation
            }
        })

        res.json(task)
    }
    async getTask (req, res) { // Взятие всех тасков дотсупных пользователю
        const {userId} = req.body
        const tasks = await client.task.findMany({where: {
            responsible_id: userId
        },
        orderBy: {
            parent_id: 'asc'
        }
    },);

        res.json(tasks)
    }

    async getSubtask (req, res) { // взятие одного таска
        const {parentId} = req.body
        const getSubtask = await client.task.findMany({where: {
            parent_id: parentId
        }})

        res.json(getSubtask)
    }

    async updateTask (req, res) {
        const {taskId, field, updateValues} = req.body
        switch (field) {
            case 'title':
                const updateTitleTask = await client.task.update({
                    where: {
                        task_id: taskId
                    },
                    data: {
                        title: updateValues
                    }
                })
                break;
            case 'description':
                const updateDescriptionTask = await client.task.update({
                    where: {
                        task_id: taskId
                    },
                    data: {
                        description: updateValues
                    }
                })
                break;
            case 'responsible_id':
                const updateResponsibleTask = await client.task.update({
                    where: {
                        task_id: taskId
                    },
                    data: {
                        responsible_id: updateValues
                    }
                })
                break;

            default:
                break;
        }

        res.json(taskId, field, updateValues)
    }

    async deleteTask (req, res) {
        const taskId = req.params.id
        const deleteTask = client.task.delete({
            where: {
                task_id: {
                    taskId
                }
            }
        })
    }
}

module.exports = new TaskController
