# 📱 Capacitor Mobile App + Offline Setup Guide

## 🎯 Goal
Convert React web app → **Native Android/iOS app** with **offline support**

---

## 📋 Prerequisites Check

```bash
# Check Node version (should be 16+)
node --version

# Check npm version
npm --version

# Check if you have Android Studio (for Android app)
# Download from: https://developer.android.com/studio
```

---

## 🚀 Step 1: Install Capacitor

```bash
# Install Capacitor CLI and core
npm install @capacitor/core @capacitor/cli

# Initialize Capacitor
npx cap init

# You'll be asked:
# App name: Kanpur Metro
# App ID: com.kanpurmetro.app  (or your custom ID)
# Web directory: dist  (Vite builds to 'dist' folder)
```

### Expected Output:
```
✔ Creating capacitor.config.ts in C:\Users\91875\Downloads\kanpur-metro-main
✔ Adding @capacitor/android
✔ Adding @capacitor/ios
✨  Done!
```

---

## 🔧 Step 2: Configure Capacitor

### File: `capacitor.config.ts` (auto-created)
```typescript
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.kanpurmetro.app',
  appName: 'Kanpur Metro',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#FF6B2C",
      showSpinner: false,
      androidSpinnerStyle: "small",
      iosSpinnerStyle: "small"
    }
  }
};

export default config;
```

---

## 📱 Step 3: Add Android Platform

```bash
# Add Android platform
npm install @capacitor/android
npx cap add android

# This will create 'android' folder in your project
```

### If you want iOS too (Mac required):
```bash
npm install @capacitor/ios
npx cap add ios
```

---

## 🛠️ Step 4: Update package.json Scripts

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "cap:build": "npm run build && npx cap copy",
    "cap:sync": "npx cap sync",
    "cap:android": "npm run cap:build && npx cap open android",
    "cap:ios": "npm run cap:build && npx cap open ios"
  }
}
```

---

## 📦 Step 5: Build Your React App

```bash
# Build production version
npm run build

# Copy web assets to native platforms
npx cap sync
```

---

## 📲 Step 6: Open in Android Studio

```bash
# Open Android project
npx cap open android
```

### In Android Studio:
1. Wait for Gradle sync to complete
2. Select device/emulator from dropdown
3. Click **Run** button (▶️) to install app
4. App will launch on your phone/emulator! 🎉

---

## 🔌 Step 7: Add Essential Capacitor Plugins

### Install Plugins:
```bash
# Status Bar (change color/style)
npm install @capacitor/status-bar

# Splash Screen
npm install @capacitor/splash-screen

# Network (check online/offline)
npm install @capacitor/network

# Share (native share dialog)
npm install @capacitor/share

# App (app info, minimize, etc.)
npm install @capacitor/app

# Toast (native toasts)
npm install @capacitor/toast

# Preferences (native storage)
npm install @capacitor/preferences
```

### Sync plugins:
```bash
npx cap sync
```

---

## 💾 Step 8: Make App OFFLINE-FRIENDLY

### Option A: Using Service Worker (PWA) ✅

#### Create `vite.config.ts` with PWA:
```bash
npm install -D vite-plugin-pwa
```

#### Update `vite.config.ts`:
```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true
      },
      manifest: {
        name: 'Kanpur Metro',
        short_name: 'KanpurMetro',
        description: 'Kanpur Metro Rail Guide & Journey Planner',
        theme_color: '#FF6B2C',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: '/icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/icon-512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      workbox: {
        // Cache all static assets
        globPatterns: ['**/*.{js,css,html,ico,png,svg,json}'],
        
        // Runtime caching strategies
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              }
            }
          }
        ]
      }
    })
  ]
});
```

---

### Option B: Using Capacitor Preferences (Better for Mobile) 🔥

#### Create Offline Storage Service:

**File: `src/services/offlineStorage.ts`**
```typescript
import { Preferences } from '@capacitor/preferences';

// Store data offline
export async function saveOfflineData(key: string, value: any) {
  try {
    await Preferences.set({
      key: key,
      value: JSON.stringify(value)
    });
    console.log(`Saved ${key} offline`);
  } catch (error) {
    console.error('Error saving offline:', error);
  }
}

