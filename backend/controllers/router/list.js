const express = require("express");
const database = require("../database/api");

var apiListRoutes = express.Router();

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

apiListRoutes.post("/", function(req, res){
    var data = req.query || req.body;
    database.model.list.create(data, function(err, data){
        if (err) return handleError(res,err);
        res.send(data)
    })
})
apiListRoutes.get("/", function(req, res){
    var data = req.query || req.body;
    database.model.list.find(data, function(err, data){
        if (err) return handleError(res,err);
        if(data.length == 0){
            return handleError(res,{errmsg:"Don't found"});
        }
        handleSuccess(res, data)
    })
})
apiListRoutes.delete("/", function(req, res){
    var data = req.query || req.body;
    database.model.list.deleteOne(data, function(err, data){
        if (err) return handleError(res,err);
        if(data.length == 0){
            return handleError(res,{errmsg:"Don't found"});
        }
        handleSuccess(res, data)
    })
})
apiListRoutes.patch("/", function(req, res){
    var data = req.query || req.body;
    database.model.list.updateOne({_id: data._id}, data, function(err, data){
        if (err) return handleError(res,err);
        if(data.length == 0){
            return handleError(res,{errmsg:"Don't found"});
        }
        handleSuccess(res, data)
    })
})
module.exports = apiListRoutes
