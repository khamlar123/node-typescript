import { Sequelize } from 'sequelize-typescript';
import { User } from '../models/user.model';
import {Menu} from "../models/menu.model";
import * as dotenv from 'dotenv';
import {Dialect} from "sequelize";
import {UserMenu} from "../models/user-menu.model";
dotenv.config();
const sequelize = new Sequelize({
    database: process.env.DB_NAME as string ||'',
    username: process.env.DB_USER as string || '',
    password: process.env.DB_PASSWORD as string || '',
    host: process.env.DB_HOST as string || '',
    dialect:  (process.env.DB_DIALECT as Dialect) || 'mysql',
    models: [User, Menu, UserMenu],
    logging: true,
});

export default sequelize;