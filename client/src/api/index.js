import axios from "axios";

const api=axios.create({baseURL:"https://stack-overflow.onrender.com"})
api.interceptors.request.use(req=>{
    if(localStorage.getItem('Profile')){
        req.headers.authorization=`Bearer ${JSON.parse(localStorage.getItem('Profile')).token}`
        return req
    }
})
export const logIn=(authData)=>axios.post('https://stack-overflow.onrender.com/api/user/login',authData)
export const signUp=(authData)=>axios.post('https://stack-overflow.onrender.com/api/user/signup',authData)
export const getAllUsers=()=>axios.get('https://stack-overflow.onrender.com/api/user/all')
export const updateProfile=(id,updateData)=>api.patch(`/api/user/update/${id}`,updateData)

export const postQuestion=(questionData)=>api.post('/api/question/ask',questionData)
export const getAllQuestion=()=>axios.get('https://stack-overflow.onrender.com/api/question/get')
export const deleteQuestion=(id)=>api.delete(`/api/question/delete/${id}`)
export const voteQuestion=(id,value,userId)=>api.patch(`/api/question/vote/${id}`,{value,userId})

export const postAnswer=(id,{noOfAnswers,answerBody,userAnswered,userId})=>api.patch(`/api/answer/post/${id}`,{noOfAnswers,answerBody,userAnswered,userId})
export const deleteAnswer=(id,answerData)=>api.patch(`/api/answer/delete/${id}`,answerData)

export const postNew=(postData)=>api.post(`/api/post/upload`,postData)
export const getAllPost=()=>api.get(`/api/post/get`)
export const deletePostApi=(postId)=>api.delete(`/api/post/delete/${postId}`)
export const postFeedback=(id,value)=>api.patch(`/api/post/feedback/${id}`,value)