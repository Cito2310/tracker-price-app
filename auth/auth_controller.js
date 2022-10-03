// IMPORTS
const bcryptjs = require("bcryptjs");
const jwt = require('jsonwebtoken');

const User = require("./user_model")

// const token = jwt.sign({ foo: 'bar' }, privateKey, { algorithm: 'RS256'});

// CONTROLLERS
const register = async(req, res) => {
    const { username, password, email } = req.body;
    
    // checks
    if (await User.findOne({$or: [{email},{username}]})) {return res.status(400).json({ msg : "This email or username is already registered" })};
    
    // create new user
    const newUser = new User({ username, password, email });
    
    // password encrypt
    const salt = bcryptjs.genSaltSync();
    newUser.password = bcryptjs.hashSync( password , salt);
    
    // response
    await newUser.save();
    res.json( newUser );
}


const login = (req, res) => {
    res.json({"HOLA":"HOLA"})
}


// EXPORTS
module.exports = {
    login,
    register
}