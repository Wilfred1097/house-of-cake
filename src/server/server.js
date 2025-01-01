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

app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://houseofcakes.onrender.com'
  ],
  credentials: true
}));

app.use(express.json());

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  try {
    // List all files in the root directory
    console.log('Root directory contents:', fs.readdirSync(rootDir));
    
    if (fs.existsSync(distDir)) {
      console.log('Dist directory contents:', fs.readdirSync(distDir));
    } else {
      console.log('Dist directory does not exist');
    }

    app.use(express.static(distDir));
    console.log('Static middleware configured for:', distDir);
  } catch (error) {
    console.error('Error setting up static files:', error);
  }
}

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

// Serve index.html for all routes in production
app.get('*', (req, res) => {
  if (process.env.NODE_ENV === 'production') {
    const indexPath = path.join(distDir, 'index.html');
    
    try {
      if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
      } else {
        // Try to find index.html in other possible locations
        const possiblePaths = [
          path.join(rootDir, 'index.html'),
          path.join(rootDir, 'public', 'index.html'),
          path.join(rootDir, 'build', 'index.html')
        ];

        for (const p of possiblePaths) {
          if (fs.existsSync(p)) {
            console.log('Found index.html at:', p);
            return res.sendFile(p);
          }
        }

        throw new Error('index.html not found');
      }
    } catch (error) {
      console.error('Error serving index.html:', error);
      res.status(404).json({
        error: 'Application files not found',
        details: error.message,
        paths: {
          attempted: indexPath,
          current: process.cwd(),
          root: rootDir,
          dist: distDir
        },
        env: {
          NODE_ENV: process.env.NODE_ENV,
          RENDER: process.env.RENDER
        }
      });
    }
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('Environment:', process.env.NODE_ENV);
}); 