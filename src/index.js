// CONSTANTES
const express = require("express");
const morgan = require("morgan");
const exphbs = require("express-handlebars");
const path = require("path");

// INICIALIZACIONES
const app = express();

// SETTINGS 
app.set("port", process.env.PORT || 3000 );
app.set("views", path.join(__dirname , "views"));
app.engine(".hbs", exphbs({
    defaultLayout: "main",  
    layoutDir : path.join(app.get("views") , "layouts"),
    partialsDir: path.join(app.get("views") , "partials"),
    extname : ".hbs",
    helpers: require("./lib/handlebars")
})) 
app.set("view engine" , ".hbs");

// MIDDLEWARS
app.use(morgan("dev"));
app.use(express.urlencoded({extended : false}))
app.use(express.json());

// VARIABLES GLOBALES
app.use((req, res, next) =>{

    next();
})

// ROUTES
app.use(require("./routes/index"));
app.use(require("./routes/authentication"));
app.use("/links" , require("./routes/links"));


// PUBLIC FILES
app.use(express.static(path.join(__dirname, "public")))

// STARTING SERVER
app.listen(app.get("port"), ()=>{
    console.log("Server on port", app.get("port"));
});