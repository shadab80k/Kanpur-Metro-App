# 🚇 Kanpur Metro App

<div align="center">

![Kanpur Metro](https://img.shields.io/badge/Kanpur-Metro-orange?style=for-the-badge)
![Version](https://img.shields.io/badge/version-1.1-blue?style=for-the-badge)
![Platform](https://img.shields.io/badge/platform-Android-green?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178C6?style=for-the-badge&logo=typescript)

**Your Smart Travel Companion for Kanpur Metro**

[Features](#-features) • [Tech Stack](#-tech-stack) • [Installation](#-installation) • [Usage](#-usage) • [Contributing](#-contributing)

</div>

---

## 📱 About

Kanpur Metro App is a modern, user-friendly mobile application designed to enhance the travel experience for Kanpur Metro passengers. Built with cutting-edge web technologies and packaged as a native Android app using Capacitor, it provides real-time information, journey planning, and comprehensive metro system details.

### 🎯 Key Highlights

- **14 Stations** - Complete coverage of Kanpur Metro
- **17 km** - Total metro line length
- **30K+** - Daily riders served
- **Real-time Status** - Live metro service updates
- **Offline Support** - Works without internet connection

---

## ✨ Features

### 🗺️ Journey Planning
- **Smart Route Calculation** - Find the fastest route between any two stations
- **Fare Calculator** - Instant fare calculation with ticket and smart card prices
- **Platform Information** - Know which platform to board from
- **Travel Time Estimates** - Accurate journey duration predictions
- **Recent Journeys** - Quick access to frequently used routes

### 📍 Station Information
- **Detailed Station Data** - Complete information for all 14 stations
- **Facilities** - Restrooms, water, first aid, and accessibility features
- **Gates & Entries** - Multiple gate locations and entry points
- **Parking** - Vehicle parking availability and capacity
- **Lifts & Escalators** - Vertical transportation details
- **Platform Details** - Direction-wise platform information

### 🗺️ Interactive Metro Map
- **Visual Route Map** - Color-coded station visualization
- **Tap to Explore** - Click any station for instant details
- **Current Location** - Highlight your nearest station
- **Zoom & Pan** - Smooth map interactions

### ⏰ Service Information
- **Operating Hours** - First train at 6:00 AM, Last train at 10:00 PM
- **Frequency** - Peak hour trains every 5 minutes
- **Live Status** - Real-time service status updates
- **Emergency Helpline** - Quick access to 0512-2246200

### 🎨 User Experience
- **Beautiful UI** - Modern, clean interface with orange brand colors
- **Smooth Animations** - GPU-accelerated transitions
- **Native Feel** - Hardware back button support
- **No Splash Delay** - Instant app launch
- **Offline First** - Core features work without internet

---

## 🛠️ Tech Stack

### Frontend Framework
- **React 18.3** - Modern UI library with hooks
- **TypeScript 5.5** - Type-safe development
- **Vite 5.4** - Lightning-fast build tool
- **React Router 6.26** - Client-side routing

### UI Components
- **Tailwind CSS 3.4** - Utility-first styling
- **Shadcn/UI** - High-quality accessible components
- **Radix UI** - Unstyled, accessible primitives
- **Lucide React** - Beautiful icon system

### Mobile Platform
- **Capacitor 7.4** - Native Android wrapper
- **Android SDK** - Native Android features
- **Hardware Acceleration** - Smooth 60fps performance

### State Management
- **React Context API** - Global state management
- **TanStack Query** - Server state management
- **Local Storage** - Persistent data storage

### Development Tools
- **ESLint** - Code linting
- **TypeScript ESLint** - TS-specific linting
- **Vite Plugin React SWC** - Fast refresh

---

## 📥 Installation

### Prerequisites
- Node.js 18+ and npm
- Android Studio (for mobile build)
- JDK 17+
- Git

### Quick Start

```bash
# Clone the repository
git clone https://github.com/shadab80k/Kanpur-Metro-App.git
cd Kanpur-Metro-App

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

### Build Android APK

```bash
# Sync with Capacitor
npm run cap:sync

# Open in Android Studio
npm run cap:open:android

# Or build directly with Gradle
cd android
./gradlew assembleDebug
```

The APK will be generated at:
```
android/app/build/outputs/apk/debug/app-debug.apk
```

---

## 🎨 Design System

### Color Palette
```css
Primary Orange: #FF6B2C
Light Orange: #FFF4ED
Dark Orange: #E65525
Background: #F9FAFB
Text Primary: #111827
Text Secondary: #6B7280
```

### Typography
- Font Family: System Default (San Francisco on iOS, Roboto on Android)
- Headings: Bold, scaled sizing
- Body: Regular weight, 14-16px

### Components
- Cards with subtle shadows
- Rounded corners (8-16px border radius)
- Orange accent color throughout
- Smooth transitions (150-300ms)

---

## 📂 Project Structure

```
kanpur-metro-app/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── ui/             # Shadcn UI components
│   │   ├── AppNavbar.tsx   # Bottom navigation
│   │   ├── MetroMap.tsx    # Interactive map
│   │   └── RouteViewer.tsx # Journey visualization
│   ├── contexts/           # React Context providers
│   │   ├── MetroContext.tsx
│   │   └── ThemeContext.tsx
│   ├── pages/              # Route pages
│   │   ├── Index.tsx       # Home page
│   │   ├── JourneyPlanner.tsx
│   │   ├── StationInfo.tsx
│   │   └── ...
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions
│   └── data/               # Metro system data
├── android/                # Android native project
├── public/                 # Static assets
└── capacitor.config.ts     # Capacitor configuration
```

---

## 🚀 Usage

### For Users

1. **Plan a Journey**
   - Tap "Plan Journey" on home screen
   - Select source and destination stations
   - View route, fare, and platform info

2. **Check Station Details**
   - Go to "Station Info" tab
   - Select any station from the list
   - Browse facilities, gates, parking, and platforms

3. **View Metro Map**
   - Tap "Metro Map" card
   - Pan and zoom to explore
   - Tap stations for quick info

4. **Calculate Fare**
   - Use "Fare Calculator"
   - Select stations or view full fare chart

### For Developers

```typescript
// Access Metro Context
import { useMetro } from '@/contexts/MetroContext';

const { stations, calculateRoute, getFare } = useMetro();

// Calculate route
const route = calculateRoute(sourceStation, destinationStation);

// Get fare
const fare = getFare(distance);
```

---

## 🔧 Configuration

### Customization

**Change Theme Colors** - Edit `src/index.css`:
```css
--primary: 24 100% 50%; /* Orange */
```

**Modify Metro Data** - Update station info in `src/contexts/MetroContext.tsx`

**Adjust App Settings** - Configure in `capacitor.config.ts`:
```typescript
{
  appId: 'com.kanpurmetro.app',
  appName: 'Kanpur Metro'
}
```

---

## 📊 Performance

- **Lighthouse Score**: 90+ (Performance, Accessibility, Best Practices)
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3s
- **Bundle Size**: ~460KB (gzipped ~135KB)
- **60fps Scrolling**: Hardware accelerated
- **Instant Navigation**: Client-side routing

---

## 🗺️ Roadmap

### Upcoming Features
- [ ] Live train tracking
- [ ] Push notifications for service updates
- [ ] Multi-language support (Hindi)
- [ ] Ticket booking integration
- [ ] Offline metro map caching
- [ ] Route suggestions based on time
- [ ] Nearby places discovery
- [ ] Accessibility enhancements

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Maintain existing code style
- Add comments for complex logic
- Test on real Android devices
- Keep bundle size optimized

---

## 📝 License

This project is developed for educational and public service purposes.

---

## 👤 Author

**Shadab**
- GitHub: [@shadab80k](https://github.com/shadab80k)

---

## 🙏 Acknowledgments

- **Kanpur Metro Rail Corporation** - For metro system data
- **Shadcn** - For the beautiful UI component library
- **Capacitor Team** - For the amazing native wrapper
- **React Community** - For the robust ecosystem

---

## 📞 Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Contact: Kanpur Metro Helpline 0512-2246200

---

## 🔄 Version History

### v1.1 (Current)
- ✅ Removed splash screen for instant launch
- ✅ Fixed toast notifications z-index
- ✅ Optimized status bar safe area
- ✅ Improved app performance

### v1.0
- ✅ Initial release
- ✅ Journey planning functionality
- ✅ Station information
- ✅ Interactive metro map
- ✅ Fare calculator
- ✅ Real-time status updates

---

<div align="center">

**Made with ❤️ for Kanpur Metro Passengers**

⭐ Star this repo if you find it helpful!

[Report Bug](https://github.com/shadab80k/Kanpur-Metro-App/issues) • [Request Feature](https://github.com/shadab80k/Kanpur-Metro-App/issues)

</div>
