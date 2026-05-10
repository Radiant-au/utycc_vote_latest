# Technologia — Student Voting App

> The student-facing web app for the UTYCC school coronation election. Built with React, TypeScript, and TanStack Query — featuring 6-digit PIN authentication, a swipeable candidate voting interface, live vote distribution charts, winner reveal, and a bonus food coupon QR system. Fully mobile-first and optimized for event-day use on personal phones.

---

## ✦ What This Is

This is the voter-side application that students use during the coronation event. Each student receives a unique 6-digit PIN code. They enter it on the login screen, browse candidates, cast one vote per gender per category, view live vote data, and redeem a food coupon — all from their phone without installing anything.

It is a companion to the VoteAdmin dashboard, which controls voting status, manages candidates, and reveals winners.

---

## ✦ User Journey

```
WelcomePage (photo slideshow of candidates)
  ↓ "Start Voting"
LoginPage (6-digit PIN input)
  ↓ PIN verified → JWT issued
CategorySelectionPage
  ├── King & Queen → VotingPage (swipeable male/female tabs)
  ├── Check Data   → Data page (pie charts + winner reveal)
  └── Foodie Coupon → FoodiePage (QR code for food stall)
```

---

## ✦ Feature Highlights

### 🏠 Welcome Page
- Auto-advancing image carousel (3-second interval) showcasing candidate couples by department
- Cloudinary-optimized images: main slides at 800px, thumbnails at 200px — no layout shift, no over-fetching
- Thumbnail strip for direct slide navigation
- `visibleSlides` memoization — only adjacent slides are rendered at any time, reducing DOM nodes during fast swiping
- `willChange: 'opacity, transform'` only applied to the active slide to avoid GPU over-allocation

### 🔐 PIN Authentication
- 6-character `react-pin-input` component with gold-tone styled boxes and focus ring animation
- Login fires `POST /auth/Plogin` and receives a JWT — stored in `localStorage`
- PIN code itself is also persisted in `localStorage` (`userPinCode`) — used later for the food coupon QR fetch
- `AuthContext` rehydrates session on page load via `useEffect` + `loadToken()`
- Auto-logout + redirect to `/` on any 401 response via the `apiFetch` wrapper
- `ProtectedRoute` blocks unauthenticated access to all post-login routes

### 🗳️ Voting Experience
- Category page checks voting status (`GET /appStatus/app`) and renders a live open/closed badge with pulse animation
- Voting page splits candidates by gender into two Swiper slides — swipe left/right or tap the tab bar to switch
- Candidates are filtered and memoized per gender via `useMemo` — no re-filtering on every selection change
- Selecting a candidate on one gender disables all others in that gender (`isDisabled` prop) — prevents accidental double-picks
- Submit button is disabled when: voting is closed, already voted (`hasVotedSenior`), or either gender hasn't been selected
- `usePinCodeStatus` checks `hasVotedSenior` / `hasVotedJunior` to prevent re-voting without a server roundtrip on every render
- `useSelections` uses `staleTime: Infinity` — candidates don't change during an event, so they're fetched once and cached for the session

### 📸 Candidate Profile
- Swiper gallery: profile image + up to 3 additional images, with pagination dots
- `useParams` + `useMemo` to find the candidate in the already-cached selections — zero extra API call
- Deep-link aware: `?category` query param enables the back button to return to the correct voting page
- Image counter badge top-right; gradient overlay for name readability

### 📊 Data Page (Live Results)
- **Your Voted Candidates** section shows which King/Queen the current user voted for, fetched from `GET /vote/user`
- **Voting Distribution** pie charts (Recharts, donut style) for King and Queen vote counts — only rendered when data exists
- Empty states with `AlertCircle` icon for all possible missing-data scenarios (no votes, no data, failed fetch)
- **Winners section** is gated behind winner status (`GET /appStatus/winner`):
  - `CLOSED` → shows a lock screen with explanatory text
  - `OPEN` → fetches and displays full winner cards (King, Queen, Prince, Princess + Popular Vote winners)
