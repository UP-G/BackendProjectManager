const client = require('../../clientDb')

class PromiseClient {
    async getTeamsId(userId) {
        const teamIds = await client.user_to_team.findMany({
            where: {
                user_id: userId
            },
            select: {
                team_id: true
            }
        })

        return teamIds
    }
}

module.exports = new PromiseClient
