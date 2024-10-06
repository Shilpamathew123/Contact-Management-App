const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,"please add the user name"]
       
    },
    email:{
        type:String,
        required:[true,"please add the user email"],
        unique:[true,"email already exists"]
    },
    password:{
        type:String,
        required:[true,"please add the user password"],
    },
},{
    timestamps:true
});

//Export the model
module.exports = mongoose.model('User', userSchema);