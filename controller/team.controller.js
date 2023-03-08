const TeamServices = require("../services/team.service")

class TeamController {
    async getUserOnTeam (req, res, next) {
        try {
            const teamId = req.params.id
            const users = await TeamServices.getUserOnTeam(teamId)
            res.json(users)
        } catch (e) {
            next(e)
        }

    }

    async getTeam (req, res, next) {
        try {
            const userId = req.user.user_id
            const team = await TeamServices.getTeam(userId)
            res.json(team)
        } catch (e) {
            next(e)
        }
    }

    async createTeam (req, res, next) {
        try {
            const {team} = req.body
            team.creator_id = req.user.user_id
            const newTeam = await TeamServices.createTeam(team)
            res.json(newTeam)
        } catch (e) {
            next(e)
        }
    }

    async addUserInTeam (req, res, next) {
        try {
            const {dataUser} = req.body
            const addUser = await TeamServices.addUserInTeam(dataUser)
            res.json(addUser)
        } catch (e) {
            next(e)
        }

    }

}

module.exports = new TeamController
