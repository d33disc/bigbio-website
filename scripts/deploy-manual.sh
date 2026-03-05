#!/bin/bash

# Manual deployment script for bigbio.ai
# This script builds the site and creates a deployment package

set -e

echo "🚀 Building BigBio website for production..."

# Clean previous builds
rm -rf out/ deploy/

# Install dependencies
npm ci

# Run tests
echo "🧪 Running tests..."
npm run type-check
npm run test:unit

# Build the site
echo "🏗️ Building production bundle..."
npm run build

# Create deployment directory
mkdir -p deploy

# Copy build output
cp -r out/* deploy/

# Create .htaccess file
cat > deploy/.htaccess << 'EOF'
# Apache configuration for Next.js static site
RewriteEngine On

# Force HTTPS
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}/$1 [R=301,L]

# Handle trailing slashes (Next.js static export uses them)
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_URI} !(.*)/$
RewriteRule ^(.*)$ $1/ [L,R=301]

# Serve index.html for directories
DirectoryIndex index.html

# Error pages
ErrorDocument 404 /404.html

# Security headers
Header set X-Content-Type-Options "nosniff"
Header set X-Frame-Options "SAMEORIGIN"
Header set X-XSS-Protection "1; mode=block"
Header set Referrer-Policy "strict-origin-when-cross-origin"

# Cache control for static assets
<FilesMatch "\.(js|css|jpg|jpeg|png|gif|ico|svg|woff|woff2|ttf|eot)$">
  Header set Cache-Control "public, max-age=31536000, immutable"
</FilesMatch>

# Compress text files
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/plain
  AddOutputFilterByType DEFLATE text/html
  AddOutputFilterByType DEFLATE text/css
  AddOutputFilterByType DEFLATE application/javascript
  AddOutputFilterByType DEFLATE application/json
</IfModule>
EOF

# Create deployment archive
echo "📦 Creating deployment archive..."
cd deploy
tar -czf ../bigbio-deploy.tar.gz .
cd ..

echo "✅ Build complete!"
echo ""
echo "📁 Deployment files are in: ./deploy/"
echo "📦 Archive created: ./bigbio-deploy.tar.gz"
echo ""
echo "To deploy manually:"
echo "1. Upload all files from ./deploy/ to your public_html directory"
echo "2. Or upload bigbio-deploy.tar.gz and extract it on the server"
echo ""
echo "Server details:"
echo "- FTP Server: bigbio.ai (216.194.171.244)"
echo "- Username: bigbio5"
echo "- Directory: /home/bigbio5/public_html/"