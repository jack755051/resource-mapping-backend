import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateSchema1770543035033 implements MigrationInterface {
    name = 'UpdateSchema1770543035033'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "analytic_events" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "sessionId" character varying, "durationMs" integer, "type" character varying NOT NULL, "resourceType" character varying, "resourceId" character varying, "metadata" jsonb, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_24f4cd4afc760e7f1758642cca3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."contact_form_intent_enum" AS ENUM('consult', 'inquiry', 'cooperation', 'repair', 'other', 'appointment')`);
        await queryRunner.query(`ALTER TABLE "contact_form" ADD "intent" "public"."contact_form_intent_enum" NOT NULL DEFAULT 'other'`);
        await queryRunner.query(`ALTER TABLE "contact_form" ADD "createdBy" character varying NOT NULL DEFAULT 'public'`);
        await queryRunner.query(`ALTER TABLE "contact_form" ADD "updatedBy" character varying`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "tag"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "tag" jsonb NOT NULL DEFAULT '{"zh":"新品上市","en":"NEW ARRIVAL"}'`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "title"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "title" jsonb NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "description" jsonb NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "features"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "features" jsonb NOT NULL DEFAULT '{"zh":[],"en":[]}'`);
        await queryRunner.query(`ALTER TABLE "contact_form" ALTER COLUMN "type" SET DEFAULT '{}'`);
        await queryRunner.query(`ALTER TABLE "contact_form" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "contact_form" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "contact_form" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "contact_form" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contact_form" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "contact_form" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "contact_form" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "contact_form" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "contact_form" ALTER COLUMN "type" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "features"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "features" text array NOT NULL DEFAULT '{}'`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "description" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "title"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "title" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "tag"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "tag" character varying NOT NULL DEFAULT 'NEW ARRIVAL'`);
        await queryRunner.query(`ALTER TABLE "contact_form" DROP COLUMN "updatedBy"`);
        await queryRunner.query(`ALTER TABLE "contact_form" DROP COLUMN "createdBy"`);
        await queryRunner.query(`ALTER TABLE "contact_form" DROP COLUMN "intent"`);
        await queryRunner.query(`DROP TYPE "public"."contact_form_intent_enum"`);
        await queryRunner.query(`DROP TABLE "analytic_events"`);
    }

}
