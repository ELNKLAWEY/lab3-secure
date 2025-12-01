# Quick Start Guide

## 🚀 Get Started in 3 Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Generate Certificate
```bash
npm run generate-cert
```

### 3. Start HTTPS Server
```bash
npm run start:https
```

Then open your browser and visit: **https://localhost:3443**

---

## 📋 Available Commands

- `npm start` - Run HTTP server (port 3000)
- `npm run start:https` - Run HTTPS server (port 3443)
- `npm run generate-cert` - Generate SSL certificate
- `node test-https.js` - Test HTTPS connection

---

## ✅ Verification Checklist

- [ ] Certificate files exist in `certs/` directory
- [ ] HTTPS server starts without errors
- [ ] Browser shows security warning (expected!)
- [ ] Can access server after accepting warning
- [ ] Test script runs successfully

---

## 📝 Next Steps

1. Read `README.md` for detailed instructions
2. Use `REPORT_TEMPLATE.md` to write your lab report
3. Take screenshots for your report
4. Record a demo video (30-60 seconds)

---

## 🐛 Troubleshooting

**Server won't start?**
- Check if port 3443 is already in use
- Verify certificate files exist in `certs/` directory

**Browser shows error?**
- Make sure server is running
- Try accepting the security warning
- Check the port number matches

**Certificate not found?**
- Run `npm run generate-cert` again
- Check that `certs/server.cert` and `certs/server.key` exist

