#!/bin/bash
# Quick deployment script for AI-Qadam to Hetzner

set -e  # Exit on error

SERVER_IP="91.98.28.126"
SERVER_USER="root"
PROJECT_DIR="/var/www/ai-qadam"
LOCAL_DIR="."

echo "🚀 AI-Qadam Deployment Script"
echo "=============================="

# Check if rsync is available
if ! command -v rsync &> /dev/null; then
    echo "❌ rsync not found. Please install rsync first."
    exit 1
fi

# 1. Upload files
echo ""
echo "📤 Uploading files to server..."
rsync -avz --progress \
    --exclude 'node_modules' \
    --exclude '.next' \
    --exclude '.git' \
    --exclude 'build.log' \
    --exclude '*.log' \
    "$LOCAL_DIR/" "$SERVER_USER@$SERVER_IP:$PROJECT_DIR/"

echo "✅ Files uploaded"

# 2. Deploy on server
echo ""
echo "🔧 Deploying on server..."
ssh "$SERVER_USER@$SERVER_IP" << 'ENDSSH'
cd /var/www/ai-qadam

# Check if .env exists
if [ ! -f .env ]; then
    echo "⚠️  .env file not found. Creating from example..."
    cp .env.example .env
    echo "⚠️  Please edit /var/www/ai-qadam/.env with your production values"
fi

# Build and start
echo "🐳 Starting Docker services..."
docker-compose up -d --build

# Wait for services to be ready
echo "⏳ Waiting for services to start..."
sleep 10

# Run migrations
echo "🗄️  Running database migrations..."
docker-compose exec -T app npx prisma migrate deploy

echo "✅ Deployment complete!"
echo ""
echo "🌐 Your site should be available at:"
echo "   https://ai-qadam.ai-dala.com"
echo ""
echo "📊 Check status: docker-compose ps"
echo "📝 View logs:    docker-compose logs -f app"
ENDSSH

echo ""
echo "✨ Deployment finished!"
echo ""
echo "Next steps:"
echo "1. Add DNS record: ai-qadam.ai-dala.com → $SERVER_IP"
echo "2. Configure nginx (see DEPLOYMENT.md)"
echo "3. Visit your site!"
