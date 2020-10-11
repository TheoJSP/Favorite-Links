const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy
const helpers = require("../lib/helpers")
const pool = require("../database")

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