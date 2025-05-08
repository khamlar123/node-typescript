import {Table, Column, Model, DataType, BelongsToMany} from 'sequelize-typescript';
import { Menu } from './menu.model';
import { UserMenu } from './user-menu.model';

@Table
export class User extends Model {
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true,
    })
    email!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    password!: string;

    @BelongsToMany(() => Menu, () => UserMenu)
    menus!: Menu[];
}