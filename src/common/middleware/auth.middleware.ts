import { Request, Response, NextFunction, RequestHandler } from 'express';
import {cookie} from "../../shared/cookie";
import { UnauthorizedException } from '@nestjs/common';
import {signToken, verifyToken} from "../../shared/token";
import {JwtPayload} from "jsonwebtoken";

const authMiddleware: RequestHandler = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
        const publicRoutes = [
            { method: 'GET', path: '/' },
            { method: 'POST', path: '/auth/login' },
            { method: 'OPTIONS',  path: '/auth/login' }
        ];

        const isPublicRoute = publicRoutes.some(route => {
            const isWildcard = route.path.endsWith('*');
            const basePath = route.path.replace('*', '');
            const methodMatches = route.method === 'ALL' || route.method === req.method;
            const pathMatches = isWildcard ? req.path.startsWith(basePath) : req.path === route.path;
            return methodMatches && pathMatches;
        });

        if (isPublicRoute) {
            return next(); // Skip authentication
        }

        const accessToken:string = cookie(req, 'accessToken');
        const refreshToken: string =  cookie(req, 'refreshToken');
        console.log('refreshToken', refreshToken)
        console.log('accessToken', accessToken)
        if(accessToken && refreshToken) {
            const vRefresh = verifyToken(accessToken);
            res.cookie('user', {
                userId: vRefresh?.userId,
                email: vRefresh?.email,
            }, {
                httpOnly: true,
                secure: false,
                sameSite: 'lax',
                expires: new Date(Number(vRefresh.exp) * 1000),
            });
            return next();
        }else if(!accessToken && refreshToken) {
           const vRefresh = verifyToken(refreshToken);
            const jwtPayload: JwtPayload = {
                userId: vRefresh?.userId,
                email: vRefresh?.email,
            };

            res.cookie('user', jwtPayload, {
                httpOnly: true,
                secure: false,
                sameSite: 'lax',
                expires: new Date(Number(vRefresh.exp) * 1000),
            });

            const  newAccessToken = signToken(jwtPayload, 'token');
            const  newRefreshToken = signToken(jwtPayload, 'refreshToken');

            const exToken = verifyToken(newAccessToken);
            const exRefreshToken = verifyToken(newRefreshToken)

            res.cookie('accessToken', newAccessToken, {
                httpOnly: true,
                secure: false,
                sameSite: 'lax',
                expires: new Date(Number(exToken.exp) * 1000),
            });

            res.cookie('refreshToken', newRefreshToken, {
                httpOnly: true,
                secure: false,
                sameSite: 'lax',
                expires: new Date(Number(exRefreshToken.exp) * 1000),
            });
            next()
        }else  {
            return next(new UnauthorizedException('Access token required'));
        }
};

export default authMiddleware;