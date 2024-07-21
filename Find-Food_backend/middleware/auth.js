import jwt from "jsonwebtoken"

const authMiddleWare = async (req,res,next)=>{
    const {token} = req.headers;
    if(!token){
        return res.json({success:false,message:"Not Authorised Please Login again!!"})
    }
    try {
        const tokenDecode = jwt.verify(token,"QWERTYUIOPOIUYTREWQ")
        req.body.userId = tokenDecode.id;
        next();
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error in JWT"})
        
    }
}

export default authMiddleWare