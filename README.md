# Thing Around

Платформа для аренды вещей и совладения ими. Позволяет пользователям размещать объявления о своих вещах, которые они готовы сдать в аренду или совладеть, а также находить и просматривать объявления других пользователей.

## Стек технологий

- **Next.js 16** - метафреймворк над React с поддержкой SSR, SSG и App Router
- **React 19** - UI-библиотека для построения компонентных интерфейсов
- **TypeScript** - статическая типизация для JavaScript
- **TailwindCSS 4** - utility-first CSS фреймворк
- **Zustand** - минималистичный стор для управления клиентским состоянием
- **TanStack Query** - библиотека для управления server state и кэширования запросов
- **Zod** - TypeScript-first библиотека для валидации и вывода типов схем
- **Axios** - HTTP-клиент для браузера и Node.js
- **Storybook 10** - инструмент для разработки и документирования UI-компонентов
- **Vitest** - быстрый фреймворк для юнит-тестирования на основе Vite

## Запуск

### Установка зависимостей

```bash
pnpm install
```

### Development сервер

```bash
pnpm dev
```

Доступно на http://localhost:3000

### Production сборка

```bash
pnpm build
pnpm start
```

### Storybook

```bash
pnpm storybook
```

### Docker

```bash
docker compose up --build
```

Доступно на http://localhost:3000

### Доступные команды

```bash
pnpm dev              # Запуск dev сервера
pnpm build            # Production сборка
pnpm start            # Запуск production версии
pnpm lint             # Проверка кода через ESLint
pnpm storybook        # Запуск Storybook
pnpm build-storybook  # Сборка Storybook
```
