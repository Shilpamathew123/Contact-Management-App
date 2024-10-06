const mongoose=require('mongoose');

const connectDb=async()=>{
    try {

        const connect=mongoose.connect("mongodb://localhost:27017/My-contacts");
        console.log("database connected");
       
        

        
    } catch (error) {
        console.log(error);
        console.log("database connection failed");
        
    }

}

module.exports=connectDb;