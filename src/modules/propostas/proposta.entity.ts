import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm';
import { Fornecedor } from '../fornecedores/fornecedor.entity';

@Entity('propostas')
export class Proposta {
  @PrimaryGeneratedColumn('uuid')
  idProp!: string;

  @Column()
  descProp!: string;

  @Column('decimal', { precision: 10, scale: 2 })
  valorProp!: number;

  @CreateDateColumn()
  criadoEm!: Date;

  @ManyToOne(() => Fornecedor, fornecedor => fornecedor.propostas, {
    onDelete: 'CASCADE',
    eager: false
  })
  @JoinColumn({ name: 'idForn' })
  fornecedor!: Fornecedor;
}