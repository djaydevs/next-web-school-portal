/** @type {import('next').NextConfig} */
const nextConfig = { 
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
