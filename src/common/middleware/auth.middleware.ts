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

        const accessToken:string | undefined = cookie(req, 'accessToken') === "undefined" ?  undefined :  cookie(req, 'accessToken');
        const refreshToken: string | undefined =  cookie(req, 'refreshToken') === "undefined" ? undefined : cookie(req, 'refreshToken');
        if(accessToken && refreshToken ) {
            return next();
        }else if(!accessToken && refreshToken) {
            console.log('im here 2')
           const vRefresh = verifyToken(refreshToken);
            const jwtPayload: JwtPayload = {
                userId: vRefresh?.userId,
                email: vRefresh?.email,
            };

            const  newAccessToken = signToken(jwtPayload, 'token');
            const  newRefreshToken = signToken(jwtPayload, 'refreshToken');
            const exToken = verifyToken(newAccessToken);
            const exRefreshToken = verifyToken(newRefreshToken)

            res.cookie('wwwww', "wxyz", {
                httpOnly: true,
                secure: false,
            });

            // res.cookie('refreshToken', newRefreshToken, {
            //     httpOnly: true,
            //     secure: false,
            //     sameSite: 'lax',
            //     expires: new Date(Number(exRefreshToken.exp) * 1000),
            // });

            next()
        }else  {
            console.log('im here3')
            return next(new UnauthorizedException('Access token required'));
        }
    console.log('im here 4')
};

export default authMiddleware;