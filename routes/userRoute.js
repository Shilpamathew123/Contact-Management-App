const express=require('express');
const { registerUser ,loginUser,currentUser} = require('../controller/userController');
const validationToken=require('../Middleware/validateTokenHandler')
const router=express.Router();

router.post("/register",registerUser)

router.post("/login",loginUser)

router.get("/current",validationToken,currentUser)

module.exports=router;

