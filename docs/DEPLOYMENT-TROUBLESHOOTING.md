# Deployment Troubleshooting Guide

## Current Issue: FTP Authentication Failure

The FTP deployment is failing with "530 Login authentication failed" despite using the correct credentials provided.

### Provided Configuration

- **FTP Server**: bigbio.ai (IP: 216.194.171.244)
- **Username**: bigbio5
- **Password**: uvg9hkb!ehj_wta!JTE
- **Directory**: /home/bigbio5/public_html/

### Tests Performed

1. ✅ Direct FTP connection: `curl ftp://bigbio.ai`
2. ✅ FTP with email format: `bigbio5@bigbio.ai`
3. ✅ FTPS with TLS: Connection works but auth fails
4. ✅ Alternative username formats: `bigbioa1_bigbio5`
5. ✅ Password encoding variations

All tests result in "530 Login authentication failed"

## Alternative Deployment Methods

### 1. Manual Deployment Script

Run the manual deployment script to create a deployment package:

```bash
chmod +x scripts/deploy-manual.sh
./scripts/deploy-manual.sh
```

This creates:

- `./deploy/` - Directory with all files ready to upload
- `./bigbio-deploy.tar.gz` - Compressed archive for upload

### 2. SSH/rsync Deployment

If SSH access is available, use the alternative workflow:

```bash
# Set up SSH key in GitHub Secrets as SSH_PRIVATE_KEY
# Then trigger the SSH deployment workflow
gh workflow run deploy-ssh.yml
```

### 3. cPanel File Manager

1. Log into cPanel at <https://bigbio.ai:2083> or <https://bigbio.ai/cpanel>
2. Navigate to File Manager
3. Upload the contents of `./deploy/` to `public_html/`

### 4. Test File Verification

Upload `test-deploy.php` to verify access:

```bash
# If FTP works with different credentials:
curl -T test-deploy.php ftp://bigbio.ai/public_html/ --user USERNAME:PASSWORD
```

Then visit: <https://bigbio.ai/test-deploy.php>

## Troubleshooting Steps

### 1. Verify FTP Credentials in cPanel

1. Log into cPanel
2. Go to "FTP Accounts"
3. Verify/reset the password for user `bigbio5`
4. Note any special characters that might need escaping

### 2. Check FTP Configuration

InMotion Hosting may require:

- **Port 21**: Standard FTP (current setting)
- **Port 22**: SFTP (SSH File Transfer)
- **Port 990**: FTPS (FTP over SSL implicit)

### 3. Check IP Restrictions

Some hosts restrict FTP access by IP. Check if:

- GitHub Actions IPs need whitelisting
- There's a firewall blocking connections

### 4. Alternative FTP Client Test

Test with FileZilla or another FTP client:

1. Server: `ftp://bigbio.ai` or `216.194.171.244`
2. Username: `bigbio5`
3. Password: `uvg9hkb!ehj_wta!JTE`
4. Port: 21
5. Encryption: Use plain FTP or explicit FTP over TLS

### 5. Contact InMotion Support

If authentication continues to fail:

1. Verify the exact FTP username format required
2. Confirm if special characters in passwords need escaping
3. Check if there are IP restrictions on the account
4. Ask about SSH/rsync access as an alternative

## GitHub Actions Secrets

Current secrets configured:

- `FTP_SERVER`: bigbio.ai
- `FTP_USERNAME`: bigbio5
- `FTP_PASSWORD`: [configured]

To update:

```bash
gh secret set FTP_SERVER
gh secret set FTP_USERNAME
gh secret set FTP_PASSWORD
```

## Working Deployment Flow

Once FTP is working, the deployment flow is:

1. Push to `main` branch
2. GitHub Actions runs tests
3. Builds static site with `npm run build`
4. Deploys `out/` directory to `/home/bigbio5/public_html/`
5. Verifies deployment at <https://bigbio.ai>

## Emergency Deployment

If automated deployment fails, use manual deployment:

```bash
# 1. Build locally
npm run build

# 2. Create deployment package
cd out
tar -czf ../bigbio-deploy.tar.gz .
cd ..

# 3. Upload via cPanel File Manager
# - Log into cPanel
# - Upload bigbio-deploy.tar.gz to public_html
# - Extract in cPanel
# - Delete the tar.gz file
```

## Support Contact

InMotion Hosting Support:

- Chat: Available 24/7 on their website
- Phone: 1-888-321-4678
- Ticket: Via AMP/cPanel

Request assistance with:

1. FTP account verification for user `bigbio5`
2. Correct authentication format
3. Any IP restrictions
4. SSH/rsync access setup
