import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('produtos')
export class Produto {
  @PrimaryGeneratedColumn('uuid')
  idProd!: string;

  @Column()
  descProd!: string;

  @Column()
  unidMedProd!: string;

  @Column('decimal', { precision: 10, scale: 2 })
  precoProd!: number;

  @CreateDateColumn()
  criadoEm!: Date;
}