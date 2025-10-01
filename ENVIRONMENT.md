# Environment Management System

This directory contains tools and templates for managing environment variables across different deployment environments (development, production, local).

## Directory Structure

- `/.github/workflows`: GitHub Actions workflow files for automated deployments
- `/env-templates`: Template files for different environments
- `/scripts`: Utility scripts for managing environment variables

## Environment Templates

The `/env-templates` directory contains template files for different environments:

- `.env.development.template`: Variables for the development environment
- `.env.production.template`: Variables for the production environment
- `.env.local.template`: Variables for local development
- `.env.secrets.template`: Template for sensitive values that should not be committed

## GitHub Actions Workflows

The following GitHub Actions workflows are available:

- `deploy-development.yml`: Deploys to the development environment with development environment variables
- `deploy-production.yml`: Deploys to the production environment with production environment variables
- `sync-env-variables.yml`: Syncs environment variables between templates and GitHub Secrets

## Scripts

The `/scripts` directory contains utility scripts:

- `generate-env-files.sh` / `generate-env-files.ps1`: Generates environment files from templates
- `sync-env-to-github.sh` / `sync-env-to-github.ps1`: Syncs environment variables to GitHub Secrets

## Usage

### Setting Up Local Environment

1. To create a local development environment:

   ```bash
   # On Linux/macOS
   ./scripts/generate-env-files.sh local
   
   # On Windows
   .\scripts\generate-env-files.ps1 local
   ```

2. Edit the resulting `.env` file to add any missing values.

### Setting Up GitHub Secrets

1. To sync environment variables to GitHub Secrets:

   ```bash
   # On Linux/macOS
   ./scripts/sync-env-to-github.sh development
   ./scripts/sync-env-to-github.sh production
   
   # On Windows
   .\scripts\sync-env-to-github.ps1 development
   .\scripts\sync-env-to-github.ps1 production
   ```

2. For sensitive values, manually add them to GitHub Secrets using the GitHub UI.

### Using GitHub Actions

The GitHub Actions workflows will automatically run on specific branches:

- `deploy-development.yml`: Runs when code is pushed to the `develop` branch
- `deploy-production.yml`: Runs when code is pushed to the `main` or `master` branch, or when a release is published

You can also manually trigger these workflows from the "Actions" tab on GitHub.

## Security Best Practices

1. Never commit actual secret values to version control
2. Use GitHub Secrets for storing sensitive information
3. Validate environment variables before deployment
4. Keep environment templates up to date as the application evolves

## Troubleshooting

- If GitHub Actions workflows fail, check the workflow logs for error messages
- Ensure all required secrets are set up in GitHub repository settings
- For local environment issues, verify that the `.env` file has been properly generated