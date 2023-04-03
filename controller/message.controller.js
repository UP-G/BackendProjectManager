const MessageService = require("../services/message.service");

class MessageController {
    async getMessage (req, res, next) {
        try {
            const roomId = req.params.id;
            const messages = await MessageService.getMessage(roomId)
            res.json(messages)
        }
        catch (e) {
            next(e)
        }
    }
}

module.exports = new MessageController
