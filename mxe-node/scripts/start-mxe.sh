#!/bin/bash
# scripts/start-mxe.sh

echo "🚀 Starting Arcium MXE Node..."
docker build -t arcium-mxe .
docker run -d --name arcium-mxe -p 8080:8080 arcium-mxe
echo "✅ Node is running on port 8080"
