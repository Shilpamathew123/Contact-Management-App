const asyncHandler=require("express-async-handler")
const jwt=require("jsonwebtoken")


const validationToken=asyncHandler(async(req,res,next)=>{
    let token;
    let authHeader=req.header.Authorization ||req.headers.authorization;
    if(authHeader && authHeader.startsWith("Bearer ")){
        token=authHeader.split(" ")[1];
    }
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,decoded)=>{
        if(err) {
            res.status(401)
            throw new err("user not authenticated")
        }
        req.user=decoded.user;
        next();
    })

    if(!token){
        res.status(401)
        throw new Error("token not provided")
    }



})

module.exports=validationToken;
