import express from "express"
import config from "config"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import userModel from "../../models/User/User.js"
import sendMail from "../../utils/sendEmail.js"
import sendSMS from "../../utils/sendSMS.js"
const url = config.get("SERVER_URL")

const router = express.Router()


router.post("/register",async(req,res)=>{
    try {
    let { type, user_view_type, site_admin,
        name, email, phone, password, company,
        blog, location, hireable, bio, twitter_username,
        public_repos, public_gists,followers, following} =req.body

    let existinguser = await userModel.findOne({email})
    if(existinguser){
        return res.status(400).json({msg:"User is already registered, Please Login🙏🏻"})
      }
    
    let hashPassword = await bcrypt.hash(password, 10)

    let emailToken = Math.random().toString(36).substring(2);
    let phoneToken = Math.random().toString(36).substring(2);

    let superUser = {
        type,
        user_view_type,
        site_admin,
        name,
        email,
        phone,
        password: hashPassword,
        company,
        blog,
        location,
        hireable,
        bio,
        twitter_username,
        public_repos,
        public_gists,
        followers,
        following,
        userVerifyToken: {
          email: emailToken,
          phone: phoneToken,
        },
      };
      await userModel.create(superUser);


      
      console.log(`${url}/api/public/users/emailverify/${emailToken}`);
      console.log(`${url}/api/public/users/phoneverify/${phoneToken}`);

      res.status(201).json({msg:"User Registered Successfully 🫱🏻‍🫲🏻"})
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:error})
    }
})

router.get("/emailverify/:token",async(req,res)=>{
    try {
        let token= req.params.token
        let user = await userModel.findOne({"userVerifyToken.email":token})
        if(!user){
          return res.status(400).json({msg:"invalid mail, please check"})
        }
        user.userVerified.email = true;
        user.userVerifyToken.email= null

        await user.save()
        res.status(200).json({msg:"User verified Successfully"})
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:error})
    }
})

router.get("/phoneverify/:token",async(req,res)=>{
    try {
        let token = req.params.token
        let user = await userModel.findOne({"userVerifyToken.phone":token}) 
        if(!user){
          return res.status(400).json({msg:"invalid phone, please check"})    
        }
        user.userVerified.phone = true;
        user.userVerifyToken.phone= null
        await user.save();
  
         res.status(200).json({msg:"phone verified Successfully"}) 
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:error})
    }
})


router.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      let user = await userModel.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: "Invalid credentials" });
      }
    
      if (!user.userVerified.email) {
        return res.status(400).json({ msg: "Email is not verified, Please check your inbox📧" });
      }
  
  
      if (!user.userVerified.phone) {
        return res.status(400).json({ msg: "Phone is not verified, Please check your inbox✉️" });
      }
  
  
      let check = await bcrypt.compare(password, user.password);
  
      if (!check) {
        return res.status(400).json({ msg: "Invalid credentials, password is not matching❌" });
      }
  
      const jwtsecret = config.get("JWT_SECRET")
      const token = jwt.sign({user},jwtsecret,{expiresIn:"1d"});
      res.status(200).json({ msg: "LoggedIn successfully! And the token is", token});
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: error });
    }
  });

export default router