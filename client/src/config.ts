const config = {
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  port: import.meta.env.VITE_PORT || 5173,
  nodeEnv: import.meta.env.MODE || 'development',
};

export default config; 