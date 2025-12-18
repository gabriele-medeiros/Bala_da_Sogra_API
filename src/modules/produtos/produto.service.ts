import { AppDataSource } from '../../database/data-source';
import { Produto } from './produto.entity';

export class ProdutoService {
  private repo = AppDataSource.getRepository(Produto);

  async list(page: number, limit: number) {
    const [items, total] = await this.repo.findAndCount({
      skip: (page - 1) * limit,
      take: limit
    });
    return { items, total, page, limit };
  }

  async getById(id: string) {
    return this.repo.findOne({ where: { idProd: id }});
  }

  async create(data: Partial<Produto>) {
    const produto = this.repo.create(data);
    return await this.repo.save(produto);
  }

  async update(id: string, data: Partial<Produto>) {
    const produto = await this.getById(id);
    if (!produto) return null;
    Object.assign(produto, data);
    return await this.repo.save(produto);
  }

  async remove(id: string) {
    await this.repo.delete(id);
  }
}