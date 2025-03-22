const jwt=require('jsonwebtoken');

module.exports=(req,res,next)=>{
    try{
        const token=req.headers.authorization.split("")[1];
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        req.body.userId=decoded.userId;
        next();
        }catch(err){
        return res.status(401).json({
            success:false,
            message:'you are not authenticated',
            data:err
        })
    }
}