// Get offline data
export async function getOfflineData(key: string) {
  try {
    const { value } = await Preferences.get({ key });
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error('Error getting offline data:', error);
    return null;
  }
}

// Remove offline data
export async function removeOfflineData(key: string) {
  await Preferences.remove({ key });
}

// Clear all offline data
export async function clearAllOfflineData() {
  await Preferences.clear();
}

// Keys for different data
export const STORAGE_KEYS = {
  STATIONS: 'metro_stations',
  RECENT_ROUTES: 'recent_routes',
  FARE_DATA: 'fare_data',
  USER_PREFERENCES: 'user_prefs'
};
```

---

#### Update MetroContext to use Offline Storage:

**File: `src/contexts/MetroContext.tsx`**
```typescript
import { useEffect } from 'react';
import { saveOfflineData, getOfflineData, STORAGE_KEYS } from '@/services/offlineStorage';

export const MetroProvider: React.FC<MetroProviderProps> = ({ children }) => {
  const [recentRoutes, setRecentRoutes] = useState<Route[]>([]);

  // Load from offline storage on mount
  useEffect(() => {
    loadOfflineData();
  }, []);

  async function loadOfflineData() {
    // Load recent routes from Capacitor storage
    const savedRoutes = await getOfflineData(STORAGE_KEYS.RECENT_ROUTES);
    if (savedRoutes) {
      setRecentRoutes(savedRoutes);
    }
  }

  const saveRoute = async (route: Route) => {
    const newRoutes = [route, ...recentRoutes].slice(0, 5);
    setRecentRoutes(newRoutes);
    
    // Save to offline storage
    await saveOfflineData(STORAGE_KEYS.RECENT_ROUTES, newRoutes);
  };

  // ... rest of context
};
```

---

### Check Network Status:

**File: `src/hooks/useNetworkStatus.ts`**
```typescript
import { useState, useEffect } from 'react';
import { Network } from '@capacitor/network';

export function useNetworkStatus() {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    // Get initial status
    Network.getStatus().then(status => {
      setIsOnline(status.connected);
    });

    // Listen to changes
    const handler = Network.addListener('networkStatusChange', status => {
      setIsOnline(status.connected);
      
      if (status.connected) {
        console.log('Back online!');
        // Sync data if needed
      } else {
        console.log('Offline mode');
      }
    });

    return () => {
      handler.remove();
    };
  }, []);

  return isOnline;
}
```

#### Use in Components:
```typescript
import { useNetworkStatus } from '@/hooks/useNetworkStatus';

function Index() {
  const isOnline = useNetworkStatus();

  return (
    <div>
      {!isOnline && (
        <div className="bg-yellow-100 p-2 text-center text-sm">
          📡 Offline Mode - Some features may be limited
        </div>
      )}
      {/* rest of your page */}
    </div>
  );
}
```

---

## 🎨 Step 9: Add Native Features

### Status Bar Customization:

**File: `src/App.tsx`**
```typescript
import { StatusBar, Style } from '@capacitor/status-bar';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    // Set status bar color
    StatusBar.setBackgroundColor({ color: '#FF6B2C' });
    StatusBar.setStyle({ style: Style.Light });
  }, []);

  return (
    // your app
  );
}
```

---

### Native Share:

**File: Update JourneyResult.tsx**
```typescript
import { Share } from '@capacitor/share';

const handleShare = async () => {
  if (route) {
    const text = `Traveling from ${route.source.name} to ${route.destination.name}
    
Distance: ${route.distance.toFixed(1)} km
Duration: ${route.duration} mins
Fare: ₹${route.fare}`;

    try {
      await Share.share({
        title: 'My Kanpur Metro Journey',
        text: text,
        dialogTitle: 'Share Journey'
      });
    } catch (error) {
      console.log('Error sharing:', error);
    }
  }
};
```

---

### Native Toast:

```typescript
import { Toast } from '@capacitor/toast';

