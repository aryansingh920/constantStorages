const mongoose = require("mongoose");

const link = new mongoose.Schema({
    link:{
        type:String
        
    }
});

module.exports = mongoose.model("links", link);