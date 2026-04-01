# FastFlow / PostFlow

Монорепозиторий для **PostFlow** — планировщика Telegram-постов (frontend +
backend + docs).

---

## Быстрый старт

### Требования

- Node.js + npm (рекомендуется LTS)

### Установка зависимостей (одной командой)

Из корня:

```bash
npm install
```

Это поставит зависимости:

- в корне (инструменты типа husky/lint-staged)
- в `frontend/`
- в `backend/` (когда папка появится; если её нет — будет `skip`)
- в `./`

Если хочешь запускать явно:

```bash
npm run install:all
```

---

## Команды

### Проверки

```bash
npm run check
```

Дополнительно (фронт):

```bash
npm run lint
npm run typecheck
npm run test
```

---

## Структура репозитория

- `frontend/` — React/Vite приложение (UI)
- `backend/` — NestJS API + очереди (появится/в разработке)
- `docs/` — продуктовые и технические документы, чеклисты

---

## Документация

Главные документы:

- `docs/PostFlow_Overview.md` — что за продукт, MVP, стратегия, расходы, roadmap
- `docs/PostFlow_Tech_Spec.md` — tech spec (API, модули, деплой)
- `docs/PostFlow_Front_CHECKLIST.md` / `docs/PostFlow_Back_CHECKLIST.md` —
  чеклисты реализации

---

## Git conventions

### Коммиты

Рекомендуемый стиль (Conventional Commits):

- `feat: ...`
- `style: ...`
- `fix: ...`
- `docs: ...`
- `refactor: ...`
- `config: ...`

Пример:

```text
[feat] add scheduled posts list
```

### Pull Requests

- короткое описание “зачем”
- скриншоты для UI
- тест-план (как проверить)

---

## ENV / секреты

- Не коммить `.env*` с реальными ключами
- Храни пример в `.env.example` (в подпроектах — рядом)
