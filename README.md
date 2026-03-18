# 🔍 Modern QR Code Scanner

A high-performance, responsive QR Code Scanner built with **Next.js 16.1.7** and **Turbopack**. This application features a professional dark-themed UI, manual camera activation to respect user privacy, and robust error handling for camera permissions.

## ✨ Features

- **On-Demand Scanning:** Camera only starts when the user clicks "Start Scanning", preventing unnecessary battery drain and privacy concerns.
- **Modern Dark UI:** Sleek, isomorphic design inspired by modern dashboard aesthetics using Tailwind CSS.
- **Robust Error Handling:** Specifically handles `NotAllowedError` (Permission Denied) without flickering or infinite loops.
- **Dual Mode:** Toggle between live camera scanning and uploading images from your local device.
- **Lightning Fast:** Powered by Next.js Turbopack for near-instant development and build times.

## 🛠️ Tech Stack

- **Framework:** [Next.js 16 (App Router)](https://nextjs.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Core Logic:** [html5-qrcode](https://github.com/mebjas/html5-qrcode) for scanning engine.
- **Language:** TypeScript for type-safe development.

## 🚀 Getting Started

First, clone the repository:

```bash
git clone git@github.com:Yahya-Nayb/Qr-Code-Scanner.git
cd Qr-Code-Scanner
```

Install dependencies:
```bash
npm install
yarn install
```

Run the development server:
```bash
npm run dev
```

Open http://localhost:3000 with your browser to see the result.

📸 Preview
Refer to the design implementation for the Dark Mode UI with dual-card layout (Camera View & Scan Results).

🛡️ Permissions
This app requires camera access to function. If access is denied, the UI will gracefully display a "Permission Denied" message with a manual retry option to ensure a smooth user experience.