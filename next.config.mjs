/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    trailingSlash: true,
    images: {
        unoptimized: true
    },
    // Remove basePath and assetPrefix for GitHub Pages root deployment
    // basePath: '/hedge-fund-landing',
    // assetPrefix: '/hedge-fund-landing/',
};

export default nextConfig;
