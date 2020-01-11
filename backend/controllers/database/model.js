const schema = require("./schema")
var mongoose = require('mongoose');
module.exports = {
    dashboard : new mongoose.model("Dashboard",schema.dashboard),
    user : new mongoose.model("User",schema.user),
    list : new mongoose.model("List",schema.list),
}