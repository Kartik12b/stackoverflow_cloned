import express from "express";
import {askQuestion,getAllQuestion,deleteQuestion,voteQuestion} from '../controllers/question.js'
import authMiddleware from "../middleware/authMiddleware.js";
const router=express.Router()

router.route(`/ask`).post(authMiddleware,askQuestion)
router.route(`/get`).get(getAllQuestion)
router.route(`/delete/:id`).delete(authMiddleware,deleteQuestion)
router.route(`/vote/:id`).patch(authMiddleware,voteQuestion)


export default router