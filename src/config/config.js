const isDevelopment = import.meta.env.MODE === 'development';

export const API_BASE_URL = isDevelopment 
  ? 'http://localhost:3001' 
  : 'https://houseofcakes.onrender.com'; 

VITE_API_URL=https://houseofcake-git-main-wilfred1097s-projects.vercel.app