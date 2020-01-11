const schema = require("./schema")
var mongoose = require('mongoose');
module.exports = {
    dashboard : new mongoose.model("Dashboard",schema.dashboard),
    list : new mongoose.model("List",schema.list),
    tag : new mongoose.model("Tag",schema.tag),
}