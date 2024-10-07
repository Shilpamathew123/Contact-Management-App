const asyncHandler=require('express-async-handler')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const User = require('../models/userModel')



//register user
//@route post api/users/register
//@access public


const registerUser =asyncHandler(async(req,res)=>{
    const{username,email,password}=req.body;
        if(!username || !email || !password){
            res.status(400);
            throw new Error("All fields (username, email, password) are required");
        }
        const userAvailable=await User.findOne({email})
        if(userAvailable){
            res.status(400);
            throw new Error("user already registered"); 
        }

        //hash password

        const hashedPassword=await bcrypt.hash(password,10)
        console.log("hashed password:",hashedPassword);
        const user=await User.create({
            username,
            email,
            password:hashedPassword
        })
        console.log(`user created:${user}`);
        if(user){
            res.status(201).json({_id:user._id,email:user.email})
        }
        else{
            res.status(400);
            throw new Error("user data is not valid");
        }

    res.json({message:"User registered successfully"})
}
)

//login user
//@route post api/users/login
//@access public


const loginUser =asyncHandler(async(req,res)=>{
    const {email, password}=req.body;
    if(!email ||!password){
        res.status(400);
        throw new Error("All fields (email, password) are required");
    }
    const user=await User.findOne({email})
    //comapre password with hashed password
    if(user &&await bcrypt.compare(password,user.password)){
        const accessToken=jwt.sign({
            user:{
                username:user.username,
                email:user.email,
                id:user._id
            },
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn:'1h'}
    )
        res.status(200).json({accessToken})
    }else{
        res.status(401);
        throw new Error("Invalid email or password");  //change to custom error message for security reasons, user might see it in the response body
    }

}
)

//login user
//@route post api/users/currentuser
//@access private

 // Assuming you're using this package for handling async errors

const currentUser = asyncHandler(async (req, res) => {
    res.json(req.user) // Logs user info for debugging
});






module.exports ={
    registerUser,
    loginUser,
    currentUser
}