# PostFlow — Frontend Checklist

> Стек: React 18 + Vite 5 + TypeScript + Tailwind + shadcn/ui + TanStack Query
> v5 + Zustand + React Router v6 + Clerk

---

## Блок 1 — Конфиг проекта

- Создать Vite + React + TypeScript проект
- Установить все зависимости (react-router-dom, tanstack/react-query, axios,
zustand, react-hook-form, zod, clerk, date-fns, sonner, clsx,
tailwind-merge)
- Настроить Tailwind CSS
- Инициализировать shadcn/ui
- Установить нужные shadcn компоненты (button, input, textarea, dialog,
table, badge, skeleton, calendar, tabs, card, select, popover, sheet,
tooltip, dropdown-menu)
- Настроить path alias `@/` → `src/`
- Создать `.env.local` и `.env.example`
- Настроить `main.tsx` — обернуть в ClerkProvider + QueryClientProvider +
BrowserRouter
- Настроить тему (dark/light) через CSS переменные shadcn

---

## Блок 2 — Структура папок

- Создать папки: `app/`, `components/`, `hooks/`, `lib/`, `types/`
- Создать все файлы-заглушки для страниц и компонентов
- Описать все TypeScript типы в `types/index.ts` (User, Channel, Post,
ApiResponse)
- Создать `lib/api.ts` — axios instance с базовым URL и Clerk JWT в
заголовках
- Создать `lib/store.ts` — базовый Zustand store (selectedChannelId, theme)
- Создать `lib/utils.ts` — вспомогательные функции

---

## Блок 3 — Роутинг (голое дерево без UI)

- Настроить `BrowserRouter` в `main.tsx`
- Создать корневой `App.tsx` с деревом роутов
- Добавить публичный роут `/auth`
- Создать `ProtectedRoute` обёртку (редирект на `/auth` если не авторизован)
- Добавить роут `/dashboard` внутри ProtectedRoute
- Добавить роут `/channels` внутри ProtectedRoute
- Добавить роут `/posts` внутри ProtectedRoute
- Добавить роут `/posts/new` внутри ProtectedRoute
- Добавить роут `/posts/:id/edit` внутри ProtectedRoute
- Добавить роут `/calendar` внутри ProtectedRoute
- Добавить роут `/analytics` внутри ProtectedRoute
- Добавить роут `/settings` внутри ProtectedRoute
- Добавить редирект с `/` на `/dashboard`
- Добавить 404 страницу
- Проверить что все роуты открываются (заглушки)

---

## Блок 4 — Layout (оболочка дашборда)

- Создать `DashboardLayout.tsx` с сайдбаром и хедером
- Создать `Sidebar.tsx` — навигация, логотип, аватар пользователя внизу
- Создать `Header.tsx` — заголовок страницы, кнопка New Post, переключатель
темы
- Создать `ThemeToggle.tsx` — переключатель dark/light, сохранять в
localStorage
- Подключить `DashboardLayout` ко всем защищённым роутам через `<Outlet />`
- Отметить активный пункт меню в сайдбаре по текущему роуту

---

## Блок 5 — Авторизация

- Создать страницу `/auth` с вкладками Sign In / Sign Up
- Встроить Clerk `<SignIn />` и `<SignUp />` компоненты
- Настроить редирект после входа на `/dashboard`
- После первого входа вызвать `POST /auth/sync` на бекенде
- Добавить кнопку выхода в сайдбар через Clerk

---

## Блок 6 — TanStack Query хуки

- `useChannels()` — список каналов
- `useCreateChannel()` — создание канала
- `useDeleteChannel()` — удаление канала
- `useVerifyChannel()` — проверка соединения
- `usePosts(filters)` — список постов с фильтрами
- `usePost(id)` — один пост
- `useCreatePost()` — создание поста
- `useUpdatePost()` — обновление поста
- `useDeletePost()` — удаление поста
- `useDuplicatePost()` — дублирование поста
- `useSendNow()` — немедленная отправка
- `useStats()` — статистика для дашборда
- Настроить `invalidateQueries` после каждой мутации

