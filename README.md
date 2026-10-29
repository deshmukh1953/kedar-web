# NexusIntern - Premium Online Internship & Code Review Platform Theme

A high-performance, developer-centric design theme tailored for online internship platforms featuring **multi-duration cohorts (1, 2, 6 months)**, **individual and group enrollment modalities**, **dedicated trainer code review & approval console**, and **admin governance**.

Built with **React 18**, **TypeScript**, and **Tailwind CSS**.

---

## 🎨 Theme Architecture: "Cyber Nexus / Obsidian Prism"

The color system uses high-contrast dark surfaces with calibrated semantic accents to maintain code readability and instantly identify user roles and duration tracks.

### 1. Core Brand & Surfaces
| Surface / Element | Hex Code | Visual Preview & Description |
| :--- | :--- | :--- |
| **Dark Canvas (Background)** | `#090D16` | Deep midnight obsidian for maximum eye comfort during long code reading |
| **Dark Surface (Cards)** | `#0F172A` | Navy slate for content containers, task cards, and diff panels |
| **Elevated Surface (Modals)** | `#1E293B` | Bordered slate for modals, popups, and dropdown menus |
| **Primary Brand Accent** | `#6366F1` / `#4F46E5` | Electric Indigo — Primary navigation, primary action buttons, focus rings |

---

### 2. Role Identity Tokens
| Role Modality | Primary Accent | Hex Token | Key Responsibilities & Theme Context |
| :--- | :--- | :--- | :--- |
| **👨‍💻 Individual Student** | **Express Cyan** | `#06B6D4` | Solo deep-work track, personal GitHub repository, weekly milestones, 1-on-1 trainer code reviews |
| **👥 Group / Team Track** | **Cosmic Violet** | `#8B5CF6` | Collaborative squad workspace, shared repository, branch tracking, collective milestone sign-off |
| **🧑‍🏫 Trainer / Code Reviewer** | **Cyber Emerald** | `#10B981` | Submission queue, line-by-line diff inspector, OWASP security rubric, "Approve & Sign-Off" / "Request Revisions" |
| **🛡️ Platform Admin** | **Solar Amber** | `#F59E0B` | System governance, cohort duration distribution (1M/2M/6M), trainer workload SLA tracking, blockchain certificates |

---

### 3. Internship Duration Tracks
| Duration Track | Color Accent | Hex Token | Curriculum Milestone Focus |
| :--- | :--- | :--- | :--- |
| **1 Month (Sprint Track)** | Cyan | `#06B6D4` | Fast-paced 4-week sprint: Git mastery, REST API design, JWT auth, AWS Serverless deployment |
| **2 Months (Core Standard)** | Indigo | `#6366F1` | In-depth 8-week engineering: Microservice architecture, Redis caching, CI/CD pipeline, automated testing |
| **6 Months (Capstone Track)** | Violet / Fuchsia | `#8B5CF6` | Comprehensive 24-week capstone: Kubernetes orchestration, distributed consensus, production load testing, corporate placement |

---

### 4. Code Review & Verification Diff Tokens
| Review Element | Background Tint | Border / Gutter | Text Color |
| :--- | :--- | :--- | :--- |
| **Added Code Line (+)** | `rgba(16, 185, 129, 0.12)` | `#10B981` (Emerald) | `#34D399` |
| **Deleted Code Line (-)** | `rgba(239, 68, 68, 0.12)` | `#EF4444` (Coral Red) | `#F87171` |
| **Pending Review** | `rgba(59, 130, 246, 0.12)` | `#3B82F6` (Blue) | `#60A5FA` |
| **Changes Requested** | `rgba(245, 158, 11, 0.12)` | `#F59E0B` (Amber) | `#FBBF24` |
| **Approved & Verified** | `rgba(16, 185, 129, 0.15)` | `#10B981` (Emerald) | `#34D399` |

---

## 💻 Tech Stack & Directory Structure

```
d:\intern/
├── index.html                   # Vite React HTML entry point
├── preview.html                 # Standalone offline runner (zero-install, double-click to view)
├── package.json                 # React 18, Vite, Tailwind CSS dependencies
├── tailwind.config.js           # Extended Tailwind theme with custom colors & shadows
├── vite.config.ts               # Vite configuration
├── tsconfig.json                # TypeScript compiler configuration
├── styles/
│   └── theme.css                # CSS custom properties and theme tokens
├── src/
│   ├── main.tsx                 # React entry point
│   ├── App.tsx                  # Main application orchestrator & state manager
│   ├── index.css                # Tailwind base directives & code diff classes
│   ├── types.ts                 # TypeScript types (RoleType, DurationType, Milestones)
│   ├── theme/
│   │   └── tokens.ts            # Design tokens, swatches, durations, and role definitions
│   └── components/
│       ├── Navbar.tsx           # Global navigation with live role & duration switchers
│       ├── DurationBar.tsx      # Interactive 1M, 2M, 6M duration selector
│       ├── LoginModal.tsx       # 4-in-1 tabbed authentication modal (Individual, Group, Trainer, Admin)
│       ├── IndividualDashboard.tsx # Intern dashboard with code submission & feedback log
│       ├── GroupDashboard.tsx   # Team workspace with squad roster & sprint task matrix
│       ├── TrainerConsole.tsx   # PR queue, interactive code diff viewer & approval actions
│       ├── AdminDashboard.tsx   # Operations metrics, duration breakdown & trainer SLA table
│       ├── ColorGuideModal.tsx  # Swatch cards with click-to-copy hex codes
│       └── Toast.tsx            # Real-time feedback notification toasts
└── dist/                        # Production build bundle
```

---

## 🚀 How to Run

### Option 1: Run the React Development Server (Recommended)
```bash
# In d:\intern
npm run dev
```
Open the local URL (typically `http://localhost:5173`) in your browser to experience the full interactive React application.

### Option 2: Build for Production
```bash
npm run build
npm run preview
```

### Option 3: Instant Standalone Preview (No npm or Node required)
Open [`preview.html`](file:///d:/intern/preview.html) directly in any modern web browser (Edge, Chrome, Firefox, Safari).
It is a fully interactive, self-contained prototype equipped with the role switcher, duration tracker, 4-in-1 login modal, interactive code diff, trainer approval triggers, and color guide.
