# Vercel Deployment Guide

This guide will help you set up and manage deployments to Vercel for your project.

## Initial Setup

1. Install Vercel CLI (already done as a development dependency):
   ```bash
   # Run this command to use Vercel CLI
   npm run vercel
   ```

2. Link your project to a Vercel project:
   ```bash
   npm run vercel link
   ```

3. Set up environment variables:
   ```bash
   # Add a new secret
   npm run vercel env add
   
   # Add environment variables from a file
   npm run vercel env pull
   ```

## Deployment

### Manual Deployment

To deploy manually:

```bash
# Deploy to preview environment
npm run deploy

# Deploy to production
npm run deploy -- --prod
```

### Automatic Deployment

The project is configured for automatic deployment through GitHub Actions:

1. Push to `develop` branch → Deploys to preview environment
2. Push to `main` or `master` branch → Deploys to production environment
3. Create a new release → Deploys to production environment

## Required Secrets

For GitHub Actions to deploy to Vercel, you need to add these secrets:

1. `VERCEL_TOKEN`: Your Vercel API token
2. `VERCEL_ORG_ID`: Your Vercel organization ID
3. `VERCEL_PROJECT_ID`: Your Vercel project ID

To find these values:

```bash
# Get your token
npm run vercel tokens create

# Get your project and org ID (after linking your project)
npm run vercel project ls
```

## Configuration

The project includes a `vercel.json` file that configures:

1. Build settings
2. Output directory
3. Routing rules
4. Framework detection

You can modify this file to customize your Vercel deployment.

## Environment Variables

Environment variables for Vercel deployments are managed in two ways:

1. Through the Vercel dashboard (recommended for secrets)
2. Using the `.env.production.vercel` template (for non-sensitive values)

To sync environment variables:

```bash
# Pull environment variables from Vercel
npm run vercel env pull

# Push environment variables to Vercel
# Note: Use the Vercel dashboard for this
```

## Monitoring Deployments

To check your deployment status:

```bash
npm run vercel ls
```

To view deployment details:

```bash
npm run vercel inspect
```