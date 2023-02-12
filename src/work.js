const mongoose = require("mongoose")


const blogSchema = new mongoose.Schema({
    title:{
        type: String,
        required:true,
        

    },
    content:{
        type: String,
        required: true,

    },
    image:{
        type:String,
        required: true
    },

})

const blog = mongoose.model("blogs", blogSchema)

module.exports = blog;


 
