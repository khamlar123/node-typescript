import { Request, Response } from 'express';
import {Menu} from "../models/menu.model";

export class MenuController {
    public async getAll(req: Request, res: Response): Promise<void> {
        try {
            const item = await Menu.findAll();
            res.json(item);
        } catch (error) {
            res.status(500).json({ error: (error as any).message });
        }
    }

    public async create(req: Request, res: Response): Promise<void> {
        try {
            const item = await Menu.create(req.body);
            res.status(201).json(item);
        } catch (error) {
            res.status(500).json({ error:(error as any).message  });
        }
    }

    public async getById(req: Request, res: Response): Promise<void> {
        try {
            const item = await Menu.findByPk(req.params.id);
            if (item) {
                res.json(item);
            } else {
                res.status(404).json({ error: 'not found' });
            }
        } catch (error) {
            res.status(500).json({ error: (error as any).message  });
        }
    }

    public async update(req: Request, res: Response): Promise<void> {
        try {
            const [item] = await Menu.update(req.body, {
                where: { id: req.params.id },
            });
            if (item) {
                const updateItem = await Menu.findByPk(req.params.id);
                res.json(updateItem);
            } else {
                res.status(404).json({ error: 'not found' });
            }
        } catch (error) {
            res.status(500).json({ error: (error as any).message  });
        }
    }

    public async delete(req: Request, res: Response): Promise<void> {
        try {
            const deleted = await Menu.destroy({
                where: { id: req.params.id },
            });
            if (deleted) {
                res.json({ message: 'Menu deleted' });
            } else {
                res.status(404).json({ error: 'not found' });
            }
        } catch (error) {
            res.status(500).json({ error: (error as any).message  });
        }
    }
}