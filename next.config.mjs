/** @type {import('next').NextConfig} */
const nextConfig = {
	pageExtensions: ["js", "jsx"],
	experimental: {
		appDir: true,
	},
	images: {
		domains: [
			"avatars.githubusercontent.com",
			"github.com",
			"raw.githubusercontent.com",
		],
	},
};

export default nextConfig;
