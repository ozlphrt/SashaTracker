# 🐶 Anallergenic Tracker PWA

A mobile-first Progressive Web App for tracking a 12-week Royal Canin Anallergenic elimination diet and associated skin/ear treatments.

## Features

- ✅ Daily logging (diet compliance, medications, treatments, itch scores, wound status)
- ✅ Weekly summaries with adherence percentages
- ✅ Interactive charts (itch levels, diet compliance, wound status)
- ✅ PDF export for veterinary reports
- ✅ JSON backup/restore
- ✅ Offline-first PWA with IndexedDB storage
- ✅ Cloud sync across devices (Firebase Firestore - required)
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

### Cloud Sync Setup (Required - Developer Setup)

Cloud sync is required for multi-device usage. **This is a one-time setup by the developer/deployer** (not by each end user):

1. Follow the instructions in `FIREBASE_SETUP.md`
2. Configure Firebase credentials in `src/config/firebase.ts` or via environment variables
3. Deploy the app - all users will automatically sync data across devices

**Note:** Once configured, all users/devices connect to the same Firebase project. The app will show a setup page if Firebase is not configured (this should only happen during development).

## Technology Stack

- React 18 + TypeScript
- Vite
- TailwindCSS
- Zustand (state management)
- Dexie.js (IndexedDB)
- Firebase Firestore (cloud sync - optional)
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

