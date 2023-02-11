const jwt = require('jsonwebtoken');
const client = require('../clientDb');
require('dotenv').config()

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '1d'})
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '15d'})
        return {
            accessToken,
            refreshToken
        }
    }

    validateAccessToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
            return userData;
        } catch (e) {
            return null;
        }
    }

    validateRefreshToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
            return userData;
        } catch (e) {
            return null;
        }
    }

    async saveToken(userId, refreshToken) {
        const tokenData = await client.token.findFirst({
            where: {
                user_id: userId
            }
        })

        if (tokenData) {
            console.log(tokenData)
            const createToken = await client.token.update({
                where: {
                    token_id: tokenData.token_id
                },
                data: {
                    refresh_token: refreshToken
                }
            })
            return createToken
        }

        const token = await client.token.create({
            data: {
                user_id: userId,
                refresh_token: refreshToken
            }
        })

        return token;
    }

    async removeToken(refreshToken) {
        const tokenData = await client.token.delete({
            where: {
                refresh_token: refreshToken
            }
        })
        return tokenData;
    }

    async findToken(refreshToken) {
        console.log(refreshToken)
        const tokenData = await client.token.findFirst({
            where: {
                refresh_token: refreshToken
            }
        })
        return tokenData;
    }
}

module.exports = new TokenService();
