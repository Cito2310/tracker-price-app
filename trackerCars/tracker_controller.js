// // IMPORTS
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
    await newTrackerElement.populate({
        path: "creator",
        select:["username", "email", "_id"]
    })

    return res.json( newTrackerElement )
}

// get all tracker element of a user, need id user - public
const getTrackerElementWithId = async(req, res) => {
    const { id } = req.params;

    // get user with id
    const user = await User.findById(id)
        .populate({
            path: "trackerElements",
            select: ["_id", "title", "price", "symbolPrice", "model", "km", "link"]
        })

    // check exist user
    if ( !user ) {res.status(404).json({msg: "User not found"})}
    
    // response
    res.json(user)
}

// delete one tracker element in user with id and token - private
const deleteTrackerElement = async(req , res) => {
    const user = req.USER;
    const { id } = req.params;
    
    // check not exist this car in user
    const existCarInUser = await TrackerElement.findOne({link: `https://auto.mercadolibre.com.ar/MLA-${id}`, creator: user._id })
    if ( ! existCarInUser ) {return res.status(404).json({msg: "Car not found"})}

    // remove element in array of user
    user.trackerElements = user.trackerElements.filter(carID => !carID.equals( existCarInUser._id ));
    
    await Promise.all([
        // save user
        user.save(),
        // delete car
        TrackerElement.findOneAndDelete({link: `https://auto.mercadolibre.com.ar/MLA-${id}`, creator: user._id })
    ])

    // response
    res.json(user)
}

// update one tracker element in user with id and token - private
const updateTrackerElement = async(req , res) => {
    const user = req.USER;
    const { id } = req.params;

    // check exist tracker element in user
    const existTrackerElement = await TrackerElement.findOne({link: `https://auto.mercadolibre.com.ar/MLA-${id}`, creator: user._id });
    if ( !existTrackerElement ) {return res.status(404).json({msg: "Not exist car in user"})}

    // web scraping ml with id
    const [ data ] = await webScrapingCarMercadoLibre([id]);

    // check found car with this id
    if ( !data ) {return res.status(404).json({msg: "Not found car with this id"})};

    // update element
    const { title, price, symbolPrice, km} = data;
    const payload = {title, price, symbolPrice, km};
    if (price !== existTrackerElement.price) {
        payload.historyPrice === [...existTrackerElement.historyPrice, existTrackerElement.price ]
    }

    const newUpdateTrackerElement = await TrackerElement.findOneAndUpdate(
        {link: `https://auto.mercadolibre.com.ar/MLA-${id}`, creator: user._id },
        payload,
        {new: true}
    )
    await newUpdateTrackerElement.save(),

    // response
    await newUpdateTrackerElement.populate({
        path: "creator",
        select:["username", "email", "_id"]
    })

    return res.json( newUpdateTrackerElement )
}

// update multiple trackers elements in user with id and token - private
const updateMultipleTrackerElement = async(req , res) => {
    // const user = req.USER.populate({path: "trackerElements"});
    const user = req.USER;
    await user.populate({path: "trackerElements", select:["link", "price", "historyPrice"]})

    // check exist tracker element in user
    const arrId = user.trackerElements.map(element => element.link.split("-")[1])
    
    // web scraping ml with id
    let data = await webScrapingCarMercadoLibre( arrId );

    // check data equal price

    data.forEach((car, index) => {
        data[index].historyPrice = user.trackerElements[index].historyPrice;

        (car.price !== user.trackerElements[index].price)
        ? data[index].historyPrice.push( car.price )
        : null
    })
    
    // update element
    const promiseExistElement = arrId.map( (id, index) => TrackerElement.findOneAndUpdate(
        {link: `https://auto.mercadolibre.com.ar/MLA-${id}`, creator: user._id }, 
        data[index], 
        {new: true}
    ));
    const existElement = await Promise.all(promiseExistElement);
            
    return res.json(existElement)
}

// EXPORTS
module.exports = {
    postTrackerElement,
    getTrackerElementWithId,
    deleteTrackerElement,
    updateTrackerElement,
    updateMultipleTrackerElement
}