import Router from 'express';
import TeamController from '../controllers/TeamController';

const router = Router();

router.get('/', TeamController.getAllTeams);
router.post('/', TeamController.addTeam);
router.get('/:id', TeamController.getATeam);
router.get('/project/:id', TeamController.getATeamByProject);
router.put('/:id', TeamController.updatedTeam);
router.delete('/:id', TeamController.deleteTeam);

router.post('/addTeamMates', TeamController.addTemToProject);
router.get('/connecting/projects', TeamController.getAProjectWhereUserExist);


export default router;
