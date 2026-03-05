<?php
/**
 * BigBio.ai Deployment Test
 * Upload this file to verify FTP access and server configuration
 */

echo "<!DOCTYPE html>\n";
echo "<html><head><title>BigBio Deployment Test</title></head><body>\n";
echo "<h1>BigBio.ai Deployment Test</h1>\n";
echo "<p>If you can see this page, FTP deployment is working!</p>\n";
echo "<h2>Server Information:</h2>\n";
echo "<ul>\n";
echo "<li>Server Time: " . date('Y-m-d H:i:s') . "</li>\n";
echo "<li>PHP Version: " . phpversion() . "</li>\n";
echo "<li>Document Root: " . $_SERVER['DOCUMENT_ROOT'] . "</li>\n";
echo "<li>Script Path: " . __FILE__ . "</li>\n";
echo "<li>Server Software: " . $_SERVER['SERVER_SOFTWARE'] . "</li>\n";
echo "</ul>\n";
echo "<h2>Directory Contents:</h2>\n";
echo "<pre>\n";
$files = scandir(dirname(__FILE__));
foreach($files as $file) {
    echo $file . "\n";
}
echo "</pre>\n";
echo "<p><strong>Remember to delete this file after testing!</strong></p>\n";
echo "</body></html>\n";
?>