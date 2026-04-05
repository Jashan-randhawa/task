# TalentArch UI

A modern, responsive frontend application for managing talent, events, contracts, and analytics — built for event architects and talent coordinators.

---

## Tech Stack

- **React 19** — UI framework
- **Vite 8** — Development server and bundler
- **React Router v7** — Client-side routing
- **Lucide React** — Icon library
- **CSS Modules / Custom CSS** — Styling

---

## Project Structure

```
task-main/
└── frontend/
    ├── public/               # Static assets (favicon, icons, images)
    ├── src/
    │   ├── components/       # Shared components (Header, Sidebar)
    │   ├── pages/            # Page-level components
    │   │   ├── SignUpPage.jsx
    │   │   ├── SignInPage.jsx
    │   │   ├── ArchitectDashboard.jsx
    │   │   ├── TalentPage.jsx
    │   │   ├── EventsPage.jsx
    │   │   ├── CreateEvent.jsx
    │   │   ├── AnalyticsPage.jsx
    │   │   ├── ContractsPage.jsx
    │   │   ├── SettingsPage.jsx
    │   │   └── SuccessPage.jsx
    │   ├── App.jsx           # Root component with routing
    │   ├── App.css           # Global app styles
    │   ├── main.jsx          # Entry point
    │   └── index.css         # Base/reset styles
    ├── package.json
    ├── vite.config.js
    └── eslint.config.js
```

---

## Pages & Features

| Route | Page | Description |
|---|---|---|
| `/signup` | Sign Up | User registration |
| `/signin` | Sign In | User login |
| `/dashboard` | Architect Dashboard | Overview stats, charts, quick actions |
| `/talent` | Talent Network | Browse and filter verified talent profiles |
| `/events` | Events | View and manage events |
| `/create-event` | Create Event | Multi-step event creation flow |
| `/analytics` | Analytics | Performance charts and insights |
| `/contracts` | Contracts | Contract management |
| `/settings` | Settings | User and app preferences |
| `/success` | Success | Post-action confirmation screen |

---

## Getting Started

### Prerequisites

- **Node.js** v18 or higher
- **npm** v9 or higher

### Installation

```bash
# Navigate to the frontend directory
cd task-main/frontend

# Install dependencies
npm install
```

### Running the Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173` by default.

### Building for Production

```bash
npm run build
```

The production-ready files will be output to the `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

### Linting

```bash
npm run lint
```

---

## Key Components

- **Header** — Global top bar with search, notifications, and user dropdown. Hidden on auth pages.
- **Sidebar** — Navigation sidebar for all main routes.
- **ArchitectDashboard** — Animated stat cards, bar charts with time filters (7D / 30D / 90D), and activity feeds.
- **TalentPage** — Filterable talent grid with bookmarking, type filters (speaker / performer / crew), and search.

---

## Notes

- The app defaults to `/signup` on first load.
- The Header and Sidebar are hidden on `/signup` and `/signin` routes.
- All data is currently mocked/static within component files — no backend integration is wired up.
