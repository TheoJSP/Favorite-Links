const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy
const helpers = require("../lib/helpers")
const pool = require("../database")

// LOGIN
passport.use("local.signin", new LocalStrategy({
    usernameField: "username", 
    passwordField: "password",
    passReqToCallback: true,
}, async(req, username, password, done)=>{
    const rows = await pool.query("SELECT * FROM users WHERE username = ?", [username])
    if (rows.length > 0 ){
        const user = rows[0]
        const validPassword = await helpers.matchPassword(password, user.password);
        if(validPassword){
            done(null, user, req.flash("success","Welcome" + user.username));
        }else{
            done(null, false, req.flash("message","Incorrect password"));
        }
    }else{
        done(null, false, req.flash("message","The username does not exist"))
    }
}));



// SIGNUP 
passport.use("local.signup", new LocalStrategy({
    usernameField: "username",
    passwordField: "password",
    //para recibir datos adicionales
    passReqToCallback: true
}, async (req, username, password, done) => {
    const {fullname} = req.body;
    const newUser ={
        username,
        password, 
        fullname
    };

    newUser.password = await helpers.encryptPassword(password);
    const result = await pool.query("INSERT INTO users SET ?", [newUser]);
    newUser.id = result.insertId;
    return done (null , newUser);

}));

passport.serializeUser((user, done) =>{
    done(null, user.id);
})

passport.deserializeUser( async (id, done)=>{
   const rows = await pool.query("SELECT * FROM users Where  id = ?", [id])
   done(null, rows[0]);
})
