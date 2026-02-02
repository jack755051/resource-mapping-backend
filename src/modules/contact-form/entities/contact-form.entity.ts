// src/modules/contact/entities/contact-form.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ContactFormStatus } from '../constants/contact-form.constants';

@Entity()
export class ContactForm {
  @PrimaryGeneratedColumn('uuid') // 系統自動產生 UUID
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  phone: string;

  @Column('text', { array: true })
  type: string[];

  @Column('text')
  message: string;

  @Column({
    type: 'enum',
    enum: ContactFormStatus,
    default: ContactFormStatus.UNREAD,
  })
  status: ContactFormStatus;

  @CreateDateColumn() // 系統自動紀錄建立時間
  createdAt: Date;

  @UpdateDateColumn() // 系統自動紀錄最後修改時間（例如改狀態時）
  updatedAt: Date;
}
