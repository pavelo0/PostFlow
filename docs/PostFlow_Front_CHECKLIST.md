# PostFlow — Frontend Checklist (по хронологии)

> **Цель:** собирать UI в том же порядке, как спроектированы экраны (см. `docs/PostFlow_Front_PAGES`).  
> **Стек:** React + Vite + TypeScript + Tailwind + shadcn/ui + **Redux Toolkit (RTK + RTK Query)** + React Router + Clerk.

---

## Фаза 0 — Фундамент проекта (один раз)

- [ ] Установить зависимости (react-router-dom, @reduxjs/toolkit, react-redux, react-hook-form, zod, @clerk/clerk-react, date-fns, sonner, clsx, tailwind-merge)
- [ ] Настроить Tailwind
- [ ] Инициализировать shadcn/ui + установить нужные компоненты
- [ ] Настроить import alias `@/` → `src/`
- [ ] `.env.local` + `.env.example`
- [ ] Настроить тему (dark/light) через CSS переменные shadcn (класс `.dark`)
- [ ] `main.tsx`: `ClerkProvider` + `Redux Provider` + `BrowserRouter`

---

## Фаза 1 — Сначала каркас роутинга (без дизайна)

### 1.1 Создать структуру папок

- [ ] Создать: `app/`, `pages/`, `layouts/`, `features/`, `shared/`
- [ ] Типы в `shared/types/index.ts` (User, Channel, Post, ApiResponse)
- [ ] Redux store в `shared/store/store.ts` (configureStore)
- [ ] RTK Query base API в `shared/api/baseApi.ts` (createApi + fetchBaseQuery)
  - [ ] baseUrl из env
  - [ ] Clerk JWT → заголовок `Authorization`
  - [ ] tagTypes + стратегия тегов (`providesTags/invalidatesTags`)

### 1.2 Дерево роутов + заглушки страниц

- [ ] Публичные роуты:
  - [ ] `/` → `LandingPage` (заглушка)
  - [ ] `/auth` → `AuthPage` (заглушка)
- [ ] Защищённые роуты (только для авторизованных):
  - [ ] `/onboarding` → `OnboardingPage` (заглушка)
  - [ ] `/dashboard` → `DashboardPage` (заглушка)
  - [ ] `/posts` → `PostsPage` (заглушка)
  - [ ] `/posts/new` → `PostEditorPage` (заглушка)
  - [ ] `/posts/:id/edit` → `PostEditorPage` (режим редактирования, заглушка)
  - [ ] `/calendar` → `CalendarPage` (заглушка)
  - [ ] `/channels` → `ChannelsPage` (заглушка)
  - [ ] `/analytics` → `AnalyticsPage` (заглушка)
  - [ ] `/settings` → `SettingsPage` (заглушка)
- [ ] Страница 404
- [ ] Проверить, что навигация работает по всем роутам (пока просто заглушки)

---

## Фаза 2 — Landing Page (`/`)

Собрать лендинг “Grow without the grind” (секции из `PostFlow_Front_PAGES`):

- [ ] Hero (заголовок + electric-violet градиент + мокап + social proof)
- [ ] Features grid (6 bento-карточек)
- [ ] How it works (Connect → Compose → Schedule)
- [ ] Pricing (Free/Pro/Business, выделить “Most Popular”)
- [ ] CTA → `/auth`

---

## Фаза 3 — Auth (`/auth`)

- [ ] Двухпанельный layout (слева бренд, справа карточка авторизации)
- [ ] Табы: Sign in / Create account
- [ ] Интеграция Clerk (`<SignIn />`, `<SignUp />` или кастомная форма на Clerk)
- [ ] Редирект после входа:
  - [ ] Если каналов ещё нет → `/onboarding`
  - [ ] Иначе → `/dashboard`
- [ ] После первого входа вызвать `POST /auth/sync`

---

## Фаза 4 — Onboarding (`/onboarding`)

Мастер настройки из 3 шагов как в `PostFlow_Front_PAGES`:

- [ ] Шаг 1: инструкция по BotFather
- [ ] Шаг 2: форма подключения (Bot Token + Channel ID)
  - [ ] “Test connection” (loading/success/error)
  - [ ] Save выключена, пока не verified
- [ ] Шаг 3: success-экран + CTA “Create first post” → `/posts/new`

---

## Фаза 5 — Shell для авторизованных (layout)

- [ ] `DashboardLayout` (Sidebar + Header + `<Outlet />`)
- [ ] Навигация в сайдбаре: Dashboard / Posts / Calendar / Channels / Analytics / Settings
- [ ] Header: заголовок страницы, theme toggle, глобальная кнопка “New Post”
- [ ] Theme toggle сохранять в localStorage
- [ ] Toast-система (Sonner) подключена один раз на корне приложения

---

## Фаза 6 — Dashboard (`/dashboard`)

По `PostFlow_Front_PAGES`:

- [ ] Ряд стат-карточек (Scheduled + sparkline, Sent, Failed подсветить если >0)
- [ ] Список Upcoming posts (следующие запланированные)
- [ ] Recent activity timeline (правая колонка)
- [ ] Your channels (горизонтальный список + status dots)
- [ ] Loading states (skeletons) + empty states

---

## Фаза 7 — Post Editor (`/posts/new`, `/posts/:id/edit`)

- [ ] Split layout 60/40 (editor/preview)
- [ ] Formatting toolbar (B / I / Code / Link)
- [ ] Textarea + счётчик символов
- [ ] Telegram dark-mode live preview (HTML теги)
- [ ] Media upload зона + превью
- [ ] Bottom bar: выбор канала + date/time picker
- [ ] Действия: Schedule / Send now
- [ ] RHF + Zod validation

---

## Фаза 8 — Calendar (`/calendar`)

- [ ] Month view (плашки по статусам)
- [ ] Week view
- [ ] Сайдбар “Scheduled this week”
- [ ] Клик по посту → открыть редактор; клик по пустому слоту → создать пост
- [ ] Skeletons/empty states

---

## Фаза 9 — Posts History (`/posts`)

- [ ] Filter bar (канал, статус, диапазон дат, поиск)
- [ ] Data table + bulk actions (duplicate/delete)
- [ ] Опционально: edit drawer справа для быстрых правок
- [ ] Pagination
- [ ] Skeletons/empty states

---

## Фаза 10 — Channels (`/channels`)

- [ ] Карточки/грид каналов со статусом + member counts
- [ ] Действия: Verify / Edit / Remove
- [ ] Add channel modal (переиспользует onboarding flow)

---

## Фаза 11 — Analytics (`/analytics`) + Settings (`/settings`)

- [ ] Analytics: ключевые метрики + график активности + разбивка по каналам (MVP или заглушки)
- [ ] Settings: профиль + уведомления + биллинг (в MVP можно заглушки)

---

## Фаза 12 — RTK Query endpoints (делаем “по мере надобности”)

Вместо того, чтобы делать весь API сразу, добавляем endpoints **по мере того, как они нужны конкретному экрану**:

- [ ] `features/channels/api/channelsApi.ts` (get/create/delete/verify)
- [ ] `features/posts/api/postsApi.ts` (get list, get one, create, update, delete, duplicate, send-now, stats)
- [ ] Теги:
  - [ ] `Channels` инвалидировать при create/delete/verify
  - [ ] `Posts` инвалидировать при create/update/delete/duplicate/send-now
  - [ ] `Stats` инвалидировать при действиях, которые меняют счётчики

