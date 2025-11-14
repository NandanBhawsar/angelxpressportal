# Deployment Guide - GitHub Pages

This guide will help you deploy the AngelXpress Portal to GitHub Pages.

## Step 1: Create GitHub Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click the "+" icon in the top right → "New repository"
3. Name your repository (e.g., `angelxpress-teacher-portal`)
4. Make it **Public** (required for free GitHub Pages)
5. **DO NOT** initialize with README, .gitignore, or license
6. Click "Create repository"

## Step 2: Push Code to GitHub

Run these commands in your terminal (replace `YOUR_USERNAME` and `REPO_NAME` with your actual values):

```bash
cd "/Users/jeetruia/Desktop/ANGEL EXPRESS/angelxpress-teacher-portal"

# Add all files
git add -A

# Commit changes
git commit -m "Initial commit: AngelXpress Teacher & Student Portal"

# Add remote (replace YOUR_USERNAME and REPO_NAME)
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** tab
3. Scroll down to **Pages** section (left sidebar)
4. Under **Source**, select:
   - **Source**: `GitHub Actions`
5. The GitHub Actions workflow will automatically deploy your site

## Step 4: Update Base Path (if needed)

If your repository name is different from `angelxpress-teacher-portal`, update `next.config.ts`:

```typescript
const repoName = 'your-actual-repo-name';
```

Or set it via environment variable in GitHub Actions.

## Step 5: Access Your Site

After deployment (usually takes 2-5 minutes), your site will be available at:
- `https://YOUR_USERNAME.github.io/REPO_NAME/`

## Troubleshooting

### Build Fails
- Check GitHub Actions tab for error logs
- Ensure all dependencies are in `package.json`
- Verify Node.js version in workflow (currently set to 20)

### 404 Errors
- Verify `basePath` in `next.config.ts` matches your repo name
- Check that `trailingSlash: true` is set
- Ensure GitHub Pages source is set to "GitHub Actions"

### Dynamic Routes Not Working
- GitHub Pages only supports static sites
- Dynamic routes like `/student/quizzes/[id]` need to be pre-generated
- Consider using Vercel for full Next.js support

## Alternative: Deploy to Vercel (Recommended for Next.js)

Vercel is better suited for Next.js apps and offers:
- Free hosting
- Automatic deployments
- Full Next.js features (including dynamic routes)
- Custom domains

1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Import your repository
4. Deploy (automatic)

## Notes

- GitHub Pages is free but has limitations with Next.js dynamic features
- For production use, consider Vercel or Netlify
- The site will rebuild automatically on every push to `main` branch

