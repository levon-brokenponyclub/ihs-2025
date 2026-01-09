# International Hotel School - Landing Page

A high-conversion, premium homepage for the International Hotel School built with React, TypeScript, and Tailwind CSS.

---

## 🚀 Getting Started

Choose the method that matches your workflow.

### 1) Run: Docker Only (Local development)

The standard way to spin up the development environment. 

**Prerequisites:** Docker Desktop must be running.

**Commands:**
```bash
chmod +x start.sh
./start.sh
```

**Result:**
- **Local URL:** [http://localhost:5173](http://localhost:5173)
- **Stop:** Press `Ctrl+C` or run `docker-compose down`

> **Note:** If you encounter Docker connection issues (common on some Apple Silicon setups), you can run the project natively:
> ```bash
> npm install
> npm run dev -- --host 0.0.0.0
> ```

---

### 2) Run: Docker + Temporary Public URL

Best for quick client reviews or testing on mobile devices. Uses **ngrok** to tunnel your local host to the internet.

**Prerequisites:** Docker Desktop and [ngrok](https://ngrok.com/) installed.

**Step 1: Start the App**
Open Terminal 1 and run:
```bash
./start.sh
```

**Step 2: Start the Tunnel**
Open Terminal 2 and run:
```bash
ngrok http 5173
```

**Result:**
- Ngrok will generate a secure link (e.g., `https://random-name.ngrok-free.app`). 
- Share this link for external access.

---

### 3) Run: Deploy to Netlify

The recommended method for a permanent, high-performance public demo.

**Step 1: Create Production Build**
Run the following command to compile the project:
```bash
npm run build
```
*Output: This creates an optimized `dist/` folder.*

**Step 2: Deploy**
You have two options:
1.  **Manual (Fastest):** Go to [Netlify Drop](https://app.netlify.com/drop) and drag the newly created `dist` folder onto the page.
2.  **Git (Automated):** Push this code to GitHub and connect the repository in Netlify.
    - **Build Command:** `npm run build`
    - **Publish Directory:** `dist`

---

## 🛠 Project Structure

The project is organized for modularity and ease of maintenance:

- **src/**: Application entry point.
- **components/**:
    - **ui/**: Reusable UI primitives (Buttons, Forms, Accordions).
    - **Main Components**: Hero, Course Cards, Modals, Comparison features.
- **context/**: React Context for global state (Cart, Layout, Transitions).
- **hooks/**: Custom hooks (e.g., `useAnimation`).
- **utils/**: Helper functions and constants.

## 📋 Features

- **Responsive Design**: Mobile-first approach using Tailwind CSS.
- **Interactive UI**:
    - Sticky "Book Now" footers.
    - Comparison tool for selecting courses.
    - Dynamic course filtering.
- **Performance**: Optimized build using Vite.
