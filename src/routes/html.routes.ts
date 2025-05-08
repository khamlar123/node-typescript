import { Router } from 'express';
import path from 'path';

const htmlRouter = Router();

htmlRouter.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../welcome.html'));
});

export default htmlRouter;