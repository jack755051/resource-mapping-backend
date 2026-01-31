// src/modules/history/entities/history.entity.ts
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('histories')
export class History {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    // 年份：儲存 "2004" 或 "Future"
    @Column()
    year: string;

    // 標籤 (i18n)：如 "Foundation", "Expansion"
    @Column({ type: 'jsonb' })
    label: { zh: string; en: string;[key: string]: string };

    // 標題 (i18n)：如 "專注製造", "智慧化整合"
    @Column({ type: 'jsonb' })
    title: { zh: string; en: string;[key: string]: string };

    // 描述 (i18n)：詳細的發展歷程描述
    @Column({ type: 'jsonb' })
    description: { zh: string; en: string;[key: string]: string };

    // 是否為當前活躍狀態：對應前端的 isActive
    @Column({ default: false })
    isActive: boolean;

    // 排序：確保 2004 在 2015 之前
    @Column({ default: 0 })
    sort: number;
}