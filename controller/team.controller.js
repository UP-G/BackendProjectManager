const client = require('../clientDb')

class TeamController {
    async getUserOnTeam (req, res) {
        try {
            const teamId = req.params.id
            const users = await client.user.findMany({where: {
                user_to_team: {
                    some: {
                        team_id: Number(teamId)
                    }
                }
            }})
            console.log(users)
            res.json(users)
        } catch (e) {
            res.status(400).json(e)
        }

    }
}

module.exports = new TeamController
