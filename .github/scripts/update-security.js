const fs = require('fs');
const path = require('path');

// Helper function to get supported versions
function getSupportedVersions(currentVersion) {
    const supportedVersions = ["1.4.5", "1.1.5"];
    const [major, minor, patch] = currentVersion.split('.').map(Number);

    supportedVersions.push(currentVersion);
    if (patch > 1) supportedVersions.push(`${major}.${minor}.${patch - 1}`);
    if (patch > 0) supportedVersions.push(`${major}.${minor}.${patch - 2}`);

    return supportedVersions;
}

// Function to update SECURITY.md
function updateSecurityMd(currentVersion) {
    const filePath = path.join(__dirname, '../../SECURITY.md');
    const content = fs.readFileSync(filePath, 'utf-8');

    const supportedVersions = getSupportedVersions(currentVersion);
    const supportedRows = supportedVersions.map(v => `| ${v} | :white_check_mark: |`).join('\n');

    const updatedContent = content.replace(
        /\| Version \| Supported\s*\|([\s\S]*?)\| 1\.0\.0 \| :x: \|/,
        `| Version | Supported          |\n| ------- | ------------------ |\n${supportedRows}\n| 1.0.0   | :x: |`
    );

    fs.writeFileSync(filePath, updatedContent);
}

const currentVersion = process.argv[2];
updateSecurityMd(currentVersion);
