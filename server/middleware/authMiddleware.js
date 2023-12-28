import jwt from "jsonwebtoken";

const authMiddleware = (req,res,next) => {
  try{
      const token=req.headers.authorization.split(' ')[1]
      let decodeData=jwt.verify(token,process.env.SECRET)
      req.userId=decodeData?.id
      next()
  }catch (e) {
    console.log(e)
      res.status(511).json({
          message:e
      })
  }
}
export default authMiddleware