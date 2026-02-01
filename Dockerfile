# === 第一階段：編譯 (Builder) ===
FROM --platform=$BUILDPLATFORM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# === 第二階段：生產環境 (Runner) ===
# 💡 直接寫 FROM 即可，不需要再加 --platform，Docker 會自動匹配 buildx 的參數
FROM node:20-alpine AS runner
WORKDIR /app
COPY --from=builder /app/package*.json ./

# 在此階段安裝生產環境套件 (會自動對應目標架構)
RUN npm install --omit=dev

COPY --from=builder /app/dist ./dist
RUN apk add --no-cache tzdata
ENV TZ=Asia/Taipei
ENV NODE_ENV=production
EXPOSE 3000
CMD ["node", "dist/main"]