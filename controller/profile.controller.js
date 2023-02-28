const ProfileService = require('../services/profile.service')

class ProfileController {

    async uploadPhoto(req, res, next) {
        try {
            const file = req.files.file
            const newPhoto = await ProfileService.uploadPhoto(req.user.user_id, file)
            res.json(newPhoto)
        } catch (e) {
            next(e)
        }
    }
    async getPhoto(req, res, next) {
        try {
            const userId = req.params['userId'];
            const userAvatar = await ProfileService.getPhoto(userId)
            res.end(userAvatar)
        } catch (e) {
            next(e)
        }

    }

}

module.exports = new ProfileController
