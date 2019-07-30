import database from '../src/models'

class ProjectService {
    static async getAll() {
        try {
            return await database.Project.findAll({
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

    static async add(newProject) {
        try {
            return await database.Project.create(newProject);
        } catch (error) {
            throw error;
        }
    }

    static async update(id, updateProject) {
        try {
            const projectToUpdate = await database.Project.findOne({
                where: {id: Number(id)}
            });

            if (projectToUpdate) {
                await database.Project.update(updateProject, {
                    where: {id: Number(id)}
                });

                return updateProject;
            }
            return null;
        } catch (error) {
            throw error;
        }
    }

    static async getA(id) {
        try {
            const theProject = await database.Project.findOne({
                where: {id: Number(id)},
                include: [{
                    all: true
                }]
            });

            return theProject;
        } catch (error) {
            throw error;
        }
    }

    static async getAProjectByUser(id) {
        try {
            const theProject = await database.Project.findAll({
                where: {userId: Number(id)},
                order: [
                    ['id', 'DESC'],
                ],
                include: [{
                    all: true
                }]
            });

            return theProject;
        } catch (error) {
            throw error;
        }
    }

    static async delete(id) {
        try {
            const projectToDelete = await database.Project.findOne({where: {id: Number(id)}});

            if (projectToDelete) {
                const teamsToDelete = await database.Team.destroy({
                    where: {project: id}
                });

                const deletedProject = await database.Project.destroy({
                    where: {id: Number(id)},
                    cascade: true
                });
                return deletedProject;
            }
            return null;
        } catch (error) {
            throw error;
        }
    }
}

export default ProjectService;
