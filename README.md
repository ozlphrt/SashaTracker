# 🐶 Anallergenic Tracker PWA

A mobile-first Progressive Web App for tracking a 12-week Royal Canin Anallergenic elimination diet and associated skin/ear treatments.

## Features

- ✅ Daily logging (diet compliance, medications, treatments, itch scores, wound status)
- ✅ Weekly summaries with adherence percentages
- ✅ Interactive charts (itch levels, diet compliance, wound status)
- ✅ PDF export for veterinary reports
- ✅ JSON backup/restore
- ✅ Offline-first PWA with IndexedDB storage
- ✅ Dark theme with glassmorphism UI

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### PWA Installation

1. Build the project: `npm run build`
2. Serve the `dist` folder with a local server
3. Open in a browser and install the PWA
4. Works offline with full functionality

## Technology Stack

- React 18 + TypeScript
- Vite
- TailwindCSS
- Zustand (state management)
- Dexie.js (IndexedDB)
- Recharts (charts)
- jsPDF + html2canvas (PDF export)
- vite-plugin-pwa

## Project Structure

```
src/
  components/    # Reusable UI components
  pages/         # Route pages
  data/          # Models & initial data
  store/         # Zustand state management
  db/            # Dexie database
```

## License

Private project

