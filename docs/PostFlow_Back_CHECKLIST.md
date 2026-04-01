# PostFlow — Backend Checklist

> Стек: NestJS 10 + TypeScript + Prisma + PostgreSQL + Redis + BullMQ + Clerk +
> Cloudflare R2 + Railway

---

## Блок 1 — Конфиг проекта

- [ ] Создать NestJS проект
- [ ] Установить все зависимости (prisma, @prisma/client, @nestjs/config,
      @nestjs/bull, bullmq, ioredis, @clerk/backend, node-telegram-bot-api,
      multer, @aws-sdk/client-s3, class-validator, class-transformer,
      @nestjs/throttler, helmet)
- [ ] Настроить `@nestjs/config` — загрузка `.env` через
      `ConfigModule.forRoot()`
- [ ] Создать `.env` и `.env.example`
- [ ] Настроить `main.ts` — ValidationPipe глобально, helmet, cors
- [ ] Настроить глобальный Response interceptor — формат `{ data, error: null }`
- [ ] Настроить глобальный Exception filter — формат
      `{ data: null, error: { code, message } }`
- [ ] Настроить rate limiting через `@nestjs/throttler`

---

## Блок 2 — База данных (Prisma + PostgreSQL)

- [ ] Зарегистрироваться на Railway, создать проект
- [ ] Добавить PostgreSQL сервис в Railway
- [ ] Скопировать `DATABASE_URL` из Railway в `.env`
- [ ] Инициализировать Prisma (`npx prisma init`)
- [ ] Описать модель `User` в `schema.prisma`
- [ ] Описать модель `Channel` в `schema.prisma`
- [ ] Описать модель `Post` в `schema.prisma`
- [ ] Добавить индексы на `Post.scheduledAt` и `Post.status`
- [ ] Запустить первую миграцию локально
- [ ] Создать `PrismaModule` и `PrismaService` — глобальный модуль
- [ ] Проверить соединение с базой локально

---

## Блок 3 — Redis + BullMQ

- [ ] Добавить Redis сервис в Railway
- [ ] Скопировать `REDIS_URL` из Railway в `.env`
- [ ] Настроить подключение к Redis через ioredis
- [ ] Зарегистрировать `BullModule` глобально с подключением к Redis
- [ ] Создать очередь `telegram-posts`
- [ ] Проверить соединение с Redis локально

---

## Блок 4 — Авторизация (Clerk)

- [ ] Зарегистрироваться на clerk.com, создать приложение
- [ ] Скопировать `CLERK_SECRET_KEY` в `.env`
- [ ] Создать `ClerkAuthGuard` — верификация JWT из заголовка `Authorization`
- [ ] Вытаскивать `clerkId` из токена и добавлять в `request.user`
- [ ] Применить `ClerkAuthGuard` глобально ко всем роутам
- [ ] Создать `UsersModule` и `UsersService`
- [ ] Создать `POST /auth/sync` — создать или найти юзера по clerkId
- [ ] Создать декоратор `@CurrentUser()` для получения юзера из запроса
- [ ] Исключить `/auth/sync` из проверки авторизации

---

## Блок 5 — Структура модулей

- [ ] Создать `ChannelsModule`
- [ ] Создать `PostsModule`
- [ ] Создать `UploadsModule`
- [ ] Создать `QueueModule` (BullMQ очередь)
- [ ] Создать `TelegramModule` (сервис отправки)
- [ ] Зарегистрировать все модули в `AppModule`

---

## Блок 6 — Каналы (ChannelsModule)

- [ ] Создать `ChannelsController` с роутами
- [ ] `GET /channels` — список каналов текущего юзера
- [ ] `POST /channels` — создать канал (принять botToken + chatId)
- [ ] `DELETE /channels/:id` — удалить канал (проверить владельца)
- [ ] `POST /channels/:id/verify` — проверить соединение с ботом
- [ ] Создать DTO классы с валидацией для каждого роута
- [ ] Шифровать `botToken` перед сохранением в БД
- [ ] Расшифровывать `botToken` при чтении из БД
- [ ] В `/verify` — вызвать Telegram API, вернуть название канала и кол-во
      подписчиков
