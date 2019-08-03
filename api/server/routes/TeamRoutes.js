import Router from 'express';
import TeamController from '../controllers/TeamController';

const router = Router();

router.get('/', TeamController.getAllTeams);
router.get('/:id', TeamController.getATeam);
router.get('/project/:id', TeamController.getATeamByProject);
router.get('/connecting/:id', TeamController.getAProjectWhereUserExist);

router.post('/', TeamController.addTeam);
router.post('/addTeamMates', TeamController.addTemToProject);

router.put('/:id', TeamController.updatedTeam);
router.delete('/:id', TeamController.deleteTeam);

// router.get('/send/mail/', TeamController.sendToken);
// router.get('/accept/mail/:key/:token', TeamController.acceptInvite);



export default router;
