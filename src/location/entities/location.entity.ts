import { OfficeType } from "src/office-types/entities/office-type.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

// src/locations/entities/location.entity.ts
@Entity()
export class Location {
    @PrimaryGeneratedColumn()
    id: number;

    // 地點名稱 (i18n) -> 如：台北總公司 (HQ)
    @Column({ type: 'jsonb' })
    name: { [key: string]: string };

    // 公司地址 (i18n) -> 地址通常也需要翻譯
    @Column({ type: 'jsonb', nullable: true })
    address: { [key: string]: string };

    // Google Maps 連結 (不需翻譯)
    @Column({ nullable: true })
    mapUrl: string;

    // 聯絡電話 -> 使用簡單陣列存多支電話
    @Column("text", { array: true, nullable: true })
    phones: string[];

    // 傳真
    @Column({ nullable: true })
    fax: string;

    // 電子信箱
    @Column({ nullable: true })
    email: string;

    // 關聯到辦公室類型
    @ManyToOne(() => OfficeType, (officeType) => officeType.locations)
    officeType: OfficeType;

    @Column()
    sort: number;
}