import * as api from './../api/index'
import {showError, showMessage} from "./Error";

export const newPost=(postData,setLoading)=>async(dispatch)=>{
  console.log(postData)
  setLoading(true)
    try {
        await api.postNew(postData)
        await setLoading(false)      
        dispatch(showMessage("Post Uploaded "))
        dispatch(getAllPost())
      } catch (e) {
        await  dispatch(showError("Try Again!! 🙂"))
        console.log(e)
        setLoading(false)
        dispatch({type:"CLEAR_ERROR"})
      }
}

export const getAllPost=()=>async(dispatch)=>{
  try {
    const {data}=await api.getAllPost()
    await dispatch({type:"ALL_POST" , payload:data})
  } catch (e) {
    await dispatch(showError(e.message))
    console.log(e)
  }
}

export const deletePost=({postId})=>async(dispatch)=>{
 
  try{
    const {data}=await api.deletePostApi(postId)
    await showMessage(data.message || "Post Deleted Successfully")
    dispatch(getAllPost())
  }catch(e){
    showError("Something Went Wrong!!")
  }
}

export  const feedback=(id,value)=>async(dispatch)=>{
  try {
    const {data}=await api.postFeedback(id,value)
    dispatch(showMessage(data.message))
    dispatch(getAllPost())
  } catch (e) {
    console.log(e)
    dispatch(showMessage(e.message))
  }
}
