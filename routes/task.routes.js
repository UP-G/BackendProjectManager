const Router = require('express')
const router = new Router()
const TaskController = require('../controller/task.controller')
const authMiddleware = require('../middleware/auth.middleware')
//const {check} = require('express-validator');

router.post('/task/', [
    // check('title').trim().not().isEmpty(),
    // check('creatorId', 'Только число').isNumeric().not().isEmpty(),
    // check('responsibleId', 'Только число').isNumeric(),
    // check('dateOfCreation').isISO8601().toDate(),
], TaskController.createTask)

router.get('/task/:id', authMiddleware, TaskController.getTask)
router.get('/oneTask/:id', authMiddleware, TaskController.getOneTask)
router.get('/subtask/:id', TaskController.getSubtask)
router.put('/task/', TaskController.updateTask)
router.delete('/task/:id', TaskController.deleteTask)

module.exports = router
