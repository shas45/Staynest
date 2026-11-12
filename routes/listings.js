const express = require('express');
const router = express.Router();
const Listing = require('../models/listing.js');
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateListing } = require("../middlewares/middleware.js");

const listingController = require("../controllers/listings.js")




// Index route to display all listings
router.get('/',
    wrapAsync(listingController.index));

// new route
router.get("/new",isLoggedIn, listingController.renderNewForm);


// show route to display a single listing
router.get("/:id",
    wrapAsync(listingController.showlistings));


// create route
router.post("/", isLoggedIn, validateListing, 
    wrapAsync(listingController.createListing ));

// Edit route
router.get("/:id/edit", isLoggedIn, isOwner,
    wrapAsync(listingController.editListing));


// update route
router.put("/:id",isLoggedIn,isOwner, validateListing,
    wrapAsync(listingController.updateListing));

// Delete route
router.delete("/:id", isLoggedIn, isOwner,
    wrapAsync(listingController.deleteListing));


module.exports = router;