import { Router } from 'express';
import {MenuController} from "../controller/menu.controller";

const router = Router();
const menuController = new MenuController();

router.get('/', menuController.getAll);
router.post('/', menuController.create);
router.get('/:id', menuController.getById);
router.put('/:id', menuController.update);
router.delete('/:id', menuController.delete);

export default router;