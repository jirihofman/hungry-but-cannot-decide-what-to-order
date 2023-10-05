/** @type {import('next').NextConfig} */
const nextConfig = {
	pageExtensions: ["js", "jsx"],
	images: {
		domains: [
			"avatars.githubusercontent.com",
			"github.com",
			"raw.githubusercontent.com",
		],
	},
};

export default nextConfig;
