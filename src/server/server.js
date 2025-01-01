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
const rootDir = process.env.RENDER ? '/opt/render/project/src' : path.join(__dirname, '../../');
const distDir = path.join(rootDir, 'dist');

const app = express();

console.log('Environment Variables:', {
  NODE_ENV: process.env.NODE_ENV,
  RENDER: process.env.RENDER,
  PWD: process.env.PWD
});

console.log('Directories:', {
  rootDir,
  distDir,
  currentDir: process.cwd(),
  dirname: __dirname
});

// Configure MIME types
app.use(express.static(distDir, {
  setHeaders: (res, path) => {
    if (path.endsWith('.js')) {
      res.setHeader('Content-Type', 'application/javascript');
    } else if (path.endsWith('.css')) {
      res.setHeader('Content-Type', 'text/css');
    } else if (path.endsWith('.html')) {
      res.setHeader('Content-Type', 'text/html');
    }
  }
}));

app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://houseofcakes.onrender.com'
  ],
  credentials: true
}));

app.use(express.json());

// Serve index.html and handle client-side routing
app.get('/*', (req, res, next) => {
  if (req.path.includes('.')) {
    next(); // Let express.static handle files with extensions
    return;
  }

  const indexPath = path.join(distDir, 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    console.error('index.html not found at:', indexPath);
    res.status(404).json({
      error: 'Application files not found',
      path: indexPath
    });
  }
});

// Configure multer for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../data/img/'));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// Endpoint to update cakes.js
app.post('/api/updateCakes', (req, res) => {
  const { categories } = req.body;
  const cakesData = `export const cakeCategories = ${JSON.stringify(categories, null, 2)};`;
  
  fs.writeFile('./src/data/cakes.js', cakesData, (err) => {
    if (err) {
      console.error('Error writing file:', err);
      res.status(500).json({ error: 'Failed to update cakes data' });
    } else {
      res.json({ success: true });
    }
  });
});

// Endpoint to handle image upload
app.post('/api/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  
  const imagePath = `/src/data/img/${req.file.filename}`;
  res.json({ imagePath });
});

// Update footer details endpoint
app.post('/api/updateFooter', (req, res) => {
  const { footerDetails } = req.body;
  
  // Get the absolute path to cakes.js
  const cakesFilePath = path.join(__dirname, '../data/cakes.js');
  
  // Read the current content to get cakeCategories
  fs.readFile(cakesFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return res.status(500).json({ error: 'Failed to update footer details' });
    }

    try {
      // Extract cakeCategories from the current file
      const cakeCategoriesMatch = data.match(/export const cakeCategories = (\[[\s\S]*?\]);/);
      const cakeCategories = cakeCategoriesMatch ? cakeCategoriesMatch[1] : '[]';

      // Create the new content
      const updatedContent = `export const cakeCategories = ${cakeCategories};\n\nexport const footerDetails = ${JSON.stringify(footerDetails, null, 2)};`;

      // Write the updated content back to the file
      fs.writeFile(cakesFilePath, updatedContent, (writeErr) => {
        if (writeErr) {
          console.error('Error writing file:', writeErr);
          return res.status(500).json({ error: 'Failed to update footer details' });
        }
        res.json({ success: true });
      });
    } catch (error) {
      console.error('Error processing file:', error);
      res.status(500).json({ error: 'Failed to process file' });
    }
  });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('Environment:', process.env.NODE_ENV);
  console.log('Serving files from:', distDir);
}); 