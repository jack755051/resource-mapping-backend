import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity('analytic_events')
export class AnalyticEvent {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: true })
    sessionId: string; // 由前端傳入的 x-session-id

    @Column({ type: 'int', nullable: true })
    durationMs: number;

    @Column()
    type: string;

    @Column({ nullable: true })
    resourceType: string;

    @Column({ nullable: true })
    resourceId: string;

    @Column({ type: 'jsonb', nullable: true })
    metadata: any;

    @CreateDateColumn()
    createdAt: Date;
}