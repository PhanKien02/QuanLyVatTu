const express = require('express')

const ConfigViewsEngine = (app) =>{
    app.use(express.static('src/public'))
    app.set("view engine", "ejs");
    app.set("views", 'src/public/views')
};

module.exports =  ConfigViewsEngine