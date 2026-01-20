# WebWaka SVM Suite - Control

## Overview
This is the control layer module for the WebWaka SVM (Support Vector Machine) Suite. It serves as a substrate/skeleton project that can be extended with specific control functionality.

## Project Structure
- `index.js` - Main entry point, runs a simple HTTP server on port 5000
- `module.manifest.json` - Module configuration and metadata
- `module.contract.md` - API contract documentation (to be defined)
- `package.json` - Node.js project configuration

## Running the Application
The application runs via the "Start application" workflow which executes `node index.js` and serves on port 5000.

## API Endpoints
- `GET /` - Returns HTML status page
- `GET /health` or `/api/health` - Health check endpoint (JSON)
- `GET /api/manifest` - Returns module manifest (JSON)

## Technical Details
- Runtime: Node.js 20
- Port: 5000
- Host: 0.0.0.0 (binds to all interfaces)

## Recent Changes
- 2026-01-20: Initial Replit setup with basic HTTP server
