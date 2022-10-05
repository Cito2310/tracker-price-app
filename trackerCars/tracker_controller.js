// // IMPORTS
// const bcryptjs = require("bcryptjs");
// const jwt = require('jsonwebtoken');

const { webScrapingCarMercadoLibre } = require("../helpers/webScrapingCarMercadoLibre");
const TrackerElement = require("./tracker_model");
const User = require("../auth/user_model")



// create one tracker element in user with id and token - private
const postTrackerElement = async(req , res) => {
    const user = req.USER;
    const { id } = req.params;
    
    // check not exist this car in user
    const existCarInUser = await TrackerElement.findOne({link: `https://auto.mercadolibre.com.ar/MLA-${id}`, creator: user._id })
    if ( existCarInUser ) {return res.status(400).json({msg: "This car is already registered to this user"})}

    // web scraping ml with id
    const [ data ] = await webScrapingCarMercadoLibre([id])

    // check found car with this id
    if ( !data ) {return res.status(404).json({msg: "Not found car with this id"})}


    // create new element
    const { title, price, symbolPrice, model, km, link} = data
    const newTrackerElement = new TrackerElement({
        title,
        price,
        symbolPrice,
        model,
        km,
        link,
        creator: user._id,
    });

    // push element in user creator
    user.trackerElements.push( newTrackerElement._id );

    // save user and new element
    await Promise.all([
        newTrackerElement.save(),
        user.save()
    ]);

    // response
    return res.json( newTrackerElement )
}

// EXPORTS
module.exports = {
    postTrackerElement
}