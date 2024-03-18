/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        // appDir: true,
    },
    env: {
        API_BASE_URL: process.env.API_BASE_URL,
    },
    images: {
        minimumCacheTTL: 60,
        domains: ['localhost', 'bing-images.bbon.me'],
    },
    // api: {
    //     responseLimit: '8mb',
    // },
    webpack: (config) => {
        config.module.rules.push({
            test: /\.css$/,
            use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
        });

        return config;
    },
};

module.exports = nextConfig;
