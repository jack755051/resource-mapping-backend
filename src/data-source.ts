import { DataSource } from 'typeorm';
import { config } from 'dotenv';

config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  // 💡 host 優先讀取環境變數 "db" (Docker 服務名)，本地開發則用 localhost
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT!) || 5432, // Docker 內部預設是 5432
  username: process.env.DB_USERNAME || 'admin',
  password: process.env.DB_PASSWORD || 'secret_pass',
  database: process.env.DB_DATABASE || 'branding_db',
  synchronize: false,
  logging: true,
  // 💡 使用 __dirname 可以確保無論在 src 還是 dist 資料夾，路徑都能正確對接
  entities: [__dirname + '/modules/**/entities/*.entity.{ts,js}'],
  migrations: [__dirname + '/migrations/*.{ts,js}'],
});
