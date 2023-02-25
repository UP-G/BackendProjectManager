const ProfileService = require('../services/profile.service')

class ProfileController {
    async uploadPhoto(req, res, next) {
        try {
            const file = req.files.file
            const newPhoto = ProfileService.uploadPhoto(req.user.user_id, file)
            res.json({"status": "Загруженно"})
        } catch (e) {
            next(e)
        }

    }
}

module.exports = new ProfileController
