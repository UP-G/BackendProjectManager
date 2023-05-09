const client = require('../clientDb')
const bcrypt = require('bcrypt');
const ApiError = require('../scripts/exceptions/api.error')
const TokenService = require('../services/token.service')
const UserDto = require('../dtos/user.dto')
const FileService = require('../services/file.service')

class UsersService {
    async registration (user) {

        const candidate = await client.user.findFirst({where: {
            email: user.email
        }})

        if (candidate) {
            throw ApiError.BadRequest(`Пользователь с почтовым адресом ${user.email} уже существует`)
        }

        user.password = await bcrypt.hash(user.password, 4)
        user.date_of_creation = new Date()

        const createUser = await client.user.create({
            data: {
                ...user
            }
        })

        const userDto = new UserDto(createUser);
        const tokens = TokenService.generateTokens({...userDto});
        await TokenService.saveToken(userDto.user_id, tokens.refreshToken);

        await FileService.createDir(userDto.user_id);

        return {...tokens, user: userDto}

    }

    async login (email, password) {
        const user = await client.user.findFirst({
            where: {
                email: email
            }
        })

        if (!user) {
            throw ApiError.BadRequest('Неверный e-mail или пароль')
        }
        const isPassEquals = await bcrypt.compare(password, user.password);
        if (!isPassEquals) {
            throw ApiError.BadRequest('Неверный e-mail или пароль');
        }
        const userDto = new UserDto(user);
        const tokens = TokenService.generateTokens({...userDto});

        await TokenService.saveToken(userDto.user_id, tokens.refreshToken);
        return {...tokens, user: userDto}
    }

    async logout(refreshToken) {
        return await TokenService.removeToken(refreshToken);
    }

    async addGitLabToken(tokenGitLab, userId) {
        const newToken = await client.user.update({
            where: {
                user_id: userId
            },
            data: {
                token_git_lab: tokenGitLab
            }
        })

        return newToken
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError();
        }
        const userData = TokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await TokenService.findToken(refreshToken);
        console.log(tokenFromDb)
        if (!userData || !tokenFromDb) {
            throw ApiError.UnauthorizedError();
        }

        const user = await client.user.findFirst({
            where: {
                user_id: userData.user_id
            }
        });

        const userDto = new UserDto(user);
        const tokens = TokenService.generateTokens({...userDto});

        await TokenService.saveToken(userDto.id, tokens.refreshToken);
        return {...tokens, user: userDto}
    }

}

module.exports = new UsersService
