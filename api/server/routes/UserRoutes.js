import Router from 'express';
import UserController from '../controllers/UserController';
import TeamController from "../controllers/TeamController";
import UserService from "../services/UserService";

const router = Router();

router.get('/', UserController.getAllUsers);
router.get('/without/:id', UserController.getAllUsersWithout);
router.get('/:id', UserController.getUser);
router.get('/email/:email', UserController.getAUserByEmail);
router.get('/activate/:key/:token', UserController.acceptLink);

router.post('/login', UserController.login);
router.post('/', UserController.addUser);

router.put('/:id', UserController.updatedUser);
router.delete('/:id', UserController.deleteUser);

export default router;
