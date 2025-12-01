const selfsigned = require('selfsigned');
const fs = require('fs');
const path = require('path');

// Create certs directory if it doesn't exist
const certsDir = path.join(__dirname, 'certs');
if (!fs.existsSync(certsDir)) {
  fs.mkdirSync(certsDir);
}

// Generate attributes for the certificate
const attrs = [
  { name: 'countryName', value: 'US' },
  { name: 'stateOrProvinceName', value: 'State' },
  { name: 'localityName', value: 'City' },
  { name: 'organizationName', value: 'Organization' },
  { name: 'commonName', value: 'localhost' }
];

// Generate options
const options = {
  keySize: 2048,
  days: 365,
  algorithm: 'sha256',
  extensions: [
    {
      name: 'basicConstraints',
      cA: false
    },
    {
      name: 'keyUsage',
      keyUsage: ['digitalSignature', 'keyEncipherment']
    },
    {
      name: 'subjectAltName',
      altNames: [
        {
          type: 2, // DNS
          value: 'localhost'
        },
        {
          type: 2,
          value: '127.0.0.1'
        }
      ]
    }
  ]
};

// Generate the certificate
const pems = selfsigned.generate(attrs, options);

// Write certificate and key to files
fs.writeFileSync(path.join(certsDir, 'server.key'), pems.private);
fs.writeFileSync(path.join(certsDir, 'server.cert'), pems.cert);

console.log('✅ Certificate and key generated successfully!');
console.log('   Certificate: certs/server.cert');
console.log('   Private Key: certs/server.key');
console.log('\n📝 Note: This is a self-signed certificate for development purposes only.');
