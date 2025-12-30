
# International Hotel School - Landing Page

A high-conversion, premium homepage for the International Hotel School built with React, TypeScript, and Tailwind CSS.

## 🚀 Setup Instructions (Local Development)

You can run this project locally using **Docker** (recommended) or **Node.js** directly.

### Prerequisites

*   [Visual Studio Code](https://code.visualstudio.com/)
*   [Docker Desktop](https://www.docker.com/products/docker-desktop/)

### Option 1: Running with Docker (Recommended)

1.  **Clone/Download** this repository to a folder on your computer.
2.  Open the folder in **VS Code**.
3.  Open a terminal in VS Code and run:
    ```bash
    docker-compose up
    ```
4.  Wait for the installation to complete. Once you see "Vite vX.X.X ready", open your browser.
5.  Go to **[http://localhost:5173](http://localhost:5173)**.

*Note: Changes you make to files in VS Code will automatically reload the page.*

### Option 2: Running with Node.js

1.  Ensure you have [Node.js](https://nodejs.org/) installed (v18+).
2.  Open a terminal in the project folder.
3.  Install dependencies:
    ```bash
    npm install
    ```
4.  Start the development server:
    ```bash
    npm run dev
    ```
5.  Open **[http://localhost:5173](http://localhost:5173)**.

## 🛠️ Project Structure

*   `components/`: UI components (Hero, Offerings, Modals, etc.)
*   `context/`: React Context for state management (Cart, Compare)
*   `constants.tsx`: Data for courses, links, and content.
*   `types.ts`: TypeScript interfaces.
*   `index.tsx`: Application entry point.

## 🎨 Styling

Styling is handled via Tailwind CSS (currently loaded via CDN in `index.html` for simplicity, but fully compatible with the standard React + Vite setup).
