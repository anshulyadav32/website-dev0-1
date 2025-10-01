#!/bin/bash

# Script to sync environment variables to GitHub Secrets
# Usage: ./sync-env-to-github.sh [development|production|local]

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
NC='\033[0m' # No Color

# Check if gh CLI is installed
if ! command -v gh &> /dev/null; then
    echo -e "${RED}Error: GitHub CLI (gh) is not installed. Please install it first.${NC}"
    echo "Visit https://cli.github.com/ for installation instructions."
    exit 1
fi

# Check if user is authenticated with GitHub
if ! gh auth status &> /dev/null; then
    echo -e "${RED}Error: You are not authenticated with GitHub CLI.${NC}"
    echo "Please run 'gh auth login' first."
    exit 1
fi

# Get repository information
REPO_NAME=$(basename -s .git `git config --get remote.origin.url`)
if [ -z "$REPO_NAME" ]; then
    echo -e "${RED}Error: Could not determine repository name.${NC}"
    exit 1
fi

# Determine which environment to sync
ENV_TYPE="$1"
if [ -z "$ENV_TYPE" ]; then
    echo -e "${YELLOW}No environment specified, defaulting to 'development'${NC}"
    ENV_TYPE="development"
fi

# Validate environment type
if [ "$ENV_TYPE" != "development" ] && [ "$ENV_TYPE" != "production" ] && [ "$ENV_TYPE" != "local" ]; then
    echo -e "${RED}Error: Invalid environment type.${NC}"
    echo "Usage: ./sync-env-to-github.sh [development|production|local]"
    exit 1
fi

# Define the env file to use
ENV_FILE="./env-templates/.env.${ENV_TYPE}.template"
if [ ! -f "$ENV_FILE" ]; then
    echo -e "${RED}Error: Environment file '$ENV_FILE' not found.${NC}"
    exit 1
fi

# Define the secrets file
SECRETS_FILE="./env-templates/.env.secrets.template"
if [ ! -f "$SECRETS_FILE" ]; then
    echo -e "${YELLOW}Warning: Secrets template file '$SECRETS_FILE' not found.${NC}"
fi

# Set prefix for GitHub secrets based on environment
if [ "$ENV_TYPE" == "development" ]; then
    SECRET_PREFIX="DEV_"
elif [ "$ENV_TYPE" == "production" ]; then
    SECRET_PREFIX="PROD_"
else
    SECRET_PREFIX="LOCAL_"
fi

echo -e "${GREEN}Starting to sync $ENV_TYPE environment variables to GitHub Secrets...${NC}"

# Process environment file
echo -e "${YELLOW}Processing $ENV_FILE...${NC}"
while IFS= read -r line || [[ -n "$line" ]]; do
    # Skip comments and empty lines
    if [[ "$line" =~ ^\s*# ]] || [[ -z "$line" ]]; then
        continue
    fi
    
    # Extract variable name and value
    if [[ "$line" =~ ^([A-Za-z0-9_]+)=(.*)$ ]]; then
        VAR_NAME="${BASH_REMATCH[1]}"
        VAR_VALUE="${BASH_REMATCH[2]}"
        
        # Skip if value is empty
        if [ -z "$VAR_VALUE" ]; then
            echo -e "${YELLOW}Skipping $VAR_NAME (empty value)${NC}"
            continue
        fi
        
        # Create GitHub secret name
        GH_SECRET_NAME="${SECRET_PREFIX}${VAR_NAME#REACT_APP_}"
        
        echo -e "Setting GitHub secret: ${GH_SECRET_NAME}"
        
        # IMPORTANT: This is a placeholder that would normally use 'gh secret set' 
        # We don't actually set secrets in this template script for security reasons
        echo "gh secret set $GH_SECRET_NAME -b \"$VAR_VALUE\""
        
        # Uncomment the line below to actually set the secret (requires appropriate permissions)
        # echo "$VAR_VALUE" | gh secret set "$GH_SECRET_NAME"
    fi
done < "$ENV_FILE"

# Process secrets file if it exists
if [ -f "$SECRETS_FILE" ]; then
    echo -e "${YELLOW}Processing $SECRETS_FILE...${NC}"
    echo -e "${YELLOW}Note: You should manually provide values for these secrets in GitHub.${NC}"
    while IFS= read -r line || [[ -n "$line" ]]; do
        # Skip comments and empty lines
        if [[ "$line" =~ ^\s*# ]] || [[ -z "$line" ]]; then
            continue
        fi
        
        # Extract variable name
        if [[ "$line" =~ ^([A-Za-z0-9_]+)= ]]; then
            VAR_NAME="${BASH_REMATCH[1]}"
            
            # Create GitHub secret name
            GH_SECRET_NAME="${SECRET_PREFIX}${VAR_NAME#REACT_APP_}"
            
            echo -e "${YELLOW}Secret to set manually: ${GH_SECRET_NAME}${NC}"
        fi
    done < "$SECRETS_FILE"
fi

echo -e "${GREEN}Environment variables sync process completed!${NC}"
echo -e "${YELLOW}Remember to manually set any sensitive values in GitHub Secrets that aren't in your template files.${NC}"