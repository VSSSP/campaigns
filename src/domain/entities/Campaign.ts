import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  BeforeInsert,
} from 'typeorm';

@Entity('campaign')
export class Campaign {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  nome!: string;

  @CreateDateColumn()
  dataCadastro!: Date;

  @Column()
  dataInicio!: Date;

  @Column()
  dataFim!: Date;

  @Column()
  status!: string;

  @Column()
  categoria!: string;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt?: Date;

  @BeforeInsert()
  checkStatus() {
    const now = new Date();
    if (new Date(this.dataFim) < now) {
      this.status = 'expirada';
    }
  }
}
