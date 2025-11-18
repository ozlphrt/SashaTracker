# Technical Setup - Anallergenic Tracker PWA

## Prerequisites

- Node.js 18+ 
- npm or yarn
- Modern browser with IndexedDB support

## Installation

```bash
npm create vite@latest . -- --template react-ts
npm install
```

## Dependencies

### Core
- `react` ^18.2.0
- `react-dom` ^18.2.0
- `react-router-dom` ^6.20.0
- `typescript` ^5.0.0

### State & Data
- `zustand` ^4.4.0
- `dexie` ^3.2.4

### UI & Styling
- `tailwindcss` ^3.3.0
- `autoprefixer` ^10.4.0
- `postcss` ^8.4.0

### Charts
- `recharts` ^2.10.0

### Export
- `jspdf` ^2.5.0
- `html2canvas` ^1.4.0

### PWA
- `vite-plugin-pwa` ^0.17.0
- `workbox-window` ^7.0.0

## Development

```bash
npm run dev
```

## Build

```bash
npm run build
```

## PWA Testing

1. Build the project
2. Serve with a local server (e.g., `npx serve dist`)
3. Open in browser and install PWA
4. Test offline functionality

## Browser Support

- Chrome/Edge (recommended)
- Firefox
- Safari (iOS 11.3+)
- Samsung Internet

---

**Last Updated**: 2024-12-19

