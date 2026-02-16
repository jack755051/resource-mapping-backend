import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateSchema1771225734169 implements MigrationInterface {
    name = 'UpdateSchema1771225734169'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // 只添加新的 YouTube 欄位到現有的 live_view_channels 表
        await queryRunner.query(`ALTER TABLE "live_view_channels" ADD "youtubeChannelId" character varying`);
        await queryRunner.query(`ALTER TABLE "live_view_channels" ADD "youtubeVideoId" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // 移除 YouTube 欄位
        await queryRunner.query(`ALTER TABLE "live_view_channels" DROP COLUMN "youtubeVideoId"`);
        await queryRunner.query(`ALTER TABLE "live_view_channels" DROP COLUMN "youtubeChannelId"`);
    }

}
