const puppeteer = require("puppeteer")
const {JSDOM} = require("jsdom")

const webScrapingCarMercadoLibre = async(arrId = []) => {
    try {
        const browser = await puppeteer.launch();
        
        const promiseIdArr = arrId.map(async(id) => {
            const page = await browser.newPage();
            const response = await page.goto(`https://auto.mercadolibre.com.ar/MLA-${id}`)
            const body = await response.text();
            const { window: { document } } = new JSDOM(body);

            // check exist page
            if ( !document.querySelector('.ui-pdp-title') ) { return false }

            // obtain data
            const title = document.querySelector('.ui-pdp-title').textContent; //Title
            const price = document.querySelector('.andes-money-amount__fraction').textContent; //Price
            const symbolPrice = document.querySelector('.andes-money-amount__currency-symbol').textContent; //Symbol Price
            const model = document.querySelector('.ui-pdp-subtitle').textContent.split(" ")[0]; //Model
            const km = document.querySelector('.ui-pdp-subtitle').textContent.split(" ")[2]; //KM


            
            return ({ title, price, symbolPrice, model, km, link:`https://auto.mercadolibre.com.ar/MLA-${id}` })
        })

        return Promise.all(promiseIdArr).then(data => {
            browser.close();
            return data;
        })


    } catch (error) {console.log(error)};
}

module.exports = {
    webScrapingCarMercadoLibre
}