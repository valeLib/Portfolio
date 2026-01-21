# PowerShell script to create environment files
# Run this in PowerShell from the project root

Write-Host "Creating environment files for Portfolio deployment..." -ForegroundColor Cyan

# Create .env (default/unified)
@"
# Default build: Unified Software-First Portfolio
VITE_PROFILE=unified
VITE_CV_ENABLED=true
VITE_CV_VARIANT=software
VITE_BASE=/Portfolio/
"@ | Out-File -FilePath ".env" -Encoding UTF8

Write-Host "✓ Created .env" -ForegroundColor Green

# Create .env.unified
@"
# Unified Software-First Portfolio Build
VITE_PROFILE=unified
VITE_CV_ENABLED=true
VITE_CV_VARIANT=software
VITE_BASE=/Portfolio/
"@ | Out-File -FilePath ".env.unified" -Encoding UTF8

Write-Host "✓ Created .env.unified" -ForegroundColor Green

# Create .env.gamedev
@"
# GameDev / Tech Art Portfolio Build
VITE_PROFILE=gamedev
VITE_CV_ENABLED=true
VITE_CV_VARIANT=gamedev
VITE_BASE=/Portfolio/Gamedev/
"@ | Out-File -FilePath ".env.gamedev" -Encoding UTF8

Write-Host "✓ Created .env.gamedev" -ForegroundColor Green

Write-Host ""
Write-Host "All environment files created successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Test unified build:   npm run build:unified && npm run preview:unified" -ForegroundColor White
Write-Host "2. Test gamedev build:   npm run build:gamedev && npm run preview:gamedev" -ForegroundColor White
Write-Host "3. Deploy to GitHub:     git push origin main" -ForegroundColor White
