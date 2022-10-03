const { webScrapingCarMercadoLibre } = require('./helpers/webScrapingCarMercadoLibre');

const functino = async() => {
    const time1 = new Date().getTime()
    const data = await webScrapingCarMercadoLibre([1157325252, 1154251528, 1115607897])
    const time2 = new Date().getTime()
    console.log(data)
    console.log(time2 - time1)
}
functino()