async function showToast(message: string) {
  await Toast.show({
    text: message,
    duration: 'short',
    position: 'bottom'
  });
}
```

---

## 🖼️ Step 10: Add App Icons & Splash Screen

### Create Icons:
1. Create `public/icon.png` (1024x1024)
2. Use online tool: https://icon.kitchen/
3. Generate all sizes
4. Place in `android/app/src/main/res/` folders

### Add Splash Screen:
```bash
# Create splash.png (2732x2732) with your logo
# Place in android/app/src/main/res/drawable/
```

---

## 📝 Step 11: Update Android Permissions

**File: `android/app/src/main/AndroidManifest.xml`**
```xml
<manifest>
    <!-- Add permissions -->
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
    
    <application
        android:label="Kanpur Metro"
        android:icon="@mipmap/ic_launcher"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:usesCleartextTraffic="true">
        
        <!-- Your activity -->
    </application>
</manifest>
```

---

## 🏗️ Step 12: Build & Test

### Development:
```bash
# 1. Build React app
npm run build

# 2. Sync with native platforms
npx cap sync

# 3. Open in Android Studio
npx cap open android

# 4. Run on device/emulator
# Click ▶️ Run button in Android Studio
```

### Make Changes Workflow:
```bash
# After making changes in React code:
npm run build
npx cap sync

# Refresh app on device (no need to rebuild)
```

---

## 📦 Step 13: Build APK for Release

### In Android Studio:
1. **Build → Generate Signed Bundle / APK**
2. Choose **APK**
3. Create/select keystore
4. Select **release** build variant
5. Wait for build to complete
6. APK location: `android/app/release/app-release.apk`

### Via Command Line:
```bash
cd android
./gradlew assembleRelease

# APK will be in:
# android/app/build/outputs/apk/release/app-release.apk
```

---

## ✅ Complete Commands Summary

```bash
# 1. Install Capacitor
npm install @capacitor/core @capacitor/cli
npx cap init

# 2. Add Android
npm install @capacitor/android
npx cap add android

# 3. Install Plugins
npm install @capacitor/status-bar @capacitor/splash-screen @capacitor/network @capacitor/share @capacitor/app @capacitor/preferences

# 4. Build & Sync
npm run build
npx cap sync

# 5. Open in Android Studio
npx cap open android

# 6. After code changes
npm run build && npx cap sync
```

---

## 🎯 Offline Features You'll Get

With this setup, your app will:

✅ **Work completely offline** - All static data cached
✅ **Save recent journeys** - Persist across app restarts
✅ **Fast loading** - Assets cached locally
✅ **Native feel** - Status bar, splash screen, etc.
✅ **Network detection** - Show offline indicator
✅ **Native share** - Share journeys natively
✅ **Small size** - ~5-10 MB APK
✅ **Fast performance** - Native code execution

---

## 📱 App Size Optimization

### Reduce Bundle Size:
```bash
# 1. Build for production
npm run build -- --mode production

# 2. Check bundle size
npm run build -- --report

# 3. Remove unused dependencies
npm prune
```

### Android App Size:
- **Debug APK**: ~10-15 MB
- **Release APK**: ~5-8 MB (with ProGuard)
- **AAB (Play Store)**: ~3-5 MB

---

## 🐛 Common Issues & Fixes

### Issue 1: "Cannot find capacitor.config.ts"
```bash
# Recreate config
npx cap init
```

### Issue 2: "Build failed in Android Studio"
```bash
# Clean and rebuild
cd android
./gradlew clean
./gradlew build
```

### Issue 3: "White screen on app launch"
```bash
# Check capacitor.config.ts
# webDir should be 'dist' for Vite
# Run: npm run build
```

### Issue 4: "App crashes on open"
```bash
# Check logs in Android Studio
# View → Tool Windows → Logcat
```

---

## 🚀 Next Steps

1. **Test thoroughly** - Test all features offline
2. **Add analytics** - Track user behavior
3. **Add crash reporting** - Firebase Crashlytics
4. **Add push notifications** - For service updates
5. **Publish on Play Store** - Share with users!

---

## 📞 Need Help?

Issues? Run:
```bash
npx cap doctor
```

This will check your Capacitor setup and show any issues.

---

## 🎉 Congratulations!

Tumhara **Kanpur Metro App** ab:
- ✅ Native Android app ban gaya
- ✅ Offline kaam karta hai
- ✅ Fast aur smooth hai
- ✅ Play Store pe upload karne ready hai!

**Ab kya karna hai?** 👇
1. Test karo phone pe
2. Friends ko dikhao
3. Play Store pe publish karo
4. Users ko enjoy karao! 🚂

---

**Made with ❤️ for Kanpur Metro passengers!**
