/** @type {import('next').NextConfig} */
const nextConfig = {
  // Use static export only when building in GitHub Actions.
  // On Vercel, run full serverless Next.js so API routes work seamlessly.
  ...(process.env.GITHUB_ACTIONS ? { output: 'export' } : {}),
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: '',
  },
};

export default nextConfig;
