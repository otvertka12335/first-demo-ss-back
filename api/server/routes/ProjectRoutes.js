import Router from 'express';
import ProjectController from '../controllers/ProjectController';

const router = Router();

router.get('/', ProjectController.getAllProjects);
router.get('/:id', ProjectController.getAProject);
router.get('/search/:id/:searchString', ProjectController.searchFunction);
router.get('/user/:id', ProjectController.getAProjectByUser);

router.post('/', ProjectController.addProject);
router.put('/:id', ProjectController.updatedProject);
router.delete('/:id', ProjectController.deleteProject);

export default router;
