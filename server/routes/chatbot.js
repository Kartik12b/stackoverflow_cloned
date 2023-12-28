import express from 'express'
import { chatBot } from '../controllers/Chatbot'

const router=express.Router()

router.post('/message',chatBot)