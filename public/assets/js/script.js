// console.log("node run");
//
// const puppeteer = require('puppeteer-extra');
// const stealth = require('puppeteer-extra-plugin-stealth');
// puppeteer.use(stealth());
//
//
// const proxyChain = require('proxy-chain');
//
// const axios = require('axios');
// const {HttpsProxyAgent} = require('https-proxy-agent');
// const http = require('http');
// const {exec} = require('child_process');
// const util = require('util');
// const request = require('request-promise');
//
// const execPromise = util.promisify(exec);
// //'socks5://103.174.178.131:1020',
//
// // Прокси-сервер
// const url = 'https://whatismyipaddress.com/';  //https://www.google.com';  //  -I
//
//
// //функция для выбора прокси через рекурсию
// async function selectionArray(copyProxiesList) {
//     if (copyProxiesList.length === 0) {
//         return null;
//     }
//
//     console.log("Выбор прокси")
//     let proxy = null;
//     while (copyProxiesList.length !== 0) {
//
//         let index = await Math.floor(Math.random() * (copyProxiesList.length));
//         let oldProxyUrl = await copyProxiesList[index];
//         let newProxyUrl = await proxyChain.anonymizeProxy(oldProxyUrl);
//         let proxyValid = await isProxyValid(newProxyUrl, url);
//
//         console.log(proxyValid);
//         if (!proxyValid) {
//             await delay(Math.random() * 500 + 200);
//             await console.log("перебор следующего элемента, удаление " + copyProxiesList[index]);
//             await copyProxiesList.splice(index, 1); //удаляет "1" элемент массива из позиции "index"
//             await console.log("Количество оставшихся прокси: " + copyProxiesList.length);
//
//         } else {
//             proxy = await copyProxiesList[index];
//             await console.log("выбран элемент " + proxy);
//             break;
//         }
//         // await delay(Math.random() * 500 + 200);
//     }
//     return proxy;
// }
//
// // метод для проверки прокси
// async function isProxyValid(proxyUrl) {
//     console.log("Начало проверки прокси " + proxyUrl + "   " + url)
//     const proxyUrl1 = new URL(proxyUrl);
//     console.log(proxyUrl1.hostname + "    " + typeof proxyUrl1.port + "   " + proxyUrl1.port)
//
//     //44.218.183.55:80
//
//     const makeRequest = async (options) => {
//         try {
//             const response = await axios(options);  // Ожидаем ответа от сервера
//             //console.log(response.data);
//             console.log("Прокси успешно подключился: " + response.status + "  " + response.request)
//             return true;  // Успешный запрос
//         } catch (err) {
//             console.log("ОШИБКА!!!! " + err.message + "   " + err.code + "   " + err.statusCode);
//             if (err.code === 'ECONNABORTED') {
//                 console.error('Request timed out');
//                 return false;
//
//             } else {
//
//                 try {
//                     console.error('Ошибка при подключении через прокси:', err.response ? err.response.status : 'неизвестная ошибка');
//                     if (err.response.status < 500 && err.response.status !== undefined) {
//                         console.log("TTTTTTTTTTTTTTTTTTTTTTTTT");
//                         return true;
//                     } else {
//                         console.log("FFFFFFFFFFFFFFFFFFFFFFFF");
//                         return false;
//                     }
//                 } catch (err) {
//                     return false;
//                 }
//
//             }
//             // Обработка ошибок по статусу
//
//
//         }
//     };
//
//
//     const options = {
//         url: url,
//         proxy: {
//             host: proxyUrl1.hostname,
//             port: proxyUrl1.port !== " " ? proxyUrl1.port : 80,
//             protocol: proxyUrl1.protocol
//
//         },
//         timeout: 1000,  // Тайм-аут в миллисекундах
//     };
//
//     let returnBool;
//     await (async () => {
//         const success = await makeRequest(options);  // Вызов асинхронной функции
//         returnBool = success;
//         if (success) {
//             console.log('Прокси был подключен');
//
//         } else {
//             console.log('Прокси не был подключен');
//
//         }
//     })();
//
//     if (returnBool)
//     {
//         // Создаем прокси-агент
//         const agent =await new HttpsProxyAgent(proxyUrl1);
//
//         // Конфигурация axios для использования прокси
//         const axiosInstance = await axios.create({
//             httpsAgent: agent,
//         });
//         const fetchDataThroughProxy = async () => {
//             try {
//                 // Выполняем GET запрос
//                 const response = await axiosInstance.get(url);
//
//                 // Выводим полученный ответ
//                 console.log('Response received through proxy:', response.data);
//             } catch (error) {
//                 // Обрабатываем ошибки
//                 console.error('Error during request via proxy:', error.message);
//
//                 if (error.response) {
//                     console.error('Response status:', error.response.status);
//                 }
//                // returnBool=false;
//
//             }
//         };
//
// // Вызов асинхронной функции
//       await fetchDataThroughProxy();
//
//     }
//
//
//
//     return returnBool;
//
//
// }
//
// // Функция для случайной задержки
// function delay(time) {
//     return new Promise(resolve => setTimeout(resolve, time));
// }
//
//
// (async () => {
//
//     console.log("Старт тест");
//     let copyProxiesList = proxiesList.slice();
//     let proxy = await selectionArray(copyProxiesList);
//
//     if (proxy == null) {
//         console.log("отсутствуют прокси")
//         return;
//     }
//
//     console.log("Итого выбранный прокси: " + proxy);
//
//     return proxy;
//
//
//
//
//
//
// //   https://kad.arbitr.ru/                нужный сайт
// //  https://whatismyipaddress.com/         проверка ип
//
//
//     //прервать продолжение сайта;
//
//
//     //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!11
//     //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//     //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1
//
// /*
//     await delay(Math.random() * 2000 + 1000);
//     // await delay(2000); // Задержка будет работать
//     //
//     await page.evaluate(async () => {
//         const closeButton = document.querySelector('.js-promo_notification-popup-close');
//
//         if (closeButton) {
//             // Симулируем клик по кнопке
//             console.log('Clicking the close button...');
//
//             // Здесь логика закрытия уведомления, например, удаление родительского элемента
//             const notification = await closeButton.closest('.b-promo_notification');
//             if (notification) {
//                 notification.style.display = 'none';  // Скрываем уведомление
//                 console.log('Notification closed!');
//             }
//         } else {
//             console.log('Close button not found!');
//         }
//
//
//     });
//     //
//     await delay(Math.random() * 2000 + 1000);
//
//
//     // await page.waitForSelector('#Courts');
//     await delay(Math.random() * 2000 + 1000);
//     console.log("Выбран селект");
//
//     await page.evaluate(async () => {
//
//         let selector = document.querySelector('#Courts').value = "ROSTOV";
//
//         // await delay(Math.random() * 2000 + 1000);
//
//
//         let button = await document.querySelector('#b-form-submit button');
//         // console.log(button.className);
//         await button.click();
//         return await selector.className;
//     }).then(result => {
//         console.log(result);
//         console.log("Кнопка нажата"); // Выведет "Кнопка нажата" в Node.js
//     });
//
// */
//
//     await console.log('Конец')
// })();
//
//
//
