import Question from '../models/question.js'
import mongoose from "mongoose";

export const askQuestion = async (req,res)=>{
   const postQuestionData=req.body
   const postQuestion= new Question({...postQuestionData})
  try {
   await postQuestion.save()
   res.status(200).json("Posted a question successfully")
  } catch (error) {
   res.status(409).json('Couldn\'t post new question' )
  }
}
export const getAllQuestion=async (req,res)=>{
    try{
        const questionList=await Question.find()
        res.status(200).json(questionList)
    }
    catch (e) {
        res.status(404).json({
            message:e.message
        })
    }
}
export const deleteQuestion=async (req,res)=>{
    const {id:_id}=req.params
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(400).json({
            success:false,
            message:"Question Doesn't Exist"
        })
    }
    try{
        await Question.findByIdAndRemove(_id)
        res.status(200).json({
            success:true,
            message:"Successfully Deleted"
        })
    }
    catch (e) {
        res.status(404).json({
            success:false,
            message:e.message
        })
    }
}

export const voteQuestion=async (req,res)=>{
    const {id:_id}=req.params
    const {value,userId}=req.body

    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send("QuestionId not valid")
    }
    try{
        const question=await Question.findById(_id)
        const upIndex =question.upVote.findIndex((id)=> id === String(userId) )
        const downIndex =question.downVote.findIndex((id)=> id === String(userId) )

        if(value=== 'Liked'){
            if(downIndex !== -1){
                question.downVote= question.downVote.filter((id)=> id !== String(userId))
            }
            if(upIndex === -1){
                question.upVote.push(userId)
            }else {
                question.upVote = question.downVote.filter((id)=> id !== String(userId))
            }
        }else if(value ==='Unliked') {
            if(upIndex !== -1){
                question.upVote= question.upVote.filter((id)=> id !== String(userId))
            }
            if(upIndex === -1){
                question.downVote.push(userId)
            }else {
                question.downVote = question.upVote.filter((id)=> id !== String(userId))
            }
        }
        await Question.findByIdAndUpdate(_id,question)
        res.status(200).json({
            success:true,
            message:"Successfully Updated"
        })
    }catch (e) {
        res.status(400).json({
            success:false,
            message:e
        })
    }
}