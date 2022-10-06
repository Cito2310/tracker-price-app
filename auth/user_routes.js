const { Router } = require("express");
const { check } = require("express-validator");

const { checkFields, checkToken } = require("../helpers/checkFields");

const {
    searchUsers, 
    modifyUser,
    deleteUser
} = require("./user_controllers");

// ROUTES
const router = Router();

router.get("/search/:term",[
], searchUsers )


router.put("/",[
    check("token").notEmpty(),
    checkToken,

    checkFields
], modifyUser )


router.delete("/",[
    check("token").notEmpty(),
    checkToken,

    checkFields
], deleteUser )


module.exports = router;