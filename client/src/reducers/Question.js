import { createAction, createReducer } from "@reduxjs/toolkit"
const initialState={
    data:null,
    questionList:null
}
const askQuestion=createAction('POST_QUESTION')
const allQuestion=createAction('ALL_QUESTIONS')
const deleteQuestion=createAction('DELETE_QUESTION')
const removeData=createAction('REMOVE_DATA')
export const AskQuestion=createReducer(initialState,builder=>{
   builder
       .addCase(askQuestion, (state,action)=>{
            state.data=action.payload
        })
       .addCase(removeData,(state)=>{
            state.data=null
       })
       .addCase(allQuestion,(state,action)=>{
           state.questionList=action.payload
       })
       .addCase(deleteQuestion,(state,action)=>{
           state.deleted=action.payload
       })
})