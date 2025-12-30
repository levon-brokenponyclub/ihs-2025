for i in $(seq 1 $MAX_RETRIES); do
  if curl --silent http://localhost:$APP_PORT >/dev/null 2>&1; then
    echo "✅ Vite is up!"
    break
  fi
  sleep $SLEEP_INTERVAL
done
