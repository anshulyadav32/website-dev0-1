#!/bin/bash

# Script to generate environment files for local development
# Usage: ./generate-env-files.sh [development|production|local]

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
NC='\033[0m' # No Color

# Determine which environment to generate
ENV_TYPE="$1"
if [ -z "$ENV_TYPE" ]; then
    echo -e "${YELLOW}No environment specified, defaulting to 'local'${NC}"
    ENV_TYPE="local"
fi

# Validate environment type
if [ "$ENV_TYPE" != "development" ] && [ "$ENV_TYPE" != "production" ] && [ "$ENV_TYPE" != "local" ]; then
    echo -e "${RED}Error: Invalid environment type.${NC}"
    echo "Usage: ./generate-env-files.sh [development|production|local]"
    exit 1
fi

# Define the env file to use
TEMPLATE_FILE="./env-templates/.env.${ENV_TYPE}.template"
if [ ! -f "$TEMPLATE_FILE" ]; then
    echo -e "${RED}Error: Environment template file '$TEMPLATE_FILE' not found.${NC}"
    exit 1
fi

# Define the secrets template file
SECRETS_FILE="./env-templates/.env.secrets.template"

# Define the output file
OUTPUT_FILE=".env"
if [ "$ENV_TYPE" != "local" ]; then
    OUTPUT_FILE=".env.${ENV_TYPE}"
fi

echo -e "${GREEN}Generating $OUTPUT_FILE from templates...${NC}"

# Copy the template file to output
cp "$TEMPLATE_FILE" "$OUTPUT_FILE"
echo -e "${GREEN}✓ Copied environment template to $OUTPUT_FILE${NC}"

# If secrets template exists, append placeholders for secrets
if [ -f "$SECRETS_FILE" ]; then
    echo -e "\n# Secret placeholders added from $SECRETS_FILE" >> "$OUTPUT_FILE"
    echo -e "${YELLOW}Adding placeholders for secrets...${NC}"
    
    while IFS= read -r line || [[ -n "$line" ]]; do
        # Skip comments and empty lines
        if [[ "$line" =~ ^\s*# ]] || [[ -z "$line" ]]; then
            continue
        fi
        
        # Extract variable name
        if [[ "$line" =~ ^([A-Za-z0-9_]+)= ]]; then
            VAR_NAME="${BASH_REMATCH[1]}"
            echo "$VAR_NAME=YOUR_$VAR_NAME" >> "$OUTPUT_FILE"
            echo -e "${YELLOW}Added placeholder for $VAR_NAME${NC}"
        fi
    done < "$SECRETS_FILE"
fi

echo -e "${GREEN}Environment file generated successfully at $OUTPUT_FILE${NC}"
echo -e "${YELLOW}Note: Remember to replace placeholder values with your actual secrets.${NC}"