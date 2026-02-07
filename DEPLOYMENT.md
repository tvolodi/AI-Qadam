# Deployment Guide for Hetzner

## Prerequisites
- Hetzner server with nginx and Docker installed
- Domain: ai-dala.com with DNS configured
- SSL certificates from Cloudflare

## Step 1: Add DNS Record

In Cloudflare, add an A record for the subdomain:
- **Type**: A
- **Name**: `ai-qadam` (or your preferred subdomain)
- **Content**: `91.98.28.126` (your server IP)
- **Proxy status**: Proxied
- **TTL**: Auto

## Step 2: Prepare Server Directories

SSH into your Hetzner server:

```bash
ssh root@91.98.28.126
```

Create project directory:

```bash
mkdir -p /var/www/ai-qadam
cd /var/www/ai-qadam
```

## Step 3: Upload Project Files

From your local machine, upload the project:

```bash
# Option 1: Using SCP (from your local machine)
scp -r C:\Users\tvolo\dev\AI-Qadam root@91.98.28.126:/var/www/ai-qadam/

# Option 2: Using rsync (better for updates)
rsync -avz --exclude 'node_modules' --exclude '.next' --exclude '.git' C:\Users\tvolo\dev\AI-Qadam/ root@91.98.28.126:/var/www/ai-qadam/

# Option 3: Using Git (recommended)
# On server:
cd /var/www/ai-qadam
git clone <your-repo-url> .
```

## Step 4: Configure Environment

On the server, create `.env` file:

```bash
cd /var/www/ai-qadam
nano .env
```

Add these variables:

```env
DATABASE_URL="postgresql://aiuser:securepassword@postgres:5432/ai_qadam?schema=public"
NODE_ENV=production
```

## Step 5: Configure nginx

Copy the nginx configuration:

```bash
# Upload the config file
scp C:\Users\tvolo\dev\AI-Qadam\nginx-ai-qadam.conf root@91.98.28.126:/etc/nginx/sites-available/ai-qadam.conf

# Enable the site
ln -s /etc/nginx/sites-available/ai-qadam.conf /etc/nginx/sites-enabled/ai-qadam.conf

# Test configuration
nginx -t

# Reload nginx
systemctl reload nginx
```

## Step 6: Deploy with Docker Compose

On the server:

```bash
cd /var/www/ai-qadam

# Build and start services
docker-compose up -d --build

# Check logs
docker-compose logs -f app

# Verify containers are running
docker-compose ps
```

## Step 7: Initialize Database

Run Prisma migrations:

```bash
docker-compose exec app npx prisma migrate deploy
docker-compose exec app npx prisma db seed  # If you have seed data
```

## Step 8: Verify Deployment

1. Visit: `https://ai-qadam.ai-dala.com`
2. Check all pages load correctly
3. Test language switching (EN, RU, UZ, KY, TG)
4. Test theme switching (Mermaidcore, Frost, Stark, Thermal Glow)

## Management Commands

### View logs
```bash
docker-compose logs -f app        # App logs
docker-compose logs -f postgres   # Database logs
```

### Restart services
```bash
docker-compose restart app        # Restart app only
docker-compose restart            # Restart all
```

### Update deployment
```bash
git pull                          # Pull latest code
docker-compose up -d --build      # Rebuild and restart
docker-compose exec app npx prisma migrate deploy  # Run migrations
```

### Stop services
```bash
docker-compose down               # Stop all services
docker-compose down -v            # Stop and remove volumes (⚠️ deletes data)
```

### Database backup
```bash
docker-compose exec postgres pg_dump -U aiuser ai_qadam > backup_$(date +%Y%m%d).sql
```

### Database restore
```bash
cat backup_20260207.sql | docker-compose exec -T postgres psql -U aiuser ai_qadam
```

## Troubleshooting

### Port 3000 already in use
```bash
# Find process using port 3000
lsof -i :3000
# Or
netstat -tuln | grep 3000

# Kill the process
kill -9 <PID>
```

### Docker permission issues
```bash
# Add user to docker group
usermod -aG docker $USER
newgrp docker
```

### nginx 502 Bad Gateway
```bash
# Check if app is running
docker-compose ps

# Check app logs
docker-compose logs app

# Restart app
docker-compose restart app
```

### Database connection issues
```bash
# Check postgres is running
docker-compose ps postgres

# Check DATABASE_URL in .env
cat .env

# Test connection
docker-compose exec postgres psql -U aiuser -d ai_qadam -c "SELECT 1;"
```

## Alternative: Deploy Without Docker

If you prefer not to use Docker:

### 1. Install dependencies on server
```bash
cd /var/www/ai-qadam
npm install --production
```

### 2. Build the app
```bash
npm run build
```

### 3. Set up PostgreSQL database
```bash
sudo -u postgres psql
CREATE DATABASE ai_qadam;
CREATE USER aiuser WITH PASSWORD 'securepassword';
GRANT ALL PRIVILEGES ON DATABASE ai_qadam TO aiuser;
\q
```

### 4. Update .env
```env
DATABASE_URL="postgresql://aiuser:securepassword@localhost:5432/ai_qadam?schema=public"
NODE_ENV=production
```

### 5. Run migrations
```bash
npx prisma migrate deploy
```

### 6. Start with PM2
```bash
npm install -g pm2
pm2 start npm --name "ai-qadam" -- start
pm2 save
pm2 startup
```

### 7. Manage with PM2
```bash
pm2 status           # Check status
pm2 logs ai-qadam    # View logs
pm2 restart ai-qadam # Restart app
pm2 stop ai-qadam    # Stop app
```

## Security Best Practices

1. **Change default passwords** in `.env`
2. **Enable firewall**:
   ```bash
   ufw allow 22    # SSH
   ufw allow 80    # HTTP
   ufw allow 443   # HTTPS
   ufw enable
   ```
3. **Set up automatic updates**:
   ```bash
   apt install unattended-upgrades
   dpkg-reconfigure -plow unattended-upgrades
   ```
4. **Regular backups** of database and .env file
5. **Monitor logs** regularly

## Next Steps

- Set up monitoring (Uptime Robot, Pingdom)
- Configure email notifications for errors
- Set up automated backups
- Add CI/CD pipeline (GitHub Actions)
- Configure rate limiting in nginx
- Set up log rotation
