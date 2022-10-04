// IMPORTS
const bcryptjs = require("bcryptjs");
const jwt = require('jsonwebtoken');

const User = require("./user_model")

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
    res.status(202).json( newUser );
}


const login = async(req, res) => {
    const { username, password } = req.body;
    
    // // checks username and password
    const userFind = await User.findOne( { username } );
    if ( !userFind ) {return res.status(404).json({msg: "Invalid username or password"})};
    
    const comparePassword = bcryptjs.compareSync(password, userFind.password)
    if ( !comparePassword ) {return res.status(401).json({msg: "Invalid username or password"})}

    // create token
    const token = jwt.sign({ id: userFind._id }, process.env.SECRETORPRIVATEKEY, {
        expiresIn: "4h"
    });

    // response token
    res.json({token})
}


// EXPORTS
module.exports = {
    login,
    register
}