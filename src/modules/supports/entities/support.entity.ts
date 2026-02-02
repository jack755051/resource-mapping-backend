// src/modules/support/entities/support.entity.ts
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";
import { SupportCategory } from "../../support-categories/entities/support-category.entity";

export enum ResourceType {
    PDF = 'PDF',
    ZIP = 'ZIP',
    ARTICLE = 'Article',
    EXE = 'EXE',
}

@Entity('supports')
export class Support {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'jsonb' })
    title: { zh: string; en: string;[key: string]: string };

    @ManyToOne(() => SupportCategory, { eager: true })
    category: SupportCategory;

    @Column({
        type: 'enum',
        enum: ResourceType,
        default: ResourceType.PDF,
    })
    type: ResourceType;

    @Column({ type: 'bigint' })
    size: number;

    @Column()
    fileUrl: string;

    @CreateDateColumn()
    createdAt: Date;

    @Column({ default: 0 })
    sort: number;
}