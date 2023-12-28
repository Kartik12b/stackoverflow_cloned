import * as api from '../api'
import {getAllQuestion} from "./AskQuestion";
import {showError, showMessage} from "./Error";
export const postAnswer=(id,answerData)=> async (dispatch)=>{
    const {noOfAnswers,answerBody,userAnswered,userId}=answerData
    try{
         const {data}=await api.postAnswer(id,{noOfAnswers,answerBody,userAnswered,userId})
        await dispatch({type:"POST_ANSWER",payload:data.result})
        dispatch(showMessage("Answer Posted 😁😁"))
        console.log(data)
    }catch (e) {
        await  dispatch(showError("Try Again!! 🙂"))
        await console.log(e)
        dispatch({type:"CLEAR_ERROR"})
    }
}
export const deleteAnswer=(id,answerData,navigate)=> async (dispatch)=>{
    console.log(id,answerData)
    try{
        const {data}= await api.deleteAnswer(id,answerData)
        await dispatch({type:"DELETE_ANSWER"})
        await console.log(data)
        await dispatch(getAllQuestion())
        dispatch(showMessage("Answer Deleted 😮‍💨"))
        navigate(`/questions/${id}`)
    }catch (e) {
        await dispatch(showError("Something went wrong"))
        console.log(e)
        alert(e)
    }
}