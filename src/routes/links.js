//CONSTANTES
const express = require("express");
const router = express.Router();
const pool = require("../database");
const { isLoggedIn } = require('../lib/auth');

//         ACCIONES LINKS


//              AÑADIR
router.get("/add", isLoggedIn,(req, res) =>{
    res.render("links/add");
});

router.post("/add", async(req, res)=>{
    const {title, url , description } = req.body;
    const newLink = {
        title, 
        url,
        description,
        user_id: req.user.id
    };
    //GUARDA LOS DATOS EN LA DB
    await pool.query("INSERT INTO links set ?", [newLink]);
    req.flash("success", "¡Link save Sucefully!");
    res.redirect("/links/")
});


//          IMPREME LOS LINKS EN PANTALLA
router.get("/", isLoggedIn,async(req, res)=>{  
    //PIDE LOS DATOS DE LA DB
    const links = await pool.query("SELECT * FROM links WHERE user_id = ?", [req.user.id]);
    res.render("links/list", {links} )
});


//             ELIMINAR
router.get("/delete/:id", isLoggedIn,async(req, res)=>{
    const {id} = req.params;
    //ELIMINAR DATOS DE LA BASE DE DATOS
    await pool.query("DELETE FROM links WHERE ID = ?", [id]); 
    req.flash("success", "¡Link Remove Succefully!");
    res.redirect("/links/")
});


//               EDITAR
router.get("/edit/:id",isLoggedIn, async(req, res)=>{
    const {id} = req.params;
    //OBETENER DATOS QUE GUARDA LA TABLA CON ID ESPECIFICO 
    const links = await pool.query("SELECT * FROM links WHERE id = ?", [id]);;
    res.render("links/edit", {link: links[0]});
});

router.post("/edit/:id", async(req, res)=>{
    const { id } = req.params;
    const { title, description, url } = req.body;
    const newLink = {
        title, 
        description,
        url
    }
    //ACTUALIZA DATOS DE LA DB
    await pool.query("UPDATE links set ? WHERE id = ?", [newLink, id]);
    req.flash("success", "¡Link Update Succefully!")
    res.redirect("/links/");

});


module.exports = router;