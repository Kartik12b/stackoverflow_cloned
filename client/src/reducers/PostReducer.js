import {createReducer,createAction} from '@reduxjs/toolkit'
const initialState={
    all:null,
    post:[]
}
const POST=createAction('POST_UPLOAD')
const ALL_POST=createAction('ALL_POST')


export const PostReducer=createReducer(initialState,builder => {
    builder
        .addCase(ALL_POST,(state,action)=>{
            state.post=action.payload
        })
        .addCase(POST,(state,action)=>{
            state.load=action.payload
        })
        
})