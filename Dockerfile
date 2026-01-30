# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

# 先複製 package 檔案，利用 Docker layer cache 節省安裝時間
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Production
FROM node:20-alpine AS runner

WORKDIR /app

# 只複製必要的環境設定與編譯後的結果
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# 設定環境變數
ENV NODE_ENV=production

EXPOSE 3000

CMD ["node", "dist/main"]