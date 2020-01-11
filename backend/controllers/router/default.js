const express = require("express");
const database = require("../database/api");



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

module.exports = function(model){
    var apiRoutes = express.Router();
    apiRoutes.use(express.json());
    apiRoutes.post("/", function(req, res){
        var data =  req.body||req.query;
        model.create(data, function(err, data){
            if (err) return handleError(res,err);
            handleSuccess(res, data);
        })
    })
    apiRoutes.get("/", function(req, res){
        var data = req.query || req.body;
        model.find(data, function(err, data){
            if (err) return handleError(res,err);
            if(data.length == 0){
                return handleError(res,{errmsg:"Don't found"});
            }
            handleSuccess(res, data);
        })
    })
    apiRoutes.delete("/", function(req, res){
        var data = req.query || req.body;
        model.deleteOne(data, function(err, data){
            if (err) return handleError(res,err);
            if(data.length == 0){
                return handleError(res,{errmsg:"Don't found"});
            }
            handleSuccess(res, data);
        })
    })
    apiRoutes.patch("/", function(req, res){

        var data =  req.body;

        model.findOneAndUpdate({_id: data._id}, data,{ new: true },   function(err, data){
            if (err) return handleError(res,err);
            // if(data.length == 0){
            //     return handleError(res,{errmsg:"Don't found"});
            // }
            handleSuccess(res, data);
        })
    })
    return apiRoutes;
}

