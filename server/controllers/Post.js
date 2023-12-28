import Post from "../models/post.model.js"
import cloudinary from "cloudinary"
import mongoose from "mongoose"
export const newPost=async(req,res)=>{
  const {caption,userId,image}=req.body
    try {

        if(!userId){
          return res.status(403).json({
            message:"Log-In first"
          })
        }
        if(!image){
          const newPost={
            caption:caption,
            postedBy:userId,
            }
          
          const post=await Post.create(newPost)
          await post.save()
        
          return res.status(200).json({
            post,
            message:"Text Posted Successfully"
          })
      }else{
      const myCloud = await cloudinary.v2.uploader.upload(image,{
          folder: "posts",
          quality: "50",
      });
  
      const newPost={
      caption:caption ||'',
      postedBy:userId,
      image:{
        public_id:myCloud.public_id,
        url:myCloud.secure_url
      }
      }
    
    const post=await Post.create(newPost)
    await post.save()
  
    res.status(200).json({
      post,
      message:"Posted Successfully"
    })}
    } catch (error) {
      console.log(error)
      res.status(500).json({message:error.message})
    }
  }

  export const  getAllPost=async(req,res)=>{
    try {
      const post=await Post.find().populate("caption postedBy image likes comments createdAt")

      const sortedPosts=post.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt)
      })

      res.status(200).send(
        sortedPosts
      )
    } catch (e) {
      console.log(e)
      res.status(400).json({
        message:e.message
      })
    }
  }

  export const deletePost=async(req,res)=>{
    try {
      //finding post by id
      const post = await Post.findById(req.params.id).populate("postedBy image")
      
      //if post not found
      if (!post) {
          return res.status(404).json({
              message: "Post not found",
              success: false
          })
      }
      //post owner is not same as user
      if (post.postedBy._id.toString() !== req.userId) {
          return res.status(401).json({
              message: "You are not authorized to delete this post",
              success: false
          })
      }
      
      if(!post.image.public_id){
        await post.remove()
        return res.status(200).json({
          success: true,
          message: "Post deleted successfully",
      })
      }else{
      await cloudinary.v2.uploader.destroy(post.image.public_id)
      //deleting post
      await post.remove()
      //deleting post from user
      res.status(200).json({
          success: true,
          message: "Post deleted successfully",
      })}
    }catch(e){
      res.status(500).json({
        message:e.message
      })
    }
  }
  
  export const feedback=async(req,res)=>{
    const {id:_id}=req.params
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send("Post not valid")
    }
    try{
        const post=await Post.findById(_id)
        if (post.likes.includes(req.userId)) {
          const index = post.likes.indexOf(req.userId)
          post.likes.splice(index, 1)

          await post.save()
          return res.status(200).json({
              success: true,
              message: "Unliked"
          })
      } else {
          post.likes.push(req.userId)
          await post.save()
          return res.status(200).json({
              success: true,
              message: "Liked"
          })
      }
  }catch(e){
    console.log(e)
  }
}
