const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var contactSchema = new mongoose.Schema({
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,  // Erase if already required.  // Erase if already required.  // Erase if already required.  // Erase if already required.  // Erase if already required.  // Erase if already required.  // Erase if already required.  // Erase if already required.  // Erase if already required.  // Erase if already required.  // Erase if already required.  // Erase if already required.
        ref: 'User'  // Assuming User is the model name for the user_id field in the Contact collection. You should replace 'User' with your actual model name.  // Erase if already required.  // Erase if already required.  // Erase if already required.  // Erase if already required.  // Erase if already required.  // Erase if already required.  // Erase if already required.  // Erase if already required.  // Erase if already required.  // Erase if already required.  // Erase if already required.  // Erase if already required.  // Erase if already required.  // Erase if already required.  // Erase if already required.  // Erase if already required.  // Erase if already required.  // Erase if already required.  // Erase if already required.
    },
    name:{
        type:String,
        required:[true,"please add the contact name"]
       
    },
    email:{
        type:String,
        required:[true,"please add the contact email address"]
        
    },
    phn:{
        type:String,
        required:[true,"please add the contact mobile number"]
    },
    
},
    { timestamps: true });

//Export the model
module.exports = mongoose.model('Contact', contactSchema);