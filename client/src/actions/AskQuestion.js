import * as api from '../api'
import {showError, showMessage} from "./Error";

export const askQuestion=(questionData,navigate)=>async (dispatch)=>{
    console.log(questionData)
   try{
       const {data}=await api.postQuestion(questionData)
       await dispatch({type:"POST_QUESTION",payload: data})
       dispatch(showMessage("Question Posted 😁😁"))
       dispatch({type:"REMOVE_DATA"})
       navigate('/')
   }catch (e) {
       await  dispatch(showError(e.message))
       console.log(e)
       await setTimeout(()=>
        dispatch(showMessage("Please fill all"))
       ,4000)
   }
}
export const getAllQuestion=()=>async (dispatch)=>{
    try {
        await dispatch({type:"LOAD",payload:true})
        const {data}=await api.getAllQuestion()
        await dispatch({type:"ALL_QUESTIONS",payload:data})
        await dispatch({type:"LOAD",payload:false})
    }catch (e) {
        console.log(e)
        await dispatch({type:"LOAD",payload:false})
        await  dispatch(showError("Network Error"))
    }
}
export const deleteQuestion=(id,navigate)=>async (dispatch)=>{
    try {
         const {data}=await api.deleteQuestion(id)
        await dispatch({type:"DELETE_QUESTION",payload:data})
        console.log(data)
        dispatch(showMessage(data.message+"😮‍💨"))
        navigate('/')
    }catch (e) {
        console.log(e)
        alert(e)
    }
}
export const voteQuestion = (id,value,userId)=>async (dispatch) => {
  try{
      const {data}=await api.voteQuestion(id,value,userId)
      await dispatch(getAllQuestion())
      console.log(data)
      dispatch(showMessage(value))
  }catch (e) {
      console.log(e)
      dispatch(showError("Opps..You encounter an error"))
  }
}