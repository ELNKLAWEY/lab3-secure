# Lab Report: Implementing SSL/TLS on a Node.js Server

**Student Name:** [Your Name]  
**Date:** [Date]  
**Course:** [Course Name]

---

## 1. Introduction

Briefly describe the purpose of this lab and what you learned about SSL/TLS encryption.

---

## 2. Certificate Generation

### Screenshot 1: Certificate Creation

[Insert screenshot showing the certificate generation process]

**Description:** This screenshot shows the successful generation of the self-signed certificate using [method used: Node.js script or OpenSSL].

**Command used:**
```bash
[Paste the command you used]
```

**Output:**
```
[Paste the output]
```

---

## 3. HTTPS Server Implementation

### Code Changes

The main changes from HTTP to HTTPS:

1. **Module Change**: Changed from `http` to `https` module
2. **Certificate Loading**: Added code to read certificate and key files
3. **Server Creation**: Used `https.createServer()` instead of `http.createServer()`
4. **Port Change**: Changed from port 3000 to 3443

### Key Code Snippet

```javascript
const options = {
  key: fs.readFileSync('./certs/server.key'),
  cert: fs.readFileSync('./certs/server.cert'),
};

const server = https.createServer(options, (req, res) => {
  // Server logic
});
```

---

## 4. Browser Testing

### Screenshot 2: Browser Warning

[Insert screenshot showing the browser security warning when accessing https://localhost:3443]

### Screenshot 3: Successful Connection

[Insert screenshot showing the successful HTTPS connection and the server response]

### Why the Browser Shows a Warning

The browser displays a security warning for self-signed certificates because:

1. **No Certificate Authority Verification**: Self-signed certificates are not issued by a trusted Certificate Authority (CA). Browsers maintain a list of trusted CAs, and certificates not from these authorities trigger warnings.

2. **Identity Verification**: Without a trusted CA, the browser cannot verify that the server is actually who it claims to be. This creates a potential security risk.

3. **Man-in-the-Middle Attack Risk**: An attacker could potentially create their own self-signed certificate and intercept communications if users blindly accept untrusted certificates.

4. **Development vs Production**: Self-signed certificates are acceptable for local development and testing, but production websites must use certificates from trusted CAs to ensure user trust and security.

**For this lab**: The warning is expected and acceptable since we're using a self-signed certificate for educational purposes.

---

## 5. curl Testing

### Test 1: With `-k` flag (ignore certificate errors)

**Command:**
```bash
curl -k https://localhost:3443
```

**Output:**
```
[Paste the output here]
```

**Analysis:** The `-k` flag tells curl to ignore certificate validation errors, allowing the connection to proceed despite the self-signed certificate.

### Test 2: Without `-k` flag (strict validation)

**Command:**
```bash
curl https://localhost:3443
```

**Output:**
```
[Paste the output here]
```

**Analysis:** Without the `-k` flag, curl performs strict certificate validation and rejects the self-signed certificate, demonstrating the security behavior that browsers also implement.

---

## 6. HTTP vs HTTPS Comparison

| Feature | HTTP | HTTPS |
|---------|------|-------|
| **Protocol** | Hypertext Transfer Protocol | Hypertext Transfer Protocol Secure |
| **Port** | 80 (default) / 3000 (this lab) | 443 (default) / 3443 (this lab) |
| **Encryption** | None - data sent in plain text | TLS/SSL encryption |
| **Certificate Required** | No | Yes |
| **Security** | Insecure - vulnerable to interception | Secure - encrypted communication |
| **Browser Warning** | No | Yes (for self-signed certificates) |
| **Data Protection** | ❌ No protection | ✅ Encrypted |
| **Use Case** | Development, internal networks | Production, sensitive data |
| **Performance** | Faster (no encryption overhead) | Slightly slower (encryption overhead) |
| **SEO** | Google may penalize | Preferred by search engines |

### Key Differences Explained:

1. **Encryption**: HTTPS encrypts all data between client and server, making it unreadable to anyone intercepting the connection.

2. **Authentication**: HTTPS (with proper certificates) verifies the server's identity, ensuring you're connecting to the legitimate server.

3. **Data Integrity**: HTTPS ensures data hasn't been tampered with during transmission.

4. **Trust**: Users trust HTTPS connections more, especially when handling sensitive information like passwords or payment details.

---

## 7. Security Considerations

### Self-Signed Certificates

**Advantages:**
- Free and easy to generate
- Good for development and testing
- Provides encryption (data is still encrypted)

**Disadvantages:**
- Not trusted by browsers by default
- No identity verification
- Users must manually accept warnings
- Not suitable for production

### Production Recommendations

For production websites, use certificates from trusted Certificate Authorities:
- **Let's Encrypt**: Free, automated certificates
- **Commercial CAs**: DigiCert, GlobalSign, etc.
- **Cloud Providers**: AWS Certificate Manager, Azure App Service Certificates

---

## 8. Challenges and Solutions

### Challenge 1: [Describe any challenge you faced]

**Solution:** [How you solved it]

### Challenge 2: [If applicable]

**Solution:** [How you solved it]

---

## 9. Conclusion

Summarize what you learned:
- The importance of SSL/TLS encryption
- How to generate and use certificates
- The difference between HTTP and HTTPS
- Why browsers show warnings for self-signed certificates
- How to test secure connections

**Key Takeaways:**
1. [Takeaway 1]
2. [Takeaway 2]
3. [Takeaway 3]

---

## 10. Demo Video

[Link to your 30-60 second demo video showing:]
- Starting the HTTPS server
- Accessing it in a browser
- Showing the security warning
- Demonstrating successful connection

---

## Appendix

### Files Submitted

- `server.js` - Original HTTP server
- `server_https.js` - HTTPS server implementation
- `certs/server.cert` - SSL certificate
- `certs/server.key` - Private key
- `generate-cert.js` - Certificate generation script
- `package.json` - Dependencies

### Additional Notes

[Any additional observations or notes]

---

**End of Report**

