const client = require('../clientDb')
const TaskService = require('../services/task.service')
const RoomService = require("../services/room.service");
//const {validationResult} = require('express-validator');

class TaskController {
    async createTask (req, res, next) {
        try {
            const {task} = req.body
            const newTask = await TaskService.createTask(task)
            const newRoom = await RoomService.createRoom('taskId', newTask.task_id, newTask.creator_id)

            res.io.to(newTask).emit('SET_TASK', {task: {...newTask}})
            res.json(newTask)
        }
        catch (e) {
            next(e)
        }
    }

    async getOneTask (req, res, next) {
        try {
            const taskId = req.params.id

            const task = await TaskService.getOneTask(taskId)

            res.json(task)
        } catch (e) {
            next(e)
        }
    }

    async getTask (req, res, next) {// Взятие всех тасков дотсупных пользователю
        try {
            const userId = req.params.id

            const tasks = await TaskService.getTask(userId)

            res.json(tasks)
        } catch (e) {
            next(e)
        }

    }

    async getSubtask (req, res, next) { // взятие одного подтаска
        try {
            const parentId = req.params.id

            const subtask = await TaskService.getSubtask(parentId)

            res.json(subtask)
        } catch (e) {
            next(e)
        }

    }

    async updateTask (req, res, next) {
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
            next(e)
        }

    }

    async deleteTask (req, res, next) {
        try {
            const taskId = req.params.id
            const deleteTask = await client.task.delete({where: {
                    task_id: taskId
                }
            })
            res.json(deleteTask)
        } catch (e) {
            next(e)
        }

    }
}

module.exports = new TaskController
