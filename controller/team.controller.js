const TeamServices = require("../services/team.service")
class TeamController {
    async getUserOnTeam (req, res, next) {
        try {
            const teamId = req.params.id
            const users = await TeamServices.getUserOnTeam(teamId)
            console.log(users)
            res.json(users)
        } catch (e) {
            next(e)
        }

    }

    async createTeam (req, res, next) {
        try {
            const {team} = req.body
            const newTeam = await TeamServices.createTeam(team)
            res.json(newTeam)
        } catch (e) {
            next(e)
        }
    }

}

module.exports = new TeamController
