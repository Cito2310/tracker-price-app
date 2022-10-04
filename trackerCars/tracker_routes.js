const { Router } = require("express");
const { check } = require("express-validator");

const { checkFields, checkToken } = require("../helpers/checkFields");

const {
    postTrackerElement
} = require("./tracker_controller");

// ROUTES
const router = Router();

router.post('/',[
    check("token", "Token is required").notEmpty(),
    checkToken,

    checkFields
], postTrackerElement);



    
module.exports = router