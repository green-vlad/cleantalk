# Разворачивание
## Backend
1. Заходим в папку backend.
2. Запускаем
`docker compose up -d`
3. Заходим внутрь контейнера backend
`docker exec -it backend bash`
4. Запускаем 
`composer install`
5. Копируем содержимое файла .env.example в .env
6. Перезапускаем контейнер backend.
7. Заходим внутрь контейнера backend и выполняем миграции
`cd backend
./artisan migrate`
8. Запускаем сидирование
`./artisan db:seed`