# PowerShell script to generate environment files for local development
# Usage: .\generate-env-files.ps1 [development|production|local]

# Determine which environment to generate
$envType = $args[0]
if (!$envType) {
    Write-Host "No environment specified, defaulting to 'local'" -ForegroundColor Yellow
    $envType = "local"
}

# Validate environment type
if ($envType -ne "development" -and $envType -ne "production" -and $envType -ne "local") {
    Write-Host "Error: Invalid environment type." -ForegroundColor Red
    Write-Host "Usage: .\generate-env-files.ps1 [development|production|local]"
    exit 1
}

# Define the env file to use
$templateFile = ".\env-templates\.env.$envType.template"
if (!(Test-Path $templateFile)) {
    Write-Host "Error: Environment template file '$templateFile' not found." -ForegroundColor Red
    exit 1
}

# Define the secrets template file
$secretsFile = ".\env-templates\.env.secrets.template"

# Define the output file
$outputFile = ".env"
if ($envType -ne "local") {
    $outputFile = ".env.$envType"
}

Write-Host "Generating $outputFile from templates..." -ForegroundColor Green

# Copy the template file to output
Copy-Item $templateFile $outputFile -Force
Write-Host "✓ Copied environment template to $outputFile" -ForegroundColor Green

# If secrets template exists, append placeholders for secrets
if (Test-Path $secretsFile) {
    Add-Content $outputFile "`n# Secret placeholders added from $secretsFile"
    Write-Host "Adding placeholders for secrets..." -ForegroundColor Yellow
    
    Get-Content $secretsFile | ForEach-Object {
        # Skip comments and empty lines
        if ($_ -match "^\s*#" -or $_ -eq "") {
            return
        }
        
        # Extract variable name
        if ($_ -match "^([A-Za-z0-9_]+)=") {
            $varName = $Matches[1]
            Add-Content $outputFile "$varName=YOUR_$varName"
            Write-Host "Added placeholder for $varName" -ForegroundColor Yellow
        }
    }
}

Write-Host "Environment file generated successfully at $outputFile" -ForegroundColor Green
Write-Host "Note: Remember to replace placeholder values with your actual secrets." -ForegroundColor Yellow