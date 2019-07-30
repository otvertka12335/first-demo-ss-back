import database from '../src/models'

class TeamService {
    static async getAll() {
        try {
            return await database.Team.findAll({
                include: [{
                    all: true
                }],
                order: [
                    ['id', 'DESC']
                ]
            });
        } catch (e) {
            throw e;
        }
    }

    static async add(newTeam) {
        try {
            return await database.Team.create(newTeam);
        } catch (error) {
            throw error;
        }
    }

    static async update(id, updateTeam) {
        try {
            const teamToUpdate = await database.Team.findOne({
                where: {id: Number(id)}
            });

            if (teamToUpdate) {
                await database.Team.update(updateTeam, {
                    where: {id: Number(id)},
                    include: [{
                        all: true
                    }]
                });

                return updateTeam;
            }
            return null;
        } catch (error) {
            throw error;
        }
    }

    static async getA(id) {
        try {
            const theTeam = await database.Team.findOne({
                where: {id: Number(id)},
                include: [{
                    all: true
                }]
            });

            return theTeam;
        } catch (error) {
            throw error;
        }
    }

    static async getATeamByProject(id) {
        try {
            const theTeam = await database.Team.findAll({
                where: {project: Number(id)},
                include: [{
                    all: true
                }]
            });

            return theTeam;
        } catch (error) {
            throw error;
        }
    }

    static async delete(id) {
        try {
            const teamToDelete = await database.Team.findOne({where: {id: Number(id)}});

            if (teamToDelete) {
                const deletedTeam = await database.Team.destroy({
                    where: {id: Number(id)}
                });
                return deletedTeam;
            }
            return null;
        } catch (error) {
            throw error;
        }
    }

    static async addTeamMates(id, maintainers, developers) {
        try {
            const deleteProject = database.Team.destroy({
                where: {project: Number(id)}
            });
            if (deleteProject) {
                let arrays = [];

                for (let item of maintainers) {
                    let newPromise = database.Team.create({
                        'project': id,
                        'user': item,
                        'role': 'maintainer'
                    });
                    arrays.push(newPromise);
                }

                for (let item of developers) {
                    let newPromise = database.Team.create({
                        'project': id,
                        'user': item,
                        'role': 'developer',

                    });
                    arrays.push(newPromise);
                }

                return Promise.all(arrays)
            }
        } catch (error) {
            throw error;
        }
    }

    static async getAProjectWhereUserExist(userId) {
        try {
            const theProjects = await database.Team.findAll({
                where: {user: Number(userId)},
                include: [{
                    all: true
                }]
            });

            return theProjects
        } catch (error) {
            throw  error;
        }
    }
}

export default TeamService;
