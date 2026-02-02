// src/location/entities/location.entity.ts
import { OfficeCategory } from "src/modules/office-categories/entities/office-category.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Location {
    // 💡 關鍵：必須指定為 'uuid'，且型別改為 string
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'jsonb' })
    name: { [key: string]: string };

    @Column({ type: 'jsonb', nullable: true })
    address: { [key: string]: string };

    @Column({ nullable: true })
    mapUrl: string;

    @Column("text", { array: true, nullable: true })
    phones: string[];

    @Column({ nullable: true })
    fax: string;

    @Column({ nullable: true })
    email: string;

    @ManyToOne(() => OfficeCategory, (officeType) => officeType.locations)
    officeType: OfficeCategory;

    @Column()
    sort: number;
}