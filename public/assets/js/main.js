/**
 * 1. Получение рандомного рабочего адреса
 * 2. Подключение к сайту
 */
const proxyFile = require("./proxy");
const connectToSiteFile= require("./connectToSite")
const closeStartButtonsFile= require("./closeStartButtons")
const getDataPageFile=require("./getDataPage")

const proxiesList = [
    "http://154.236.177.100:1977",
    "http://125.99.106.250:3128",
    "http://45.119.114.203:3129",
    "http://20.27.86.185:8080",
    "http://46.51.249.135:3128",
    "http://103.154.230.78:8080",
    "http://47.103.103.132:8443",
    "http://47.90.205.231:33333",
    "http://51.79.99.237:9950",
    "http://43.134.32.184:3128",
    "http://222.252.194.204:8080",
    "http://200.174.198.86:8888",
    "http://64.92.82.58:8080",
    "http://54.233.119.172:3128",
    "http://14.187.148.60:10001",
    "http://43.153.207.93:3128",
    "http://91.107.173.67:10514",
    "http://160.86.242.23:8080",
    "http://3.37.125.76:3128",
    "http://13.36.87.105:3128",
    "http://3.90.100.12:3128",
    "http://204.236.176.61:3128",
    "http://43.134.68.153:3128",
    "http://13.57.196.201:3128",
    "http://54.67.125.45:3128",
    "http://63.35.64.177:3128",
    "http://52.73.224.54:3128",
    "http://102.164.252.154:8080",
    "http://195.189.70.51:3128",
    "http://103.242.104.146:3127",
    "http://103.190.171.37:1080",
    "http://113.160.133.32:8080",
    "http://103.169.186.151:3125",
    "http://43.153.237.252:3128",
    "http://171.244.60.55:8080",
    "http://183.100.14.134:8000",
    "http://148.251.87.79:16379",
    "http://47.251.43.115:33333",
    "http://3.78.92.159:3128",
    "http://43.134.33.254:3128",
];
// Прокси-сервер
const url = 'https://whatismyipaddress.com/';  //https://www.google.com';  //  -I
const mainUrl='https://kad.arbitr.ru/';




(async ()=> {
    //let proxyFound = await proxyFile.getProxy(proxiesList, url);

    console.log("прокси найден");
    let myPage =await connectToSiteFile.getPage(mainUrl);

     await closeStartButtonsFile.closePOPUPWindow(myPage);

     let myCourt="АС Ростовской области";
     let myCaseNumber= "А53-43999/2024";

     const today = new Date();
     const yesterday = new Date(today);
     yesterday.setDate(today.getDate() - 1);

     let startDate=yesterday;
     let endDate=yesterday;


     //Установка фильтра
     await getDataPageFile.SelectFilter(myPage,myCourt); //,myCaseNumber,startDate,endDate





     let myClassFilter= "civil";
     let dataTable= await getDataPageFile.GetTableData(myPage,myClassFilter); // Вывод данных используя фильтр
     console.log(dataTable);

     await getDataPageFile.interToPageTable(myPage,2);  //переход на новую страницу

     dataTable= await getDataPageFile.GetTableData(myPage,myClassFilter);  //второй раз вывод данных
     console.log(dataTable);





})();














