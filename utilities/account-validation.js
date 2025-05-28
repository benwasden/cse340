const utilities = require("../utilities")
const { body, validationResult } = require("express-validator")
const { registerAccount } = require("../models/account-model")
const validate = {}

/*  **********************************
  *  Registration Data Validation Rules
  * ********************************* */
 validate.registrationRules = () => {
    return [
        // firstname is required and must be string
        body("account_firstname")
            .trim()
            .escape()
            .notEmpty()
            .isLength({ min:1 })
            .withMessage("Please provide a first name."), // on error, this message is sent.

        // same as above but lastname
        body("account_lastname")
            .trim()
            .escape()
            .notEmpty()
            .isLength({ min:2 })
            .withMessage("Please provide a last name."), //same as above but for last

        // valid email is required and can't already exist in DB
        body("account_email")
        .trim()
        .escape()
        .notEmpty()
        .isEmail()
        .normalizeEmail()
        .withMessage("A valid email is required."),

        // pwd required and must be strong
        body("account_password")
        .trim()
        .notEmpty()
        .isStrongPassword({
            minLength: 12,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
        })
        .withMessage("Password doesn't meet requirements."),
    ]
 }

 /* ******************************
 * Check data and return errors or continue to registration
 * ***************************** */
validate.checkRegData = async (req, res, next) =>{
    const { account_firstname, account_lastname, account_email } = req.body
    let errors = []
    errors = validationResult(req)
    if (!errors.isEmpty()) {
        let nav = await utilities.getNav()
        res.render("account/register", {
            errors,
            title: "Registration",
            nav,
            account_firstname,
            account_lastname,
            account_email
        })
        return
    }
    next()
}

module.exports = validate