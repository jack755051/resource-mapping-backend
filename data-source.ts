// data-source.ts
import { DataSource } from 'typeorm';
import { config } from 'dotenv';

// 💡 載入 .env 檔案中的環境變數
config();

export const AppDataSource = new DataSource({
    type: 'postgres',
    // 💡 這裡填 localhost 是因為你透過 DataGrip 建立了 SSH 隧道映射到 5433
    host: 'localhost',
    port: 5433,
    username: process.env.DB_USERNAME || 'admin',
    password: process.env.DB_PASSWORD || 'secret_pass',
    database: process.env.DB_DATABASE || 'branding_db',
    synchronize: false, // 💡 生產環境務必為 false
    logging: true,
    // 💡 自動掃描所有模組下的實體
    entities: ['src/modules/**/entities/*.entity.{ts,js}'],
    // 💡 遷移檔案存放位置
    migrations: ['src/migrations/*.{ts,js}'],
});