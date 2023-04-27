import "../global.css";
import "../styles/global.css";
import { Inter } from "next/font/google";
import { Analytics } from '@vercel/analytics/react';
import pjson from "../package.json";

/** @type {import('next').Metadata} */
export const metadata = {
	title: {
		default: pjson.name,
		template: "%s | " + pjson.name,
	},
	description: pjson.description,
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
	icons: [
		{
			url: "/favicon.ico",
			rel: "icon",
			sizes: "any",
			type: "image/svg+xml",
		},
	]
};
const inter = Inter({
	subsets: ["latin"],
	variable: "--font-inter",
});

export default function RootLayout({
	children,
}) {
	return (
		<html lang="en" className={inter.variable}>
			<body
				className={`bg-black ${
					process.env.NODE_ENV === "development" ? "debug-screens" : ''
				}`}
			>
				<Analytics />
				{children}
			</body>
		</html>
	);
}
