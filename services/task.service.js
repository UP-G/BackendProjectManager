const client = require("../clientDb");

class TaskService {
    async createTask (task) {

        const newTask = await client.task.create({
            data: {
                ...task
            },
            include: {
                creator_title: {
                    select: {
                        name: true,
                        last_name: true
                    }
                }, //creator
                responsible_title: {
                    select: {
                        name: true,
                        last_name: true
                    },
                } //Responsible
            },
        })

        newTask.creator_title = `${newTask.creator_title.name} ${newTask.creator_title.last_name}`;
        newTask.responsible_title = `${newTask.responsible_title.name} ${newTask.responsible_title.last_name}`;

        return {...newTask}
    }

    async getTask (userId) {
        const task = await client.task.findMany({where: {
                OR: [
                    {
                        creator_id: Number(userId)
                    },
                    {
                        responsible_id: Number(userId)
                    }
                ],
            },
            include: {
                creator_title: {
                    select: {
                        name: true,
                        last_name: true
                    }
                }, //creator
                responsible_title: {
                    select: {
                        name: true,
                        last_name: true
                    },
                } //Responsible
            },
            orderBy: {
                parent_id: 'asc'
            }
        })

        task.map((item) => {
            item['creator_title'] = item['creator_title'].name + ' ' + item['creator_title'].last_name;
            item['responsible_title'] = item['responsible_title'].name + ' ' + item['responsible_title'].last_name;
            return item;
        });

        return task
    }

}

module.exports = new TaskService