- [ ] Проверять владельца канала на DELETE и verify

---

## Блок 7 — Посты (PostsModule)

- [ ] Создать `PostsController` с роутами
- [ ] `GET /posts` — список постов с фильтрами (channelId, status, from, to,
      search)
- [ ] `GET /posts/stats` — статистика для дашборда (scheduled, sent, failed
      counts)
- [ ] `GET /posts/:id` — один пост
- [ ] `POST /posts` — создать пост и поставить в очередь
- [ ] `PATCH /posts/:id` — обновить пост (только если status = pending)
- [ ] `DELETE /posts/:id` — удалить пост и отменить задачу в очереди
- [ ] `POST /posts/:id/send-now` — немедленная отправка
- [ ] `POST /posts/:id/duplicate` — дублировать пост
- [ ] Создать DTO классы с валидацией для каждого роута
- [ ] Проверять владельца поста на всех роутах
- [ ] При создании поста — добавить задачу в BullMQ с нужным delay
- [ ] При обновлении поста — отменить старую задачу, создать новую
- [ ] При удалении поста — отменить задачу в очереди
- [ ] Пагинация на `GET /posts`

---

## Блок 8 — Загрузка медиа (UploadsModule)

- [ ] Зарегистрироваться на Cloudflare, создать R2 bucket
- [ ] Скопировать R2 credentials в `.env` (endpoint, access key, secret key,
      bucket name)
- [ ] Настроить `@aws-sdk/client-s3` для работы с R2
- [ ] Создать `UploadsController`
- [ ] `POST /uploads` — принять файл через Multer, загрузить в R2, вернуть
      публичный URL
- [ ] Ограничить типы файлов (только jpg, png, gif, mp4)
- [ ] Ограничить размер файла (50MB)
- [ ] Генерировать уникальное имя файла (uuid + расширение)
- [ ] Настроить публичный доступ к bucket в Cloudflare

---

## Блок 9 — Telegram сервис (TelegramModule)

- [ ] Создать `TelegramService`
- [ ] Метод `sendMessage(botToken, chatId, text)` — отправить текстовый пост
- [ ] Метод `sendPhoto(botToken, chatId, photoUrl, caption)` — отправить фото
- [ ] Метод `sendVideo(botToken, chatId, videoUrl, caption)` — отправить видео
- [ ] Метод `verifyBot(botToken, chatId)` — проверить соединение
- [ ] Все методы с parse_mode HTML
- [ ] Обработка ошибок Telegram API (401, 403, 429)

---

## Блок 10 — BullMQ воркер

- [ ] Создать `TelegramWorker` — процессор очереди `telegram-posts`
- [ ] Достать пост из БД по `postId` из job data
- [ ] Проверить что статус поста всё ещё `pending`
- [ ] Расшифровать botToken канала
- [ ] Отправить пост через `TelegramService`
- [ ] Обновить статус поста на `sent`, записать `sentAt`
- [ ] Обработать `onJobFailed` — обновить статус на `failed`, записать
      `errorText`
- [ ] Настроить retry: 3 попытки с exponential backoff
- [ ] Обработать 429 от Telegram — задержка из `Retry-After` заголовка
- [ ] Логировать все ошибки воркера

---

## Блок 11 — Деплой на Railway

- [ ] Создать репозиторий на GitHub
- [ ] Подключить репозиторий к Railway
- [ ] Добавить все env переменные в Railway
- [ ] Настроить build команду: `npm run build`
- [ ] Настроить start команду: `node dist/main`
- [ ] Добавить Prisma migrate в build: `prisma migrate deploy && node dist/main`
- [ ] Проверить логи после первого деплоя
- [ ] Проверить соединение фронтенда с бекендом в проде
- [ ] Настроить health check endpoint `GET /health`
