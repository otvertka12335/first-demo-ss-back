import Router from 'express';
import UserController from '../controllers/UserController';

const router = Router();

router.get('/', UserController.getAllUsers);
router.get('/:id', UserController.getAUser);
router.get('/email/:email', UserController.getAUserByEmail);
router.post('/', UserController.addUser);
router.put('/:id', UserController.updatedUser);
router.delete('/:id', UserController.deleteUser);

export default router;
