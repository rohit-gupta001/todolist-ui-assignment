import { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
	output: "export",
	eslint: {
		ignoreDuringBuilds: true,
	},
	images: { unoptimized: true },
};

export default nextConfig;
