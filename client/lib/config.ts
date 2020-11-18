export const dev = process.env.ENV !== 'production';

export const baseURL = dev ? 'http://localhost:8080' : 'productionURL';
