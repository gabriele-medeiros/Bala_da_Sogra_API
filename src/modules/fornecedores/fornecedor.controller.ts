import { Request, Response } from 'express';
import { FornecedorService } from './fornecedor.service';

const service = new FornecedorService();

export class FornecedorController {
  async list(req: Request, res: Response) {
    const page = Number(req.query.pagina) || 1;
    const limit = Number(req.query.limite) || 10;
    const result = await service.list(page, limit);
    res.json(result);
  }

  async get(req: Request, res: Response) {
    const item = await service.getById(req.params.idForn);
    if (!item) return res.status(404).json({ mensagem: 'Fornecedor não encontrado.' });
    res.json(item);
  }

  async create(req: Request, res: Response) {
    const created = await service.create(req.body);
    res.status(201).json(created);
  }

  async update(req: Request, res: Response) {
    const updated = await service.update(req.params.idForn, req.body);
    if (!updated) return res.status(404).json({ mensagem: 'Fornecedor não encontrado.' });
    res.json(updated);
  }

  async remove(req: Request, res: Response) {
    await service.remove(req.params.idForn);
    res.status(204).send();
  }
}