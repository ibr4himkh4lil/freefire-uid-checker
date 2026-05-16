# 🎯 Free Fire UID Checker

A production-ready, blazing-fast Free Fire player lookup tool built with **Next.js 14**, **Tailwind CSS**, and deployed on **Vercel**.

![FF UID Checker](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)
![Vercel](https://img.shields.io/badge/Vercel-Deploy-black?style=for-the-badge&logo=vercel)

---

## ✨ Features

| Feature | Description |
|---|---|
| 🔐 **Secure Architecture** | Frontend → Next.js API Route → External API (no CORS leaks) |
| 🚦 **Rate Limiting** | 10 requests / IP / minute (in-memory sliding window) |
| 🧹 **Input Validation** | Client + server-side UID validation |
| ⏱️ **Timeout Handling** | 10-second request timeout with graceful error |
| 💅 **Gaming UI** | Orbitron + Rajdhani fonts, glassmorphism, glow effects |
| 🌑 **Dark Mode** | Full Free Fire-inspired dark theme |
| 📱 **Mobile First** | Fully responsive across all breakpoints |
| 🎞️ **Animations** | Particle canvas, scan lines, floating avatar, shimmer skeletons |
| 📋 **Copy UID** | One-click clipboard copy with toast feedback |
| 🔔 **Toast Notifications** | Success / Error / Info / Warning toasts |
| 🗺️ **Region Info** | Flag emoji + full country name for all FF regions |
| 🔍 **SEO Ready** | OpenGraph, Twitter Card, robots meta |

---

## 📁 Project Structure

```
freefire-uid-checker/
├── app/
│   ├── layout.js                  # Root layout + SEO metadata
│   ├── page.js                    # Home page
│   ├── globals.css                # Global styles + custom utilities
│   └── api/
│       └── check-player/
│           └── route.js           # ★ Secure backend API route
├── components/
│   ├── HeroSection.jsx            # Animated hero header
│   ├── UIDChecker.jsx             # Main input + result orchestrator
│   ├── PlayerCard.jsx             # Player profile display card
│   ├── LoadingSkeleton.jsx        # Shimmer loading placeholder
│   ├── Toast.jsx                  # Toast notification system
│   ├── Navbar.jsx                 # Top navigation bar
│   └── ParticleBackground.jsx     # Canvas particle animation
├── services/
│   └── playerService.js           # Axios client (calls internal API only)
├── utils/
│   ├── validation.js              # UID validation helpers
│   └── helpers.js                 # copyToClipboard, getRegionInfo, etc.
├── public/                        # Static assets
├── tailwind.config.js
├── next.config.js
├── vercel.json
├── jsconfig.json                  # Path aliases (@/*)
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18.17.0
- **npm** ≥ 9

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/freefire-uid-checker.git
cd freefire-uid-checker

# 2. Install dependencies
npm install

# 3. Copy environment file (optional)
cp .env.example .env.local

# 4. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🌐 Deploying to Vercel

### Option A — Vercel CLI (recommended)

```bash
# Install Vercel CLI globally
npm i -g vercel

# Deploy (first time — follow the prompts)
vercel

# Deploy to production
vercel --prod
```

### Option B — GitHub Integration

1. Push this repository to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new).
3. Import the repository.
4. Vercel auto-detects Next.js — click **Deploy**.
5. Done! Your site is live in ~60 seconds.

### Environment Variables on Vercel

| Variable | Default | Description |
|---|---|---|
| `ALLOWED_ORIGIN` | `*` | Restrict CORS origin (optional) |

Set variables at **Vercel Dashboard → Settings → Environment Variables**.

---

## 🛡️ Security Architecture

```
Browser (React)
     │
     │  POST /api/check-player  { uid: "123456789" }
     ▼
Next.js API Route  (/app/api/check-player/route.js)
     │  • Validates UID (digits only, 6-12 chars)
     │  • Checks rate limit (10 req / IP / min)
     │  • Sets 10-second Axios timeout
     │
     │  POST https://bdgamesbazar.com/api/auth/player_id_login
     ▼
External Player API
     │
     │  Returns: { open_id, region, nickname, img_url }
     ▼
Next.js API Route (cleaned response)
     │
     ▼
Browser (displays PlayerCard)
```

**Key security points:**
- The external API URL **never** appears in client-side code.
- Server strips and re-validates API responses before forwarding.
- Rate limiting prevents abuse (upgradeable to Redis for multi-instance).
- All HTTP methods except POST are rejected at the API route.

---

## 🎨 Design System

| Token | Value | Usage |
|---|---|---|
| `--ff-orange` | `#FF6B00` | Primary accent, buttons, glows |
| `--ff-amber` | `#FFB300` | Secondary accent, region badges |
| `--ff-red` | `#FF2D55` | Error states, gradient text |
| `--ff-dark` | `#0A0A0F` | Background |
| `--ff-card` | `#111118` | Card surfaces |
| `Orbitron` | — | Display / headings / UIDs |
| `Rajdhani` | — | Body text / labels |
| `Exo 2` | — | Subheadings |

---

## 🔧 Customisation

### Change rate limits

Edit `app/api/check-player/route.js`:

```js
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX       = 10;         // requests per window
```

### Add Redis rate limiting (production scale)

Replace the in-memory `Map` with an `@upstash/ratelimit` + `@upstash/redis` integration for multi-instance deployments.

---

## 📝 License

MIT — free to use, modify, and deploy.

---

> **Disclaimer:** This project is not affiliated with, endorsed by, or connected to Garena or Free Fire in any way.
