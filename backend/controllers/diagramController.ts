import { NextFunction, Request, Response } from 'express';
import Diagram from '../db/models/Diagram';
import { RouterHandler } from '../types/RouterHandler';

interface IDiagramController {
  create: RouterHandler<Diagram | null>;
  getAll: RouterHandler<{ count: number; rows: Diagram[] | null }>;
  getById: RouterHandler<Diagram | null>;
}

class DiagramController implements IDiagramController {
  async create(req: Request, res: Response, next: NextFunction) {
    const { name } = req.body;
    const diagram = await Diagram.create({ name });

    return res.json(diagram);
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    const limit = Number(req.query.limit || 5);
    const page = Number(req.query.page || 1);
    const offset = page * limit - limit;

    const diagrams: { count: number, rows: Diagram[] | null } = await Diagram.findAndCountAll({ limit, offset });

    return res.json(diagrams);
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    const device: Diagram | null = await Diagram.findOne({
      where: { id },
    });

    return res.json(device);
  }

}

export default new DiagramController();
