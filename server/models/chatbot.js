import mongoose from "mongoose";

const chatbotSchema=new mongoose.Schema({
    message:{
        type:String,
        default:'This is a message'
    },
    createdAt:{
        type:Date,
        default: Date.now()
    },
    user:{
        type:String
    },
})
export default mongoose.model('Chatbot',chatbotSchema)