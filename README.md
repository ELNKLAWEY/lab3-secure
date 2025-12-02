# Lab Assignment: Implementing SSL/TLS on a Node.js Server

## Overview

This lab demonstrates how to implement SSL/TLS encryption on a Node.js server using HTTPS with a self-signed certificate. You'll learn about secure web communications, certificate generation, and how to test secure connections.

## Prerequisites

- Node.js and npm installed
- A terminal/command prompt
- A web browser (Chrome, Firefox, Edge, etc.)

## Project Structure

```
lab3/
├── server.js           # Starter HTTP server
├── server_https.js     # HTTPS server implementation
├── generate-cert.js    # Certificate generation script
├── test-https.js       # HTTPS testing script
├── package.json        # Node.js dependencies
├── certs/              # Certificate directory
│   ├── server.cert     # SSL certificate
│   └── server.key      # Private key
└── README.md           # This file
```

## Step-by-Step Instructions

### Step 1: Install Dependencies

```bash
npm install
```

This installs the `selfsigned` package needed for certificate generation.

### Step 2: Generate TLS Certificate

**Option A: Using Node.js (Recommended for Windows)**

```bash
npm run generate-cert
```

or

```bash
node generate-cert.js
```

**Option B: Using OpenSSL (Linux/macOS/WSL)**

```bash
mkdir certs
cd certs
openssl req -nodes -new -x509 -keyout server.key -out server.cert -days 365
```

When prompted, you can enter any information (fake info is acceptable for development):
- Country Name: US
- State: Any
- City: Any
- Organization: Any
- Common Name: localhost

### Step 3: Test the HTTP Server (Optional)

```bash
npm start
```

or

```bash
node server.js
```

Visit: http://localhost:3000

### Step 4: Run the HTTPS Server

```bash
npm run start:https
```

or

```bash
node server_https.js
```

You should see: `Secure server running at https://localhost:3443`

### Step 5: Test the HTTPS Server

**In Browser:**
1. Open your browser and navigate to: `https://localhost:3443`
2. You will see a security warning (this is expected!)
3. Click "Advanced" → "Proceed to localhost (unsafe)" or similar
4. You should see: "🔐 Hello, this is a secure HTTPS server!"

**Using Node.js Test Script:**
```bash
node test-https.js
```

**Using curl (Linux/macOS/WSL):**
```bash
# With -k flag (ignores certificate errors)
curl -k https://localhost:3443

# Without -k flag (will fail for self-signed cert)
curl https://localhost:3443
```

**Using PowerShell (Windows):**
```powershell
# Note: PowerShell's curl alias may not work the same way
# Use the Node.js test script instead, or install curl for Windows
```

## Understanding the Code

### HTTP Server (`server.js`)
- Uses Node.js `http` module
- Listens on port 3000
- No encryption - data is sent in plain text

### HTTPS Server (`server_https.js`)
- Uses Node.js `https` module
- Requires certificate and private key files
- Listens on port 3443
- All data is encrypted using TLS

### Key Differences

| Feature | HTTP | HTTPS |
|---------|------|-------|
| **Port** | 3000 | 3443 |
| **Encryption** | None | TLS/SSL |
| **Certificate** | Not required | Required |
| **Security** | Insecure | Secure |
| **Browser Warning** | No | Yes (for self-signed) |
| **Data Protection** | Plain text | Encrypted |

## Why Browser Shows a Warning

Browsers display a security warning for self-signed certificates because:

1. **No Certificate Authority (CA) Verification**: Self-signed certificates are not issued by a trusted Certificate Authority (CA) like Let's Encrypt, DigiCert, etc.

2. **Identity Verification**: Browsers cannot verify the identity of the server. A trusted CA would verify that you own the domain before issuing a certificate.

3. **Man-in-the-Middle Risk**: Without CA verification, there's a risk that someone could create a fake certificate and intercept your connection.

4. **Development vs Production**: Self-signed certificates are fine for development and testing, but production websites should use certificates from trusted CAs.

## Testing Results

### Test 1: With `-k` flag (ignore certificate errors)
```
Status: 200
Response: 🔐 Hello, this is a secure HTTPS server!
```
✅ **Success**: Connection works when certificate validation is bypassed.

### Test 2: Without `-k` flag (strict validation)
```
Error: unable to verify the first certificate
```
❌ **Expected Failure**: This demonstrates why browsers show warnings - the certificate cannot be verified.

## Deliverables Checklist

- [x] Modified HTTPS server code (`server_https.js`)
- [x] Certificate files (`server.cert`, `server.key`)



## Report Template

See `REPORT_TEMPLATE.md` for a detailed report template.

## Troubleshooting

### Certificate files not found
- Make sure you've run the certificate generation script
- Check that `certs/server.cert` and `certs/server.key` exist

### Port already in use
- Change the port number in `server_https.js` (e.g., 3444, 3445)
- Or stop the process using the port

### Browser won't connect
- Make sure the server is running
- Check the port number matches
- Try clearing browser cache

## Security Notes

⚠️ **Important**: Self-signed certificates are for **development only**!

- Never use self-signed certificates in production
- Production websites should use certificates from trusted CAs (e.g., Let's Encrypt)
- Self-signed certificates will always trigger browser warnings
- They do provide encryption but don't verify server identity

## Additional Resources

- [Node.js HTTPS Documentation](https://nodejs.org/api/https.html)
- [Let's Encrypt](https://letsencrypt.org/) - Free SSL certificates for production
- [OpenSSL Documentation](https://www.openssl.org/docs/)

## License

This is a lab assignment for educational purposes.



## Screenshots

![screenshot](screenshots/1.png)


![screenshot](screenshots/2.png)



![screenshot](screenshots/3.png)



![screenshot](screenshots/4.png)

