#!/bin/bash
APP_PORT=${APP_PORT:-5173}
MAX_RETRIES=${MAX_RETRIES:-30}
SLEEP_INTERVAL=${SLEEP_INTERVAL:-1}

echo "🧹 Removing stale constants.ts to prevent conflicts..."
rm -f constants.ts

echo "🛑 Stopping any running containers..."
docker-compose down

echo "🚀 Starting application..."
docker-compose up -d

echo "⏳ Waiting for Vite to be ready..."
for i in $(seq 1 $MAX_RETRIES); do
  if curl --silent http://localhost:$APP_PORT >/dev/null 2>&1; then
    echo "✅ Vite is up!"
    exit 0
  fi
  sleep $SLEEP_INTERVAL
done

echo "❌ Timed out waiting for Vite."
exit 1
