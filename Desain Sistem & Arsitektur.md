🧱 Arsitektur Frontend
Seluruh aplikasi dibangun sebagai Client-Side Single Page Application (SPA) tanpa backend, memanfaatkan sepenuhnya API browser.

text
[Browser]
│
├── 📷 Media Capture API (getUserMedia)
│   └── Video Stream → <video> element → Canvas Renderer
│
├── 🎨 Canvas Pipeline (HTML5 Canvas 2D)
│   ├── Layer 1: Live Video / Background (Green Screen)
│   ├── Layer 2: Filter (CSS Filter / Canvas Pixel Manipulation)
│   ├── Layer 3: Frame & Layout Mask
│   └── Layer 4: Sticker Overlay (Interactive)
│
├── 🔊 Web Audio API
│   └── SFX Scheduler (Countdown beep, shutter sound)
│
├── 💾 Session Storage & IndexedDB
│   └── Temporary Image Blob → Gallery State
│
└── 🔗 Web Share API / Download API
    └── Share intent (mobile) atau Blob download (desktop)
🧩 Tech Stack yang Diusulkan
Framework: React (dengan Vite) atau Vanilla JS bila ingin ringan.

Styling: Tailwind CSS + CSS Modules untuk animasi performant.

Canvas Manipulation: react-konva (jika pakai React) atau canvas API murni untuk performa tinggi.

State Management: Zustand / React Context (React) atau Observer Pattern (Vanilla).

