import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateSchema1771197821707 implements MigrationInterface {
    name = 'UpdateSchema1771197821707'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // 只創建新的 live_view 表
        await queryRunner.query(`CREATE TABLE "live_view_galleries" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "mainImage" character varying NOT NULL, "imageUrls" text array NOT NULL, "title" character varying NOT NULL, "subtitle" character varying NOT NULL, "tag" character varying NOT NULL, "sort" integer NOT NULL DEFAULT '0', "isActive" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_610c30b6f020828ed11745ec1c9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "live_view_channels" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying, "isActive" boolean NOT NULL DEFAULT true, "sort" integer NOT NULL DEFAULT '0', "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_8af7954cbac2fc4a2524d6634f1" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // 刪除 live_view 表
        await queryRunner.query(`DROP TABLE "live_view_channels"`);
        await queryRunner.query(`DROP TABLE "live_view_galleries"`);
    }

}
