var mongoose = require('mongoose');

module.exports = {
    dashboard : new mongoose.Schema({
        name: {type: String, required: true,unique: true}
    }),
    list : new mongoose.Schema({
        dashboardID:{type: mongoose.Schema.Types.ObjectId, required: true},
        name: {type: String, required: true},
        position:{
            x: {type: Number, required: true, default: 0},
            y: {type: Number, required: true, default: 0}
        },
        tasks : [
            {
                text : {type: String, required: true},
                done : {type: Boolean, default: false }
            }
        ],
        relations: [
            mongoose.Schema.Types.ObjectId
        ],
        color: String,
        tag:[
            {
                id: mongoose.Schema.Types.ObjectId,
                name: String
            }
        ]
    }),
    tag :  new mongoose.Schema({
        name: {type: String, required: true}
    })
}
