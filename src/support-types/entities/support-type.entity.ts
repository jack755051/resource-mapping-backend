import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class SupportType {
    @PrimaryGeneratedColumn()
    id: number;

    // 建議統一使用 'name' 或維持 'label'，只要攔截器能抓到即可
    @Column({ type: 'jsonb' })
    name: { zh: string; en: string;[key: string]: string };

    // 唯一的識別碼 (例如: manuals, firmware, software)
    // 方便前端在路由或判斷邏輯當中使用
    @Column({ unique: true })
    value: string;

    // 排序用：確保「所有資源」永遠在第一個
    @Column({ default: 0 })
    sort: number;

    // 選配：如果未來每個分類需要不同的 Icon
    @Column({ nullable: true })
    icon: string;
}