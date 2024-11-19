/**
 * Проверка и возврат рабочих прокси адресов
 */
console.log("node run");
const proxyChain = require('proxy-chain');
const axios = require('axios');


const delayFile= require("./delay")
//const {HttpsProxyAgent} = require('https-proxy-agent');


//'socks5://103.174.178.131:1020',


//функция для выбора прокси через рекурсию
async function selectionArray(copyProxiesList, url) {
    if (copyProxiesList.length === 0) {
        return null;
    }

    console.log("Выбор прокси")
    let proxy = null;
    while (copyProxiesList.length !== 0) {

        let index = Math.floor(Math.random() * (copyProxiesList.length));
        let oldProxyUrl = await copyProxiesList[index];
        let newProxyUrl = await proxyChain.anonymizeProxy(oldProxyUrl);
        let proxyValid = await isProxyValid(newProxyUrl, url);

        console.log(proxyValid);
        if (!proxyValid) {
            await delayFile.randomDelay();
            await console.log("перебор следующего элемента, удаление " + copyProxiesList[index]);
            copyProxiesList.splice(index, 1); //удаляет "1" элемент массива из позиции "index"
            await console.log("Количество оставшихся прокси: " + copyProxiesList.length);

        } else {
            proxy = await copyProxiesList[index];
            await console.log("выбран элемент " + proxy);
            break;
        }

    }
    return proxy;
}

// метод для проверки прокси
async function isProxyValid(proxyUrl, url) {
    console.log("Начало проверки прокси " + proxyUrl + "   " + url)
    const proxyUrl1 = new URL(proxyUrl);
    console.log(proxyUrl1.hostname + "    " + typeof proxyUrl1.port + "   " + proxyUrl1.port)

    //44.218.183.55:80

    const makeRequest = async (options) => {
        try {
            const response = await axios(options);  // Ожидаем ответа от сервера
            console.log("Прокси успешно подключился: " + response.status + "  " + response.request)
            return true;  // Успешный запрос
        } catch (err) {
            console.log("ОШИБКА!!!! " + err.message + "   " + err.code + "   " + err.statusCode);
            if (err.code === 'ECONNABORTED') {
                console.error('Request timed out');
                return false;
            } else {
                try {
                    console.error('Ошибка при подключении через прокси:', err.response ? err.response.status : 'неизвестная ошибка');
                    if (err.response.status < 500 && err.response.status !== undefined) {
                        console.log("TTTTTTTTTTTTTTTTTTTTTTTTT");
                        return true;
                    } else {
                        console.log("FFFFFFFFFFFFFFFFFFFFFFFF");
                        return false;
                    }
                } catch (err) {
                    return false;
                }
            }
            // Обработка ошибок по статусу
        }
    };


    const options = {
        url: url,
        proxy: {
            host: proxyUrl1.hostname,
            port: proxyUrl1.port !== " " ? proxyUrl1.port : 80,
            protocol: proxyUrl1.protocol
        },
        timeout: 1000,  // Тайм-аут в миллисекундах
    };

    let returnBool;
    await (async () => {
        const success = await makeRequest(options);  // Вызов асинхронной функции
        returnBool = success;
        if (success) {
            console.log('Прокси был подключен');

        } else {
            console.log('Прокси не был подключен');
        }
    })();
//#region MyRegion2
//     if (returnBool) {
//         // Создаем прокси-агент
//         const agent = await new HttpsProxyAgent(proxyUrl1);
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
//                 // returnBool=false;
//             }
//         };
//
// // Вызов асинхронной функции
//         await fetchDataThroughProxy();
//     }
// #endregion
    return returnBool;
}


async function getProxy(proxiesList, url) {
    console.log("Старт тест");
    let copyProxiesList = proxiesList.slice();
    let proxy = await selectionArray(copyProxiesList, url);

    if (proxy == null) {
        console.log("отсутствуют прокси")
        return;
    }
    console.log("Итого выбранный прокси: " + proxy);
    return proxy
}

module.exports = {
    getProxy
};