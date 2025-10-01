# PowerShell script to sync environment variables to GitHub Secrets
# Usage: .\sync-env-to-github.ps1 [development|production|local]

# Check if gh CLI is installed
if (!(Get-Command gh -ErrorAction SilentlyContinue)) {
    Write-Host "Error: GitHub CLI (gh) is not installed. Please install it first." -ForegroundColor Red
    Write-Host "Visit https://cli.github.com/ for installation instructions."
    exit 1
}

# Check if user is authenticated with GitHub
try {
    $null = gh auth status
} catch {
    Write-Host "Error: You are not authenticated with GitHub CLI." -ForegroundColor Red
    Write-Host "Please run 'gh auth login' first."
    exit 1
}

# Get repository information
$repoUrl = git config --get remote.origin.url
if ($repoUrl) {
    $repoName = [System.IO.Path]::GetFileNameWithoutExtension($repoUrl)
} else {
    Write-Host "Error: Could not determine repository name." -ForegroundColor Red
    exit 1
}

# Determine which environment to sync
$envType = $args[0]
if (!$envType) {
    Write-Host "No environment specified, defaulting to 'development'" -ForegroundColor Yellow
    $envType = "development"
}

# Validate environment type
if ($envType -ne "development" -and $envType -ne "production" -and $envType -ne "local") {
    Write-Host "Error: Invalid environment type." -ForegroundColor Red
    Write-Host "Usage: .\sync-env-to-github.ps1 [development|production|local]"
    exit 1
}

# Define the env file to use
$envFile = ".\env-templates\.env.$envType.template"
if (!(Test-Path $envFile)) {
    Write-Host "Error: Environment file '$envFile' not found." -ForegroundColor Red
    exit 1
}

# Define the secrets file
$secretsFile = ".\env-templates\.env.secrets.template"
if (!(Test-Path $secretsFile)) {
    Write-Host "Warning: Secrets template file '$secretsFile' not found." -ForegroundColor Yellow
}

# Set prefix for GitHub secrets based on environment
if ($envType -eq "development") {
    $secretPrefix = "DEV_"
} elseif ($envType -eq "production") {
    $secretPrefix = "PROD_"
} else {
    $secretPrefix = "LOCAL_"
}

Write-Host "Starting to sync $envType environment variables to GitHub Secrets..." -ForegroundColor Green

# Process environment file
Write-Host "Processing $envFile..." -ForegroundColor Yellow
Get-Content $envFile | ForEach-Object {
    # Skip comments and empty lines
    if ($_ -match "^\s*#" -or $_ -eq "") {
        return
    }
    
    # Extract variable name and value
    if ($_ -match "^([A-Za-z0-9_]+)=(.*)$") {
        $varName = $Matches[1]
        $varValue = $Matches[2]
        
        # Skip if value is empty
        if ($varValue -eq "") {
            Write-Host "Skipping $varName (empty value)" -ForegroundColor Yellow
            return
        }
        
        # Create GitHub secret name
        $ghSecretName = "$secretPrefix$($varName -replace '^REACT_APP_', '')"
        
        Write-Host "Setting GitHub secret: $ghSecretName"
        
        # IMPORTANT: This is a placeholder that would normally use 'gh secret set' 
        # We don't actually set secrets in this template script for security reasons
        Write-Host "gh secret set $ghSecretName -b `"$varValue`""
        
        # Uncomment the line below to actually set the secret (requires appropriate permissions)
        # gh secret set $ghSecretName -b "$varValue"
    }
}

# Process secrets file if it exists
if (Test-Path $secretsFile) {
    Write-Host "Processing $secretsFile..." -ForegroundColor Yellow
    Write-Host "Note: You should manually provide values for these secrets in GitHub." -ForegroundColor Yellow
    Get-Content $secretsFile | ForEach-Object {
        # Skip comments and empty lines
        if ($_ -match "^\s*#" -or $_ -eq "") {
            return
        }
        
        # Extract variable name
        if ($_ -match "^([A-Za-z0-9_]+)=") {
            $varName = $Matches[1]
            
            # Create GitHub secret name
            $ghSecretName = "$secretPrefix$($varName -replace '^REACT_APP_', '')"
            
            Write-Host "Secret to set manually: $ghSecretName" -ForegroundColor Yellow
        }
    }
}

Write-Host "Environment variables sync process completed!" -ForegroundColor Green
Write-Host "Remember to manually set any sensitive values in GitHub Secrets that aren't in your template files." -ForegroundColor Yellow