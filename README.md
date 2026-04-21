# Guangxun Tech Site Backend · 光訊科技 企業官網 Backend

> 以 **NestJS + TypeORM + PostgreSQL** 打造的光訊科技企業官網後端 API，涵蓋產品、地點、支援資源、聯絡表單、即時展示與行為分析等 15 個領域模組。

![NestJS](https://img.shields.io/badge/NestJS-11.x-E0234E?logo=nestjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-336791?logo=postgresql&logoColor=white)
![TypeORM](https://img.shields.io/badge/TypeORM-0.3-FE0902?logo=typeorm&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?logo=docker&logoColor=white)
![Status](https://img.shields.io/badge/status-active-22c55e)

---

## Purpose

Guangxun Tech Site Backend 是 Portfolio 系列中 **「光訊科技企業官網」的後端 API 服務**，負責：

- 提供 **多領域資源** 的 CRUD 與查詢 API（產品 / 地點 / 支援服務 / 聯絡資訊）
- 支援 **多語系 (i18n)** 資料輸出與 **多層分類常數**
- 整合 **AWS S3 檔案上傳** 與 **SendGrid 郵件通知**
- 提供 **即時展示 (Live View)** 頻道與圖庫管理
- 內建 **行為分析埋點攔截器**，為前端提供可觀測性基礎

## Highlights

| | |
|---|---|
| 🧱 架構 | NestJS 11 + Clean-style 分層（module / controller / service / dto / entity） |
| 📦 領域模組 | 15 個 feature module，依 `src/modules/*` 拆分 |
| 🌐 多語系 | 全域 `I18nInterceptor` + `@SkipI18n()` 裝飾器 |
| 📤 檔案上傳 | AWS S3 (`@aws-sdk/client-s3`) |
| ✉️ 郵件通知 | SendGrid SMTP via `@nestjs-modules/mailer` |
| 📊 行為分析 | 自動攔截器 + 手動 `POST /analytics/log` 事件 API |
| 🐳 部署 | Docker Compose 三層架構：Nginx → NestJS → PostgreSQL |
| 🔒 統一回應 | `TransformInterceptor` + `HttpExceptionFilter` 強制包裹 `ApiResponse<T>` |

## Architecture

```
┌────────────────────┐
│      Nginx         │ :80 / :443   （反向代理 / SSL）
└─────────┬──────────┘
          │
          ▼
┌────────────────────┐
│    NestJS API      │ :3000        （/api/v1 前綴）
│  ├─ Interceptors   │              i18n · analytics · transform
│  ├─ Filters        │              HttpException → ApiResponse
│  ├─ Subscribers    │              Audit (TypeORM)
│  └─ Modules (x15)  │              products · live-view · analytics · ...
└─────────┬──────────┘
          │
          ▼
┌────────────────────┐
│    PostgreSQL 15   │ :5432        （TypeORM Migration）
└────────────────────┘

        外部整合：AWS S3（檔案） · SendGrid（信件）
```

## Project Structure

```
src/
├── main.ts                  # 入口（全域前綴 /api/v1、ValidationPipe、CORS）
├── app.module.ts            # 根模組、TypeORM / Mailer / Router 註冊
├── data-source.ts           # Migration CLI 用 DataSource
├── common/
│   ├── filters/             # HttpExceptionFilter
│   ├── interceptors/        # TransformInterceptor（ApiResponse<T>）
│   └── subscribers/         # AuditSubscriber（TypeORM）
├── shared/
│   ├── I18nInterceptor.ts   # i18n 語系切換
│   └── skip-i18n.decorator.ts
├── migrations/              # TypeORM Migration
└── modules/
    ├── products/            # 產品
    ├── product-categories/  # 產品分類
    ├── office-categories/   # 辦公類型分類
    ├── support-categories/  # 支援分類
    ├── supports/            # 支援資源
    ├── location/            # 地點
    ├── contact/             # 聯絡資訊
    ├── contact-form/        # 聯絡表單
    ├── about/               # 品牌 / 歷史
    ├── notification/        # 郵件通知
    ├── storage/             # S3 檔案上傳
    ├── analytics/           # 行為分析
    ├── live-view-channel/   # Live View 頻道
    └── live-view-gallery/   # Live View 圖庫
```

## Runbook

### 1. 本地開發

```bash
# 安裝依賴
npm install

# 建立 .env
cat > .env <<'ENV'
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=admin
DB_PASSWORD=secret_pass
DB_DATABASE=branding_db
ENV

# 啟動開發伺服器（watch mode）
npm run start:dev
# → http://localhost:3000/api/v1
```

### 2. Docker Compose 一鍵啟動

```bash
npm run build
docker-compose up -d --build
# → http://localhost/api/v1
docker-compose logs -f api
docker-compose down
```

### 3. 資料庫 Migration

```bash
npm run migration:generate -- src/migrations/<Name>   # 產生
npm run migration:run                                  # 本地執行
npm run migration:run:prod                             # 生產（Dockerfile 啟動時自動執行）
npm run migration:revert                               # 回滾
```

### 4. 測試與品質

```bash
npm test            # 單元測試
npm run test:e2e    # 端到端
npm run test:cov    # 覆蓋率
npm run lint        # ESLint --fix
npm run format      # Prettier
```

## Interfaces (API Endpoints)

所有路由都以 `/api/v1` 為前綴。

| Module | Route | 說明 |
|---|---|---|
| products | `/products` | 產品資源 CRUD、多語查詢 |
| product-categories | `/constants/products-categories` | 產品分類常數 |
| office-categories | `/constants/office-categories` | 辦公類型分類常數 |
| support-categories | `/constants/support-categories` | 支援資源分類常數 |
| supports | `/support/resources` | 支援資源管理 |
| contact | `/contact` | 聯絡資訊總覽 |
| contact-form | `/contact/form` | 聯絡表單收單、郵件寄送 |
| location | `/contact/locations` | 聯絡地點 |
| about | `/about` | 品牌故事與歷史 |
| storage | `/storage` | AWS S3 檔案上傳 |
| analytics | `/analytics` | 行為事件紀錄 |
| live-view-channel | `/live-view` | 即時展示頻道 |
| live-view-gallery | `/live-view/galleries` | 即時展示圖庫 |

## Dependencies

### Runtime
- `@nestjs/*` 11.x、`typeorm` 0.3、`pg` 8
- `@nestjs-modules/mailer` + `@sendgrid/mail` + `nodemailer`
- `@aws-sdk/client-s3` 3.x
- `class-validator` / `class-transformer`
- `@nestjs/throttler`（速率限制）

### Dev
- `jest` 30、`@nestjs/testing`、`supertest`
- `eslint` 9 + `prettier` 3、`typescript` 5.7
- `ts-node` + `tsconfig-paths`

### Tooling 需求
- Node.js `>= 18`，npm `>= 9`
- Docker & Docker Compose（用於容器化部署）

## Notes

- **生產環境安全**：`app.module.ts` 中 `synchronize` 僅在 `NODE_ENV !== 'production'` 才啟用；部署前請務必確認 `.env` 覆蓋預設 DB 憑證。
- **API 回應格式**：所有回應都經 `TransformInterceptor` 包裹為 `{ statusCode, message, data }`；錯誤由 `HttpExceptionFilter` 統一轉換。
- **i18n**：預設掛載全域 `I18nInterceptor`，如需跳過請在 handler 使用 `@SkipI18n()`。
- **即時展示**：`live-view-channel` 與 `live-view-gallery` 皆掛載於 `/live-view`，於 `feature/build-live-view` 分支中建立。

## Roadmap

- [ ] 完整 API 規格文件化（OpenAPI / Swagger）
- [ ] 引入 JWT 認證與 RBAC 授權
- [ ] 健康檢查 (`/health`) 與 Prometheus (`/metrics`) 端點
- [ ] Redis 快取層
- [ ] E2E 測試覆蓋核心流程

## License

UNLICENSED — Portfolio 專用，保留一切權利。

## Links

- Portfolio: <https://jack755051.github.io/charlie_portfolio_frontend/portfolio>
