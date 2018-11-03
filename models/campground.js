var mongoose = require("mongoose");
//Schema setup
var campgroundSchema= new mongoose.Schema({
    name:String,
    price:String,
    image:String,
    description:String,
    author:{
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        username:String
    
    },
    comments:[
           { 
               type: mongoose.Schema.Types.ObjectId,
               ref: "Comments"
           }
        ]
})

//Turning campground into a model
 

module.exports = mongoose.model("Campground", campgroundSchema);