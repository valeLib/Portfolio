#!/bin/bash
# Bash script to create environment files
# Run this in terminal from the project root: bash create-env-files.sh

echo "Creating environment files for Portfolio deployment..."

# Create .env (default/unified)
cat > .env << 'EOF'
# Default build: Unified Software-First Portfolio
VITE_PROFILE=unified
VITE_CV_ENABLED=true
VITE_CV_VARIANT=software
VITE_BASE=/Portfolio/
EOF

echo "✓ Created .env"

# Create .env.unified
cat > .env.unified << 'EOF'
# Unified Software-First Portfolio Build
VITE_PROFILE=unified
VITE_CV_ENABLED=true
VITE_CV_VARIANT=software
VITE_BASE=/Portfolio/
EOF

echo "✓ Created .env.unified"

# Create .env.gamedev
cat > .env.gamedev << 'EOF'
# GameDev / Tech Art Portfolio Build
VITE_PROFILE=gamedev
VITE_CV_ENABLED=true
VITE_CV_VARIANT=gamedev
VITE_BASE=/Portfolio/Gamedev/
EOF

echo "✓ Created .env.gamedev"

echo ""
echo "All environment files created successfully!"
echo ""
echo "Next steps:"
echo "1. Test unified build:   npm run build:unified && npm run preview:unified"
echo "2. Test gamedev build:   npm run build:gamedev && npm run preview:gamedev"
echo "3. Deploy to GitHub:     git push origin main"
