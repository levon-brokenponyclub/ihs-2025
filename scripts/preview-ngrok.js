#!/usr/bin/env node
// Small script to run `vite preview` and expose it via ngrok.
// - Uses PORT env or default 5173
// - Starts `vite preview --port <PORT>` as a child process
// - Waits for port to be reachable then starts ngrok programmatically
// - Prints public URL and cleans up on exit

import { spawn } from 'child_process';
import ngrok from 'ngrok';
import waitPort from 'wait-port';

const PORT = process.env.PORT ? Number(process.env.PORT) : 5173;
const NGROK_AUTHTOKEN = process.env.NGROK_AUTHTOKEN || process.env.NGROK_TOKEN || undefined;
const NGROK_HOSTNAME = process.env.NGROK_HOSTNAME || undefined;

async function main() {
  // Force kill any existing ngrok process using system command
  try {
    execSync('pkill ngrok || true');
    await new Promise(r => setTimeout(r, 500)); // wait for cleanup
  } catch (e) {
    // ignore
  }

  // Also clean up any wrapper state if possible
  try {
    await ngrok.kill();
  } catch (e) { /* ignore */ }

  console.log(`Starting vite preview on port ${PORT}...`);

  const vite = spawn('npx', ['vite', 'preview', '--port', String(PORT), '--strictPort'], { stdio: 'inherit' });

  const cleanup = async () => {
    try {
      if (vite && !vite.killed) vite.kill('SIGTERM');
      await ngrok.disconnect();
      await ngrok.kill();
    } catch (err) {
      // ignore
    }
    process.exit();
  };

  process.on('SIGINT', cleanup);
  process.on('SIGTERM', cleanup);
  process.on('exit', cleanup);

  console.log('Waiting for the preview server to be ready...');
  const open = await waitPort({ host: '127.0.0.1', port: PORT, timeout: 30000 });
  if (!open) {
    console.error('Timed out waiting for the preview server to open the port.');
    process.exit(1);
  }

  try {
    if (NGROK_AUTHTOKEN) {
      await ngrok.authtoken(NGROK_AUTHTOKEN);
    }

    const options = {};
    if (NGROK_HOSTNAME) options.hostname = NGROK_HOSTNAME;

    let url;
    try {
      url = await ngrok.connect({ addr: PORT, ...options });
    } catch (connectErr) {
      const errDetail = connectErr?.body?.details?.err || JSON.stringify(connectErr);
      if (errDetail.includes('already exists')) {
        console.log('Tunnel already exists, retrieving URL...');
        try {
          // Fetch status from local ngrok API
          const response = await fetch('http://127.0.0.1:4040/api/tunnels');
          if (!response.ok) throw new Error('Failed to fetch tunnels');

          const data = await response.json();
          console.log('Available tunnels:', JSON.stringify(data.tunnels, null, 2));
          // Find tunnel pointing to our port
          const tunnel = data.tunnels.find(t => t.config?.addr?.includes(String(PORT)));

          if (tunnel) {
            url = tunnel.public_url;
          } else {
            console.error('Could not find active tunnel for port', PORT);
            throw connectErr;
          }
        } catch (fetchErr) {
          console.error('Failed to recover existing tunnel:', fetchErr);
          throw connectErr;
        }
      } else {
        throw connectErr;
      }
    }

    console.log(`ngrok tunnel established: ${url}`);
    console.log('Press Ctrl+C to stop the preview and tunnel.');
  } catch (err) {
    console.error('Failed to start ngrok:', err);
    await cleanup();
  }
}

main();
