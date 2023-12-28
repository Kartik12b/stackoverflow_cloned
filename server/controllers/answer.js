import mongoose from "mongoose";
import Question from '../models/question.js'
export const postAnswer=async (req,res)=>{
    const{id:_id}=req.params

    const {noOfAnswers,answerBody,userAnswered,userId}=req.body
    if (!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send("Question Id is not valid ")
    }

    try{
        const updatedQuestion = await  Question.findByIdAndUpdate(_id,{
            $addToSet:{
                'answer':[{
                    answerBody,
                    userAnswered,
                    userId
                }]
            }
        })
        await updateNoOfAnswer(_id, noOfAnswers)
        res.status(200).json({
            success:true,
            result: updatedQuestion,
            message:"Successfully Posted An answer"
        })
        console.log(updatedQuestion)
    }catch (e) {
        res.status(400).json(e)
    }
}

const updateNoOfAnswer=async(_id,noOfAnswers)=>{
    try{
        await Question.findByIdAndUpdate(_id,{
            $set:{
                'noOfAnswers': noOfAnswers + 1
            }
        })
    }catch (e) {
        console.log(e)
    }
}
export const deleteAnswer=async(req,res)=>{
    const {id:_id}=req.params
    const {answerId,noOfAnswers}=req.body
    console.log({answerId,noOfAnswers})
    if (!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send("Question Id is not valid ")
    }
    if (!mongoose.Types.ObjectId.isValid(answerId)){
        return res.status(404).send("Answer Id is not valid ")
    }

    try{
        const updatedQuestion=await Question.updateOne({_id},{
            $pull:{'answer':{_id:answerId}}
        })
        await updateNoOfAnswerDlt(_id, noOfAnswers)
         return res.status(200).json({
            success:true,
            result:updatedQuestion,
            message:`Successfully Deleted Answer`
        })
    }catch (e) {
        console.log(e)
        res.status(400).json(e)
    }
}
const updateNoOfAnswerDlt=async(_id,noOfAnswers)=>{
    try{
        await Question.findByIdAndUpdate(_id,{
            $set:{
                'noOfAnswers': noOfAnswers - 1
            }
        })
    }catch (e) {
        console.log(e)
    }
}