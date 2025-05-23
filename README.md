# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

# 🎥 React Video Player with Progress Tracking & Theme Toggle

This project is a fully functional React video player that tracks user watch progress, persists it in `localStorage`, and displays a visual progress bar. It also includes a light/dark mode toggle to enhance user experience.

## ✨ Features

### ✅ Video Playback with Resume Support
- Uses the HTML5 `<video>` element for playback.
- Automatically resumes from the last watched position using `localStorage`.

### ✅ Watched Progress Tracking
- Every second of video watched is tracked as an interval.
- These intervals are merged to calculate the actual percentage of the video watched.

### ✅ Visual Progress Bar
- A horizontal progress bar shows how much of the video has been watched.
- The bar updates in real time and reflects persisted progress even after a page reload.

### ✅ Persistent State with Local Storage
- Stores the `watchedIntervals` and `lastWatchedTime` in `localStorage`.
- Ensures the user can leave and return without losing progress.

### ✅ Light/Dark Mode Toggle
- A switch allows the user to toggle between light and dark themes.
- The theme preference is stored in `localStorage`.

## 📁 File Structure

src/
├── components/
│ └── VideoPlayer.jsx
├── App.css
└── App.jsx


## 📦 Installation

```bash
git clone git@github.com:KBB2000/video-pro-tracker.git
cd video-player-app
npm install
npm start
