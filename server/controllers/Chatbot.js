import Chatbot from '../models/chatbot'
import { getResponse } from '../../client/src/component/chat-box/intention';

export const chatBot=async(req,res)=>{
   try {
      const {message,user}=req.body

      const chatbotResponse = getResponse(message);

      const newMessage=await Chatbot.create({
         user:user,
         message:message,
         sender:sender
      })


   } catch (e) {
      res.status(500).json("Something Went Wrong...!!")
      console.log(e)
   }
}