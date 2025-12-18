import { AppDataSource } from '../../database/data-source';
import { Proposta } from './proposta.entity';

export class PropostaService {
  private repo = AppDataSource.getRepository(Proposta);

  async list(page: number, limit: number) {
    const [items, total] = await this.repo.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      relations: ['fornecedor']
    });
    return { items, total, page, limit };
  }

  async getById(id: string) {
    return this.repo.findOne({
      where: { idProp: id },
      relations: ['fornecedor']
    });
  }

  async create(data: Partial<Proposta>, fornecedorId: string) {
    const created = this.repo.create({
      ...data,
      fornecedor: { idForn: fornecedorId } as any
    });
    return await this.repo.save(created);
  }

  async update(id: string, data: Partial<Proposta>) {
    const proposta = await this.getById(id);
    if (!proposta) return null;
    Object.assign(proposta, data);
    return await this.repo.save(proposta);
  }

  async remove(id: string) {
    await this.repo.delete(id);
  }
}