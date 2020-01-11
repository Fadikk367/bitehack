require('dotenv').config()
const PORT =  process.env.PORT || 3000;

const express = require('express');
var app = express()
app.use(express.json());
var path = require("path")
var bodyParser = require("body-parser")
var cors = require('cors')

var database = require("./controllers/database/api")



app.use(cors())

// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())

// app.use(express.static(path.join(__dirname, 'static')))

const apiDashboardRoutes = require("./controllers/router/dashboard");

app.use('/dashboard', apiDashboardRoutes);


app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})