#!/bin/bash
set -e

APP_PORT=5173

echo "🧹 Stopping existing containers..."
docker compose down --remove-orphans

echo "🚀 Starting app container..."
docker compose up -d --remove-orphans

echo ""
echo "💻 Local URL: http://localhost:$APP_PORT"

# Check if ngrok is installed
if ! command -v ngrok >/dev/null 2>&1; then
  echo "⚠️ Ngrok not installed. Install it first: https://ngrok.com/download"
  exit 1
fi

# Kill any existing ngrok process using the port
pkill -f "ngrok http $APP_PORT" || true

echo "⏳ Starting ngrok tunnel..."
# Start ngrok in the background
ngrok http $APP_PORT > /dev/null 2>&1 &

# Wait for ngrok tunnel to be available
NGROK_URL=""
for i in {1..15}; do
  NGROK_URL=$(curl --silent http://127.0.0.1:4040/api/tunnels \
    | grep -o '"public_url":"https:[^"]*' \
    | sed 's/"public_url":"//')
  if [ -n "$NGROK_URL" ]; then
    break
  fi
  sleep 1
done

if [ -z "$NGROK_URL" ]; then
  echo "❌ Ngrok failed to start. Try running manually: ngrok http $APP_PORT"
  exit 1
fi

# Show dashboard URL
echo "🌐 Ngrok Dashboard: http://127.0.0.1:4040"
echo "✅ Public URL: $NGROK_URL"

# Auto-open in browser
if command -v open >/dev/null 2>&1; then
  open "$NGROK_URL"
elif command -v xdg-open >/dev/null 2>&1; then
  xdg-open "$NGROK_URL"
fi
