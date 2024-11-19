const delayFile = require("./delay")
const {spawn} = require("child_process");


const filterClassJS = "civil";






async function SelectFilter(page, court = "", caseNumber = "", startDate = null, endDate = null) {
    await delayFile.randomDelay();
    let selectElement = "";

    if (court) {
        selectElement = '.js-input';
        await page.waitForSelector(selectElement);
        // Значение, которое нужно ввести
        await page.type(selectElement, court);
        await page.waitForSelector(selectElement);
    }

    if (caseNumber) {
        selectElement = '#sug-cases input';
        await page.waitForSelector(selectElement);
        // Значение, которое нужно ввести
        await page.type(selectElement, caseNumber);
        await page.waitForSelector(selectElement);
    }

    if (startDate) {
        selectElement = '#sug-dates .from input';
        await page.waitForSelector(selectElement);
        await page.type(selectElement, startDate.toLocaleDateString('ru-RU'));
        await page.waitForSelector(selectElement);
    }

    if (endDate) {
        selectElement = '#sug-dates .to input';
        await page.waitForSelector(selectElement);
        await page.type(selectElement, endDate.toLocaleDateString('ru-RU'));
        await page.waitForSelector(selectElement);
    }

    await delayFile.randomDelay();


}

async function searchClick(page){
    await delayFile.randomDelay();
    await page.click('#b-form-submit button'); // Если нужно кликнуть на кнопку
    await delayFile.randomDelay();
    await delayFile.randomDelay();
    await page.click('#b-form-submit button'); // Если нужно кликнуть на кнопку
    console.log("Кнопка найти нажата");
    await delayFile.randomDelay();
}


async function GetTableData(page, classFilter)
{
    await searchClick(page);

     try {
        await page.waitForSelector('.b-cases tbody tr');  // Ждем появления таблицы
        await page.waitForSelector('.b-case-loading', {hidden: true});
    }
    catch (err){
        await page.waitForSelector('.b-case-loading', {hidden: true});
    }

    await delayFile.randomDelay();
    const getDataTableClick = async (classFilter) => {
        return await page.evaluate(async (classFilter) => {
            const rows = document.querySelectorAll('.b-cases tbody tr');
            const data = [];
            await rows.forEach(row => {
                const civilElement = row.querySelector(`.${classFilter}`);
                if (civilElement) {

                    const columns = row.querySelectorAll('td');

                    const rowData = {
                        case: columns[0] ? columns[0].innerText.trim() : '',
                        judge: columns[1] ? columns[1].innerText.trim() : '',
                        claimant: columns[2] ? columns[2].innerText.trim() : '',
                        respondent: columns[3] ? columns[3].innerText.trim() : ''
                    };


                    data.push(rowData);
                }
            });

            return data;
        },classFilter);
    }

     //вызывается стрелочная функция получение данных таблицы
    return await getDataTableClick(classFilter)


}

async function interToPageTable(page, numberPage){
    await delayFile.randomDelay();

    let buttonPage=`a[href="#page${numberPage}"]`
    await page.waitForSelector(buttonPage); // Ожидаем появления ссылки
    await page.click(buttonPage);
    await delayFile.randomDelay();
    console.log("Переход на новую страницу");
}






module.exports = {
    SelectFilter,
    GetTableData,
    interToPageTable
};