const client = require('../clientDb')
//const {validationResult} = require('express-validator');

class TaskController {
    async createTask (req, res) {
        try {
            const {task} = req.body
            const createTask = await client.task.create({
                data: {
                    ...task
                }
            })
            req.io.sockets.emit('SOCKET_SETTASK', createTask)
            res.json(createTask)
        }
        catch (e) {
            res.status(400).json(e)
        }
    }
    async getTask (req, res) {// Взятие всех тасков дотсупных пользователю
        try {
            const userId = req.params.id

            const tasks = await client.task.findMany({where: {
                    OR: [
                        {
                            creator_id: Number(userId)
                        },
                        {
                            responsible_id: Number(userId)
                        }
                    ],
                },
                orderBy: {
                    parent_id: 'asc'
                }
            })
            res.json(tasks)
        } catch (e) {
            res.status(400).json(e)
        }

    }

    async getSubtask (req, res) { // взятие одного подтаска
        try {
            const parentId = req.params.id

            const getSubtask = await client.task.findMany({where: {
                parent_id: Number(parentId)
                }})

            res.json(getSubtask)
        } catch (e) {
            res.status(400).json(e)
        }

    }

    async updateTask (req, res) {
        try {
            const {task} = req.body

            const updateTask = await client.task.update({where: {
                    task_id: task.task_id
                },
                data: {
                    ...task
                }
            })
            res.json(updateTask)
        } catch (e) {
            res.status(400).json(e)
        }

    }

    async deleteTask (req, res) {
        try {
            const taskId = req.params.id
            const deleteTask = await client.task.delete({where: {
                    task_id: taskId
                }
            })
            res.json(deleteTask)
        } catch (e) {
            res.status(400).json(e)
        }

    }
}

module.exports = new TaskController
