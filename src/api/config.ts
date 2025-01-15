// config.ts


export const API_CONFIG = {
    BASE_URL: (import.meta as any).env.VITE_API_BASE_URL || 'https://congness.com/api',
    ENDPOINTS: {
        OCCASIONS: '/occasions',
    },
};
