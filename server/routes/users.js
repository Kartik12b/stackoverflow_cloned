import express from "express";
import {signup,login} from "../controllers/auth.js";
import {getAllUsers, updateUser} from "../controllers/user.js";
import authMiddleware from "../middleware/authMiddleware.js";
const router=express.Router()

router.route('/signup').post(signup)
router.route('/login').post(login)
router.route('/all').get(getAllUsers)
router.route('/update/:id').patch(authMiddleware,updateUser)

export default router