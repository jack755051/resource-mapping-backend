# === 第一階段：編譯 (Builder) ===
FROM --platform=$BUILDPLATFORM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# === 第二階段：Runner ===
FROM node:20-alpine AS runner
WORKDIR /app

COPY --from=builder /app/package*.json ./
# 只安裝必要套件，減減輕量
RUN npm install --omit=dev

# 💡 關鍵：複製整個 dist，包含編譯後的 data-source.js
COPY --from=builder /app/dist ./dist

RUN apk add --no-cache tzdata
ENV TZ=Asia/Taipei
ENV NODE_ENV=production

# 💡 直接跑編譯好的 js 檔案，不需要 ts-node
CMD ["sh", "-c", "npx typeorm migration:run -d dist/data-source.js && node dist/main"]