- Winner cards include votes, teacher score, and committee score with a gold shimmer animation
- `useWinners` uses `enabled: false` — the query only runs when `resultsUnlocked` is true, preventing premature fetches

### 🍔 Food Coupon (FoodiePage)
- Fetches a coupon token from a separate QR API (`VITE_QR_API_URL`) using the stored PIN code
- Renders the token as a QR code via `qrcode.react` (SVG, error correction level H)
- Live status badge: green "unused" / red "used" with pulse animation
- `staleTime: Infinity` + `refetchOnWindowFocus: true` — cached indefinitely but refreshes when student switches back to the tab after showing at the stall

### 🖼️ Image Optimization
- `optimizeCloudinaryImage(url, width, quality)` injects Cloudinary transformation parameters directly into the URL:
  - `f_auto` — serves WebP to supporting browsers automatically
  - `q_auto` — Cloudinary chooses optimal compression
  - `w_{width}` + `c_limit` — resize without upscaling
  - `dpr_auto` — serves 2x images to retina displays
- Card images use 400px; profile detail uses 800px; thumbnails use 200px
- `loading="lazy"` + `decoding="async"` on all non-hero images
- Skeleton placeholder shown until `onLoad` fires; error fallback shown on `onError`

---

## ✦ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | React 18 + TypeScript |
| **Build Tool** | Vite |
| **Routing** | React Router v6 |
| **State / Data** | TanStack Query v5 |
| **Carousel / Swipe** | Swiper.js |
| **Charts** | Recharts (donut pie) |
| **QR Code** | `qrcode.react` |
| **PIN Input** | `react-pin-input` |
| **UI Components** | shadcn/ui (Radix UI) |
| **Styling** | TailwindCSS + CSS variables |
| **Image CDN** | Cloudinary (URL-transform based) |
| **Font** | Playfair Display + Inter |
| **HTTP** | Native `fetch` with custom `apiFetch` wrapper |

---

## ✦ Architecture

```
src/
├── api/
│   ├── client.ts      # apiFetch: auth injection, 401 redirect, JSON parsing
│   └── index.ts       # All typed API functions + shared types
├── context/
│   └── AuthContext.tsx # PIN login, session rehydration, logout
├── components/
│   ├── CandidateCard.tsx          # 4/5-aspect card with lazy image + select/view actions
│   ├── CategoryPieChart.tsx       # Recharts donut with empty/zero-vote fallback states
│   ├── VotingPinInput.tsx         # 6-char PIN input wired to login mutation
│   ├── WinnerCard.tsx             # Shimmer-animated winner display with score badges
│   ├── VotedCandidateCard.tsx     # Compact card showing user's voted candidate
│   ├── ResultsHeader.tsx          # Decorative section heading for the Data page
│   └── ProtectedRoute.tsx         # Auth guard for all post-login routes
├── hooks/
│   ├── useSelections.ts    # Candidates — staleTime: Infinity (fetch once per session)
│   ├── useStatus.ts        # Voting status, winner status, PIN code vote status
│   └── useVoteCounts.ts    # Vote counts, winners query (enabled: false), user votes
├── lib/
│   └── imageOptimizer.ts   # Cloudinary URL transformer (f_auto, q_auto, w_N, dpr_auto)
└── pages/
    ├── WelcomePage.tsx           # Candidate photo carousel + CTA
    ├── LoginPage.tsx             # 6-digit PIN entry
    ├── CategorySelectionPage.tsx # Category cards with voting status badge
    ├── VotingPage.tsx            # Swipeable candidate grid + submit bar
    ├── CandidateProfilePage.tsx  # Photo gallery + bio
    ├── Data.tsx                  # Vote charts + winner reveal
    └── FoodiePage.tsx            # Food coupon QR display
```

---

## ✦ Key Implementation Decisions

**Why `staleTime: Infinity` on selections?**  
Candidate data is set before the event and never changes during it. Refetching every time the user navigates between pages wastes bandwidth on event-day WiFi and causes unnecessary loading flickers. A single fetch at login caches the full list for the session.

