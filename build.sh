#!/bin/bash
echo "Starting build process..."

# Create necessary directories
mkdir -p dist

# Run the build
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
  echo "Build successful"
  
  # List contents of directories
  echo "Contents of current directory:"
  ls -la
  
  echo "Contents of dist directory:"
  ls -la dist/
else
  echo "Build failed"
  exit 1
fi 