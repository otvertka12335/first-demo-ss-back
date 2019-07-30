import TeamService from '../services/TeamService';
import Util from '../utils/Utils';
import ProjectService from "../services/ProjectService";

const util = new Util();

class TeamController {
    static async getAllTeams(req, res) {
        try {
            const teams = await TeamService.getAll();
            if (teams.length > 0) {
                util.setSuccess(200, 'Teams', teams);
            } else {
                util.setSuccess(200, 'Teams not founded');
            }
            return util.send(res);
        } catch (e) {
            util.setError(400, e);
            return util.send(res);
        }
    }

    static async addTeam(req, res) {
        if (!req.body.project || !req.body.user) {
            util.setError(400, 'Please provide complete details');
            return util.send(res);
        }
        const newTeam = req.body;
        try {
            const createdTeam = await TeamService.add(newTeam);
            util.setSuccess(201, 'Team Added!', createdTeam);
            return util.send(res);
        } catch (error) {
            util.setError(400, error.message);
            return util.send(res);
        }
    }

    static async updatedTeam(req, res) {
        const alteredTeam = req.body;
        const {id} = req.params;
        if (!Number(id)) {
            util.setError(400, 'Please input a valid numeric value for update');
            return util.send(res);
        }
        try {
            const updateTeam = await TeamService.update(id, alteredTeam);
            if (!updateTeam) {
                util.setError(404, `Cannot find user with the id: ${id}`);
            } else {
                util.setSuccess(200, 'Team updated', updateTeam);
            }
            return util.send(res);
        } catch (error) {
            util.setError(404, error);
            return util.send(res);
        }
    }

    static async getATeam(req, res) {
        const {id} = req.params;

        if (!Number(id)) {
            util.setError(400, 'Please input a valid numeric value for get a Team');
            return util.send(res);
        }

        try {
            const theTeam = await TeamService.getA(id);

            if (!theTeam) {
                util.setError(404, `Cannot find user with the id ${id}`);
            } else {
                util.setSuccess(200, 'Found Team', theTeam);
            }
            return util.send(res);
        } catch (error) {
            util.setError(404, error);
            return util.send(res);
        }
    }

    static async getATeamByProject(req, res) {
        const {id} = req.params;

        if (!Number(id)) {
            util.setError(400, 'Please input a valid numeric value');
            return util.send(res);
        }

        try {
            const theTeam = await TeamService.getATeamByProject(id);

            if (!theTeam) {
                util.setError(404, `Cannot find teams with the user id ${id}`);
            } else {
                util.setSuccess(200, 'Found Team', theTeam);
            }
            return util.send(res);
        } catch (error) {
            util.setError(404, error);
            return util.send(res);
        }
    }

    static async deleteTeam(req, res) {
        const {id} = req.params;

        if (!Number(id)) {
            util.setError(400, 'Please provide a numeric value');
            return util.send(res);
        }

        try {
            const teamToDelete = await TeamService.delete(id);

            if (teamToDelete) {
                util.setSuccess(200, 'Team deleted');
            } else {
                util.setError(404, `Team with the id ${id} cannot be found`);
            }
            return util.send(res);
        } catch (error) {
            util.setError(400, error);
            return util.send(res);
        }
    }

    static async addTemToProject(req, res) {
        const {project, developers, maintainers} = req.body;

        if(!Number(project)) {
            util.setError(400, 'Please provide a numeric value for project');
            return util.send(res);
        }

        try {
            // Call service function with two params | mai, dev
            const result = await TeamService.addTeamMates(project, maintainers, developers);
            util.setSuccess(200, `Team Mates added to Team for Project ${project}`, result);
            return util.send(res);
        } catch (error) {
            util.setError(400, error);
            return util.send(res);
        }
    }

    static async getAProjectWhereUserExist(req, res) {
        const {id} = req.body;

        if (!Number(id)) {
            util.setError(400, 'SPlease input a valid numeric value XT');
            return util.send(res);
        }

        try {
            const theProject = await TeamService.getAProjectWhereUserExist(id);

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
}

export default TeamController;
