import { Request, Response } from 'express';
import { ProdutoService } from './produto.service';

const service = new ProdutoService();

export class ProdutoController {
  async list(req: Request, res: Response) {
    const page = Number(req.query.pagina) || 1;
    const limit = Number(req.query.limite) || 10;
    const result = await service.list(page, limit);
    res.json(result);
  }

  async get(req: Request, res: Response) {
    const produto = await service.getById(req.params.idProd);
    if (!produto) return res.status(404).json({ mensagem: 'Produto não encontrado.' });
    res.json(produto);
  }

  async create(req: Request, res: Response) {
    const created = await service.create(req.body);
    res.status(201).json(created);
  }

  async update(req: Request, res: Response) {
    const updated = await service.update(req.params.idProd, req.body);
    if (!updated) return res.status(404).json({ mensagem: 'Produto não encontrado.' });
    res.json(updated);
  }

  async remove(req: Request, res: Response) {
    await service.remove(req.params.idProd);
    res.status(204).send();
  }
}