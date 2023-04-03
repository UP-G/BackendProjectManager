const client = require('../clientDb')

class MessageService {
    async getMessage(roomId) {
        const messages = client.message.findMany({
            where: {
                chat_room_id: roomId
            },
            orderBy: {
                date_of_creation: 'asc'
            }
        })
        return {...messages}
    }
}

module.exports = new MessageService
