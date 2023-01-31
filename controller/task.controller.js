const client = require('../clientDb')
//const {validationResult} = require('express-validator');

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
    async getTask (req, res) {// Взятие всех тасков дотсупных пользователю
        const userId = req.params.id

        const tasks = await client.task.findMany({where: {
            responsible_id: Number(userId)
        },
        orderBy: {
            parent_id: 'asc'
        }
    });
        res.json({tasks})
    }

    async getSubtask (req, res) { // взятие одного таска
        const {parentId} = req.body
        const getSubtask = await client.task.findMany({where: {
            parent_id: parentId
        }})

        res.json(getSubtask)
    }

    async updateTask (req, res) {
        const {task} = req.body

        const updateTask = await client.task.update({where: {
                    task_id: task[0].task_id
                },
            data: {
                ...task[0]
            }
        })

        res.json(updateTask)
    }

    async deleteTask (req, res) {
        const taskId = req.params.id
        const deleteTask = await client.task.delete({where: {
                task_id: {
                    taskId
                }
            }
        })
        res.json(deleteTask)
    }
}

module.exports = new TaskController
