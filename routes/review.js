const express = require('express');
const router = express.Router({mergeParams: true});

const wrapAsync = require("../utils/wrapAsync.js");
const {validateReview, isLoggedIn, isReviewAuthor} = require("../middlewares/middleware.js");
const reviewsController = require("../controllers/reviews.js");




// Reviews 
// post route 

router.post("/",isLoggedIn, validateReview,
    wrapAsync(reviewsController.createReview)) ;


// delete reviews
 router.delete("/:reviewId",isLoggedIn, isReviewAuthor,
    wrapAsync(reviewsController.deleteReview));

module.exports = router;