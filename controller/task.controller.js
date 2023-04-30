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

            if (newTask.team_owned_id != null) {
                res.io.to('teamId' + newTask.team_owned_id).emit('SET_TASK', {task: {...newTask}})
            } else {
                res.io.to('userId' + newTask.creator_id).emit('SET_TASK', {task: {...newTask}})
            }

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

    async getTask (req, res, next) {
        try {
            const userId = req.params.id

            const tasks = await TaskService.getTask(userId)

            res.json(tasks)
        } catch (e) {
            next(e)
        }

    }

    async getSubtask (req, res, next) {
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

            if (task.team_owned_id != null) {
                res.io.to('teamId' + task.team_owned_id).emit('SET_TASK', {task: {...task}})
            } else {
                res.io.to('userId' + task.creator_id).emit('SET_TASK', {task: {...task}})
            }

            const updateTask = await TaskService.updateTask(task)

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
