/** @type {import('next').NextConfig} */
const defaultBasePath = '/hedge-fund-landing';
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? (process.env.VERCEL === '1' ? '' : defaultBasePath);

const nextConfig = {
    output: 'export',
    trailingSlash: true,
    images: {
        unoptimized: true
    },
    ...(basePath ? { basePath, assetPrefix: `${basePath}/` } : {}),
};

export default nextConfig;
