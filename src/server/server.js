import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { createServer as createViteServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = process.env.RENDER ? '/opt/render/project/src' : path.join(__dirname, '../../');

const app = express();

app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://houseofcakes.onrender.com'
  ],
  credentials: true
}));

app.use(express.json());

// Initialize Vite in middleware mode
async function createViteMiddleware() {
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa'
  });

  app.use(vite.middlewares);
  return vite;
}

// Start the development server
createViteMiddleware().then(() => {
  console.log('Vite middleware initialized');
}).catch(err => {
  console.error('Error initializing Vite:', err);
});

// Your API endpoints here
app.post('/api/updateFooter', (req, res) => {
  // ... your endpoint code ...
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('Environment:', process.env.NODE_ENV);
  console.log('Root directory:', rootDir);
}); 