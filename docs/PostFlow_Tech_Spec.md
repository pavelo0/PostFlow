# PostFlow — Tech Spec (Frontend + Backend)

> Этот документ синхронизирован с чеклистами `PostFlow_Front_CHECKLIST.md` и `PostFlow_Back_CHECKLIST.md`. Фокус: MVP → прод.

---

## 1) Цели и ограничения

### Цель MVP

- Планирование и отправка постов в Telegram-каналы по расписанию
- Управление несколькими каналами на одного пользователя
- Надёжная доставка: очередь, ретраи, статусы, видимые ошибки

### Не-цели MVP (можно позже)

- сложная командная работа (роли/approval)
- продвинутая маркетинговая аналитика “по охватам”
- интеграции с внешними системами (Notion/Zapier) — позже

---

## 2) Стек

### Frontend

- React 18 + Vite 5 + TypeScript
- Tailwind + shadcn/ui
- TanStack Query v5
- Zustand
- React Router v6
- Clerk
- React Hook Form + Zod
- date-fns, sonner

### Backend

- NestJS 10 + TypeScript
- Prisma + PostgreSQL
- Redis + BullMQ
- Clerk (`@clerk/backend`)
- Cloudflare R2 через AWS S3 SDK
- `@nestjs/throttler`, `helmet`, `class-validator`, `class-transformer`

---

## 3) Общие принципы API

### Формат ответов

- Успех: `{ data: <payload>, error: null }`
- Ошибка: `{ data: null, error: { code, message } }`

### Авторизация

- JWT от Clerk в `Authorization: Bearer <token>`
- Глобальный `ClerkAuthGuard` на все роуты, исключение: `POST /auth/sync`
- В запрос прокидываем `request.user` (clerkId), далее маппим на внутреннего `User`

### Валидация и безопасность

- глобальный `ValidationPipe`
- rate limiting через `@nestjs/throttler`
- `helmet`, `cors`
- проверка владельца ресурса на всех CRUD
- шифрование `Channel.botToken` при сохранении (и расшифровка при использовании)

---

## 4) Домен и данные (Prisma)

Минимально нужны сущности из чеклиста:

- `User`: `id`, `clerkId`, (опционально email), timestamps
- `Channel`: `id`, `userId`, `chatId`, `botToken`(encrypted), `title?`, timestamps
- `Post`: `id`, `channelId`, `text?`, `mediaUrl?`, `mediaType?`, `scheduledAt`, `status`, `sentAt?`, `errorText?`, `jobId?`, timestamps

Индексы:

- `Post.scheduledAt`
- `Post.status`

Статусы:

- `pending` — ожидает отправки (job создан)
- `sent` — отправлен
- `failed` — ошибка отправки (с `errorText`)

---

## 5) Backend — модули и ответственность

Соответствует блоку “Структура модулей” в чеклисте backend:

- `PrismaModule`: глобальный `PrismaService`
- `ChannelsModule`: CRUD + verify
- `PostsModule`: CRUD + stats + send-now + duplicate + schedule integration
- `UploadsModule`: приём файла → загрузка в R2 → возврат URL
- `QueueModule`: настройка BullMQ/Redis и очереди `telegram-posts`
- `TelegramModule`: отправка и verify через Telegram API

### Очередь и воркер

- Очередь: `telegram-posts`
- Job data: `{ postId }`
- Delay: `scheduledAt - now`
- Retry: 3 попытки с exponential backoff
- 429: уважать `Retry-After` (перезапланировать/задержать)
- Перед отправкой: проверить что пост всё ещё `pending`
- После успеха: `status=sent`, `sentAt=now`
- После ошибки: `status=failed`, `errorText=...`

---

## 6) Backend — эндпоинты (MVP)

### Auth

- `POST /auth/sync` — создать/найти `User` по `clerkId`

### Health

- `GET /health` — health check

### Channels

- `GET /channels` — список каналов текущего пользователя
- `POST /channels` — создать канал (`botToken`, `chatId`)
- `DELETE /channels/:id` — удалить канал (владелец)
- `POST /channels/:id/verify` — проверить бота и вернуть `title`/мета

### Posts

- `GET /posts` — список постов (фильтры: `channelId`, `status`, `from`, `to`, `search`) + пагинация
- `GET /posts/stats` — метрики для дашборда (counts)
- `GET /posts/:id` — один пост
- `POST /posts` — создать пост и поставить в очередь (delay)
- `PATCH /posts/:id` — обновить (только если `status=pending`) + пересоздать job
- `DELETE /posts/:id` — удалить + отменить job
- `POST /posts/:id/send-now` — немедленная отправка
- `POST /posts/:id/duplicate` — дублировать пост

### Uploads

- `POST /uploads` — Multer файл → R2 → вернуть публичный URL
  - типы: `jpg/png/gif/mp4`
  - лимит: 50MB
  - имя: `uuid + ext`

---

## 7) Frontend — структура и страницы

Соответствует фронт-чеклисту (React Router).

### Структура папок

- `app/`, `components/`, `hooks/`, `lib/`, `types/`

### Роуты

- публичный: `/auth`
- защищённые:
  - `/dashboard`
  - `/channels`
  - `/posts`
  - `/posts/new`
  - `/posts/:id/edit`
  - `/calendar`
  - `/analytics`
  - `/settings`

### Layout

- `DashboardLayout` (siderbar + header) + `<Outlet />`
- `ThemeToggle` (dark/light, localStorage)
- тосты (Sonner), skeletons, empty states

### Ключевые экраны

- **Channels**: таблица, verify/delete, пошаговая модалка добавления, show/hide bot token, блокировка Save до успешной проверки
- **Post Editor**: toolbar форматирования, textarea + счётчик, Telegram preview, upload медиа, schedule picker (date/time/timezone), send-now/schedule
- **Posts**: таблица, статусы (badges), фильтры, поиск, bulk actions, пагинация
- **Dashboard**: stat cards, ближайшие 5 постов, CTA на создание
- **Calendar**: month/week, посты по дням, “+N more”, переход в редактор
- **Analytics/Settings**: как в чеклисте (можно в MVP как заглушки → v1 позже)

---

## 8) Деплой

### Backend (Railway)

- env vars: `DATABASE_URL`, `REDIS_URL`, ключи Clerk, ключи R2
- build: `npm run build`
- start: `node dist/main`
- миграции: `prisma migrate deploy` (в build/релиз пайплайне)

### Frontend (Vercel)

- env vars: base URL API, Clerk publishable key и т.п.
- SPA редиректы при необходимости (для React Router)

---

## 9) Наблюдаемость и эксплуатация (минимум для MVP)

- логирование воркера (успех/ошибка/ретраи/429)
- алерты на рост `failed`
- health endpoint
- базовые метрики очереди (кол-во pending jobs)

