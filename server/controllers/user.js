import mongoose from "mongoose";
import User from '../models/auth.js'
import cloudinary from "cloudinary"
export const getAllUsers=async (req,res)=>{
    try{
        const allUsers=await User.find()
        const allUserDetails=[]

        allUsers.forEach(user=>{
            allUserDetails.push({
                _id: user._id,
                name:user.name,
                email:user.email,
                about:user.about,
                tags:user.tags,
                avatar:user.avatar,
                followers:user.followers,
                following:user.following,
                joinedOn:user.joinedOn
            })
        })
        res.status(200).json({
            success:true,
            result:allUserDetails
        })
    }
    catch (e) {
        res.status(400).json({
            success:true,
            message:e.message
        })
    }
}

export const updateUser=async (req,res)=>{
    const {id:_id}=req.params
    const {name,about,tags}=req.body
    if (!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send("User Id is not valid ")
    }
    try{
        const updateProfile= await User.findByIdAndUpdate(_id,{
            $set:{
                'name':name,
                'about':about,
                'tags':tags
            }
        },{new:true})
        res.status(200).json({
            success:true,
            result:updateProfile
        })
    }catch (e) {
        res.status(405).json({
            success:false,
            message:e.message
        })
    }
}

export const updateProfilePic=async(req,res)=>{
    try {
        const {userId,image}=req.body
      

        const user= await User.findById(userId)
        
       
        if(!user){
            return res.status(403).json({
                message:"User not Exist"
            })
        }
        if(user.avatar.public_id===""){
            const myCloud = await cloudinary.v2.uploader.upload(image,{
                folder: "avatar",
                quality: "50",
            })
            user.avatar.public_id=await myCloud.public_id
            user.avatar.url = await myCloud.secure_url;
        }else{
            try {
                await cloudinary.uploader.destroy(user.avatar.public_id)                //delete the old avatar
                const myCloud = await cloudinary.v2.uploader.upload(image, {
                folder: "avatar",
                quality: "50"                                           //reduce the quality of image
            })
            user.avatar.public_id=myCloud.public_id
            user.avatar.url = myCloud.secure_url;
            } catch (error) {
                console.log(error)
                return res.status(500).json({
                    success: false,
                    message: error.message
                })
            }
        }
        //save the user
        await user.save();

        res.status(200).json({
            message:"Profile Picture Updated"
        })

    } catch (e) {
        console.log(e)
        res.status(500).json({
            message:e.message
        })
    }
}