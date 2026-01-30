#!/bin/bash

# 設置錯誤即停止
set -e

echo "🚀 [1/3] 正在編譯 NestJS 項目 (TS -> JS)..."
npm run build

echo "🛑 [2/3] 正在停止當前的 Docker 容器..."
docker-compose down

echo "🏗️  [3/3] 正在重新構建並啟動 Docker 容器..."
docker-compose up -d --build

echo "🎉 [DONE] 所有服務已更新並在背景執行中！"