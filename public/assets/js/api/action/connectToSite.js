/**
 * Проверка и возврат рабочих прокси адресов
 */
const proxyChain = require('proxy-chain');
const axios = require('axios')
const delayFile = require("./delay")
const puppeteer = require('puppeteer-extra');
const stealth = require('puppeteer-extra-plugin-stealth');
const useProxy = require('puppeteer-page-proxy');
puppeteer.use(stealth());
const proxiesList = process.env.PROXY_IPS.split(",");
const proxyLogin=process.env.PROXY_LOGIN;
const proxyPassword=process.env.PROXY_PASSWORD;
// Прокси-сервер
const url = 'https://whatismyipaddress.com/';

async function startBrowser() {

    let proxyFound = await getProxy(proxiesList, url);    //получает прокси из списка
    console.log("используется прокси "+proxyFound)

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
            `--proxy-server=${proxyFound}`,
        ]
    });
}
async function getPage(mainUrl, browser, boolNewPage = false) {

    await delayFile.randomDelay();
    let page;
    let pages = await browser.pages()// Получаем список всех открытых страниц
    if (pages.length > 0 && !boolNewPage) {
        page = pages[pages.length - 1]; // Выбираем последнюю открытую страницу
    } else {
        page = await browser.newPage(); //открываем новую страницу
    }
    await delayFile.randomDelay();
    await page.authenticate({username: proxyLogin, password: proxyPassword});  //аутентификация прокси
    await delayFile.randomDelay();

    // Перехватчик запроса
    await page.setRequestInterception(true);

    page.on('request', async req => {
        // Получаем новый прокси при каждом запросе
        const proxy = await getProxy(proxiesList, url);
        // Перехватываем запрос и продолжаем его с использованием нового прокси
        await req.continue({
            url: req.url(),
            method: req.method(),
            headers: {
                ...req.headers(),
            //    'Proxy-Authorization': `Basic ${Buffer.from('6jBKEbCp:ddsBL6pL').toString('base64')}` // Если прокси требует авторизации
            },
            // Дополнительно можно добавить настройки прокси, если это требуется
            proxy: {
                server: proxy // Устанавливаем прокси для каждого запроса
            }
        });
    });
    await delayFile.randomDelay();
    await page.setDefaultNavigationTimeout(3000);  // Increase timeout to 60 seconds
    await delayFile.randomDelay();

    // Set the User-Agent to match the provided one
    await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36');
    await page.setExtraHTTPHeaders({
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'en-US,en;q=0.9',
        'Upgrade-Insecure-Requests': '1'
    });
    await delayFile.randomDelay();

// Переходим на нужную страницу
    await page.evaluateOnNewDocument(() => {
        Object.defineProperty(navigator, 'webdriver', {get: () => undefined});
    });
    await delayFile.randomDelay();
    try {
        await page.goto(mainUrl, {
            waitUntil: 'domcontentloaded',
            timeout: 30000,
        });
    } catch (err) {
        console.error('Ошибка при переходе на сайт:', err);
    }
    return page;
}

//функция для выбора прокси
async function selectionArray(copyProxiesList, url) {
    if (copyProxiesList.length === 0) {
        return null;
    }

    let proxy = null;
    while (copyProxiesList.length !== 0) {

        let index = Math.floor(Math.random() * (copyProxiesList.length));
        let oldProxyUrl = await copyProxiesList[index];
        let newProxyUrl = await proxyChain.anonymizeProxy(oldProxyUrl);
        let proxyValid = await isProxyValid(newProxyUrl, url);
        if (!proxyValid) {
            await delayFile.randomDelay();
            copyProxiesList.splice(index, 1); //удаляет "1" элемент массива из позиции "index"
        } else {
            proxy = await copyProxiesList[index];

            break;
        }
    }
    return proxy;
}
// метод для проверки прокси
async function isProxyValid(proxyUrl, url) {
    const proxyUrl1 = new URL(proxyUrl);


    const makeRequest = async (options) => {
        try {
            const response = await axios(options);  // Ожидаем ответа от сервера
            console.log("Тест прокси прошел успешно: " + response.status + "  " + response.request+ "  " + proxyUrl)
            return true;  // Успешный запрос
        } catch (err) {

            if (err.code === 'ECONNABORTED') {
                console.error('Request timed out при тесте прокси' +proxyUrl);
                return false;
            } else {
                try {
                    console.error('Ошибка при тесте прокси:',proxyUrl, err.response ? err.response.status : 'неизвестная ошибка');
                    return err.response.status < 500 && err.response.status !== undefined;
                } catch (err) {
                    return false;
                }
            }
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
    return returnBool;
}

async function getProxy(proxiesList, url) {   //метод для получения прокси
    let copyProxiesList = proxiesList.slice();
    let proxy = await selectionArray(copyProxiesList, url);
    if (proxy == null) {
        console.log("отсутствуют прокси")
        return;
    }
    console.log("используется прокси: " + proxy);
    return proxy
}

module.exports = {
    getPage,
    startBrowser
};
