import type { NextConfig } from "next";

// Get repository name from environment or use default
const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1] || 'angelxpress-teacher-portal';
const basePath = process.env.NODE_ENV === 'production' ? `/${repoName}` : '';

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  basePath: basePath,
  assetPrefix: basePath,
};

export default nextConfig;
