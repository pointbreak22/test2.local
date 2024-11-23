const delayFile = require("./delay")
const connectToSiteFile = require("./connectToSite");
async function SelectFilterNumber(page, number) {
    await delayFile.randomDelay();
    let selectElement = "";

    if (number && number.length) {
        selectElement = '#sug-cases input';
        await page.waitForSelector(selectElement);
        await page.click(selectElement);
        await page.type(selectElement, number); //toLocaleDateString('ru-RU'));
        await page.waitForSelector(selectElement);
        await delayFile.randomDelay();
        await page.mouse.click(150, 670);
        await delayFile.randomDelay();
    }
    await delayFile.randomDelay();
}

async function SelectFilterAll(page, dates = [], courts = []) {
    await delayFile.randomDelay();
    let selectElement = "";

    if ('start' in dates) {
        selectElement = '#sug-dates .from input';
        await page.waitForSelector(selectElement);
        await page.click(selectElement);
        await page.type(selectElement, dates.start); //toLocaleDateString('ru-RU'));
        await page.waitForSelector(selectElement);
        await delayFile.randomDelay();
        await page.mouse.click(150, 670);
        await delayFile.randomDelay();
    }

//Координаты клика: { x: 150, y: 670 }
//
    if ('end' in dates) {
        selectElement = '#sug-dates .to input';
        await page.waitForSelector(selectElement);
        await page.click(selectElement);
        await page.type(selectElement, dates.end);//.toLocaleDateString('ru-RU'));
        await delayFile.randomDelay();
        await page.mouse.click(150, 670);
        await delayFile.randomDelay();
    }

    if (courts && courts.length) {
        selectElement = '#caseCourt .js-input';
        await page.waitForSelector(selectElement);
        // Значение, которое нужно ввести
        for (let court of courts) {
            await page.type(selectElement, court);
            await page.waitForSelector(selectElement);
            await delayFile.randomDelay();
            await page.mouse.click(150, 670);
            await delayFile.randomDelay();
            if (court !== courts[courts.length - 1]) {
                await delayFile.randomDelay();
                await page.waitForSelector('.b-icon.b-icon--courts.add');
                await page.click('.b-icon.b-icon--courts.add');
            }
            await delayFile.randomDelay();
        }
        await page.waitForSelector(selectElement);
    }
    await delayFile.randomDelay();
}

async function SearchClick(page) {
    await delayFile.randomDelay();
    await page.click('#b-form-submit button'); // Если нужно кликнуть на кнопку
    await page.waitForSelector('.b-cases tbody tr');  // Ждем появления таблицы
    await delayFile.randomDelay();
    console.log("Кнопка найти нажата");
    await delayFile.randomDelay();
}

async function GetTableData(page, DTO, classFilters = []) {
    await page.waitForSelector('.b-case-loading', {hidden: true});
    await delayFile.randomDelay();
    return await page.evaluate(async (classFilters, DTO) => {
        const rows = document.querySelectorAll('.b-cases tbody tr');
        for (let row of rows) {
            if (classFilters.length === 0 || classFilters.some(cls => row.querySelector(`.${cls}`))) {
                const columns = await row.querySelectorAll('td');
                let moreInfo = await columns[0]?.querySelector('.num_case')?.href || "";
                await DTO.push({
                    num: columns[0] ? columns[0].innerText.trim() : '',
                    court: columns[1] ? columns[1].innerText.trim() : '',
                    plaintiff: columns[2] ? columns[2].innerText.trim() : '',
                    respondent: columns[3] ? columns[3].innerText.trim() : '',
                    moreInfo: moreInfo,
                });
            }
        }
        return DTO;
    }, classFilters, DTO);
}
async function GetDataInPage2(page) {
    // Wait for the content to be loaded completely
    await page.waitForSelector('.b-case-loading', {hidden: true});
    await page.waitForSelector('i.b-sicon');
    await delayFile.randomDelay();
    // Находим все элементы с классом 'b-sicon' и стилем 'visibility: visible'
    const elements = await page.$$('i.b-sicon');
    // Кликаем по каждому элементу
    for (let element of elements) {
        await element.click();
        await delayFile.randomDelay();
        await element.click();
        await delayFile.randomDelay();
    }
    await delayFile.randomDelay();
    const items = await page.$$eval('.js-chrono-item', async (items) => {
        console.log(`Found ${items.length} .js-chrono-item elements`);
        return await Promise.all(items.map(async (item) => {
            const date = await item.querySelector('.case-date') ? item.querySelector('.case-date').textContent.trim() : null;
            const caseType = await item.querySelector('.case-type') ? item.querySelector('.case-type').textContent.trim() : null;
            const company = await item.querySelector('.js-case-subject') ? item.querySelector('.js-case-subject').textContent.trim() : null;
            const claimDetails = await item.querySelector('.additional-info') ? item.querySelector('.additional-info').textContent.trim() : null;
            const applicationType = await item.querySelector('.js-case-result') ? item.querySelector('.js-case-result').textContent.trim() : null;
            const publishInf = await item.querySelector('.js-case-publish_inf') ? item.querySelector('.js-case-publish_inf').textContent.trim() : null;
            return {date, caseType, company, claimDetails, applicationType, publishInf};
        }));
    });
    console.log("Returning data: ", items);
    return items;
}

async function getMoreInfo(link, browser) {
    await delayFile.randomDelay();
    let myNewPage = await connectToSiteFile.getPage(link, browser, true);
    await myNewPage.waitForSelector('.b-case-loading', {hidden: true});
    const page2Dto = await GetDataInPage2(myNewPage);
    await console.log("info page2" + page2Dto);
    await delayFile.randomDelay();
    await myNewPage.close();
    await delayFile.randomDelay();
    return page2Dto;
}

async function interToPageTable(page, numberPage, canNextPage) {
    await delayFile.randomDelay();
    let buttonPage = `a[href="#page${numberPage}"]`
    let haveButtonPage = await page.$(buttonPage); // Ожидаем появления ссылки
    if (!haveButtonPage) {
        canNextPage = false;
        return canNextPage;
    }
    await page.click(buttonPage);
    await delayFile.randomDelay();
    console.log("Переход на новую страницу");
    await page.waitForSelector('.b-case-loading', {hidden: true});
    return canNextPage
}


module.exports = {
    SelectFilterAll,
    SelectFilterNumber,
    GetTableData,
    SearchClick,
    interToPageTable,
    getMoreInfo
};


