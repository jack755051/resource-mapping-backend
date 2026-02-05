// src/modules/contact/entities/contact-form.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import {
  ContactFormStatus,
  ContactProductType,
  InquiryIntent,
} from '../constants/contact-form.constants';

@Entity()
export class ContactForm {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  phone: string;

  // 💡 紀錄前端帶入的產品標籤
  @Column({
    type: 'enum',
    enum: ContactProductType,
    array: true,
    default: [],
  })
  type: ContactProductType[];

  @Column('text')
  message: string;

  // 💡 紀錄後端自動判定出的意圖
  @Column({
    type: 'enum',
    enum: InquiryIntent,
    default: InquiryIntent.OTHER,
  })
  intent: InquiryIntent;

  // 💡 紀錄行政處理狀態 (未讀/已讀/已回覆)
  @Column({
    type: 'enum',
    enum: ContactFormStatus,
    default: ContactFormStatus.UNREAD,
  })
  status: ContactFormStatus;

  @Column({ default: 'public' }) // 公開表單，建立者通常是 public
  createdBy: string;

  @Column({ nullable: true }) // 初始為空，等管理員處理後才填入
  updatedBy: string;

  @CreateDateColumn({ type: 'timestamptz' }) // 建議加上時區，避免 server 時間混亂
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}
