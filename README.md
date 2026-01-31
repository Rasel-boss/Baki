# Baki Hisab Manager - HopWeb Setup Guide

This is a complete React application designed to be used with HopWeb (or any WebView wrapper) for Android.

## 🛠️ How to create the APK using HopWeb

This project is written in React (Source Code). HopWeb expects **HTML/CSS/JS** files. You must first "Build" this project on your computer to generate those files.

### Step 1: Build the Project (On Computer)

1.  Make sure you have Node.js installed.
2.  Open terminal in this project folder.
3.  Run `npm install` to install dependencies.
4.  Run `npm run build` to compile the app.
5.  This will create a `dist` folder.

### Step 2: Transfer to HopWeb

The `dist` folder contains:
- `index.html`
- `assets/` (folder with js and css)

1.  Copy the **contents** of the `dist` folder to your phone.
2.  Open HopWeb.
3.  Select the `index.html` from the files you copied as your entry point.
4.  HopWeb will wrap this web app into an APK.

## 🌟 Features included
- **Offline Database:** Uses Browser LocalStorage. Data persists even if app is closed.
- **Languages:** Switch between Bangla and English in Settings.
- **Backup:** Export data to a JSON file and restore it later.

## 📱 Future Updates
- **Cloud Sync:** Would require a backend (Firebase/Supabase). Currently, it is 100% offline.