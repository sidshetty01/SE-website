# 📧 EmailJS Setup Guide for Automatic OTP Sending

## 🎯 **What This Does:**
- **Automatically sends OTP emails** to `tseofficial2011@gmail.com`
- **No user email client required** - works from any browser
- **Professional email service** - emails come from EmailJS servers
- **Free tier available** - 200 emails/month free

## 🚀 **Quick Setup (5 minutes):**

### **Step 1: Create EmailJS Account**
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click **"Sign Up"** 
3. Use any email (recommend: `tseofficial2011@gmail.com`)
4. Verify your email

### **Step 2: Create Email Service**
1. In EmailJS dashboard, click **"Add New Service"**
2. Choose **"Gmail"** (recommended) or **"Outlook"**
3. **Service ID:** `service_soaring_eagles`
4. Connect your email account (the one that will SEND emails)
5. Click **"Create Service"**

### **Step 3: Create Email Template**
1. Click **"Email Templates"** → **"Create New Template"**
2. **Template ID:** `template_otp_admin`
3. **Template Content:**
```
Subject: 🔐 Soaring Eagles Admin OTP - {{otp_code}}

Hi {{to_name}},

Your One-Time Password (OTP) for Soaring Eagles Admin Panel:

🔐 OTP: {{otp_code}}

⏰ Valid for {{validity_minutes}} minutes only
🔒 Do not share this code with anyone

If you didn't request this, please ignore this email.

---
{{club_name}}
```
4. Click **"Save"**

### **Step 4: Get Public Key**
1. Go to **"Account"** → **"General"**
2. Copy your **"Public Key"**
3. It looks like: `YOUR_EMAILJS_PUBLIC_KEY`

### **Step 5: Update Code**
Replace these values in `src/services/otpService.ts`:

```typescript
// Replace this line:
emailjs.init("YOUR_EMAILJS_PUBLIC_KEY");
// With your actual public key:
emailjs.init("your_actual_public_key_here");

// Replace these lines:
'service_soaring_eagles', // Your actual Service ID
'template_otp_admin',     // Your actual Template ID
```

## 🔧 **Alternative: Use Environment Variables (Recommended)**

### **Step 1: Create `.env` file**
```bash
# In soaring-eagle-nexus/.env
VITE_EMAILJS_PUBLIC_KEY=your_actual_public_key
VITE_EMAILJS_SERVICE_ID=service_soaring_eagles
VITE_EMAILJS_TEMPLATE_ID=template_otp_admin
```

### **Step 2: Update Code**
```typescript
// In otpService.ts
emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

const response = await emailjs.send(
  import.meta.env.VITE_EMAILJS_SERVICE_ID,
  import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  templateParams
);
```

## ✅ **Testing:**
1. **Setup complete** → Try admin login
2. **Click "Send OTP"** → Check console for success message
3. **Check email** → OTP should arrive at `tseofficial2011@gmail.com`
4. **Enter OTP** → Should work perfectly!

## 🆘 **Troubleshooting:**

### **"EmailJS Error" in console:**
- ✅ Check Public Key is correct
- ✅ Check Service ID matches
- ✅ Check Template ID matches
- ✅ Verify email service is connected

### **No email received:**
- ✅ Check spam folder
- ✅ Verify template is saved correctly
- ✅ Check EmailJS dashboard for error logs

### **Still not working:**
- ✅ Fallback mode shows OTP in console
- ✅ Use console OTP for testing
- ✅ Double-check all IDs match exactly

## 📊 **Current Status:**
- ✅ EmailJS library installed
- ✅ Code updated for automatic sending
- ✅ Fallback mode for testing
- ⏳ **Need:** EmailJS account setup (5 minutes)

## 🎉 **After Setup:**
**Perfect automatic OTP system!**
- **User clicks "Send OTP"** → Email sent automatically
- **No email client opens** → Clean user experience  
- **Professional emails** → Delivered to `tseofficial2011@gmail.com`
- **Secure & reliable** → Production-ready solution
