import express from 'express'
import {postAnswer,deleteAnswer} from "../controllers/answer.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router=express.Router()
//patch is used to record a particular data in database
router.route('/post/:id').patch(authMiddleware,postAnswer)
router.route(`/delete/:id`).patch(authMiddleware,deleteAnswer)

export default router