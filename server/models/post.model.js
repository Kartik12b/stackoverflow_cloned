import mongoose from "mongoose";

const postSchema=new mongoose.Schema({
    caption:{type:String,default:""},
    postedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    likes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    }],
    image:{
        public_id:{type:String,default:""},
        url:{type:String,default:""}
    },
    comments:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    }],
    createdAt:{type:Date,default:Date.now()}
})

export default mongoose.model("Post",postSchema)