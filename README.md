# 🎨 Netlee Frontend - Deployment Guide

React + Vite web application ka complete deployment guide.

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Local Setup](#local-setup)
4. [Environment Variables](#environment-variables)
5. [Deployment Options](#deployment-options)
6. [Step-by-Step Deployment](#step-by-step-deployment)
7. [Post-Deployment](#post-deployment)
8. [Troubleshooting](#troubleshooting)

---

## 🎯 Overview

Yeh frontend application streaming platform ka web interface hai jo provide karta hai:
- User Authentication (Login/Register)
- Movie Browsing & Search
- Video Player
- Admin Dashboard
- User Profile Management

**Tech Stack:**
- React 19.x
- Vite 7.x
- React Router DOM
- Axios
- Tailwind CSS
- HLS.js (Video Streaming)

---

## 🔧 Prerequisites

Deployment se pehle ensure karein:

- ✅ Node.js v18+ installed
- ✅ Backend API deployed aur running
- ✅ Git account (GitHub/GitLab)
- ✅ Hosting platform account (Vercel/Netlify)

---

## 💻 Local Setup

### 1. Install Dependencies

```bash
cd Netlee-Frontend
npm install
```

### 2. Environment Variables

`.env` file banao project root me:

```env
# Backend API URL
VITE_API_URL=http://localhost:5000/api
```

**Important**: Vite me environment variables ke liye `VITE_` prefix zaroori hai!

### 3. Update API Configuration

`src/utils/axios.js` me API URL check karo:

```javascript
export const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    }
});
```

### 4. Run Locally

```bash
# Development server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

Development server `http://localhost:5173` par start ho jayega.

---

## 🌐 Deployment Options

### Recommended Platforms:

| Platform | Free Tier | Build Speed | Best For |
|----------|-----------|-------------|----------|
| **Vercel** | ✅ Yes | ⚡⚡⚡⚡⚡ | React/Vite apps |
| **Netlify** | ✅ Yes | ⚡⚡⚡⚡ | Static sites |
| **Cloudflare Pages** | ✅ Yes | ⚡⚡⚡⚡⚡ | Fast CDN |
| **GitHub Pages** | ✅ Yes | ⚡⚡⚡ | Simple projects |

---

## 📝 Step-by-Step Deployment

### Option 1: Vercel (Recommended) ⚡

#### Step 1: Account Setup
1. [Vercel.com](https://vercel.com) par jao
2. "Sign Up" click karo
3. GitHub account se login karo

#### Step 2: Import Project
1. Dashboard me "Add New Project" click karo
2. Apna GitHub repository select karo
3. Project settings configure karo:
   - **Framework Preset**: Vite
   - **Root Directory**: `Netlee-Frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

#### Step 3: Environment Variables
1. "Environment Variables" section me jao
2. Add karo:
   ```
   VITE_API_URL=https://your-backend-url.com/api
   ```
   **Important**: Production, Preview, aur Development - teeno environments me add karo

#### Step 4: Deploy
1. "Deploy" button click karo
2. Build process automatically start ho jayega
3. Deployment complete hone ke baad frontend URL milega
   - Example: `https://netlee-frontend.vercel.app`

#### Step 5: Custom Domain (Optional)
1. Project settings me "Domains" section me jao
2. Apna domain add karo
3. DNS records configure karo (Vercel instructions follow karo)

---

### Option 2: Netlify 🌐

#### Step 1: Account Setup
1. [Netlify.com](https://netlify.com) par account banao
2. GitHub se connect karo

#### Step 2: Deploy Site
1. "Add new site" → "Import an existing project" click karo
2. GitHub repository select karo
3. Build settings configure karo:
   - **Base directory**: `Netlee-Frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `Netlee-Frontend/dist`

#### Step 3: Environment Variables
1. Site settings → "Environment variables" me jao
2. Add karo:
   ```
   VITE_API_URL=https://your-backend-url.com/api
   ```

#### Step 4: Deploy
1. "Deploy site" click karo
2. Deployment URL milega (e.g., `https://random-name-123.netlify.app`)

#### Step 5: Custom Domain
1. Site settings → "Domain management"
2. "Add custom domain" click karo
3. DNS configuration follow karo

---

### Option 3: Cloudflare Pages 🚀

#### Step 1: Account Setup
1. [Cloudflare Pages](https://pages.cloudflare.com) par jao
2. GitHub account se connect karo

#### Step 2: Create Project
1. "Create a project" click karo
2. Repository select karo
3. Build settings:
   - **Framework preset**: Vite
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Root directory**: `Netlee-Frontend`

#### Step 3: Environment Variables
1. Settings → "Environment variables" me jao
2. Add karo:
   ```
   VITE_API_URL=https://your-backend-url.com/api
   ```

#### Step 4: Deploy
1. "Save and Deploy" click karo
2. Deployment URL: `https://your-project.pages.dev`

---

### Option 4: Manual Build & Deploy 📦

Agar aap manual deployment chahte hain:

```bash
# 1. Build production files
cd Netlee-Frontend
npm install
npm run build

# 2. Build files `dist` folder me generate honge
# 3. `dist` folder ki contents ko kisi bhi static hosting par upload karo:
#    - GitHub Pages
#    - AWS S3
#    - Any web server (Nginx, Apache)
```

**Nginx Configuration Example:**
```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /var/www/netlee-frontend/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

---

## ✅ Post-Deployment

### 1. Test Application

1. Frontend URL open karo browser me
2. Login/Register functionality test karo
3. Movie listing check karo
4. Video playback test karo
5. Search functionality verify karo

### 2. Update Backend CORS

Backend me CORS configuration update karo taaki frontend se requests accept ho:

```javascript
// Netlee-Backend/server.js
app.use(cors({
    origin: [
        "https://your-frontend-url.vercel.app",
        "https://your-frontend-url.netlify.app"
    ],
    credentials: true
}));
```

### 3. Check Console for Errors

Browser DevTools (F12) me Console tab check karo:
- API connection errors
- CORS errors
- Environment variable issues

---

## 🔍 Troubleshooting

### Issue 1: Environment Variables Not Working

**Error**: `VITE_API_URL` is undefined

**Solution**:
- ✅ Environment variable me `VITE_` prefix hai ya nahi check karo
- ✅ Vercel/Netlify me variables properly set hain ya nahi
- ✅ Build ke baad variables add kiye to rebuild karo
- ✅ `import.meta.env.VITE_API_URL` use kar rahe hain ya nahi verify karo

### Issue 2: API Connection Failed

**Error**: `Network Error` ya `CORS Error`

**Solution**:
- ✅ Backend URL sahi hai ya nahi check karo
- ✅ Backend server running hai ya nahi
- ✅ Backend CORS me frontend URL include hai ya nahi
- ✅ HTTPS/HTTP mismatch nahi hai na

### Issue 3: Build Failed

**Error**: Build process fail ho raha hai

**Solution**:
```bash
# Dependencies reinstall karo
rm -rf node_modules package-lock.json
npm install

# Build again
npm run build

# Check for specific errors in build logs
```

### Issue 4: 404 Error on Refresh

**Error**: Page refresh karne par 404 error

**Solution**:
- ✅ Vercel: Automatic handling (no config needed)
- ✅ Netlify: `_redirects` file banao `public` folder me:
  ```
  /*    /index.html   200
  ```
- ✅ Nginx: `try_files $uri $uri/ /index.html;` add karo

### Issue 5: Assets Not Loading

**Error**: Images/CSS/JS files load nahi ho rahe

**Solution**:
- ✅ `vite.config.js` me base path sahi set hai ya nahi
- ✅ Build output directory correct hai ya nahi
- ✅ CDN/Server me file paths sahi hain ya nahi

### Issue 6: Slow Loading

**Error**: Application slow load ho raha hai

**Solution**:
- ✅ Image optimization karo
- ✅ Code splitting enable karo
- ✅ Lazy loading implement karo
- ✅ CDN use karo for assets

---

## 🎨 Build Optimization

### Production Build Tips

1. **Code Splitting**: Vite automatically code splitting karta hai
2. **Tree Shaking**: Unused code automatically remove hota hai
3. **Minification**: Production build me code minified hota hai
4. **Asset Optimization**: Images aur fonts optimize hote hain

### Performance Checklist

- [ ] Images optimized (WebP format use karo)
- [ ] Lazy loading implemented
- [ ] Code splitting working
- [ ] Bundle size reasonable (< 500KB)
- [ ] Lighthouse score > 90

---

## 📱 Mobile Responsiveness

Frontend mobile-friendly hai:
- ✅ Tailwind CSS responsive classes use kiye gaye hain
- ✅ Touch-friendly buttons
- ✅ Mobile navigation
- ✅ Responsive video player

Test karo different screen sizes par:
- Desktop (1920x1080)
- Tablet (768x1024)
- Mobile (375x667)

---

## 🔒 Security Considerations

1. **API Keys**: Frontend me sensitive keys expose mat karo
2. **XSS Protection**: React automatically XSS se protect karta hai
3. **HTTPS**: Always HTTPS use karo production me
4. **CSP Headers**: Content Security Policy headers add karo

---

## 📚 Additional Resources

- [Vite Documentation](https://vite.dev/)
- [React Documentation](https://react.dev/)
- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Documentation](https://docs.netlify.com/)
- [Tailwind CSS](https://tailwindcss.com/docs)

---

## ✅ Deployment Checklist

- [ ] Environment variables configured (`VITE_API_URL`)
- [ ] Backend API URL updated
- [ ] Build successful locally
- [ ] Frontend deployed successfully
- [ ] All pages working
- [ ] API connections working
- [ ] Mobile responsive tested
- [ ] Performance optimized
- [ ] Custom domain configured (optional)

---

**Frontend URL**: `https://your-frontend-url.com`  
**Backend API**: `https://your-backend-url.com/api`  
**Status**: ✅ Deployed & Running

*Koi bhi issue ho to GitHub Issues me post karein!*
