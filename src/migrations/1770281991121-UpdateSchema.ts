import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateSchema1770281991121 implements MigrationInterface {
  name = 'UpdateSchema1770281991121';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "product" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "tag" character varying NOT NULL DEFAULT 'NEW ARRIVAL', "slug" character varying NOT NULL, "title" character varying NOT NULL, "image" character varying NOT NULL, "href" character varying, "model" character varying NOT NULL, "tags" text array NOT NULL DEFAULT '{}', "specs" jsonb, "description" text NOT NULL, "features" text array NOT NULL DEFAULT '{}', "images" text array NOT NULL DEFAULT '{}', "downloads" jsonb, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "categoryId" uuid, CONSTRAINT "UQ_8cfaf4a1e80806d58e3dbe69224" UNIQUE ("slug"), CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD CONSTRAINT "FK_ff0c0301a95e517153df97f6812" FOREIGN KEY ("categoryId") REFERENCES "product_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product" DROP CONSTRAINT "FK_ff0c0301a95e517153df97f6812"`,
    );
    await queryRunner.query(`DROP TABLE "product"`);
  }
}
