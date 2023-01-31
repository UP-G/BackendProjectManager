require('dotenv').config()
const jwt = require("jsonwebtoken")
const client = require('../clientDb')
const bcrypt = require("bcryptjs")
const SECRET_KEY = process.env.PORT;

class AuthController {
    async registration (req, res) {
        const {name, lastName, email, password, dateOfCreation} = req.body
        const candidate = client.user.findMany({
            where: {
                email: email
            }
        })
        if (!Object.keys(candidate).length) {
            return res.status(400).json({message: `Пользователь с ${email} уже есть`})
        }
        const hashPassword = await bcrypt.hash(password, 8)
        const user = await client.user.create({
            data: {
                name: name,
                last_name: lastName,
                email: email,
                password: hashPassword,
                date_of_creation: new Date(dateOfCreation)
            }
        })

        res.json({message: "Пользователь создан"}, user)
    }

    async login(req, res) {
        try {
            const {email, password} = req.body
            const user = await client.user.findMany({
                where: {
                    email: email
                }
            })

            if (!Object.keys(user).length) {
                return res.status(400).json({message: "Пользователь не найден"})
            }
            const isPassValid = bcrypt.compareSync(password, user[0].password)

            if (!isPassValid) {
                return res.status(400).json({message: "Неверный пароль"})
            }

            const token = jwt.sign({id: user[0].user_id}, SECRET_KEY, {expiresIn: "1h"})
            return res.json({token, user})

        } catch (e) {
            res.status(400).send({message: "Server error"}, e)
        }
    }

    async auth (req, res) {
        console.log(req.user)
        try {
            const user = await client.user.findMany({
                where: {
                    user_id: req.user.id
                }
            })

            const token = jwt.sign({id: user[0].user_id}, SECRET_KEY, {expiresIn: "1h"})
            return res.json({token, user})

        } catch (e) {
            res.status(401).send({message: "Server error"}, e)
        }
    }

}

module.exports = new AuthController
