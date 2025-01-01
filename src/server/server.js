import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Adjust root directory for Render's environment
const rootDir = process.env.RENDER ? '/opt/render/project' : path.join(__dirname, '../../');
const distDir = path.join(rootDir, 'dist');

const app = express();

console.log('Starting server with paths:', {
  rootDir,
  distDir,
  cwd: process.cwd()
});

// Create dist directory if it doesn't exist
if (!fs.existsSync(distDir)) {
  console.log('Creating dist directory...');
  fs.mkdirSync(distDir, { recursive: true });
}

// Configure CORS
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://houseofcakes.onrender.com'
  ],
  credentials: true
}));

app.use(express.json());

// Serve static files with proper MIME types
app.use(express.static(distDir, {
  setHeaders: (res, path) => {
    if (path.endsWith('.js')) {
      res.setHeader('Content-Type', 'application/javascript');
    } else if (path.endsWith('.css')) {
      res.setHeader('Content-Type', 'text/css');
    }
  }
}));

// API routes
app.post('/api/updateFooter', (req, res) => {
  // ... your endpoint code ...
});

// Serve index.html for all routes
app.get('*', (req, res) => {
  console.log('Attempting to serve:', req.path);
  
  // Try multiple possible locations for index.html
  const possiblePaths = [
    path.join(distDir, 'index.html'),
    path.join(rootDir, 'dist/index.html'),
    path.join(process.cwd(), 'dist/index.html'),
    path.join(rootDir, 'public/index.html'),
    path.join(rootDir, 'index.html')
  ];

  console.log('Checking paths:', possiblePaths);

  for (const indexPath of possiblePaths) {
    if (fs.existsSync(indexPath)) {
      console.log('Found index.html at:', indexPath);
      return res.sendFile(indexPath);
    }
  }

  // If no index.html is found, list directory contents
  try {
    const rootContents = fs.readdirSync(rootDir);
    const distContents = fs.existsSync(distDir) ? fs.readdirSync(distDir) : [];

    res.status(404).json({
      error: 'Application files not found',
      directories: {
        root: rootContents,
        dist: distContents
      },
      paths: {
        root: rootDir,
        dist: distDir,
        cwd: process.cwd()
      }
    });
  } catch (error) {
    res.status(500).json({
      error: 'Server error',
      message: error.message
    });
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('Environment:', process.env.NODE_ENV);
}); 