---

## Блок 7 — Страница Channels

- Таблица каналов с колонками: название, chat_id, статус, дата, действия
- Статус бота: Connected / Error / Not verified (цветные бейджи)
- Кнопки Verify и Delete на каждой строке
- Модалка добавления канала (3 шага: инструкция → ввод данных → успех)
- Поле bot_token с show/hide переключателем
- Кнопка "Test connection" с состояниями: loading → success / error
- Кнопка Save заблокирована до успешной проверки
- Empty state когда каналов нет
- Skeleton при загрузке

---

## Блок 8 — Редактор поста

- `FormatToolbar.tsx` — кнопки B / I / Code / Link
- Textarea с placeholder и счётчиком символов
- `TelegramPreview.tsx` — тёмный фон, пузырь, рендер HTML тегов
- Превью медиа в пузыре
- `MediaUpload.tsx` — drag & drop зона, загрузка на бек, превью, удалить
- `SchedulePicker.tsx` — DatePicker + TimePicker + селект таймзоны
- Дропдаун выбора канала
- Кнопки "Send now" и "Schedule"
- Форма на React Hook Form + Zod валидация
- Страница `/posts/new`
- Страница `/posts/:id/edit` — загрузить данные, заполнить форму

---

## Блок 9 — Страница Posts (история)

- Таблица постов: превью, канал, запланировано, отправлено, статус, действия
- `StatusBadge.tsx` — pending / scheduled / sent / failed с цветами
- Failed строки с красной левой границей
- Фильтр по каналу
- Фильтр по статусу (табы: All / Scheduled / Sent / Failed)
- Фильтр по диапазону дат
- Поиск по тексту
- Действия на строке: Edit / Duplicate / Delete
- Bulk actions: выбрать несколько → удалить
- Пагинация
- Empty state
- Skeleton при загрузке

---

## Блок 10 — Дашборд

- `StatCard.tsx` — число, подпись, мини-график
- 3 карточки: Scheduled / Sent this month / Failed
- Карточка Failed красная если > 0
- `UpcomingPosts.tsx` — список ближайших 5 постов
- Кнопка "View all" → /posts
- Быстрый доступ к созданию поста
- Empty state когда постов нет
- Skeleton при загрузке

---

## Блок 11 — Страница Calendar

- Сетка месяца (7 колонок, строки по неделям)
- Навигация по месяцам
- Текущий день выделен
- Карточки постов в ячейках с цветом по статусу
- "+ N more" если постов больше 3 в день
- Клик на пост — открыть редактор
- Клик на пустой день — создать пост с этой датой
- Переключатель Week / Month
- Skeleton при загрузке

---

## Блок 12 — Страница Analytics

- 4 stat-карточки: опубликовано / success rate / среднее в день / активных
каналов
- График активности по дням (recharts)
- График по каналам
- График по часам дня
- Фильтр по периоду: 7д / 30д / 90д
- Фильтр по каналу
- Empty state если данных мало
- Skeleton при загрузке

---

## Блок 13 — Страница Settings

- Табы: Profile / Notifications / Billing / Danger zone
- Profile: форма с именем, email, таймзоной, аватаром
- Notifications: тогглы для email уведомлений
- Billing: текущий план, usage bars, карточки планов
- Danger zone: удаление аккаунта с подтверждением

---

## Блок 14 — Shared компоненты

- `EmptyState.tsx` — иллюстрация + текст + CTA кнопка
- `ConfirmDialog.tsx` — модалка подтверждения опасных действий
- `LoadingSpinner.tsx`
- Toast уведомления через Sonner на каждое действие
- Skeleton на всех загружаемых блоках

---

## Блок 15 — Деплой

- Создать репозиторий на GitHub
- Подключить репозиторий к Vercel
- Добавить env переменные в Vercel
- Настроить `vercel.json` для SPA (редирект всех роутов на index.html)
- Проверить прод сборку локально
- Задеплоить и проверить все страницы в проде

