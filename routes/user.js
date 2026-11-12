const express = require("express");
const router = express.Router();
const passport = require("passport");

const wrapAsync = require("../utils/wrapAsync.js");

const { isLoggedIn, saveRedirectUrl } = require("../middlewares/middleware.js");
const userController = require("../controllers/users.js");



// signup form route
router.get("/signup", userController.renderSignupForm );


// users signup route
router.post("/signup", wrapAsync(userController.signup));


// login form route
router.get("/login", userController.renderLoginForm)


// users login route
router.post("/login", saveRedirectUrl,
passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
}),
 userController.login
);


// router.get("/account", wrapAsync(async(req, res) => {
//     let user = passport.session;
//     console.log(user);
//     await User.findById(user);
// }));



// logout route
router.get("/logout", isLoggedIn, userController.logout);


module.exports = router;
