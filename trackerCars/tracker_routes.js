const { Router } = require("express");
const { check } = require("express-validator");

const { checkFields, checkToken } = require("../helpers/checkFields");

const {
    postTrackerElement, 
    getTrackerElementWithId,
    deleteTrackerElement,
    updateTrackerElement
} = require("./tracker_controller");

// ROUTES
const router = Router();

router.post('/:id',[
    check("id", "Id is required").notEmpty(),

    check("token", "Token is required").notEmpty(),
    checkToken,

    checkFields
], postTrackerElement);


router.get('/:id',[
    check("id", "Id is required").notEmpty(),
    check("id", "Id is required").isMongoId(),

    checkFields
], getTrackerElementWithId);


router.delete('/:id',[
    check("id", "Id is required").notEmpty(),

    check("token", "Token is required").notEmpty(),
    checkToken,

    checkFields
], deleteTrackerElement);


router.put('/:id',[
    check("id", "Id is required").notEmpty(),

    check("token", "Token is required").notEmpty(),
    checkToken,

    checkFields
], updateTrackerElement);



    
module.exports = router