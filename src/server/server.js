import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = path.join(__dirname, '../../');

const app = express();

// Configure CORS for both development and production
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
  const distPath = path.join(rootDir, 'dist');
  console.log('Serving static files from:', distPath);
  
  // Check if dist directory exists
  if (!fs.existsSync(distPath)) {
    console.error('dist directory not found at:', distPath);
    fs.mkdirSync(distPath, { recursive: true });
  }
  
  app.use(express.static(distPath));
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

// Handle all other routes in production
app.get('*', (req, res) => {
  if (process.env.NODE_ENV === 'production') {
    const indexPath = path.join(rootDir, 'dist', 'index.html');
    console.log('Trying to serve:', indexPath);
    
    if (fs.existsSync(indexPath)) {
      res.sendFile(indexPath);
    } else {
      console.error('index.html not found at:', indexPath);
      res.status(404).send('Application not properly built. Please check the build process.');
    }
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('Environment:', process.env.NODE_ENV);
  console.log('Root directory:', rootDir);
}); 