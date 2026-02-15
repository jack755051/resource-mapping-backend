import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

/**
 * LiveViewGallery Entity
 *
 * 用於儲存實拍畫質展示的畫廊資料
 * 前端會使用翻譯 key 來顯示多語言內容
 */
@Entity('live_view_galleries')
export class LiveViewGallery {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * 封面圖 URL
   * 用於畫廊列表的預覽圖
   */
  @Column()
  mainImage: string;

  /**
   * 圖片陣列
   * 點擊後顯示的所有圖片（包含封面與細節圖）
   */
  @Column('text', { array: true })
  imageUrls: string[];

  /**
   * 標題翻譯 key
   * 例如: 'liveView.footage.1.title'
   * 前端會使用 t() 函數根據此 key 顯示對應語言的標題
   */
  @Column()
  title: string;

  /**
   * 子標題/規格翻譯 key
   * 例如: 'liveView.footage.1.meta'
   * 用於顯示技術規格或其他元資訊
   */
  @Column()
  subtitle: string;

  /**
   * 標籤翻譯 key
   * 例如: 'liveView.footage.1.tag'
   * 用於分類或標記（如 'Night Vision', 'AI LPR'）
   */
  @Column()
  tag: string;

  /**
   * 排序順序
   * 數字越小越靠前
   */
  @Column({ default: 0 })
  sort: number;

  /**
   * 是否啟用
   * false 時前端不會顯示此畫廊項目
   */
  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}
