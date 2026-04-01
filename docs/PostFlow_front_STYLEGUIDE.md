# PostFlow Design System & Style Guide

## 1. Brand Identity

**Name:** PostFlow **Tagline:** "Write once, publish on schedule"
**Personality:** Sharp, minimal, focused. (Linear + Vercel aesthetic) **Logo:**
"Post" (Regular) + "Flow" (Semibold). Icon: Two horizontal stacked lines with a
right-pointing arrow.

---

## 2. Color Palette

### 2.1 Core Accents

- **Primary Accent:** `#6E56CF` (Electric Violet)
- **Accent Hover:** `#5B43B0`
- **Dark Mode Accent:** `#8B72E8` (Lighter variant for contrast)
- **Subtle Accent BG:** `rgba(110, 86, 207, 0.08)` (Active states/tags)

### 2.2 Semantic Colors

- **Success:** `#30A46C`
- **Error:** `#E5484D`
- **Warning:** `#F76B15`
- **Info:** `#0091FF`

### 2.3 Light Theme Surface & Text

- **Background:** `#FAFAFA`
- **Surface:** `#FFFFFF`
- **Surface-2:** `#F4F4F5`
- **Border:** `#E4E4E7`
- **Text Primary:** `#18181B`
- **Text Secondary:** `#71717A`
- **Text Muted:** `#A1A1AA`

### 2.4 Dark Theme Surface & Text

- **Background:** `#0C0C0E`
- **Surface:** `#111113`
- **Surface-2:** `#1A1A1F`
- **Border:** `#27272A`
- **Text Primary:** `#FAFAFA`
- **Text Secondary:** `#A1A1AA`
- **Text Muted:** `#52525B`

---

## 3. Typography (Font: Inter)


| Size | Weight | Line Height | Usage                        |
| ---- | ------ | ----------- | ---------------------------- |
| 11px | 400    | 1.2         | Labels, Captions             |
| 12px | 500    | 1.2         | Badges, Timestamps           |
| 13px | 400    | 1.5         | Secondary Body               |
| 14px | 400    | 1.6         | Primary Body                 |
| 14px | 500    | 1.2         | Navigation, Table Cells      |
| 16px | 600    | 1.4         | Card Titles, Section Headers |
| 20px | 600    | 1.4         | Page Titles                  |
| 30px | 700    | 1.2         | Landing Hero                 |
| 48px | 800    | 1.1         | Landing Headline             |


---

## 4. Layout & Grid

### 4.1 Authenticated Shell (Desktop)

- **Sidebar:** `220px` Fixed
- **Top Header:** `56px` Fixed
- **Main Content Padding:** `32px`
- **Max-Width:** `1200px` (Centered)

### 4.2 Adaptive Breakpoints

- **Mobile (< 640px):** Sidebar hidden, bottom navigation or hamburger menu.
Content padding `16px`.
- **Tablet (640px - 1024px):** Sidebar collapses to `64px` (Icons only). Content
padding `24px`.
- **Desktop (> 1024px):** Standard full sidebar (`220px`).

---

## 5. React Component Architecture

### 5.1 Foundation Components

- `Button`: Variants (Primary, Secondary, Ghost, Destructive). Supports
loading/disabled states.
- `Input`: Standardized padding, borders, and focus rings.
- `Badge`: Status-based coloring (Sent, Scheduled, Failed).
- `Avatar`: Circle containers for users and channels.
- `Icon`: Wrapper for Lucide-React icons (16px, 1.5 stroke).

### 5.2 Layout Blocks

- `AppShell`: Manages the Sidebar, Header, and Content area.
- `Sidebar`: Navigation links with active state detection.
- `Header`: Page title, theme toggle, and global "New Post" action.
- `Section`: Container with standard margins and headers.

### 5.3 Data & Interaction Blocks

- `DataTable`: Composed of `TableHeader`, `TableRow`, `TableCell`. Supports bulk
actions.
- `Card`: Generic surface container with consistent padding/radius.
- `Modal`: Dialog overlay with transition animations.
- `TelegramPreview`: Specialized component with fixed "Telegram Dark" styling.
- `PostEditor`: Complex form with toolbar and preview synchronization.

---

## 6. Interaction & Motion

- **Transitions:** `150ms ease-out` for hover and active states.
- **Micro-interactions:** `scale(0.98)` on button clicks.
- **Entry:** Subtle `translate-y(4px)` and `opacity: 0` to `1` on page loads.
- **Loading:** Shimmer effect on skeletons matching final content shapes.

