import { Router } from 'express';
import { UserController } from '../controller/user.controller';

const router = Router();
const userController = new UserController();

router.get('/', userController.getAll);
router.get('/find', userController.findUser);
router.get('/me', userController.me);
router.get('/:id', userController.getById);
router.post('/', userController.create);
router.post('/add-menu', userController.menuToUser);
router.put('/:id', userController.update);
router.delete('/:id', userController.delete);

export default router;