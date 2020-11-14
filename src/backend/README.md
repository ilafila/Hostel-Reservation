# Backend

Сервер представляет собой приложение, написанное на фреймворке Flask.

## Локальный запуск
### Создание контейнера

Для локального запуска требуется установленный на компьютере docker. После установки из папки backend выполнить команду:
```
sudo docker build --file Dockerfile -t backend:latest .
```
После создания образа из этой же директории выполнить:
```
sudo docker run -p 5000:5000 backend:latest 
```
В терминале появится сообщение об успешном запуске. 

### Взаимодействие с сервером
Пример запроса о входе пользователя:
```
POST http://localhost:5000/login HTTP/1.1
Content-Type: application/json
Body:
{
    "mail": <mail>,
    "password": <password>
}

Response (Сообщение об успехе):
Status: 200 - успех
Content-Type: application/json

{
    "user_id": <user_id>
}

Response (Wrong credentials):
Status: 403 - успех
Content-Type: application/json

{
    "message": <msg>
}

Response (Не предоставлена почта или пароль):
Status: 400 - не верный формат body
Content-Type: application/json

{
    "message": <msg>
}
```
---
Подробное описание формы body запросов представлено в docstring к методам в файле app.py
