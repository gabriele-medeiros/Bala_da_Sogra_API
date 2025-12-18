import { AppDataSource } from '../../database/data-source';
import { Fornecedor } from './fornecedor.entity';

export class FornecedorService {
  private repo = AppDataSource.getRepository(Fornecedor);

  async list(page: number, limit: number) {
    const [items, total] = await this.repo.findAndCount({
      skip: (page - 1) * limit,
      take: limit
    });
    return { items, total, page, limit };
  }

  async getById(id: string) {
    return this.repo.findOne({
      where: { idForn: id },
      relations: ['propostas']
    });
  }

  async create(data: Partial<Fornecedor>) {
    const fornecedor = this.repo.create(data);
    return await this.repo.save(fornecedor);
  }

  async update(id: string, data: Partial<Fornecedor>) {
    const fornecedor = await this.getById(id);
    if (!fornecedor) return null;
    Object.assign(fornecedor, data);
    return await this.repo.save(fornecedor);
  }

  async remove(id: string) {
    await this.repo.delete(id);
  }
}