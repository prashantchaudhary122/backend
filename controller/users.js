const Users = require('../model/users')
const JWTR =  require('jwt-redis').default;
let redisClient = require("../config/redisInit");
const jwtr = new JWTR(redisClient); 
//const { validationResult } = require('express-validator');
const bcrypt = require("bcrypt");


const getAllUsers=async(req,res)=>{
    try{
        const userData=await Users.find();
        console.log(userData);
        res.json({
            data:{userData},
            messsge:"Successful",
        });
    }
    catch(error){
        console.log(error)
    }
}
const createNewUsers=async(req,res)=>{
    try{
        const {name,email,age,contact,password}=req.body;
        const emailTaken=await Users.findOne({email:email});
        // const errors=validationResult(req);
        // if (!errors.isEmpty()) {
        //   return res.status(400).json({
        //     status: 0,
        //     data: {
        //       err: {
        //         generatedTime: new Date(),
        //         errMsg: errors.array().map((err) => {
        //           return `${err.msg}: ${err.param}` 
        //         }).join(" | "), 
        //         msg: "Invalid data entered.",
        //         type: "ValidationError",
        //       },
        //     },
        //   });
        // }
        if(emailTaken){
          return res.status(409).json({
            status:0,
            data:{
              err:{
                generatedTime:new Date(),
                errMsg:"Email already taken",
                msg:"Email already taken",
                type:"Duplicate Key Error",
              },
            },
          });
        }

        if (!email || !name || !password || !age || !contact) {
            return res.status(400).json({
              status: 0,
              data: {
                err: {
                  generatedTime: new Date(),
                  errMsg: "Please fill all the details.",
                  msg: "Please fill all the details.",
                  type: "Client Error",
                },
              },
            });
          }
          const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const user = await new Users({
      name,
      email,
      age,
      contact,
      passwordHash
    });

    const savedUser = await user.save(user);

    if (savedUser) {

      res.status(201).json({
        status: 1,
        data: { name: savedUser.name },
        message: "Registered successfully!",
      });
    } else {
      res.status(500).json({
        status: 0,
        data: {
          err: {
            generatedTime: new Date(),
            errMsg: "Some error happened during registration",
            msg: "Some error happened during registration",
            type: "MongodbError",
          },
        },
      });
    }    

    }

    catch (err) {
        return res.status(500).json({
          status: -1,
          data: {
            err: {
              generatedTime: new Date(),
              errMsg: err.stack,
              msg: err.message,
              type: err.name,
            },
          },
        });
      }
    };
    const loginUser = async (req, res) => {
      try {
        const { email, password } = req.body;
    
        // const errors = validationResult(req);
        // if (!errors.isEmpty()) {
        //   return res.status(400).json({
        //     status: 0,
        //     data: {
        //       err: {
        //         generatedTime: new Date(),
        //         errMsg: errors.array().map((err) => {
        //           return `${err.msg}: ${err.param}` 
        //         }).join(" | "), 
        //         msg: "Invalid data entered.",
        //         type: "ValidationError",
        //       },
        //     },
        //   });
        // }
        const isUserExist= await Users.findOne({email:email});
        if(!isUserExist){
          return res.status(404).json({
            status:0,
            data:{
              err:{
                generatedTime:new Date(),
                errMsg:"User not available with this email address.",
                msg:"User not available with  this email address.",
                type:"Internal Server Error",
              },
            },
          });
        }
       // console.log(password,isUserExist.passwordHash)
        const isPasswordCorrect=await bcrypt.compare(
          password,
          isUserExist.passwordHash

        );
        console.log(isPasswordCorrect);  
         if(!isPasswordCorrect){
          return res.status(401).json({
            status:0,
            data:{
              err:{
                generatedTime:new Date(),
                errMsg:"Password is incorrect",
                msg:"Password is incorrect",
                type:"Internal Server Error",
              },
            },
          });
        }
          const id = { user: isUserExist._id };
          const token = await jwtr.sign(id, process.env.JWT_SECRET, {
            expiresIn: "15d",
          });
      
          return res.status(200).json({
            status: 1,
            message: `Logged in Successfully`,
            data: {
              token: token,
              name: isUserExist.name,
              email: isUserExist.email,
              
            },
          });

        
      }
      catch (err) {
        return res.status(500).json({
          status: -1,
          data: {
            err: {
              generatedTime: new Date(),
              errMsg: err.stack,
              msg: err.message,
              type: err.name,
            },
          },
        });
      }
    };
    const updateUserProfile = async (req, res) => {
      try {
        const { name } = req.body;
        const user = await Users.findById(req.user)
        if (!user) {
          return res.status(404).json({
            status: 0,
            data: {
              err: {
                generatedTime: new Date(),
                errMsg: "User does not found",
                msg: "User does not found",
                type: "Mongodb Error",
              },
            },
          });
        }
    
        user.name = name || user.name;
    
        const isSaved = await user.save();
    
        if (!isSaved) {
          return res.status(500).json({
            status: 0,
            data: {
              err: {
                generatedTime: new Date(),
                errMsg: "User profile update fail",
                msg: "User profile update fail",
                type: "Internal Server Error",
              },
            },
          });
        }
    
        return res.status(200).json({
          message: "User details updated successfully!",
          name: isSaved.name,
          avatar: isSaved.image,
        });
      } catch (err) {
        return res.status(500).json({
          status: -1,
          data: {
            err: {
              generatedTime: new Date(),
              errMsg: err.stack,
              msg: err.message,
              type: err.name,
            },
          },
        });
      }
    };
    const userForgetPassword = async (req, res) => {
      try {
        const { email } = req.body;
        const user = await Users.findOne({ email });

        if (!user) {
          return res.status(400).json({
            status: 0,
            data: {
              err: {
                generatedTime: new Date(),
                errMsg: "Email does not exist!",
                msg: "Email does not exist!",
                type: "Internal Server Error",
              },
            },
          });
        }
    
        const otp = makeId(6);
    
        // store email in ForgetPassword Model
        const store = await new ForgetPassword({
          email: user.email,
          otp,
          user: user._id,
        });
    
        const storeOTP = await store.save(store);
        if (!storeOTP) {
          return res.status(500).json({
            status: 0,
            data: {
              err: {
                generatedTime: new Date(),
                errMsg: "Otp not send.",
                msg: "Otp not send.",
                type: "Internal ServerError",
              },
            },
          });
        }
    
        const url = `${otp}`;
    
        new Email(email, url).forgetPassword();
    
        return res
          .status(200)
          .json({ success: true, message: `Email send to you!` });
      } catch (err) {
        return res.status(500).json({
          status: -1,
          data: {
            err: {
              generatedTime: new Date(),
              errMsg: err.stack,
              msg: err.message,
              type: err.name,
            },
          },
        });
      }
    };
    const logoutUser = async (req, res) => {
      try {
        // const gettoken = req.headers["authorization"].split(" ")[1];
        await jwtr.destroy(req.jti);
        return res
          .status(200)
          .json({ status: 1, data: {}, message: "Logged out successfully!" });
        // return res.json({'message':'Logged out successfully!','token':token});
      } catch (err) {
        return res.status(500).json({
          status: -1,
          data: {
            err: {
              generatedTime: new Date(),
              errMsg: err.stack,
              msg: err.message,
              type: err.name,
            },
          },
        });
      }
    };
    //upadate password
    const userPasswordChange = async (req, res) => {
      try {
        var { currentPassword, newPassword } = req.body;
         
    
        //  currentPassword could not be empty -----
        if (!currentPassword) {
          return res.status(400).json({
            status: 0,
            data: {
              err: {
                generatedTime: new Date(),
                errMsg: "Current password should not be empty",
                msg: "Current password should not be empty",
                type: "Client  Error",
              },
            },
          });
        }
        console.log(currentPassword);
        //  new password could not be empty -----
        if (!newPassword) {
          return res.status(400).json({
            status: 0,
            data: {
              err: {
                generatedTime: new Date(),
                errMsg: "new password should not be empty",
                msg: "new password should not be empty",
                type: "Client  Error",
              },
            },
          });
        }
        //  new password should not match current password -----
        console.log(currentPassword,newPassword)
        if (currentPassword === newPassword) {
          return res.status(400).json({
            status: 0,
            data: {
              err: {
                generatedTime: new Date(),
                errMsg: "Current and New password should not be same`",
                msg: "Current and New password should not be same`",
                type: "Client  Error",
              },
            },
          });
        }
    
        const user = await Users.findById(req.user);
    
        const salt = await bcrypt.genSalt();
    
        //  current password correct checking -----
        const passwordCompare = await bcrypt.compare(
          currentPassword,
          user.passwordHash
        );
        if (!passwordCompare) {
          return res.status(401).json({
            status: 0,
            data: {
              err: {
                generatedTime: new Date(),
                errMsg: "Current password is incorrect",
                msg: "Current password is incorrect",
                type: "Internal Server Error",
              },
            },
          });
        }
        // checking new password and hashing it
        const newPasswordHash = await bcrypt.hash(newPassword, salt);
    
        user.passwordHash = newPasswordHash;
    
        await user.save();
    
        return res
          .status(200)
          .json({ status: 1, data: {}, message: " Password changed successfully!" });
      } catch (err) {
        return res.status(500).json({
          status: -1,
          data: {
            err: {
              generatedTime: new Date(),
              errMsg: err.stack,
              msg: err.message,
              type: err.name,
            },
          },
        });
      }
    };
    
   

module.exports={
    getAllUsers,createNewUsers,loginUser,updateUserProfile,userForgetPassword,logoutUser,userPasswordChange
};

  