# 🐶 Anallergenic Tracker PWA

**Version:** 1.0.0  
**Status:** In Development  
**Type:** Progressive Web App (PWA)

---

## Purpose

Mobile-first PWA for tracking a 12-week Royal Canin Anallergenic elimination diet and associated skin/ear treatments for a 12-year-old Havanese dog with chronic dermatologic issues.

## Core Features

- **Daily Logging**: Diet compliance, medications, treatments, itch scores, wound status, notes, photos
- **Weekly Summaries**: Adherence percentages, treatment counts, averages
- **Trends & Charts**: 12-week visualizations (itch levels, diet compliance, wound status)
- **Export**: PDF veterinary reports, JSON backup/restore
- **Offline-First**: PWA with IndexedDB storage, works without internet

## Technology Stack

- **Frontend**: React 18+ / TypeScript / Vite
- **Styling**: TailwindCSS (dark theme + glassmorphism)
- **State**: Zustand
- **Routing**: React Router DOM
- **Database**: Dexie.js (IndexedDB abstraction)
- **Charts**: Recharts
- **Export**: jsPDF + html2canvas
- **PWA**: vite-plugin-pwa

## Project Structure

```
src/
  components/    # Reusable UI components
  pages/         # Route pages
  data/          # Models & initial data
  store/         # Zustand state management
  db/            # Dexie database
  pwa/           # PWA configuration
```

## Key Data Models

- `DailyEntry`: Single day's tracking data
- `WeekData`: 7 days of entries
- `ProgramData`: Full 12-week program

## Development Status

- [x] Project specification
- [ ] Documentation setup
- [ ] Project initialization
- [ ] Core features implementation
- [ ] PWA configuration
- [ ] Testing & deployment

---

**Last Updated**: 2024-12-19

