/**
 * 1. Получаем настройки из .env (адрес сайта, порт, список прокси)
 * 2. Определяем к какому методу api пришёл запрос из php
 * 3. Запускаем метод и возвращаем данные в php
 */

require('dotenv').config();
const mainUrl = process.env.API_URL;
const port = process.env.API_PORT;

const express = require('express');
const app = express();
app.use(express.json());
app.use(express.static("public"));

module.exports = {app, port, mainUrl};

require('./api/api');


















