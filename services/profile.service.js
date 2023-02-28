const client = require("../clientDb");
const ApiError = require("../scripts/exceptions/api.error");
const fs = require('fs')
const UserDto = require("../dtos/user.dto");

class ProfileService {

    async uploadPhoto(userId, file) {
        if (file.mimetype.split('/')[0] !== "image") {
            throw ApiError.BadRequest(`Не фото.`)
        }

        const newPhoto = file.mv('uploads/user-' + userId + '/avatar/' + file.name)
        const pathAvatar = await client.user.update({
            where: {
                user_id: Number(userId)
            },
            data: {
                avatar: file.name
            }
        })
        const userDto = new UserDto(pathAvatar);
        return {...userDto}
    }

    async getPhoto(userId) {

        const photoName = await client.user.findFirst({
            where: {
                user_id: Number(userId)
            },
            select: {
                avatar: true
            }
        })

        const userAvatar = fs.readFileSync(__dirname + '\\..\\uploads\\user-' + userId + '\\avatar\\' + photoName.avatar)
        return userAvatar
    }

}

module.exports = new ProfileService
