/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	compiler: {
		styledComponents: true,
	},
	experimental: {
		serverComponentsExternalPackages: ["highlight.js"],
	},
	images: {
		domains: ["cdn.sanity.io", "via.placeholder.com"],
	},
};

export default nextConfig;
