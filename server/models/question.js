import mongoose from "mongoose"

const questionSchema = new mongoose.Schema({
   questionTitle:{
      type:String,
      required:true
   },
   questionBody:{
      type:String,
      required:true
   },
   questionTags:{
      type:[{type:String}],
      required:true
   },
   noOfAnswers:{ 
      type: Number,
      default:0
   },
   upVote:{
      type:[{type:String}],
      default:[]
   },
   downVote:{
      type:[{type:String}],
      default:[]
   },
   userPosted:{
      type:String,
      required:true
   },
   userId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
   },
   postedOn:{
      type:Date,
      default:Date.now
   },
   answer:[{
      answerBody: String,
      userAnswered:String,
      userId:{
         type: mongoose.Schema.Types.ObjectId,
         ref: 'User',
      },
      answeredOn:{type:Date, default:Date.now}
   }]
})

export default mongoose.model("Question",questionSchema)