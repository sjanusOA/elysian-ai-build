# GitHub Setup Guide for Elysian Build Website

## 🚀 Quick Setup Options

### Option 1: GitHub Desktop (Recommended - Easiest)

1. **Download GitHub Desktop**
   - Go to https://desktop.github.com/
   - Download and install GitHub Desktop
   - Sign in with your GitHub account

2. **Create Repository**
   - Click "Create a new repository on GitHub"
   - Name it: `elysian-build-website`
   - Description: `Luxury Home Builder Website for Elysian Build`
   - Choose "Public" (so GitHub Pages works)
   - Click "Create repository"

3. **Add Your Files**
   - GitHub Desktop will create a folder
   - Copy all files from your current project folder into the new repository folder
   - GitHub Desktop will show all files as "new"
   - Write commit message: "Initial website upload"
   - Click "Commit to main"
   - Click "Push origin" to upload to GitHub

### Option 2: GitHub Web Interface

1. **Create Repository on GitHub.com**
   - Go to https://github.com/new
   - Repository name: `elysian-build-website`
   - Description: `Luxury Home Builder Website for Elysian Build`
   - Choose "Public"
   - Don't initialize with README (we have files already)
   - Click "Create repository"

2. **Upload Files**
   - Click "uploading an existing file"
   - Drag and drop ALL files from your project folder
   - Commit message: "Initial website upload"
   - Click "Commit changes"

### Option 3: Command Line (After installing Xcode tools)

If you want to install Xcode command line tools:
1. Run: `xcode-select --install`
2. Follow the installation prompts
3. Then use the commands below

```bash
# Navigate to your project
cd "/Users/sjanus/Desktop/elysian build website ai"

# Initialize git
git init

# Add all files
git add .

# Commit files
git commit -m "Initial website upload"

# Add GitHub remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/elysian-build-website.git

# Push to GitHub
git push -u origin main
```

## 🌐 Enable GitHub Pages (Make Website Live)

After uploading to GitHub:

1. **Go to your repository** on GitHub.com
2. **Click "Settings"** tab
3. **Scroll down to "Pages"** in the left sidebar
4. **Under "Source"**, select "Deploy from a branch"
5. **Select "main" branch** and "/ (root)" folder
6. **Click "Save"**
7. **Wait 2-3 minutes** for deployment
8. **Your website will be live at**: `https://YOUR_USERNAME.github.io/elysian-build-website`

## 📁 Files to Upload

Make sure you upload ALL these files:
- `index.html`
- `README.md`
- `IMAGE_ORGANIZATION_SUMMARY.md`
- `IMAGE_DOWNLOAD_GUIDE.md`
- `GITHUB_SETUP_GUIDE.md`
- `assets/` folder (with all subfolders)
  - `assets/css/styles.css`
  - `assets/js/script.js`
  - `assets/images/` (all images and subfolders)

## 🔗 Share Your Website

Once GitHub Pages is enabled, you can share your website using:
`https://YOUR_USERNAME.github.io/elysian-build-website`

## 🎯 Benefits of GitHub

- **Free hosting** via GitHub Pages
- **Version control** - track changes to your website
- **Easy sharing** - just send the GitHub Pages URL
- **Professional** - shows your technical skills
- **Collaboration** - others can contribute if needed

## 🆘 Need Help?

If you run into any issues:
1. Make sure your repository is **Public** (GitHub Pages only works with public repos)
2. Wait a few minutes after enabling Pages for deployment
3. Check the "Actions" tab in your repository for any deployment errors
4. Make sure all files uploaded correctly (especially the `assets` folder)

Your luxury home builder website will look amazing once it's live on GitHub Pages! 🏗️✨
