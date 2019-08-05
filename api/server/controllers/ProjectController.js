import ProjectService from '../services/ProjectService';
import Util from '../utils/Utils';

const util = new Util();
const messages = require('../../messages.env');

class ProjectController {
    static async getAllProjects(req, res) {
        try {
            const projects = await ProjectService.getAll();
            if (projects.length > 0) {
                util.setSuccess(200, 'Projects', projects);
            } else {
                util.setSuccess(204, messages.GENERAL.EMPTY_RESULT);
            }
            return util.send(res);
        } catch (e) {
            util.setError(400, e);
            return util.send(res);
        }
    }

    static async addProject(req, res) {
        if (!req.body.name || !req.body.userId) {
            util.setError(400, messages.GENERAL.PROVIDE_COMPLETE_DETAILS);
            return util.send(res);
        }
        const newProject = req.body;
        try {
            const createdProject = await ProjectService.add(newProject);
            util.setSuccess(201, 'Project Added!', createdProject);
            return util.send(res);
        } catch (error) {
            util.setError(400, error.message);
            return util.send(res);
        }
    }

    static async updatedProject(req, res) {
        const alteredProject = req.body;
        const {id} = req.params;
        if (!Number(id)) {
            util.setError(400, messages.GENERAL.VALID_NUMERIC_VALUE);
            return util.send(res);
        }
        try {
            const updateProject = await ProjectService.update(id, alteredProject);
            if (!updateProject) {
                util.setError(404, messages.GENERAL.EMPTY_RESULT);
            } else {
                util.setSuccess(200, 'Project updated', updateProject);
            }
            return util.send(res);
        } catch (error) {
            util.setError(404, error);
            return util.send(res);
        }
    }

    static async getAProject(req, res) {
        const {id} = req.params;

        if (!Number(id)) {
            util.setError(400, messages.GENERAL.VALID_NUMERIC_VALUE);
            return util.send(res);
        }

        try {
            const theProject = await ProjectService.getA(id);

            if (!theProject) {
                util.setError(404, messages.GENERAL.EMPTY_RESULT);
            } else {
                util.setSuccess(200, 'Found Project', theProject);
            }
            return util.send(res);
        } catch (error) {
            util.setError(404, error);
            return util.send(res);
        }
    }

    static async getAProjectByUser(req, res) {
        const {id} = req.params;

        if (!Number(id)) {
            util.setError(400, messages.GENERAL.VALID_NUMERIC_VALUE);
            return util.send(res);
        }

        try {
            const theProject = await ProjectService.getAProjectByUser(id);

            if (!theProject) {
                util.setError(404, `Cannot find projects with the user id ${id}`);
            } else {
                util.setSuccess(200, 'Found Project', theProject);
            }
            return util.send(res);
        } catch (error) {
            util.setError(404, error);
            return util.send(res);
        }
    }

    static async deleteProject(req, res) {
        const {id} = req.params;

        if (!Number(id)) {
            util.setError(400, messages.GENERAL.VALID_NUMERIC_VALUE);
            return util.send(res);
        }

        try {
            const projectToDelete = await ProjectService.delete(id);

            if (projectToDelete) {
                util.setSuccess(200, 'Project deleted');
            } else {
                util.setError(404, `Project with the id ${id} cannot be found`);
            }
            return util.send(res);
        } catch (error) {
            util.setError(400, error);
            return util.send(res);
        }
    }

    static async searchFunction(req, res) {
        const {id, searchString} = req.params;

        try {
            const theProject = await ProjectService.searchProjectByName(searchString, id);

            if (!theProject) {
                util.setError(404, `Cannot find projects with name ${searchString}`);
            } else {
                util.setSuccess(200, 'Found Project', theProject);
            }
            return util.send(res);
        } catch (error) {
            util.setError(404, error);
            return util.send(res);
        }
    }
}

export default ProjectController;
