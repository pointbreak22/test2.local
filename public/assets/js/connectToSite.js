
const delayFile= require("./delay")
const puppeteer = require('puppeteer-extra');
const stealth = require('puppeteer-extra-plugin-stealth');
puppeteer.use(stealth());



async function getPage(mainUrl, proxy=null) {


    const browser = await puppeteer.launch({
        executablePath: '/usr/bin/google-chrome', headless: false,
        args: [
            '--disable-blink-features=AutomationControlled', //Маскировка движка браузер
            '--no-sandbox',  // Для запуска без песочницы (в некоторых системах необходимо)
            '--disable-software-rasterizer',
            '--disable-gpu',
            '--host-resolver-rules="MAP * 0.0.0.0 , EXCLUDE localhost"',
            '--disable-webgl2',
            '--disable-webgl',
            '--disable-webrtc',
            '--ignore-certificate-errors',
            '--disable-autofill',
            '--disable-extensions',
            '--disable-popup-blocking',
         //   (proxy!==null)?`--proxy-server=${proxy.toString()}`:"",
        ]
    });// headless: false позволяет видеть, что происходит в браузере


    await  delayFile.randomDelay();
    let page;
    let pages = await browser.pages()// Получаем список всех открытых страниц
    if (pages.length > 0) {
        page = pages[pages.length - 1]; // Выбираем последнюю открытую страницу
    } else {
        page = await browser.newPage(); //открываем новую страницу
    }
    await  delayFile.randomDelay();
// await page.authenticate();
    await page.setDefaultNavigationTimeout(3000);  // Increase timeout to 60 seconds
    await  delayFile.randomDelay();
// Устанавливаем более правдоподобный User-Agent
//await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');

    await  delayFile.randomDelay();

// Переходим на нужную страницу
    await page.evaluateOnNewDocument(() => {
        Object.defineProperty(navigator, 'webdriver', {get: () => undefined});
    });
    await  delayFile.randomDelay();
    try {
        await page.goto(mainUrl, {
            timeout: 50000,
            waitUntil: 'domcontentloaded' // Можно использовать другие события, чтобы гарантировать загрузку страницы
        });
    } catch (err) {
        console.error('Ошибка при переходе на сайт:', err);
    }

    return page;
}

module.exports = {
    getPage
};