const { validationResult } = require("express-validator");
const jwt = require('jsonwebtoken');

const User = require("../auth/user_model");
const TrackerElement = require("../trackerCars/tracker_model");

const checkFields = ( req , res, next ) => {
    const errors = validationResult( req );
    if (!errors.isEmpty()) {  return res.status(400).json(  { errors }  ) };
    
    next();
}


// CUSTOM MIDDLEWARES CHECKS
const checkToken = async(req, res, next) => {
    const { token } = req.headers;

    try {
        const { id } = jwt.verify(token, process.env.SECRETORPRIVATEKEY );

        const user = await User.findById(id);

        if (!user) {return res.status(404).json({msg: "User id not found"})};

        req.USER = user;
        next();

    } catch (error) {
        res.status(400).json({msg: "Token invalid"});
    }
}


module.exports = { 
    checkFields,
    checkToken,
}