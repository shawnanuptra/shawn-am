/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  compiler: {
    styledComponents: true
  },
  experimental: {
    serverComponentsExternalPackages: ['highlight.js'],
  },
};

export default nextConfig;
