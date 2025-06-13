// Needed Resources
const express = require("express");
const router = new express.Router();
const accountController = require("../controllers/accountController");
const utilities = require("../utilities");
const regValidate = require('../utilities/account-validation');

router.get("/", utilities.checkLogin, utilities.handleErrors(accountController.buildAccountManagementView));

router.get("/login", utilities.handleErrors(accountController.buildLogin));
router.get("/registration", utilities.handleErrors(accountController.buildRegister));
router.post("/register", 
    regValidate.registrationRules(),
    regValidate.checkRegData,
    utilities.handleErrors(accountController.registerAccount)
);

// router.post('/register', utilities.handleErrors(accountController.registerAccount));

router.post(
    "/login",
    regValidate.loginRules(),
    regValidate.checkLoginData,
    utilities.handleErrors(accountController.accountLogin)
);

router.get("/update/:accountId", utilities.handleErrors(accountController.buildUpdate));
router.post("/update", regValidate.updateRules(), regValidate.checkUpdateData, utilities.handleErrors(accountController.updateAccount));
router.post("/update-password", regValidate.updatePasswordRules(), regValidate.checkUpdatePasswordData, utilities.handleErrors(accountController.updatePassword));

router.get("/logout", utilities.handleErrors(accountController.accountLogout));

// New Content week 6
router.get("/management", utilities.checkAdminAuthorization, utilities.handleErrors(accountController.buildUserManageView));

// AJAX Users
router.get("/getUsers/:account_id", utilities.handleErrors(accountController.getDirectoryJSON));

// User Add
router.get("/add-user", utilities.handleErrors(accountController.buildAddUser))
router.post("/add-user", regValidate.registrationRules(), regValidate.checkRegData, utilities.handleErrors(accountController.registerNewUser))

module.exports = router;