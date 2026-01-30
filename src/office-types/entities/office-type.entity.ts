import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Location } from "../../location/entities/location.entity";

/**
 * 辦公室類型
 */
@Entity()
export class OfficeType {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'jsonb' })
    name: { zh: string; en: string }; // 類別名稱的多國語系

    @OneToMany(() => Location, (location) => location.officeType)
    locations: Location[]; // 一個類別可以有多個地點
}
