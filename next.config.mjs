/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true
  },
  experimental: {
    serverComponentsExternalPackages: ['highlight.js'],
  },
};

export default nextConfig;
