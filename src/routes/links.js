const express = require("express");
const router = express.Router();

const pool = require("../database");

router.get("/add", (req, res) =>{
    res.render("links/add.hbs");
});

router.post("/add", async(req, res)=>{
    const {title, url , description } = req.body;
    const newLink = {
        title, 
        url,
        description
        
    };

    //GUARDA LOS DATOS EN LA DB
    await pool.query("INSERT INTO links set ?", [newLink]);
    console.log(newLink);
    res.redirect("/links/")
});

router.get("/", async(req, res)=>{
    
    //PIDE LOS DATOS DE LA DB
    const links = await pool.query("SELECT * FROM links");
    res.render("links/list", {links} )
});

router.get("/delete/:id", async(req, res)=>{
    const {id} = req.params;

    //ELIMINAR DATOS DE LA BASE DE DATOS
    await pool.query("DELETE FROM links WHERE ID = ?", [id]);
   
    
});

router.get("/edit/:id", async(req, res)=>{
    const {id} = req.params;
    //OBETENER DATOS QUE GUARDA LA TABLA CON ID ESPECIFICO 
    const links = await pool.query("SELECT * FROM links WHERE id = ?", [id]);
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
    res.redirect("/links/");

});

module.exports = router;