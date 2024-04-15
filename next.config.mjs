import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const nextConfig = {
    sassOptions: {
        includePaths: [join(__dirname, 'styles')],
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'mks-sistemas.nyc3.digitaloceanspaces.com',
                port: '',
            },
        ],
    },
};

export default nextConfig;