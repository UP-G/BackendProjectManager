const client = require("../clientDb");
const ApiError = require("../scripts/exceptions/api.error");
const fs = require('fs')
const _ = require("lodash/core");

class ProfileService {
    async uploadPhoto(userId, file) {
        if (file.mimetype.split('/')[0] !== "image") {
            throw ApiError.BadRequest(`Не фото.`)
        }
        file.name = "avatar." + file.mimetype.split('/')[1]
        const newPhoto = file.mv('uploads/user-' + userId + '/avatar/' + file.name)
        return {...newPhoto}
    }
}

module.exports = new ProfileService
