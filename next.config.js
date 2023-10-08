/** @type {import('next').NextConfig} */
const nextConfig = { 
    experimental: {
        serverActions: true,
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
                port: '',
                pathname: '/my-bucket/**',
            },
        ],
    },
};

module.exports = nextConfig
