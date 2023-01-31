const Router = require('express')
const router = new Router()
const TaskController = require('../controller/task.controller')
const {check} = require('express-validator');
const {errorMsg} = require('../scripts/checkReqError');

router.post('/task/', [
    check('title').trim().not().isEmpty(),
    check('creatorId', 'Только число').isNumeric().not().isEmpty().not().isString(),
    check('responsibleId', 'Только число').isNumeric().not().isString(),
    check('dateOfCreation').isISO8601().toDate(),
], errorMsg, TaskController.createTask)

router.get('/task/:id', TaskController.getTask)

router.get('/subtask/:id', TaskController.getSubtask)
router.put('/task/', TaskController.updateTask)
router.delete('/task/:id', TaskController.deleteTask)

module.exports = router
