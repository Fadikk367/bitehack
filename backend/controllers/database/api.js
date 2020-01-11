
require('dotenv').config()
var mongoose = require('mongoose');
mongoose.connect(process.env.DB_HOST, {useNewUrlParser: true,useUnifiedTopology: true});
var db = mongoose.connection;
module.exports = {
    connect: function(){
        return new Promise(function(resolve, reject) {
            db.on('error', (error)=>{
                reject(error);
            });
            db.once('open', function() {
                resolve("Sucess connect");
            });
        });
    },
    schema : require("./schema"),
    model : require("./model"),
    mongoose : mongoose,
    db : db

}