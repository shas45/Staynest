const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const User = require("../models/user.js");
const passport = require("passport");
const { isLoggedIn, saveRedirectUrl } = require("../middlewares/middleware.js");

router.get("/signup", (req, res) => {
    res.render("users/signup.ejs");
});
router.post("/signup", wrapAsync(async(req, res, next) => {
    try{
    let {username, email,password} = req.body;
    const newUser = new User({email, username})
    const registerdUser = await User.register(newUser, password);
    
    req.login(registerdUser, (err) =>{
        if(err){
            return next(err);
        }

        req.flash("success","Welcome to Staynest!");
        res.redirect("/listings")
    })

    }catch(e){
        req.flash("error", e.message);
        res.redirect("/signup");
    }

}));

router.get("/login", (req, res) => {
    res.render("users/login.ejs");
 })

router.post("/login", saveRedirectUrl,
passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
}),
async(req, res) =>{
    req.flash("success", "Welcome back to staynest!");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
});


router.get("/account", wrapAsync(async(req, res) => {
    let user = passport.session;
    console.log(user);
    await User.findById(user);
}));

router.get("/logout", isLoggedIn, async(req, res, next) => {
   req.logout((err) => {
    if(err){
        return next(err);
    }

    req.flash("success", "You are logged out!");
    res.redirect("/listings")
   })
});

module.exports = router;
