import { createAction, createReducer } from "@reduxjs/toolkit"
const initialState={
   currentUser:null,
   allUser:null,
   updatedUser:null
}
const fetchCurrentUser=createAction('FETCH_CURRENT_USER')
const deleteCurrentUser=createAction('DELETE_CURRENT_USER')
const allUsers=createAction('ALL_USER')
const updateUser=createAction('UPDATE_USER')

export const currentUserReducer=createReducer(initialState,builder=>{
   builder
   .addCase(fetchCurrentUser, (state,action)=>{
      state.currentUser=action.payload
   })
   .addCase(deleteCurrentUser,(state)=>{
      localStorage.removeItem('Profile')
      state.currentUser=null
   })
       .addCase(allUsers,(state,action)=>{
         state.allUser=action.payload
      })
       .addCase(updateUser,(state,action)=>{
          state.allUser.map((allUser)=> allUser._id === action.payload._id ? action.payload : state.allUser)
      })
})