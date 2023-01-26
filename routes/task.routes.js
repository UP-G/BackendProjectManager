const Router = require('express')
const router = new Router()
const TaskController = require('../controller/task.controller')
const {check} = require('express-validator');
const {errorMsg} = require('../scripts/checkReqError');

router.post('/task/', [
    check('title').trim().not().isEmpty(),
    check('creatorId').isNumeric().not().isEmpty().not().isString(),
    check('responsibleId').isNumeric().not().isString(),
    check('dateOfCreation').isISO8601().toDate(),
], errorMsg, TaskController.createTask)
router.post('/getTask/', [
    check('userId').isNumeric().not().isEmpty(),
], errorMsg, TaskController.getTask)
router.post('/getSubtask/', TaskController.getSubtask)
router.put('/task/', TaskController.updateTask)
router.delete('/task/:id', TaskController.deleteTask)

module.exports = router
