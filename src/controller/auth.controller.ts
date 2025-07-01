import {Request, Response} from 'express';
import {User} from "../models/user.model";
import {compareHash} from "../shared/hash-unity";
import {signToken, verifyToken} from "../shared/token";
import {JwtPayload} from "jsonwebtoken";

export class AuthController {
    public async login(req: Request, res: Response): Promise<any> {
        try {
            const {email, password } = req.body;
            const findUser = await User.findOne({
                where: {
                    email: email,
                }
            });

            if (!findUser) {
                res.status(404).json(`user not found`);
            }

            const comparePass = await compareHash(password,( findUser?.password as  string));
            if (!comparePass) {
                res.status(401).json(`incorrect password`);
            }

            const jwtPayload: JwtPayload = {
                userId: findUser?.id,
                email: findUser?.email,
            }

            const  accessToken: string | undefined = signToken(jwtPayload, 'token');
            const  refreshToken: string | undefined = signToken(jwtPayload, 'refreshToken');

            const exToken = verifyToken(accessToken);
            const exRefreshToken = verifyToken(refreshToken)


            res.cookie('accessToken', accessToken, {
                httpOnly: true,
                secure: false,
                sameSite: 'lax',
                expires: new Date(Number(exToken.exp) * 1000),
            });

            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: false,
                sameSite: 'lax',
                expires: new Date(Number(exRefreshToken.exp) * 1000),
            });

            res.status(res.statusCode).json({
                accessToken: accessToken,
                refreshToken: refreshToken,
                expires: {
                    token: exToken.exp,
                    refresh: exRefreshToken.exp,
                }
            });
        } catch (e) {
            res.status(500).json((e as any).message);
        }
    }

}