# ☁️ Cloud Storage Setup Guide

## 🎯 **Quick Setup (5 minutes)**

### **Step 1: Create Supabase Account**
1. Go to [supabase.com](https://supabase.com)
2. Sign up with your email
3. Create a new project
4. Choose a region (closest to India: Singapore)

### **Step 2: Get Your Credentials**
1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy these values:
   - **Project URL** (starts with `https://`)
   - **Anon Public Key** (starts with `eyJ`)

### **Step 3: Set Environment Variables**
Create a `.env` file in your project root:

```env
VITE_SUPABASE_URL=your_project_url_here
VITE_SUPABASE_PUBLISHABLE_KEY=your_anon_key_here
```

### **Step 4: Create Database Tables**
1. In Supabase dashboard, go to **SQL Editor**
2. Copy and paste the contents of `SUPABASE_SETUP.sql`
3. Click **Run** to create all tables and storage

### **Step 5: Test the Connection**
1. Start your development server: `npm run dev`
2. Go to Admin Panel → Settings
3. Click "Sync to Cloud" to test the connection

---

## 📊 **What Gets Stored in Cloud:**

### **✅ Registration Data**
- All recruitment form submissions
- All workshop form submissions
- Automatic backup from local storage

### **✅ Project Data**
- Project details (title, description, etc.)
- Project images (uploaded to Supabase Storage)
- Team members, technologies, links
- Status tracking (planned/ongoing/completed)

### **✅ Timeline Events**
- Club milestones and achievements
- Event details with categories
- Importance levels (high/medium/low)

### **✅ File Storage**
- Project images with CDN delivery
- Automatic image optimization
- Public access URLs

---

## 🔧 **Features Available:**

### **🔄 Automatic Sync**
- Real-time data synchronization
- Backup existing local data to cloud
- Seamless switching between local and cloud storage

### **📱 Multi-Device Access**
- Access admin panel from any device
- Consistent data across all platforms
- Real-time updates

### **🚀 Performance**
- Fast global CDN for images
- Optimized database queries
- Automatic caching

### **🔒 Security**
- Row-level security policies
- Secure file upload
- Environment variable protection

---

## 💰 **Pricing (Free Tier)**

### **Supabase Free Plan:**
- ✅ **500MB Database** (plenty for registration data)
- ✅ **1GB File Storage** (for project images)
- ✅ **50MB File Upload Limit**
- ✅ **Unlimited API Requests**
- ✅ **Real-time subscriptions**

### **When to Upgrade:**
- More than 1GB of images
- Need larger file uploads (>50MB)
- Want custom domain
- Need advanced analytics

---

## 🛠️ **Alternative Options:**

### **1. Firebase (Google)**
```bash
npm install firebase
```
- Similar features to Supabase
- Google's ecosystem integration
- 1GB free storage

### **2. Cloudinary (Images Only)**
```bash
npm install cloudinary
```
- 25GB free image storage
- Advanced image transformations
- Perfect for image-heavy projects

### **3. AWS S3 + DynamoDB**
- Most scalable option
- Pay-per-use pricing
- Enterprise-grade features

---

## 🚨 **Important Notes:**

1. **Keep your `.env` file secure** - never commit it to Git
2. **Backup your Supabase credentials** - store them safely
3. **Test the connection** before going live
4. **Monitor usage** in Supabase dashboard

---

## 🆘 **Need Help?**

If you encounter any issues:
1. Check the browser console for errors
2. Verify your environment variables
3. Ensure Supabase tables are created correctly
4. Test with a simple registration first

**Ready to set up cloud storage? Just provide me with your Supabase credentials and I'll help you configure everything!** 🚀
