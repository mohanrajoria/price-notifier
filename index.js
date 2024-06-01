import puppeteer from "puppeteer";
import sendSMS from "./messageSender.js";

const resultSelector = "#dp-container #centerCol .priceToPay .a-price-whole";
let timeoutId;

async function getPrice(page) {
    if (timeoutId) clearTimeout(timeoutId);
    await page.waitForSelector(resultSelector);
    const priceSelector = await page.waitForSelector(resultSelector);

    const fullPrice = await priceSelector?.evaluate(el => el.textContent);
    console.log(`Rs. ${fullPrice}/- is the price of Realme Buds T300               `);
    sendSMS(`Rs. ${fullPrice}/- is the price of Realme Buds T300                `);
    timeoutId = setTimeout(async () => {
        await page.reload();
        getPrice(page);
    }, 120000);
}

async function start() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("https://www.amazon.in/realme-Wireless-Earbuds-Spatial-Charging/dp/B0CH1L1YLC/ref=sr_1_3?crid=18O40NISDR8XS&dib=eyJ2IjoiMSJ9.BHANxJjGtfq0d8p4fTqDhaFB4oa7QaeipcjAQWTjAAJvYEfOIRtk_PAs1cZZGx4nzjz_y-YvLc962LLiX8yHGhPTnM4eMahS6BQu2t6cjvvwlzHrMkFmh6rTcjm9rCInqZHdjSw3beRxWS2aHKJuOWPmarYcI7kop2tC80goIIvdnkEwQvsfuD4OYg5P_iVOXVLm-34ZfUUb8Wfw_zZEFw512Z8VFpF5tDPukQohXiTyGQAFjAb2fUAUlaUDGe7oieSfqGHshcBghoSXPbs9G1ZNfdFPcssBofQ_wN4Spbo.bSpuN-vP301VZjK08PEF5vuhl6CqzR9AFIQBsFrvGT4&dib_tag=se&keywords=realme%2Bt300%2Bearbuds&qid=1717257759&s=electronics&sprefix=realme%2Bt3%2Celectronics%2C238&sr=1-3&th=1");
    await page.setViewport({width: 1080, height: 1024});
    getPrice(page);
}

start();
