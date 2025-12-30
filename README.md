# International Hotel School - Landing Page

A high-conversion, premium homepage for the International Hotel School built with **React**, **TypeScript**, and **Tailwind CSS**.

---

## 🚀 Fire It Up

```bash
chmod +x start.sh
./start.sh
```   

---

## 🚀 Features

- Fully responsive landing page
- Hero, course offerings, modals, and dynamic content
- State management via React Context
- Tailwind CSS for rapid styling
- Optional public sharing via ngrok

---

## 🖥️ Prerequisites

- [Visual Studio Code](https://code.visualstudio.com/)
- [Docker Desktop](https://www.docker.com/products/docker-desktop)
- [Node.js](https://nodejs.org/) v18+ (if not using Docker)
- Optional: [ngrok account](https://ngrok.com/) for public URL

---

## ⚡ Quick Start

You can run this project **via Docker (recommended)** or **Node.js**.

---

### Option 1: Running with Docker (Recommended)

1. Clone or download the repository.
2. Open the project folder in VS Code.
3. Make the start script executable:

```bash
chmod +x start.sh
```

4. Start the app and ngrok:

```bash
./start.sh
```

5. The script will automatically:
   - Stop any running containers
   - Build and start the app container
   - Start ngrok for a public URL (if compatible)
6. Once started, you'll see:
   - Local URL: http://localhost:5173
   - Public URL (ngrok): e.g., https://your-app.ngrok-free.dev

---

### Option 2: Running with Node.js Directly

1. Ensure Node.js v18+ is installed.
2. Open a terminal in the project folder.
3. Install dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm run dev -- --host 0.0.0.0
```

5. Open your browser:

http://localhost:5173

---

## 🛠️ Docker + Ngrok Known Issues & Solutions

1. **Ngrok Docker Image Fails on Apple Silicon / ARM**
   - Problem: `platform (linux/amd64) does not match host (linux/arm64/v8)` or `manifest not found`.
   - Solution: Use the ngrok CLI instead of Docker. Authenticate and run:

     ```bash
     ngrok authtoken <YOUR_NGROK_TOKEN>
     ngrok http 5173
     ```

2. **Ngrok Fails to Start in Docker**
   - Problem: `exec: "http": executable file not found in $PATH`
   - Cause: Docker image incompatible with host architecture
   - Fix: Switch to native ngrok CLI as above.

3. **Docker Compose Warnings**
   - `WARN: The "VITE_PORT" variable is not set.` → optionally define in `.env`
   - `WARN: the attribute 'version' is obsolete` → remove `version: '3'` from `docker-compose.yml`

4. **Public URL Not Appearing**
   - Cause: Ngrok container failed
   - Fix: Run ngrok manually:

     ```bash
     ngrok http 5173
     ```

5. **App Fails to Start**
   - Cause: Node/npm issues inside Docker
   - Fix: Run locally with Node.js:

     ```bash
     npm install
     npm run dev -- --host 0.0.0.0
     ```

---

## 🏗️ Project Structure

```
├─ components/       # React components (Hero, Offerings, Modals, etc.)
├─ context/          # React Context for state management
├─ constants.tsx     # Data for courses, links, and content
├─ types.ts          # TypeScript interfaces
├─ index.tsx         # Application entry point
├─ start.sh          # Docker + ngrok startup script
├─ docker-compose.yml
└─ .env              # Environment variables (e.g., NGROK_AUTHTOKEN)
```

---

## 🎨 Styling

- Tailwind CSS is used for styling
- Currently loaded via CDN in `index.html` for simplicity
- Fully compatible with a standard React + Vite setup

---

## 📦 Scripts

| Command | Description |
|---------|-------------|
| `./start.sh` | Start Docker containers + ngrok tunnel |
| `npm install` | Install dependencies |
| `npm run dev -- --host 0.0.0.0` | Start Vite development server |
| `docker-compose down -v` | Stop containers and remove volumes |
| `docker system prune -f` | Remove unused Docker objects |

---

## 🔧 Troubleshooting

1. **Ngrok fails** → Run CLI manually: `ngrok http 5173`
2. **Docker Compose fails** → Ensure your `.env` is present and contains `NGROK_AUTHTOKEN`
3. **Port conflicts** → Check if 5173 is free or adjust `docker-compose.yml`
4. **Apple Silicon (M1/M2)** → Some images may not have arm64 support; fallback to CLI

---

## ✅ Notes

- Changes to code reload automatically in development
- Use ngrok only if you need public access
- For production deployment, consider a proper hosting solution (Vercel, Netlify, or similar)

---

This README now:

- Covers **Docker setup**, **ngrok issues**, and **Apple Silicon quirks**
- Includes **CLI fallback** instructions
- Provides **project structure, scripts, troubleshooting**
- Is formatted in **Markdown for GitHub**
Cause: Ngrok container failed

Fix: Run ngrok manually:

bash
Copy code
ngrok http 5173
5. App Fails to Start
Cause: Node/npm issues inside Docker

Fix: Run locally with Node.js:

bash
Copy code
npm install
npm run dev -- --host 0.0.0.0
🏗️ Project Structure
bash
Copy code
├─ components/       # React components (Hero, Offerings, Modals, etc.)
├─ context/          # React Context for state management
├─ constants.tsx     # Data for courses, links, and content
├─ types.ts          # TypeScript interfaces
├─ index.tsx         # Application entry point
├─ start.sh          # Docker + ngrok startup script
├─ docker-compose.yml
└─ .env              # Environment variables (e.g., NGROK_AUTHTOKEN)
🎨 Styling
Tailwind CSS is used for styling

Currently loaded via CDN in index.html for simplicity

Fully compatible with a standard React + Vite setup

📦 Scripts
Command	Description
./start.sh	Start Docker containers + ngrok tunnel
npm install	Install dependencies
npm run dev -- --host 0.0.0.0	Start Vite development server
docker-compose down -v	Stop containers and remove volumes
docker system prune -f	Remove unused Docker objects

🔧 Troubleshooting
Ngrok fails → Run CLI manually: ngrok http 5173

Docker Compose fails → Ensure your .env is present and contains NGROK_AUTHTOKEN

Port conflicts → Check if 5173 is free or adjust docker-compose.yml

Apple Silicon (M1/M2) → Some images may not have arm64 support; fallback to CLI

✅ Notes
Changes to code reload automatically in development

Use ngrok only if you need public access

For production deployment, consider a proper hosting solution (Vercel, Netlify, or similar)

markdown
Copy code

This README now:  

- Covers **Docker setup**, **ngrok issues**, and **Apple Silicon quirks**  
- Includes **CLI fallback** instructions  
- Provides **project structure, scripts, troubleshooting**  
- Is formatted in **Markdown for GitHub**  