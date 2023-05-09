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

    async updateTask (task) {

        const updateTask = await client.task.update({where: {
                task_id: task.task_id
            },
            data: {
                ...task
            }
        })

        return {...updateTask}
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

    async getOneTask(taskId) {

        const task = await client.task.findFirst({
            where: {
                task_id: Number(taskId)
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

        task.creator_title = task.creator_title.name + ' ' + task.creator_title.last_name
        task.responsible_title = task.responsible_title.name + ' ' + task.responsible_title.last_name

        return task
    }

    async getSubtask(taskId) {

        const subtask = await client.task.findMany({where: {
                parent_id: Number(taskId)
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

        subtask.map((item) => {
            item['creator_title'] = item['creator_title'].name + ' ' + item['creator_title'].last_name;
            item['responsible_title'] = item['responsible_title'].name + ' ' + item['responsible_title'].last_name;
            return item;
        });

        return subtask
    }

}

module.exports = new TaskService
