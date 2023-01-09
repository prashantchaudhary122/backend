const express =require("express");
const mongoose=require("mongoose");
const router=express.Router();
const { isAuth } = require("../middleware/authMiddleware");

const {
    getAllUsers,
    createNewUsers,
    loginUser,
    updateUserProfile,
    userForgetPassword,
    logoutUser,
    userPasswordChange

} = require('../controller/users.js');
router.get('/auth/get-user',getAllUsers)
router.post('/auth/createNewUser',createNewUsers)
router.post('/auth/loginUser',loginUser)
router.post('/auth/updateUserProfile',isAuth,updateUserProfile)
router.post('auth/userForgetPassword',userForgetPassword)
router.get('/auth/logoutUser',isAuth,logoutUser)
router.put("/auth/userPasswordChange", isAuth, userPasswordChange);
module.exports=router;