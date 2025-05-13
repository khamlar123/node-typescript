import express from 'express';
import userRoutes from './routes/user.routes';
import sequelize from './config/database';
import path from 'path';
import htmlRouter from './routes/html.routes';
import menuRoutes from "./routes/menu.routes";
import errorHandler from "./common/middleware/errorHandler";
import notFoundHandler from "./common/middleware/notFoundError";
import interceptor from './common/interceptor/responseInterceptor'
import AuthRouter from "./routes/auth.router";
const swagger = require('./config/swagger');
import * as dotenv from 'dotenv';
import authMiddleware from './common/middleware/auth.middleware';
import cookieParser from 'cookie-parser';
import cors from 'cors';


class App {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.config();
        this.routes();
        this.database();
    }

    private config(): void {
        dotenv.config();
        this.app.use(express.json());
        this.app.use(cookieParser())
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(express.static(path.join(__dirname, 'public')));
        this.app.use(function (req, res, next) {
            res.header('Access-Control-Allow-Credentials');
            res.header('Access-Control-Allow-Origin', req.headers.origin);
            res.header(
                'Access-Control-Allow-Methods',
                'GET,PUT,POST,DELETE,UPDATE,OPTIONS'
            );
            res.header(
                'Access-Control-Allow-Headers',
                'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept'
            );
            next();
        });

        this.app.use(interceptor);
        this.app.use(cors());
        this.app.use(function (req, res, next) {
            res.header('Access-Control-Allow-Credentials');
            res.header('Access-Control-Allow-Origin', req.headers.origin);
            res.header(
                'Access-Control-Allow-Methods',
                'GET,PUT,POST,DELETE,UPDATE,OPTIONS'
            );
            res.header(
                'Access-Control-Allow-Headers',
                'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept'
            );
            next();
        });
        this.app.use(authMiddleware);
    }

    private routes(): void {
        this.app.use('/', htmlRouter); // Add this line
        this.app.use('/api-docs', swagger.swaggerUi.serve , swagger.swaggerUi.setup(swagger.swaggerOp('swagger/*.js')));
        this.app.use('/auth', AuthRouter);
        this.app.use('/users', userRoutes);
        this.app.use('/menus', menuRoutes);
        this.app.use(notFoundHandler);
        this.app.use(errorHandler);
    }

    private async database(): Promise<void> {
        try {
            await sequelize.sync();
            console.log('Database connected and synced');
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    }

}

export default new App().app;