import { Request, Response, NextFunction, RequestHandler } from 'express';

const notFoundHandler: RequestHandler = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    res.status(404).send('Not Found');
    const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
    next(error);
};

export default notFoundHandler;