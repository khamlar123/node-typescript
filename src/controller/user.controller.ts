import {Request, Response} from 'express';
import {User} from "../models/user.model";
import { Op} from "sequelize";
import {genHash} from "../shared/hash-unity";
import {Menu} from "../models/menu.model";
import {cookie} from "../shared/cookie";
import {verifyToken} from "../shared/token";

export class UserController {
    public async getAll(req: Request, res: Response<User[] | []>) {
        try {
            const item: User[] = await User.findAll();
            res.status(res.statusCode).json(item)
        } catch (e) {
            res.status(500).json((e as any).message);
        }
    }

    public async findUser(req: Request, res: Response<User[] | []>) {
        try {
            const item: User[] = await User.findAll({
                where: {
                    [Op.or]: [
                        {name: {[Op.like]: "%" + req.query.kw + "%"}},
                        {email: {[Op.like]: "%" + req.query.kw + "%"}}
                    ]
                },
                attributes: {
                    exclude: ['password']
                }
            })
            res.status(res.statusCode).json(item);
        } catch (e) {
            res.status(500).json((e as any).message);
        }
    }

    public async create(req: Request, res: Response<User | string>) {
        const {name, email, password} = req.body;
        const hashPass: string = await genHash(password);
        const create = {
            name,
            email,
            password: hashPass,
        }
        try {
            const item = await User.create(create);
            res.status(201).json(item);
        } catch (error) {
            res.status(500).json((error as any).message);
        }
    }

    public async getById(req: Request, res: Response<User | string>) {
        try {
            const item = await User.findByPk(req.params.id);
            if (item) {
                res.json(item);
            } else {
                res.status(404).json( 'not found');
            }
        } catch (error) {
            res.status(500).json( (error as any).message);
        }
    }

    public async me(req: Request, res: Response<User | string>){
        try {
            const  vUser = verifyToken(cookie(req, 'accessToken'));
            const item = await User.findOne({
                where: {
                    id: vUser.userId
                },
                attributes: {
                    exclude: ['password'], // ✅ Correct way to exclude fields
                },
            });
            if (item) {
                res.json(item);
            } else {
                res.status(404).json('not found');
            }
        } catch (error) {
            res.status(500).json((error as any).message);
        }
    }

    public async update(req: Request, res: Response<User | null | string>) {
        try {
            const [item] = await User.update(req.body, {
                where: {id: req.params.id},
            });
            if (item) {
                const updateItem = await User.findByPk(req.params.id);
                res.json(updateItem);
            } else {
                res.status(404).json('not found');
            }
        } catch (error) {
            res.status(500).json((error as any).message);
        }
    }

    public async delete(req: Request, res: Response<string>) {
        try {
            const deleted = await User.destroy({
                where: {id: req.params.id},
            });
            if (deleted) {
                res.json('deleted');
            } else {
                res.status(404).json('not found');
            }
        } catch (error) {
            res.status(500).json((error as any).message);
        }
    }

    public async menuToUser(req: Request, res: Response): Promise<any> {
        const { userId, menuId } = req.body;

        try {
            // Find user and menu with type assertions
            const findUser = await User.findByPk(userId);
            const findMenu = await Menu.findByPk(menuId);

            if (!findUser || !findMenu) {
                return res.status(404).json({ message: 'User or Menu not found' });
            }

            // Type-cast user to any to access $add method (temporary workaround)
            await (findUser as any).$add('menus', findMenu, { through: { isActive: true } });

            // Alternative better approach (recommended):
            // await UserMenu.create({ userId, menuId, isActive: true });

            return res.status(200).json({ message: 'Menu successfully assigned to user' });
        } catch (e) {
            return res.status(500).json({ message: (e as Error).message });
        }
    }
}