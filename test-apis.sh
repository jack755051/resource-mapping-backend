#!/bin/bash

# ========================================
# API 端点测试脚本
# ========================================

# 设置 API 基础 URL
API_BASE="https://guangxun.net/api/v1"
# 如果在本地测试，使用：
# API_BASE="http://localhost:3000/api/v1"

echo "🔍 开始测试所有 API 端点..."
echo "API 基础 URL: $API_BASE"
echo ""

# 颜色代码
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 测试函数
test_api() {
    local method=$1
    local endpoint=$2
    local description=$3
    local data=$4

    echo -n "测试 $method $endpoint - $description ... "

    if [ "$method" == "GET" ]; then
        response=$(curl -s -o /dev/null -w "%{http_code}" "$API_BASE$endpoint")
    else
        response=$(curl -s -o /dev/null -w "%{http_code}" -X "$method" "$API_BASE$endpoint" \
            -H "Content-Type: application/json" \
            -d "$data")
    fi

    if [ "$response" == "200" ] || [ "$response" == "304" ]; then
        echo -e "${GREEN}✅ 成功 ($response)${NC}"
    elif [ "$response" == "404" ]; then
        echo -e "${RED}❌ 失败 (404 Not Found)${NC}"
    elif [ "$response" == "500" ]; then
        echo -e "${RED}❌ 失败 (500 Internal Server Error)${NC}"
    else
        echo -e "${YELLOW}⚠️  未知状态 ($response)${NC}"
    fi
}

# ========================================
# 开始测试
# ========================================

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "1️⃣  产品相关 API"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
test_api "GET" "/products?page=1&limit=12" "获取产品列表"
test_api "GET" "/constants/products-categories" "获取产品分类"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "2️⃣  联系相关 API"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
test_api "GET" "/contact/locations" "获取办公地点"
# test_api "POST" "/contact/form" "提交联系表单" '{"name":"测试","email":"test@example.com","message":"测试消息"}'

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "3️⃣  关于我们 API"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
test_api "GET" "/about/history" "获取公司历史"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "4️⃣  支持相关 API"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
test_api "GET" "/support/categories" "获取支持分类"
test_api "GET" "/support/resources?page=1&limit=10" "获取支持资源"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ 测试完成！"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "💡 提示："
echo "  - ✅ 绿色：API 正常工作"
echo "  - ❌ 红色：API 有问题，需要检查"
echo "  - ⚠️  黄色：需要进一步确认"
echo ""
echo "📝 如果看到很多 404 错误，请确保："
echo "  1. 后端已经重新构建并部署"
echo "  2. 数据库连接正常"
echo "  3. 所有路由修改已生效"
