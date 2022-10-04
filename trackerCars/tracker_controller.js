// // IMPORTS
// const bcryptjs = require("bcryptjs");
// const jwt = require('jsonwebtoken');

const TrackerElement = require("./tracker_model");

// const User = require("./user_model")

// create one tracker element in user with token - private
const postTrackerElement = async(req , res) => {
    const user = req.USER;

    const newTrackerElement = new TrackerElement({
        title: "Test tracker",
        price: "20.000",
        symbolPrice: "$",
        model: "2022",
        km: "0",
        link: "www.google.com",
        creator: user._id,
    });

    await newTrackerElement.save();
    
    user.trackerElements.push( newTrackerElement._id );
    await user.save();
    return res.json({user, newTrackerElement});
}

// EXPORTS
module.exports = {
    postTrackerElement
}