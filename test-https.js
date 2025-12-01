const https = require('https');

console.log('Testing HTTPS server...\n');

// Test 1: With rejectUnauthorized: false (equivalent to curl -k)
console.log('Test 1: With -k flag (ignore certificate errors)');
const options1 = {
  hostname: 'localhost',
  port: 3443,
  path: '/',
  method: 'GET',
  rejectUnauthorized: false // This is like curl -k
};

const req1 = https.request(options1, (res) => {
  console.log(`Status: ${res.statusCode}`);
  console.log(`Headers:`, res.headers);
  
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log(`Response: ${data}`);
    console.log('\n' + '='.repeat(50) + '\n');
    
    // Test 2: Without rejectUnauthorized (default behavior)
    console.log('Test 2: Without -k flag (strict certificate validation)');
    const options2 = {
      hostname: 'localhost',
      port: 3443,
      path: '/',
      method: 'GET',
      rejectUnauthorized: true // Default behavior
    };
    
    const req2 = https.request(options2, (res) => {
      console.log(`Status: ${res.statusCode}`);
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        console.log(`Response: ${data}`);
        process.exit(0);
      });
    });
    
    req2.on('error', (error) => {
      console.log('❌ Error (expected for self-signed cert):');
      console.log(`   ${error.message}`);
      console.log('\n✅ This demonstrates why browsers show warnings for self-signed certificates!');
      process.exit(0);
    });
    
    req2.end();
  });
});

req1.on('error', (error) => {
  console.error('Error:', error);
  process.exit(1);
});

req1.end();

