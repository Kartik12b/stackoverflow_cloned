import express from "express"
import authMiddleware from "../middleware/authMiddleware.js"
import { deletePost, feedback, getAllPost, newPost } from "../controllers/Post.js"

const router=express.Router()

router.post("/upload",newPost)
      .get("/get",getAllPost)
      .delete("/delete/:id",authMiddleware,deletePost)
      .patch('/feedback/:id',authMiddleware,feedback)
export default router