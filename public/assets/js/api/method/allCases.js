const mainUrl = require("../../app").mainUrl;

const connectToSiteFile = require("../action/connectToSite");
const closeStartButtonsFile = require("../action/closeStartButtons");
const getDataPageFile = require("../action/getDataPage");
const delayFile = require("../action/delay");


async function execute(dates, courts, types) {

    const browser = await connectToSiteFile.startBrowser();
    let DTO = [];
    let myPage = await connectToSiteFile.getPage(mainUrl, browser);
    await closeStartButtonsFile.closePOPUPWindow(myPage);
    //Установка фильтра
    await getDataPageFile.SelectFilterAll(myPage, dates, courts); //,myCaseNumber,startDate,endDate
    await getDataPageFile.SearchClick(myPage)

    let canNextPage = true;
    let pageNext = 2;
    while (canNextPage) {
        if (!canNextPage) {
            break;
        }
        DTO = await getDataPageFile.GetTableData(myPage, DTO, types); // Вывод данных используя фильтр
        await delayFile.randomDelay();
        canNextPage = await getDataPageFile.interToPageTable(myPage, pageNext, canNextPage);
        await delayFile.randomDelay();
        pageNext++;

        if (pageNext > 2) {
            break;
        }
    }
    for (let row of DTO) {
        if (row.moreInfo.length > 0) {
            row.newArray = await getDataPageFile.getMoreInfo(row.moreInfo, browser);
            console.log(row.newArray)
        }
    }
    return DTO;
}

module.exports = {execute};