const client = require("../clientDb");
const ApiError = require("../scripts/exceptions/api.error");
const _ = require('lodash/core');
const userDto = require("../dtos/user.dto");

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


        if (Array.isArray(users)) {
            this.users = users.map((one) => {
                return new userDto(one);
            });
        } else {
            this.users = [];
        }

            return {...users}
    }

    async getTeam(userId) {
        const checkUser = await client.user.findFirst({
            where: {
                user_id: Number(userId)
            },
            select: {
                user_id: true
            }
        })

        if (_.isEmpty(checkUser)) {
            throw ApiError.BadRequest(`500`)
        }

        const team = await client.team.findMany({
            where: {
                OR: [
                    {
                        user_to_team: {
                            some: {
                                user_id: userId
                            }
                        }
                    },
                    {
                        creator_id: userId
                    }
                ]
            }
        })

        return team
    }

    async createTeam(team) {

        const nameTeam = await client.team.findFirst({
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

        if (!_.isEmpty(nameTeam)) {
            throw ApiError.BadRequest(`Команду с таким названием ${team.title} вы уже создали`)
        }

        team.date_of_creation = new Date()

        const newTeam = await client.team.create({
            data: {
                ...team
            }
        })

        return {...newTeam}
    }

    async addUserInTeam(dataUser) {

        if (_.isEmpty(dataUser)) {
            throw ApiError.BadRequest(`Пустой список`)
        }

         const userIds = await client.user.findMany({
            where: {
                email: {in: dataUser.email}
            },
            select: {
                user_id: true
            }
        })

        const team_id = dataUser.team_id;
        const updatedUserIds = userIds.map(user => ({ ...user, team_id }));

        const addUser = await client.user_to_team.createMany({
            data: [
                ...updatedUserIds
            ]
        })

        return {...addUser}
    }
}

module.exports = new TeamService
