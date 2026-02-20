import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddStreamUrlAndFixProduct1771563201978 implements MigrationInterface {
  name = 'AddStreamUrlAndFixProduct1771563201978';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // 1. 補齊 live_view_channels 缺少的 WebRTC 欄位 (不重建表，保住資料)
    await queryRunner.query(
      `ALTER TABLE "live_view_channels" ADD COLUMN IF NOT EXISTS "streamUrl" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "live_view_channels" ADD COLUMN IF NOT EXISTS "provider" character varying NOT NULL DEFAULT 'webrtc'`,
    );

    // 2. 建立分析事件表 (如果還沒有的話)
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "analytic_events" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "sessionId" character varying, "durationMs" integer, "type" character varying NOT NULL, "resourceType" character varying, "resourceId" character varying, "metadata" jsonb, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_24f4cd4afc760e7f1758642cca3" PRIMARY KEY ("id"))`,
    );

    // 3. 聯絡表單更新
    await queryRunner.query(
      `DO $$ BEGIN CREATE TYPE "public"."contact_form_intent_enum" AS ENUM('consult', 'inquiry', 'cooperation', 'repair', 'other', 'appointment'); EXCEPTION WHEN duplicate_object THEN null; END $$;`,
    );
    await queryRunner.query(
      `ALTER TABLE "contact_form" ADD COLUMN IF NOT EXISTS "intent" "public"."contact_form_intent_enum" NOT NULL DEFAULT 'other'`,
    );
    await queryRunner.query(
      `ALTER TABLE "contact_form" ADD COLUMN IF NOT EXISTS "createdBy" character varying NOT NULL DEFAULT 'public'`,
    );
    await queryRunner.query(
      `ALTER TABLE "contact_form" ADD COLUMN IF NOT EXISTS "updatedBy" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "contact_form" ALTER COLUMN "type" SET DEFAULT '{}'`,
    );

    // 4. 產品表資料無損轉型 (使用 USING 語法，防止資料蒸發)
    // 標籤轉型
    await queryRunner.query(
      `ALTER TABLE "product" ALTER COLUMN "tag" TYPE jsonb USING to_jsonb(tag)`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ALTER COLUMN "tag" SET DEFAULT '{"zh":"新品上市","en":"NEW ARRIVAL"}'`,
    );
    // 標題、描述、特色轉型
    await queryRunner.query(
      `ALTER TABLE "product" ALTER COLUMN "title" TYPE jsonb USING to_jsonb(title)`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ALTER COLUMN "description" TYPE jsonb USING to_jsonb(description)`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ALTER COLUMN "features" TYPE jsonb USING to_jsonb(features)`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ALTER COLUMN "features" SET DEFAULT '{"zh":[],"en":[]}'`,
    );

    // 5. 時間戳記修正
    await queryRunner.query(
      `ALTER TABLE "contact_form" DROP COLUMN IF EXISTS "createdAt"`,
    );
    await queryRunner.query(
      `ALTER TABLE "contact_form" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "contact_form" DROP COLUMN IF EXISTS "updatedAt"`,
    );
    await queryRunner.query(
      `ALTER TABLE "contact_form" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // 回滾邏輯：根據需求可以選擇性實作，通常開發階段會手動調整
    await queryRunner.query(
      `ALTER TABLE "live_view_channels" DROP COLUMN "provider"`,
    );
    await queryRunner.query(
      `ALTER TABLE "live_view_channels" DROP COLUMN "streamUrl"`,
    );
  }
}
