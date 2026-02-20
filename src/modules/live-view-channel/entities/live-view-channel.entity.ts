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

  /**
   * 新增：串流伺服器網址
   * 例如: "http://100.x.y.z:8889/ch02" (Tailscale IP)
   * 用於 WebRTC 或 HLS 直接播放
   */
  @Column({ nullable: true })
  streamUrl: string;

  /**
   * 新增：串流來源類型
   * 'webrtc' | 'youtube' | 'rtsp'
   * 讓 Nuxt 前端知道要用 iframe 還是 YouTube Player
   */
  @Column({ default: 'webrtc' })
  provider: string;

  /**
   * YouTube 頻道 ID（用於直播）
   * 例如: "UCxxxxxxxxxxxxxxxxxxxxxx"
   * 與 youtubeVideoId 二選一
   */
  @Column({ nullable: true })
  youtubeChannelId: string;

  /**
   * YouTube 影片 ID（用於特定影片）
   * 例如: "vOgvP1bukLc"
   * 與 youtubeChannelId 二選一
   */
  @Column({ nullable: true })
  youtubeVideoId: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}
