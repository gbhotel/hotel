<p align="center">
<strong><h1>The Hotel project</h1></strong>
</p>

<p align="center">
<a href="https://github.com/Sharymka/hotel/actions/workflows/laravel_tests.yml" target="_blank"><img src="https://github.com/Sharymka/hotel/actions/workflows/laravel_tests.yml/badge.svg?branch=main" width="400" alt="Laravel Tests"></a>
</p>

## О проекте

### Подготовка проекта

- установить `php@8.2`, `composer`
- установить бекенд зависимости `composer install`
- установить `npm`
- установить фронтенд зависимости `npm install`

### Запуск проекта

- скопировать `.env.example` в `.env`: `cp .env.example .env`
- сгенерировать ключ `php artisan key:generate`
- мигрировать данные (если свежий запуск) `php artisan migrate:fresh`
- запустить бекенд `php artisan serve` (в одном окне командной строки)
- запустить фронтенд `npm run dev` (в другом окне командной строки)


После клонирования проекта нужно создать свою ветку из ветки develop. Весь код пишем в своей ветке и пушим в ветку develop

Дополнительно:
1. PHP-storm должен предложить запуск composer. В результате должна появится папка vendor. Если этого не случилось, нуно самостоятельно запустить composer
2. У себя на компьютере нужно установить docker. Рекомендую использовать инструкцию с официальныз ресурсов, например отсюда https://docs.docker.com/engine/install/ubuntu/#install-using-the-repository
3. В докере нужно скачать контейнер PostgreSQL (docker pull postgres)
4. В терминале в корне проекта выполняем команду sudo docker compose up -d. Увидите, что контейнер создан и запущен
5. Создаем файл .env и копируем в него все содержимое из .env.example
6. Настраиваем подключение к базе данных в модуле Database (PHP-storm) или pgAdmin:
    - user = user
    - password = pass
    - database = db
    - port = 65004
* по крайней мере, я настроил соединения с такими параметрами и у вас они должны тоже работать
* пока база данных пустая, в ней нет ни одной таблици
