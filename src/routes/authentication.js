const express = require("express");
const router = express.Router();

const passport = require("passport")
const { isLoggedIn , isNotLogedIn} = require('../lib/auth');

//SIGNUP 
router.get("/signup" , isNotLogedIn, (req, res)=>{
    res.render("auth/signup");
});


router.post("/signup", passport.authenticate("local.signup", {
    successRedirect: "/profile",
    failureRedirect: "/signup",
    failureFlash: true
}))


//LOGIN
router.get("/signin", isNotLogedIn,(req, res)=>{
    res.render("auth/signin");
});

router.post("/signin", (req, res, next)=>{
    passport.authenticate("local.signin", {
        successRedirect: "/profile",
        failureRedirect: "/signin",
        failureFlash: true
    })(req, res, next);
});



//PROFILE
router.get('/profile', isLoggedIn, (req, res) => {
    res.render('profile');
  });

//LOGOUT    
router.get("/logout" , isLoggedIn, (req, res) =>{
    req.logOut();
    res.redirect("/signin")
})

module.exports = router;