//AÑADIR COSAS A HANDLEBARS
const {format} = require("timeago.js");

const helpers = {};

//AÑADIR TIMEAGO 
helpers.timeago = (timestamp) =>{
    return format(timestamp);
}

module.exports = helpers;