# Vastro Robotics – Web

This is the official website for **Vastro Robotics**—a public-facing, single-page scroll site built to establish a strong and modern web presence for our project.

---

## Project Drive

This repo is part of a larger project coordinated through Google Drive.  
For documentation, design files, meeting notes, and planning materials, visit:

➡️ [Vastro Robotics Google Drive](https://drive.google.com/drive/u/1/folders/0ADK3K5qnp9v_Uk9PVA)

---

## Overview

The site is structured as a **scroll-driven journey**, with each section acting as a distinct stage in the user experience. These stages are defined as components inside `App.jsx` and dynamically animated using React, Tailwind CSS, and Framer Motion.

---

## Tech Stack

- **React** – core UI framework
- **Vite** – fast, modern build tool
- **Tailwind CSS** – styling framework
- **Framer Motion** – animation and transition handling

---

## Structure

<pre><code>
VastroRobotics/Web
├── public/                # Static assets (favicon, fonts, etc.)
├── src/
│   ├── assets/            # Images, videos, and media (logos, team, etc.)
│   ├── components/        # Reusable UI components (Glow, ScrollBar, etc.)
│   ├── sections/          # Scroll stages (Home, Mission, Team, etc.)
│   ├── App.jsx            # Scroll journey root
│   ├── main.jsx           # App entry point
│   ├── App.css            # Global and Tailwind styles
│   └── index.css
├── vite.config.js         # Vite config
├── package.json           # Project metadata and dependencies
└── README.md              # Project info and usage
</code></pre>

---

## Deployment

The site is designed to be statically deployed (e.g. Netlify, Vercel, GitHub Pages).

For local dev:
```bash
npm install
npm run dev
```

To build:

```bash
npm run build
```

---

## License

All Rights Reserved.  
© 2025 Vastro Robotics

See [LICENSE](./LICENSE) for details.

---

## Credits

Designed and developed by the Vastro Robotics team.  
This website was created to showcase our mission, technology, and collaborators as part of the Virtual Astronaut project.
