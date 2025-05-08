import { Request, Response, NextFunction, RequestHandler } from 'express';

const authMiddleware: RequestHandler = (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    const publicRoutes = [
        { method: 'GET', path: '/' },
        { method: 'POST', path: '/auth/login' },
    ];

    console.log('path',  req.path)

    const isPublicRoute = publicRoutes.some(route => {
        const pathMatches = req.path.startsWith(route.path.replace('*', ''));
        const methodMatches = route.method === req.method;
        return pathMatches && methodMatches;
    });

    if (isPublicRoute) {
        console.log('im here')
        return next(); // Skip authentication
    }

    console.log('accessToken', req.cookies['accessToken']);

    return ;

};

export default authMiddleware;