import{configureStore} from '@reduxjs/toolkit'
import {currentUserReducer} from '../reducers/currentUser'
import {authReducer} from '../reducers/auth'
import { AskQuestion } from '../reducers/Question'
import {AnswerReducer} from "../reducers/Answer";
import { PostReducer } from '../reducers/PostReducer';



export const store=configureStore({
   reducer:{
      user:currentUserReducer,
      auth:authReducer,
      question:AskQuestion,
      answer:AnswerReducer,
      post:PostReducer
   }
})
