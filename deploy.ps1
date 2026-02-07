# Quick Deployment Script for Windows (PowerShell)
# Run this from your local machine to deploy to Hetzner

$SERVER_IP = "91.98.28.126"
$SERVER_USER = "root"
$PROJECT_DIR = "/var/www/ai-qadam"
$LOCAL_DIR = "C:\Users\tvolo\dev\AI-Qadam"

Write-Host "🚀 AI-Qadam Deployment Script" -ForegroundColor Cyan
Write-Host "==============================" -ForegroundColor Cyan

# Check if plink/pscp are available (PuTTY tools)
$usePuTTY = Get-Command pscp -ErrorAction SilentlyContinue

if ($usePuTTY) {
    # Using PuTTY tools (pscp)
    Write-Host ""
    Write-Host "📤 Uploading files to server..." -ForegroundColor Yellow
    
    # Create tar archive locally
    Write-Host "Creating archive..." -ForegroundColor Yellow
    $archiveName = "ai-qadam-$(Get-Date -Format 'yyyyMMdd-HHmmss').tar.gz"
    tar -czf $archiveName `
        --exclude='node_modules' `
        --exclude='.next' `
        --exclude='.git' `
        --exclude='*.log' `
        -C $LOCAL_DIR .
    
    # Upload archive
    pscp -batch $archiveName "${SERVER_USER}@${SERVER_IP}:/tmp/"
    
    # Extract on server and deploy
    plink -batch "${SERVER_USER}@${SERVER_IP}" @"
cd /var/www
mkdir -p ai-qadam
cd ai-qadam
tar -xzf /tmp/$archiveName
rm /tmp/$archiveName

# Check .env
if [ ! -f .env ]; then
    echo '⚠️  Creating .env from example...'
    cp .env.example .env
    echo '⚠️  Please edit /var/www/ai-qadam/.env'
fi

# Deploy
echo '🐳 Starting Docker services...'
docker-compose up -d --build
sleep 10
docker-compose exec -T app npx prisma migrate deploy
echo '✅ Deployment complete!'
"@
    
    Remove-Item $archiveName
    
} else {
    # Alternative: Manual instructions
    Write-Host ""
    Write-Host "⚠️  pscp/plink not found. Please install PuTTY or use manual upload." -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Option 1: Install PuTTY tools (includes pscp)" -ForegroundColor Cyan
    Write-Host "  Download from: https://www.putty.org/" -ForegroundColor Gray
    Write-Host ""
    Write-Host "Option 2: Use WinSCP (GUI file transfer)" -ForegroundColor Cyan
    Write-Host "  1. Install WinSCP: https://winscp.net/" -ForegroundColor Gray
    Write-Host "  2. Connect to $SERVER_IP as $SERVER_USER" -ForegroundColor Gray
    Write-Host "  3. Upload files to $PROJECT_DIR" -ForegroundColor Gray
    Write-Host "  4. Open terminal in WinSCP and run:" -ForegroundColor Gray
    Write-Host "     cd /var/www/ai-qadam && docker-compose up -d --build" -ForegroundColor Gray
    Write-Host ""
    Write-Host "Option 3: Use Git" -ForegroundColor Cyan
    Write-Host "  1. Push your code to GitHub/GitLab" -ForegroundColor Gray
    Write-Host "  2. SSH to server and run:" -ForegroundColor Gray
    Write-Host "     cd /var/www/ai-qadam && git pull && docker-compose up -d --build" -ForegroundColor Gray
    Write-Host ""
    exit
}

Write-Host ""
Write-Host "✨ Deployment finished!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Add DNS record in Cloudflare: ai-qadam.ai-dala.com → $SERVER_IP" -ForegroundColor White
Write-Host "2. Configure nginx (upload nginx-ai-qadam.conf)" -ForegroundColor White
Write-Host "3. Restart nginx: systemctl reload nginx" -ForegroundColor White
Write-Host "4. Visit: https://ai-qadam.ai-dala.com" -ForegroundColor White
Write-Host ""
Write-Host "📊 Check status: ssh $SERVER_USER@$SERVER_IP 'cd $PROJECT_DIR && docker-compose ps'" -ForegroundColor Gray
Write-Host "📝 View logs: ssh $SERVER_USER@$SERVER_IP 'cd $PROJECT_DIR && docker-compose logs -f'" -ForegroundColor Gray
