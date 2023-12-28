import React, { useState } from 'react'
import Button from '../button/Button'
import {useSelector } from 'react-redux'

const AskQuestion = ({handleSubmit,questionBody,setQuestionBody,setQuestionTitle,setQuestionTags}) => {
   const {currentUser:user}=useSelector((state)=>state.user)
   function handleEnter(e){
      if(e.key==="Enter"){
         setQuestionBody(questionBody+"\n")
      }
   }
  return (
    <div className='ask-chatbot'>
         <div className='ask-chatbot-form'>
         <form onSubmit={handleSubmit}>
               <div className="ask-form-container">
                  <label htmlFor="ask-ques-title">
                     <h4>Title</h4>
                     <p>Be specific, imagine you're asking another person.</p>
                     <input onChange={(e)=>setQuestionTitle(e.target.value)} type={"text"} placeholder='e.g., is there a R function for finding the index of a vector?' name="questionTitle" id="ask-ques-title" />
                  </label>
                  <label htmlFor="ask-ques-body">
                     <h4>Body</h4>
                     <p>Include Al the information of your question.</p>
                     <textarea onChange={(e)=>setQuestionBody(e.target.value)} cols={20} rows="10" name="questionTitle" onKeyDown={handleEnter} id="ask-ques-body" />
                  </label>
                  <label htmlFor="ask-ques-tags">
                     <h4>Tags</h4>
                     <p>Add upto 5 tags to what you are asking about</p>
                     <input onChange={(e)=>setQuestionTags(e.target.value.split(' '))} type={"text"} name="questionTitle" id="ask-ques-tags" />
                  </label>
               </div>
               <Button type="submit" className='review-btn' children="Review your question" />
            </form>
           
         </div>
      </div>
  )
}

export default AskQuestion