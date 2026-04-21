# Migration 使用指南

## 📝 关于 ContactForm Type 字段

`contact_form` 表的 `type` 字段使用 `text[]` 类型（而非 enum），因此：
- ✅ **无需 migration** - 可以接受任何文本值，包括新增的 `appointment`
- ✅ 只需在代码中添加新的 `ContactProductType` 枚举值即可

## 🔧 开发环境

在开发环境中，因为 `synchronize: true`，TypeORM 会自动同步 schema 变更。

**重启开发服务器即可：**
```bash
npm run start:dev
```

TypeORM 会自动检测到 enum 的变化并添加新值。

## 🚀 生产环境（Docker）

在生产环境中，`synchronize: false`，必须手动运行 migration。

### 方法 1: 本地运行 Migration（推荐）

```bash
# 1. 构建项目
npm run build

# 2. 运行 migration
npm run migration:run

# 3. 重新构建 Docker 镜像
docker-compose build

# 4. 重启容器
docker-compose down
docker-compose up -d
```

### 方法 2: 在 Docker 容器内运行

```bash
# 1. 先构建并启动容器
docker-compose build
docker-compose up -d

# 2. 在容器内运行 migration
docker exec -it guangxun-tech-site-backend npm run migration:run:prod

# 3. 重启容器应用更改
docker-compose restart guangxun-tech-site-backend
```

## ✅ 验证 Migration

运行后检查数据库：

```bash
# 连接到 PostgreSQL
docker exec -it guangxun-tech-site-db psql -U guangxun -d branding_db

# 查看 enum 类型的值
\dT+ contact_form_type_enum
```

应该看到以下值：
- appointment ✅ (新增)
- community
- lpr
- dvr
- maintenance
- other

## 🔄 回滚 Migration（如有需要）

```bash
# 本地
npm run migration:revert

# Docker 容器内
docker exec -it guangxun-tech-site-backend npm run typeorm -- migration:revert -d dist/data-source.js
```

## 📊 Migration 历史

查看已运行的 migration：

```bash
# 查看数据库中的 migrations 表
docker exec -it guangxun-tech-site-db psql -U guangxun -d branding_db -c "SELECT * FROM migrations;"
```

## ⚠️ 注意事项

1. **生产环境必须运行 migration**
   - 不要依赖 `synchronize: true`，这会导致不可预测的 schema 变更

2. **备份数据库**
   - 运行 migration 前建议备份生产数据库

3. **测试 Migration**
   - 在开发/测试环境先验证 migration 正确性

4. **Enum 限制**
   - PostgreSQL 不支持直接删除 enum 值
   - 回滚 migration 需要重建 enum 类型（如 down() 方法所示）

## 🎯 完整部署流程

```bash
# 1. 在本地开发环境测试
cd /Users/charlie010583/Desktop/01_private/guangxun-tech-site-backend
npm run start:dev  # 自动同步 schema

# 2. 测试功能正常后，准备生产部署
npm run build

# 3. 运行 migration（连接到生产数据库）
npm run migration:run

# 4. 构建并部署 Docker
docker-compose build
docker-compose down
docker-compose up -d

# 5. 查看日志确认启动成功
docker logs guangxun-tech-site-backend-api-1 -f

# 6. 验证 API
curl http://localhost/api/v1/contact/form
```

## 🔐 环境配置说明

### 本地开发与生产环境

项目使用两个环境文件：

#### `.env` (生产环境)
```bash
DB_HOST=db  # Docker Compose 服务名
# ... 其他配置
```

#### `.env.local` (本地开发)
```bash
DB_HOST=localhost  # 本地数据库
# ... 其他配置（与 .env 相同，但 DB_HOST 不同）
```

### 工作原理

**src/data-source.ts:6-14** - 优先加载 `.env.local`：
```typescript
const envLocalPath = resolve(process.cwd(), '.env.local');
if (existsSync(envLocalPath)) {
  console.log('📝 Loading .env.local for local development');
  config({ path: envLocalPath });
} else {
  console.log('📝 Loading .env for production');
  config();
}
```

**docker-compose.yml:22-25** - Docker 使用 `.env`：
```yaml
api:
  env_file:
    - .env  # 加载所有环境变量
  environment:
    - NODE_ENV=production
```

### 运行 Migration 的正确方式

| 环境 | 命令 | 使用的配置 |
|------|------|----------|
| **本地开发** | `npm run migration:run` | `.env.local` (localhost) |
| **生产环境（Docker）** | `docker exec guangxun-tech-site-backend-api-1 npm run migration:run:prod` | `.env` (db) |

### 重要提示

1. **`.env.local` 不会被提交到 Git**（已在 `.gitignore`）
2. **服务器上只需要 `.env` 文件**
3. **本地开发时必须创建 `.env.local`** 才能运行 migration
