const fs = require('fs')
const ApiError = require("../scripts/exceptions/api.error");

class FileService {

    async createDir(userId) {

        const filePathForAvatar = __dirname + '\\..\\uploads\\user-' + userId + '\\avatar\\'
        const filePathForFiles = __dirname + '\\..\\uploads\\user-' + userId + '\\files\\'
        return new Promise(((resolve, reject) => {
            try {
                if (!fs.existsSync(filePathForAvatar) && !fs.existsSync(filePathForFiles)) {
                    fs.mkdirSync(filePathForAvatar, { recursive: true })
                    fs.mkdirSync(filePathForFiles, { recursive: true })
                    return resolve({message: 'File was created'})
                } else {
                    return reject({message: "File already exist"})
                }
            } catch (e) {
                throw ApiError.BadRequest(`ОШИБКА Dir`)
            }
        }))
    }

}

module.exports = new FileService()
