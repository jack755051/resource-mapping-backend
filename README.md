# Resource Mapping Backend

基於 NestJS 的資源映射系統後端 API，提供產品、地點、聯絡等資源的管理功能。

## 技術棧

- **框架**: NestJS 11.x
- **語言**: TypeScript
- **資料庫**: PostgreSQL 15
- **ORM**: TypeORM
- **容器化**: Docker & Docker Compose
- **反向代理**: Nginx

## 專案結構

```
src/
├── products/           # 產品模組
├── location/          # 地點模組
├── office-types/      # 辦公室類型模組
├── conact/            # 聯絡模組
├── constant/          # 常數模組
├── shared/            # 共享模組
├── app.module.ts      # 根模組
└── main.ts            # 應用程式入口
```

## 環境要求

- Node.js >= 18.x
- npm >= 9.x
- Docker & Docker Compose（用於容器化部署）

## 快速開始

### 本地開發

1. **安裝依賴**
   ```bash
   npm install
   ```

2. **設定環境變數**

   創建 `.env` 文件：
   ```env
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=admin
   DB_PASSWORD=secret_pass
   DB_DATABASE=branding_db
   ```

3. **啟動開發伺服器**
   ```bash
   # 開發模式（自動重載）
   npm run start:dev

   # 正常模式
   npm run start
   ```

   API 將在 `http://localhost:3000` 運行

### Docker 部署

1. **構建並啟動容器**
   ```bash
   # 構建應用程式
   npm run build

   # 啟動所有服務
   docker-compose up -d --build
   ```

2. **訪問服務**
   - API: `http://localhost/api/v1`
   - 資料庫: `localhost:5432`

3. **查看日誌**
   ```bash
   docker-compose logs -f api
   ```

4. **停止服務**
   ```bash
   docker-compose down
   ```

## API 端點

所有 API 端點都以 `/api/v1` 為前綴。

### 基礎端點

- `GET /api/v1` - 健康檢查
- `GET /api/v1/products` - 獲取產品列表

更多端點文檔請參考各模組的控制器文件。

## 開發指令

```bash
# 開發
npm run start:dev        # 啟動開發伺服器（監聽模式）
npm run start:debug      # 啟動偵錯模式

# 構建
npm run build           # 編譯 TypeScript 到 dist/

# 代碼品質
npm run lint            # 執行 ESLint
npm run format          # 格式化代碼

# 測試
npm run test            # 單元測試
npm run test:e2e        # 端到端測試
npm run test:cov        # 測試覆蓋率
```

## Docker 服務架構

```
┌─────────────────┐
│     Nginx       │ :80, :443
│  (反向代理)      │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   NestJS API    │ :3000
│  (應用伺服器)    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   PostgreSQL    │ :5432
│   (資料庫)       │
└─────────────────┘
```

## 資料庫

### 連線設定

專案使用 TypeORM 連接 PostgreSQL 資料庫。配置詳見 `app.module.ts` 中的 TypeORM 設定。

### 預設憑證（開發環境）

- **使用者**: admin
- **密碼**: secret_pass
- **資料庫**: branding_db
- **埠號**: 5432

**⚠️ 生產環境請務必修改預設密碼**

## 故障排除

### API 返回 404

如果訪問 `/api/v1` 返回 404，請確保：

1. 已執行 `npm run build` 重新編譯
2. 重啟 Docker 容器：
   ```bash
   docker-compose down
   docker-compose up -d --build
   ```

### 資料庫連線失敗

檢查：
1. PostgreSQL 容器是否正常運行：`docker-compose ps`
2. 環境變數設定是否正確
3. 資料庫健康檢查：`docker-compose logs db`

## 貢獻指南

1. Fork 本專案
2. 創建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交變更 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 開啟 Pull Request

## 授權

本專案採用 UNLICENSED 授權。

## 相關資源

- [NestJS 官方文檔](https://docs.nestjs.com)
- [TypeORM 文檔](https://typeorm.io)
- [PostgreSQL 文檔](https://www.postgresql.org/docs/)
