/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true,
    },
    // webpack: (config) => {
    //     config.module.rules.push({
    //         test: /\.css$/,
    //         use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
    //     });

    //     return config;
    // },
};

module.exports = nextConfig;
