/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    trailingSlash: true,
    images: {
        unoptimized: true
    },
    basePath: '/hedge-fund-landing',
    assetPrefix: '/hedge-fund-landing/',
};

export default nextConfig;
