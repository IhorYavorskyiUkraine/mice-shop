# Mice Shop

## Описание проекта
Mice Shop — это веб-приложение для продажи компьютерных мышек. Проект реализован на стеке Next.js, NestJS, GraphQL, Apollo GraphQL, PostgreSQL и Docker.

## Документация проекта может дополняться и изменяться по мере развития

## Функциональные возможности 
- Главная страница со слайдером и каталогом товаров.
- Каталог товаров с фильтрацией и сортировкой.
- Страница товара с описанием, характеристиками и отзывами.
- Корзина покупок и оформление заказа.
- Авторизация и регистрация пользователей.
- Личный кабинет с историей заказов.
- Возможность оставлять отзывы и ставить оценки.
- Интеграция с платежной системой.

## Технический стек
- **Frontend**: Next.js, Apollo Client, Tailwind CSS.
- **Backend**: NestJS, Apollo Server, GraphQL, Prisma ORM.
- **База данных**: PostgreSQL.
- **Инфраструктура**: Docker, Docker Compose.

## План разработки
### 1. Анализ требований
- Определение ключевого функционала.
- Проектирование структуры базы данных.

### 2. Настройка окружения
- Конфигурация Docker и Docker Compose.
- Развертывание PostgreSQL.

### 3. Разработка Backend (NestJS)
#### 3.1 Настройка базовой архитектуры
- Инициализация NestJS-проекта. ✅
- Настройка GraphQL API через Apollo Server.
- Подключение Prisma ORM и настройка схемы базы данных.

#### 3.2 Реализация авторизации и аутентификации
- Создание модели `User` в базе данных (id, email, password, role).
- Настройка регистрации пользователей с хешированием паролей через bcrypt.
- Настройка входа в систему и генерация JWT-токенов.
- Middleware для проверки аутентификации и авторизации пользователей.

#### 3.3 Реализация управления товарами
- Создание модели `Product` (id, name, description, price, image, stock).
- CRUD-операции для товаров (создание, чтение, обновление, удаление).
- Фильтрация и сортировка товаров.

#### 3.4 Работа с заказами
- Создание модели `Order` (id, userId, items, totalPrice, status).
- Логика оформления заказа и обновления статуса.

### 4. Разработка Frontend (Next.js)
#### 4.1 Настройка базовой архитектуры
- Настройка Apollo Client для работы с GraphQL.
- Настройка маршрутизации через Next.js.

#### 4.2 Реализация страниц
- Главная страница со слайдером и каталогом товаров
- Страница товара с отзывами.
- Корзина покупок и оформление заказа.
- Авторизация, регистрация и личный кабинет.

#### 4.3 Управление состоянием
- Глобальное состояние через Apollo Cache или Zustand.
- Хранение информации о сессии пользователя и токене.

### 5. Интеграция платежной системы
- Подключение Stripe или PayPal.
- Обработка успешных и неуспешных платежей.

### 6. Тестирование
- Юнит-тесты для API.
- Интеграционные тесты GraphQL.
- Тестирование UI.

### 7. Развертывание
- Настройка CI/CD для автоматического деплоя.
- Размещение проекта на сервере (VPS, AWS, Heroku и т.д.).

#### История

- 19.03.25 Нарисовал шапку для сайта 
- 20.03.25 Сделал мейн, футер, корзину и половину оформления заказа 
- 24.03.25 Сделал оформление заказа, страницу профиля, страницу товара, магазина и контактов 
- 25.03.25 Сделал модели призма, сервис для юзера и немного изменил шрифт
- 26.03.25 Пересмотрена схема базы данных (может меняться), добавлены сервисы и ресолверы для продуктов, юзеров и аутентификации  
- 27.03.25 Сделал сидинг для продуктов и их категорий/тегов, а так же сервисы и ресолверы для корзины и продуктов
- 02.04.25 Исправлены модели GraphQL, сделан хедер, поиск товаров, переход на pnpm 
- 05.04.25 Добавлен спиннер, скелетон, недавние запросы, а так же поиск и бургер на мобильные разрешения 
- 06.04.25 Добавлены компоненты для секций и слайдер
- 07.04.25 Добавил футер, новые секции + изменил существующие, изменил сид и сервис для продуктов
- 08.04.25 Изменена модель продукта, исправил секции с продуктами
- 10.04.25 Добавлены типы во фронтенде, компоненты для ui, доделан респонсив для главной страницы, начата страница для магазина
- 10.04.25 Добавлены фильтры для поиска товаров во фронтенде и на бекенде

#### Примечания
- НЕДОДЕЛАННЫЕ ТАСКИ ПО ПОИСКУ //TODO