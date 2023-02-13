const client = require("../clientDb");
const ApiError = require("../scripts/exceptions/api.error");

class TeamService {
    async getUserOnTeam(teamId) {
            const users = await client.user.findMany({
                where: {
                    user_to_team: {
                        some: {
                            team_id: Number(teamId)
                        }
                    }
                }
            })
            return {users}
    }

    async createTeam(team) {
        team.creator_id = Number(team.creator_id)

        const nameTeam = await client.team.findMany({
            where: {
                AND: [
                    {
                        creator_id: team.creator_id
                    },
                    {
                        title: team.title
                    }
                ]
            }
        })

        if (nameTeam) {
            throw ApiError.BadRequest(`Команду с таким названием ${team.title} вы уже создали`)
        }

        const newTeam = await client.team.create({
            data: {
                ...team
            }
        })

        return {...newTeam}
    }

}

module.exports = new TeamService
