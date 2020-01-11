var mongoose = require('mongoose');

module.exports = {
    dashboard : new mongoose.Schema({
        name: {type: String, required: true,unique: true},
        tag: [{
            name: {type: String, required: true},
            color: String
        }]
    }),
    user: new mongoose.Schema({
        username: {type: String, required: true,unique: true},
        password: {type: String, required: true,unique: true},
        dashboard: [
            {
                id: {type: mongoose.Schema.Types.ObjectId, required: true},
                permission: {type: Number, default: 1},
                tag: [
                    {
                        id: mongoose.Schema.Types.ObjectId,
                        name: String,
                        color: String
                    }
                ]
            }
        ]

    }),
    
    list : new mongoose.Schema({
        dashboardID:{type: mongoose.Schema.Types.ObjectId, required: true},
        name: {type: String, required: true},
        deadline: {type: Date, default: 0},
        description: {type: String, default: ""},
        position:{
            x: {type: Number, required: true, default: 0},
            y: {type: Number, required: true, default: 0}
        },
        tasks : [
            {
                name : {type: String, required: true},
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
                name: String,
                color: String
            }
        ]
    })
}
