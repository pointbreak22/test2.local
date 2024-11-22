/**
 * 1. Получение рандомного рабочего адреса
 * 2. Подключение к сайту
 * 3. получение данных по API из php
 */

const express = require('express');
const app = express();
app.use(express.json());
app.use(express.static("public"));
const port = 3000;


const connectToSiteFile= require("./connectToSite")
const closeStartButtonsFile= require("./closeStartButtons")
const getDataPageFile=require("./getDataPage")
const delayFile = require("./delay");
const puppeteer = require("puppeteer-extra");

 //https://www.google.com';  //  -I

const mainUrl='https://kad.arbitr.ru/';
//const mainUrl = 'https://whatismyipaddress.com/';






app.get('/api/arbiter/all-cases',
    async (req, res) => {
        const {dates, types, courts} = await req.query;

        const browser=await connectToSiteFile.startBrowser();

        let DTO = [];


        let myPage = await connectToSiteFile.getPage(mainUrl,browser);

        await closeStartButtonsFile.closePOPUPWindow(myPage);


        //Установка фильтра
        await getDataPageFile.SelectFilter(myPage, dates, courts); //,myCaseNumber,startDate,endDate

        await getDataPageFile.SearchClick(myPage)







        let canNextPage = true;
        let pageNext=2;
        while (canNextPage){
            if (!canNextPage){
                break;
            }
             DTO=await getDataPageFile.GetTableData(myPage,DTO, types); // Вывод данных используя фильтр
             await delayFile.randomDelay();
             canNextPage=await getDataPageFile.interToPageTable(myPage,pageNext,canNextPage);


             await delayFile.randomDelay();
             pageNext++;

             if (pageNext>3)
                 break;
        }

        for (let row of DTO) {
            if (row.moreInfo.length > 0 ) {
                row.newArray = await getDataPageFile.getMoreInfo(row.moreInfo, browser);
                console.log(row.newArray)
            }

        }

     //   console.log(DTO);

        await res.status(200).send(JSON.stringify(DTO));
    });

app.get('/api/arbiter/cases-for-number', async (req, res) => {
    const {caseNumber} =await req.query;

    //let DTO = await startWebParser(caseNumber);

    await res.status(200).send(caseNumber);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});













