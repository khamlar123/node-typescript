// models/user-menu.model.ts
import { Table, Column, Model, ForeignKey, BelongsTo, DataType } from 'sequelize-typescript';
import { User } from './user.model';
import { Menu } from './menu.model';

@Table
export class UserMenu extends Model {
    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    userId!: number;

    @BelongsTo(() => User)
    user!: User;

    @ForeignKey(() => Menu)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    menuId!: number;

    @BelongsTo(() => Menu)
    menu!: Menu;

    // You can add additional columns to the junction table if needed
    @Column({
        type: DataType.BOOLEAN,
        defaultValue: true,
    })
    isActive!: boolean;
}