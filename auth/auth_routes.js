const { Router } = require("express");
const { check } = require("express-validator");

const { checkFields } = require("../helpers/checkFields");

const {
    login, register
} = require("./auth_controller");

// ROUTES
const router = Router();

// Login
router.get('/login', (req, res) =>{res.json("hola")});

// Register
router.post('/register',[
    check("password", "Password is required").notEmpty(),
    check("password", "The password must contain at least 6 characters").isLength({ min: 6 }),
    check("password", "The password must contain a maximum of 16 characters").isLength({ max: 16 }),

    check("username", "Password is required").notEmpty(),
    check("username", "The username must contain at least 6 characters").isLength({ min: 3 }),
    check("username", "The username must contain a maximum of 16 characters").isLength({ max: 16 }),

    check("email", "Email is required").notEmpty(),
    check("email", "Invalid email").isEmail(),
    check("email", "The email must contain a maximum of 100 characters").isLength({ max: 100 }),

    checkFields
], register);


    
module.exports = router