//CONFIGURACION DE LA DB 
const mysql = require ("mysql");
const {promisify} = require("util");
const {database} = require("./keys");

const pool = mysql.createPool(database);

//POSIBLES ERRORES DE LA DB
pool.getConnection((err, connection) =>{
    if(err){
        if(err.code === "PROTOCOL_CONNETION_LOST"){
            console.error("DATABASE CONNECTION WAS CLOSED");
        }
        if(err.code === "ER_CON_COUNT_ERROR"){
            console.error("DATABASE HAS TO MANY CONNECTIONS");
        }
        if(err.code === "ECONNREFUSED"){
            console.error("DATABASE CONNECTION WAS REFUSED");
        }
    }

    if (connection) connection.release();
    console.log("DB is Connected");
    return;
});

//PARA PODER UTILIZAR PROMESAS 
pool.query = promisify(pool.query);

module.exports = pool;