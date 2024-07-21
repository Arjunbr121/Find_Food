import useModel from "../models/userModel.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from"validator"
import userModel from "../models/userModel.js"

// To create a token
const createToken = (id)=>{
    return jwt.sign({id},"QWERTYUIOPOIUYTREWQ")
}

// Login User
const loginUser = async(req,res)=>{
    const {email,password} = req.body;
    const user =await useModel.findOne({email})
    try {
        if(!user){
            return res.json({success:false,message:"user not found"})
        }
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.json({success:false,message:"Invalid Password"})
        }
        const token =createToken(user._id)
        return res.json({success:true,token})
    } catch (error) {
        console.log("Error",error);
        return res.json({success:false,message:"Error"})
        
    }
}


// Register User
const registerUser = async(req,res)=>{
    const {name,password,email}=req.body;
    try {
        // checking if user exist
        const exists = await userModel.findOne({email})
        if(exists){
            return res.json({success:"false",message:"User already exists"})
        }
        // validating email format and strong password
        if(!validator.isEmail(email)){
            return res.json({success:"false",message:"Please enter a valid email"})
        }
        if(password.length<8){
            return res.json({success:"false",message:"Please enter a strong password"})
        }
        // hashing user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = new userModel({
            name:name,
            email:email,
            password:hashedPassword
        })

        const user = await newUser.save()
        const token = createToken(user._id)
        res.json({success:true,token})

    } catch (error) {
        console.log((error));
        res.json({success:false,message:"Error"})
        
    }

}

export {loginUser,registerUser}