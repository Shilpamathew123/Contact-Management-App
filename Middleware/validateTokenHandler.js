const asyncHandler=require("express-async-handler")
const jwt=require("jsonwebtoken")


const validationToken=asyncHandler(async(req,res,next)=>{
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1]; // Extract token
            const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET); 
            console.log('Decoded:', decoded); // Verify token
            req.user = await User.findById(decoded.id).select('-password'); // Attach user to request
            next();
        } catch (error) {
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    } else {
        res.status(401).json({ message: 'No token, authorization denied' });
    }



})

module.exports=validationToken;
