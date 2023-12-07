/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ["openweathermap.org"],
	},
	reactStrictMode: true,
	env: {
		NEXT_PUBLIC_SERVICE_BASE: process.env.NEXT_PUBLIC_SERVICE_BASE,
		NEXT_PUBLIC_KEY: process.env.NEXT_PUBLIC_KEY,
		NEXT_PUBLIC_PRIVATE_KEY: process.env.NEXT_PUBLIC_PRIVATE_KEY,
		NEXT_PUBLIC_URL_ENDPOINT: process.env.NEXT_PUBLIC_URL_ENDPOINT,
		NEXT_PUBLIC_OPEN_WEATHER_MAP_API_KEY: process.env.NEXT_PUBLIC_OPEN_WEATHER_MAP_API_KEY,
		NEXT_WEATHER_API_KEY: process.env.NEXT_WEATHER_API_KEY,
	},
	async headers() {
		return [
			{
				//matching all API routes
				// https://vercel.com/guides/how-to-enable-cors
				source: "/api/:path*",
				headers: [
					{ key: "Access-Control-Allow-Credentials", value: "true" },
					{ key: "Access-Control-Allow-Origin", value: "*" },
					{
						key: "Access-Control-Allow-Methods",
						value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
					},
					{
						key: "Access-Control-Allow-Headers",
						value:
							"X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
					},
				],
			},
		];
	},
};

module.exports = nextConfig;
