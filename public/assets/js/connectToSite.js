/**
 * Проверка и возврат рабочих прокси адресов
 */
const proxyChain = require('proxy-chain');
const axios = require('axios');



//const {HttpsProxyAgent} = require('https-proxy-agent');


//'socks5://103.174.178.131:1020',





const delayFile= require("./delay")
const puppeteer = require('puppeteer-extra');
const stealth = require('puppeteer-extra-plugin-stealth');
const useProxy = require('puppeteer-page-proxy');
puppeteer.use(stealth());


const proxiesList = [
     "http://45.132.129.197:62356",

    // "socks5://6jBKEbCp:ddsBL6pL@45.132.129.197:62357",
     "http://176.103.91.94:63082",
     "http://85.142.48.35:63800",
     "http://85.142.49.117:62558",
     "http://85.142.140.156:62948",


    // "http://154.236.177.100:1977",
    // "http://125.99.106.250:3128",
    // "http://45.119.114.203:3129",
    // "http://20.27.86.185:8080",
    // "http://46.51.249.135:3128",
    // "http://103.154.230.78:8080",
    // "http://47.103.103.132:8443",
    // "http://47.90.205.231:33333",
    // "http://51.79.99.237:9950",
    // "http://43.134.32.184:3128",
    // "http://222.252.194.204:8080",
    // "http://200.174.198.86:8888",
    // "http://64.92.82.58:8080",
    // "http://54.233.119.172:3128",
    // "http://14.187.148.60:10001",
    // "http://43.153.207.93:3128",
    // "http://91.107.173.67:10514",
    // "http://160.86.242.23:8080",
    // "http://3.37.125.76:3128",
    // "http://13.36.87.105:3128",
    // "http://3.90.100.12:3128",
    // "http://204.236.176.61:3128",
    // "http://43.134.68.153:3128",
    // "http://13.57.196.201:3128",
    // "http://54.67.125.45:3128",
    // "http://63.35.64.177:3128",
    // "http://52.73.224.54:3128",
    // "http://102.164.252.154:8080",
    // "http://195.189.70.51:3128",
    // "http://103.242.104.146:3127",
    // "http://103.190.171.37:1080",
    // "http://113.160.133.32:8080",
    // "http://103.169.186.151:3125",
    // "http://43.153.237.252:3128",
    // "http://171.244.60.55:8080",
    // "http://183.100.14.134:8000",
    // "http://148.251.87.79:16379",
    // "http://47.251.43.115:33333",
    // "http://3.78.92.159:3128",
    // "http://43.134.33.254:3128",
];
// Прокси-сервер
const url = 'https://whatismyipaddress.com/';


async function startBrowser(){
    // headless: false позволяет видеть, что происходит в браузере
    return await puppeteer.launch({
        executablePath: '/usr/bin/google-chrome',
        headless: false,
        args: [
            '--disable-blink-features=AutomationControlled', //Маскировка движка браузер
            '--no-sandbox',
            '--disable-software-rasterizer',
            '--disable-gpu',
            '--disable-webgl',
            '--disable-webgl2',
            '--ignore-certificate-errors',
            '--disable-autofill',
            '--disable-extensions',
            '--disable-popup-blocking',
            //   `--proxy-server=${proxyFound}`,
        ]
    });


}
async function getPage(mainUrl, browser, boolNewPage=false) {

  //  let proxyFound = await getProxy(proxiesList, url);
   // let proxyFound=proxiesList[0];
  //  console.log("используется прокси "+proxyFound)





    await  delayFile.randomDelay();
    let page;
    let pages = await browser.pages()// Получаем список всех открытых страниц
    if (pages.length > 0 && !boolNewPage) {
        page = pages[pages.length - 1]; // Выбираем последнюю открытую страницу
    } else {
        page = await browser.newPage(); //открываем новую страницу
    }
    await  delayFile.randomDelay();
    await page.authenticate({ username: '6jBKEbCp', password: 'ddsBL6pL' });
    await  delayFile.randomDelay();



    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    // await page.setRequestInterception(true);
    //
    // page.on('request', async req => {
    //     // Получаем новый прокси при каждом запросе
    //     const proxy = await getProxy(proxiesList, url);
    //     console.log("пойман запрос:"+proxy);
    //
    //     // Перехватываем запрос и продолжаем его с использованием нового прокси
    //     await req.continue({
    //         url: req.url(),
    //         method: req.method(),
    //         headers: {
    //             ...req.headers(),
    //         //    'Proxy-Authorization': `Basic ${Buffer.from('6jBKEbCp:ddsBL6pL').toString('base64')}` // Если прокси требует авторизации
    //         },
    //         // Дополнительно можно добавить настройки прокси, если это требуется
    //         proxy: {
    //             server: proxy // Устанавливаем прокси для каждого запроса
    //         }
    //     });
    // });


    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!




    await  delayFile.randomDelay();
// await page.authenticate();
    await page.setDefaultNavigationTimeout(3000);  // Increase timeout to 60 seconds
    await  delayFile.randomDelay();

    // Set the User-Agent to match the provided one
    await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36');
    await page.setExtraHTTPHeaders({
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'en-US,en;q=0.9',
        'Upgrade-Insecure-Requests': '1'
    });
    await  delayFile.randomDelay();

// Переходим на нужную страницу
    await page.evaluateOnNewDocument(() => {
        Object.defineProperty(navigator, 'webdriver', {get: () => undefined});
    });




    await  delayFile.randomDelay();
    try {
        await page.goto(mainUrl, {
            waitUntil: 'domcontentloaded',
            timeout: 30000,
            // Можно использовать другие события, чтобы гарантировать загрузку страницы
        });
    } catch (err) {
        console.error('Ошибка при переходе на сайт:', err);
    }
    // Wait for the IP address element to load
 //   await page.waitForSelector('#ipv4');

    return page;
}


//функция для выбора прокси
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
    getPage,
    startBrowser
};