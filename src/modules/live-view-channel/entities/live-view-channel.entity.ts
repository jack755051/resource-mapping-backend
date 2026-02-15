import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

/**
 * LiveViewChannel Entity
 *
 * 用於儲存即時監控頻道資訊
 * 前端會將此資料與 YouTube 來源配置合併使用
 */
@Entity('live_view_channels')
export class LiveViewChannel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * 頻道名稱
   * 例如: "MAIN_ENTRANCE", "SERVER_ROOM_A"
   */
  @Column()
  name: string;

  /**
   * 頻道描述 (可選)
   * 用於管理介面顯示更多資訊
   */
  @Column({ nullable: true })
  description: string;

  /**
   * 是否啟用
   * false 時前端不會顯示此頻道
   */
  @Column({ default: true })
  isActive: boolean;

  /**
   * 排序順序
   * 數字越小越靠前
   */
  @Column({ default: 0 })
  sort: number;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}
