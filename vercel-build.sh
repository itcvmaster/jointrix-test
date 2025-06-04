#!/bin/bash

# Install dependencies for client
cd client
npm install --legacy-peer-deps

# Build client
npm run build

# Go back to root
cd ..

# Install dependencies for server
cd server
npm install

# Build server
npm run build

# Go back to root
cd ..

# Create .vercel directory if it doesn't exist
mkdir -p .vercel

# Copy necessary files for serverless functions
cp -r server/dist .vercel/
cp server/package.json .vercel/ 