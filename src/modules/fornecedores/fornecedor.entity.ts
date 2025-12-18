import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany
} from 'typeorm';
import { Proposta } from '../propostas/proposta.entity';

@Entity('fornecedores')
export class Fornecedor {
  @PrimaryGeneratedColumn('uuid')
  idForn!: string;

  @Column()
  nome!: string;

  @Column({ unique: true })
  CNPJ!: string;

  @Column()
  contato!: string;

  @Column({ unique: true })
  email!: string;

  @Column({ nullable: true })
  password?: string;

  @CreateDateColumn()
  criadoEm!: Date;

  @OneToMany(() => Proposta, proposta => proposta.fornecedor)
  propostas!: Proposta[];
}