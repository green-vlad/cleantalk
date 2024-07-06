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
API запускается на порту 8888, если нужно поменять, то это можно сделать `backend/docker-compose.yml:6`

## Frontend
1. cd frontend
2. npm install
Если бэк запустили на порту отличном от 8888, то в `frontend/src/services/axios-client.jsx:4` 
надо указать соответствующий.
2. npm start