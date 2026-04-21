#!/bin/bash

echo "🧪 Testing Analytics API..."
echo ""

# 設定 API 基礎 URL
API_URL="http://localhost:3000/api/v1"

# 測試 1: 訪問產品列表
echo "1️⃣ Testing GET /products (should track PRODUCT_LIST)"
curl -X GET "${API_URL}/products" \
  -H "x-session-id: test-session-123" \
  -H "user-agent: Mozilla/5.0" \
  -s | jq '.' || echo "Failed"
echo ""
echo ""

# 測試 2: 訪問單個產品
echo "2️⃣ Testing GET /products/:id (should track PRODUCT_VIEW)"
# 先獲取一個產品 ID
PRODUCT_ID=$(curl -s "${API_URL}/products" | jq -r '.data[0].id' 2>/dev/null)

if [ -n "$PRODUCT_ID" ] && [ "$PRODUCT_ID" != "null" ]; then
  echo "Found product ID: $PRODUCT_ID"
  curl -X GET "${API_URL}/products/${PRODUCT_ID}" \
    -H "x-session-id: test-session-456" \
    -H "user-agent: Mozilla/5.0" \
    -s | jq '.' || echo "Failed"
else
  echo "No products found, creating a test product first..."
  # 創建測試產品
  curl -X POST "${API_URL}/products" \
    -H "Content-Type: application/json" \
    -d '{
      "nameZh": "測試產品",
      "nameEn": "Test Product",
      "slug": "test-product-analytics",
      "categoryId": "1"
    }' -s | jq '.'

  # 重新獲取產品 ID
  PRODUCT_ID=$(curl -s "${API_URL}/products" | jq -r '.data[0].id' 2>/dev/null)

  if [ -n "$PRODUCT_ID" ] && [ "$PRODUCT_ID" != "null" ]; then
    echo "Accessing product: $PRODUCT_ID"
    curl -X GET "${API_URL}/products/${PRODUCT_ID}" \
      -H "x-session-id: test-session-456" \
      -H "user-agent: Mozilla/5.0" \
      -s | jq '.'
  fi
fi
echo ""
echo ""

# 測試 3: 手動記錄事件
echo "3️⃣ Testing POST /analytics/log (manual event logging)"
curl -X POST "${API_URL}/analytics/log" \
  -H "Content-Type: application/json" \
  -H "x-session-id: test-session-789" \
  -H "user-agent: Mozilla/5.0" \
  -d '{
    "type": "BUTTON_CLICK",
    "resourceType": "product",
    "resourceId": "test-product-123",
    "metadata": {
      "button": "add-to-cart",
      "timestamp": "'$(date -u +%Y-%m-%dT%H:%M:%SZ)'"
    }
  }' \
  -s | jq '.' || echo "Failed"
echo ""
echo ""

echo "✅ Tests completed!"
echo ""
echo "📊 Check the analytics data in PostgreSQL:"
echo "docker exec -it guangxun-tech-site-db psql -U guangxun -d branding_db -c 'SELECT * FROM analytic_events ORDER BY \"createdAt\" DESC LIMIT 10;'"
