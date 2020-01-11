const express = require("express");
const database = require("../database/api");

var apiDashboardRoutes = express.Router();

function handleError(res, err){
    console.error("Database: ", err);
    res.send({
        success: false,
        err : err
    })
}
function handleSuccess(res, data){
    res.send({
        success: true,
        data: data
    })
}

apiDashboardRoutes.post("/", function(req, res){
    var data = req.query || req.body;
    database.model.dashboard.create(data, function(err, data){
        if (err) return handleError(res,err);
        res.send(data)
    })
})
apiDashboardRoutes.get("/", function(req, res){
    var data = req.query || req.body;
    database.model.dashboard.find(data, function(err, data){
        if (err) return handleError(res,err);
        if(data.length == 0){
            return handleError(res,{errmsg:"Don't found"});
        }
        handleSuccess(res, data)
    })
})
// apiDashboardRoutes.post("/", function(req, res){
//     var data =  req.body;
//     database.model.dashboard.create(data).exec().then(function(data){
//         res.send(data);
//     }).catch(err){
//         console.error(err)
//     }
// })

module.exports = apiDashboardRoutes