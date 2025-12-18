import { Request, Response } from 'express';
import { PropostaService } from './proposta.service';

const service = new PropostaService();

export class PropostaController {
  async list(req: Request, res: Response) {
    const page = Number(req.query.pagina) || 1;
    const limit = Number(req.query.limite) || 10;
    const result = await service.list(page, limit);
    res.json(result);
  }

  async get(req: Request, res: Response) {
    const item = await service.getById(req.params.idProp);
    if (!item) return res.status(404).json({ mensagem: 'Proposta não encontrada.' });
    res.json(item);
  }

  async create(req: Request, res: Response) {
    const fornecedorId = req.user?.sub;
    if (!fornecedorId) return res.status(401).json({ mensagem: 'Não autorizado' });
    const created = await service.create(req.body, fornecedorId);
    res.status(201).json(created);
  }

  async update(req: Request, res: Response) {
    const updated = await service.update(req.params.idProp, req.body);
    if (!updated) return res.status(404).json({ mensagem: 'Proposta não encontrada.' });
    res.json(updated);
  }

  async remove(req: Request, res: Response) {
    await service.remove(req.params.idProp);
    res.status(204).send();
  }
}