**Why `enabled: false` on `useWinners`?**  
The winners endpoint requires the event to be complete. Firing the query on component mount would fail or return empty data for every student who opens the Data page before results are unlocked. `enabled: false` means the query only runs when `resultsUnlocked === true`, triggered by a `useEffect` — zero wasted requests.

**Why `usePinCodeStatus` instead of blocking the UI?**  
Rather than disabling the submit button based on local state that could be out of sync, the `hasVotedSenior` flag comes from the server. This prevents a student from submitting twice if they refresh the page mid-vote.

**Why `visibleSlides` memoization on the welcome page?**  
The welcome carousel has 5 full-resolution images. Rendering all 5 simultaneously during an auto-advancing interval would consume significant GPU memory on mid-range phones. Only the previous, current, and next slides are mounted; others are unmounted until they become adjacent.

**Why store the PIN code separately in localStorage?**  
The JWT doesn't contain the raw PIN. The food coupon API requires the PIN directly (`/coupon/:pinCode`). Storing it separately with `setUserPinCode` keeps the API client clean and avoids re-decoding tokens or creating a dedicated endpoint just to retrieve the pin.

**Why Cloudinary URL transformation instead of `<img srcSet>`?**  
`srcSet` requires generating multiple versions at build time or upload time. Cloudinary transformation parameters are injected into the URL at render time — no extra uploads, no build tooling, and the CDN serves the optimally-sized and formatted image automatically based on the browser's capabilities.

---

## ✦ API Endpoints Used

| Method | Endpoint | Page |
|--------|----------|------|
| `POST` | `/auth/Plogin` | Login (PIN auth) |
| `GET` | `/selection` | Voting page, Category page |
| `POST` | `/vote/senior` | Voting page — submit King/Queen vote |
| `POST` | `/vote/junior` | Voting page — submit Prince/Princess vote |
| `GET` | `/vote/user` | Data page — fetch user's own votes |
| `GET` | `/vote/senior/pin` | Data page — vote count distribution |
| `GET` | `/pinCode/status` | Voting page — check if already voted |
| `GET` | `/appStatus/app` | Category page, Voting page — is voting open? |
| `GET` | `/appStatus/winner` | Data page — are winners revealed? |
| `GET` | `/winner/final` | Data page — fetch final winners |
| `GET` | `QR_API/coupon/:pin` | Foodie page — fetch coupon token |

---

## ✦ Getting Started

### Prerequisites
- Node.js ≥ 18
- A running backend + QR coupon API

### Installation

```bash
git clone https://github.com/your-username/technologia-voter.git
cd technologia-voter
npm install
```

### Environment

Create `.env`:

```env
VITE_API_URL=http://192.168.x.x:5000
VITE_QR_API_URL=https://your-qr-api.com
```

### Run

```bash
npm run dev    # Vite dev server
npm run build  # Production build → dist/
```

---

## ✦ Mobile Considerations

This app is designed exclusively for event-day use on students' personal phones. All design decisions optimize for this:

- All interactive targets are at least 44×44px (thumb-friendly)
- Swiper.js gestures replace pagination buttons on voting and profile pages
- PIN input boxes are 44px wide with 22px font — readable without zooming
- Images use `loading="lazy"` + skeleton placeholders to handle slow event WiFi
- `refetchOnWindowFocus: true` on status queries refreshes data when a student switches back from the camera or another app

---

## ✦ Roadmap

- [ ] Push notifications when winners are revealed (Web Push API)
- [ ] Offline fallback — show cached candidates when network drops
- [ ] Haptic feedback on vote submission (PWA Vibration API)
- [ ] Dark mode support (CSS variables already split-ready)
- [ ] Animated vote confirmation screen

---

## ✦ Author

Built by **[Your Name]**  
[Portfolio](https://your-portfolio.dev) · [LinkedIn](https://linkedin.com/in/yourhandle) · [GitHub](https://github.com/your-username)

---

<p align="center">
  <sub>Technologia Voting App — Student Interface · UTYCC Coronation Election 2026</sub>
</p>
