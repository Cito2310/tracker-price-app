// IMPORTS
// const bcryptjs = require("bcryptjs");
const jwt = require('jsonwebtoken');
// const User = require("./user_model");
const User = require("./user_model")

// const token = jwt.sign({ foo: 'bar' }, privateKey, { algorithm: 'RS256'});

// CONTROLLERS
const login = (req, res) => {
    res.json({"HOLA":"HOLA"})
}


const register = async(req, res) => {
    const { username, password, email } = req.body;

    // checks
    if (await User.findOne({username})) {return res.status(400).json({ msg : "This username already exists" })}
    if (await User.findOne({email})) {return res.status(400).json({ msg : "This email is already registered" })}

    // response
    const newUser = new User({ username, password, email });
    await newUser.save()

    res.json( newUser )
}


// EXPORTS
module.exports = {
    login,
    register
}