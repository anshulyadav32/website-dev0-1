# 🚀 Deployment Guide - Vercel

## 📋 Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **GitHub Repository**: Push your code to GitHub
3. **Environment Variables**: Set up in Vercel dashboard

## 🔧 Step-by-Step Deployment

### 1. **Prepare Your Repository**

```bash
# Make sure all changes are committed
git add .
git commit -m "Add homepage and prepare for Vercel deployment"
git push origin main
```

### 2. **Deploy to Vercel**

#### Option A: Vercel CLI (Recommended)
```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy from your project directory
vercel

# Follow the prompts:
# - Set up and deploy? Y
# - Which scope? (your account)
# - Link to existing project? N
# - Project name: website-dev0-1
# - Directory: ./
# - Override settings? N
```

#### Option B: Vercel Dashboard
1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository
4. Configure build settings

### 3. **Configure Environment Variables**

In Vercel Dashboard → Project Settings → Environment Variables:

```env
# Database
DATABASE_URL=postgresql://neondb_owner:npg_pnr7cEQMU6NT@ep-purple-brook-adrmazp9-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require

# API Configuration
NODE_ENV=production
FRONTEND_URL=https://your-project.vercel.app

# JWT & Session Secrets
JWT_SECRET=your_strong_jwt_secret_here
SESSION_SECRET=your_strong_session_secret_here

# OAuth (Optional)
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
GITHUB_CALLBACK_URL=https://your-project.vercel.app/api/auth/github/callback

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=https://your-project.vercel.app/api/auth/google/callback

# DNS Configuration
DNS_PROVIDER=digitalocean
DNS_API_TOKEN=your_dns_api_token
DOMAIN_NAME=dev0-1.com
OWNER_USERNAME=anshulyadav32

# React App
REACT_APP_API_URL=https://your-project.vercel.app/api
```

### 4. **Build Settings**

Vercel will automatically detect:
- **Framework Preset**: Create React App
- **Build Command**: `npm run build`
- **Output Directory**: `build`
- **Install Command**: `npm install`

### 5. **Database Setup**

```bash
# Generate Prisma client
npx prisma generate

# Deploy database schema
npx prisma db push

# Seed database (optional)
npx prisma db seed
```

### 6. **Custom Domain (Optional)**

1. Go to Project Settings → Domains
2. Add your custom domain: `dev0-1.com`
3. Configure DNS records as instructed by Vercel

## 🔄 Continuous Deployment

Once connected to GitHub:
- Every push to `main` branch triggers automatic deployment
- Preview deployments for pull requests
- Automatic builds and deployments

## 📊 Monitoring

- **Vercel Dashboard**: Monitor deployments and performance
- **Function Logs**: Check serverless function logs
- **Analytics**: Built-in analytics for your app

## 🛠️ Troubleshooting

### Common Issues:

1. **Build Failures**
   ```bash
   # Check build logs in Vercel dashboard
   # Ensure all dependencies are in package.json
   npm install --legacy-peer-deps
   ```

2. **Environment Variables**
   ```bash
   # Make sure all required env vars are set
   # Check for typos in variable names
   ```

3. **Database Connection**
   ```bash
   # Verify DATABASE_URL is correct
   # Check if database allows external connections
   ```

4. **API Routes Not Working**
   ```bash
   # Ensure server/server.js is in the root
   # Check vercel.json configuration
   ```

## 🚀 Production Commands

```bash
# Deploy to production
vercel --prod

# Check deployment status
vercel ls

# View logs
vercel logs

# Remove deployment
vercel remove
```

## 📱 Your Live Application

After deployment, your app will be available at:
- **Vercel URL**: `https://your-project.vercel.app`
- **Custom Domain**: `https://dev0-1.com` (if configured)

## 🎯 Next Steps

1. **Set up monitoring**: Configure error tracking
2. **Performance optimization**: Enable Vercel Analytics
3. **Security**: Set up proper CORS and security headers
4. **Backup**: Regular database backups
5. **SSL**: Automatic SSL with Vercel

---

**Happy Deploying! 🚀**
