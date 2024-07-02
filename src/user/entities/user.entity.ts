import { Company } from 'src/companies/entities/company.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  phoneNumber: string;

  @Column()
  lastName: string;

  @Column()
  firstName: string;

  @Column()
  description: string;

  @Column()
  nickname: string;

  @Column()
  position: string;

  @Column({ default: 'user' })
  role?: string;

  @OneToMany(() => Company, (company) => company.user, { onDelete: 'CASCADE' })
  companies: Company[];

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;
}
