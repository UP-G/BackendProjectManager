const client = require('../clientDb')

class RoomService {
    async createRoom (room, roomId, creatorId) {
        const newRoom = await client.chat_room.create({
            data: {
                chat_room_id: room + roomId,
                name_room: room + roomId,
                creator_chat_room_id: creatorId,
                date_of_creation: new Date()
            }
        })

        return {...newRoom}
    }
}

module.exports = new RoomService
