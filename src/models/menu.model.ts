import {Table, Column, Model, DataType, BelongsToMany} from 'sequelize-typescript';
import { User } from './user.model';
import { UserMenu } from './user-menu.model';

@Table
export class Menu extends Model {
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
  link!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  icon!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  parent!: number;


  @BelongsToMany(() => User, () => UserMenu)
  users!: User[];
}