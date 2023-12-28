import React, {useState} from 'react'
import {useParams, useLocation, useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux"
import moment from "moment";

import './Questions.css'
import { Link } from '../../component/button/Link'
import Button from "../../component/button/Button"
import Avatar from '../../component/avatar/Avatar'
import DisplayAnswer from './DisplayAnswer'
import {postAnswer} from "../../actions/AnswerQuestion";
import {getAllQuestion, deleteQuestion as Delete, voteQuestion} from "../../actions/AskQuestion";
import copy from "copy-to-clipboard";
import {showError, showMessage} from "../../actions/Error";


const QuestionDetails = () =>{
    const {id}=useParams()
    const location=useLocation()
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const {questionList}=useSelector((state)=>state.question)
    const {currentUser:User}=useSelector((state)=>state.user)
    const[answer,setAnswer]=useState('')
    const url ='http://localhost:3000'

    async function handleSubmit(e,answerLength) {
        e.preventDefault()
        if(!User){
            await dispatch(showError(`Please Sign In or Sign Up...Redirecting `))
            setTimeout(()=>
                    navigate('/auth')
            ,2000)

        }
        if(answer === ''){
            dispatch(showError("Enter An Answer"))
        }
        else {
            await dispatch(postAnswer(id, {
                noOfAnswers: answerLength,
                answerBody: answer,
                userAnswered: User.result.name,
                userId: User.result._id
            }))
            await (dispatch(getAllQuestion()))
            setAnswer('')
        }
    }

    function handleShare() {
        copy(url+location.pathname)
        dispatch(showMessage("Link Copied🤘"))
    }


    function deleteQuestion() {
        dispatch(Delete(id,navigate))
        dispatch(getAllQuestion())
    }

    function handleDownVote(_id) {
        dispatch(voteQuestion(_id,'Unliked',User?.result._id))
      
    }

    function handleUpvote(_id) {
        dispatch(voteQuestion(_id,'Liked',User?.result._id))       
    }
    

    return (
   <div className='question-details-page'>
      {questionList === null ? 
      <h1>Loading..</h1>
      :
      <>
         {
            questionList.filter(question => question._id === id).map(question =>
                  <div key={question._id}>
                        <section className='question-details-container'>
                           <h1>{question.questionTitle}</h1>
                           <div className="question-details-container-2">
                              <div className="question-votes">
                              <i  onClick={()=>handleUpvote(question._id)} className="fa-solid fa-caret-up votes-icon"></i>
                                 <p>{question.upVote.length - question.downVote.length}</p>
                              <i onClick={()=>handleDownVote(question._id)} className="fa-solid fa-caret-down votes-icon"></i>
                              </div>
                              <div style={{width:"100%"}}>
                                  <p className={"question-body"}>{question.questionBody}</p>
                                    <div className={ "question-details-tags"}>
                                        {
                                            question.questionTags.map((tag,index)=>{
                                                return <p key={index}>{tag}</p>
                                            })
                                        }
                                    </div>
                                    <div className="question-action-user">
                                       <div>
                                          <Button onClick={handleShare} className="button"> Share </Button>
                                           {User?.result?._id ===question.userId?
                                               <Button onClick={deleteQuestion} className="button"> Delete </Button>
                                               : null
                                           }

                                       </div>
                                    <div>
                                       <p> asked {moment(question.askedOn).fromNow()}</p>
                                       <Link to={`/user/${question.userId}`} className="user-link" style={{color:'#0086d8'}}>
                                          <Avatar backgroundColor={"orange"} px={"8px"} py={"5px"}>
                                                {question.userPosted}
                                          </Avatar>
                                          <div>
                                             {question.userPosted}
                                          </div>
                                       </Link>
                                    </div>
                                    </div>
                              </div>
                           </div>
                        </section>
                        {
                           question.noOfAnswers !== 0 && (
                              <section>
                                 <h3>{question.noOfAnswers} answers</h3>
                                 <DisplayAnswer key={question._id} question={question}/>
                              </section>
                           )
                        }
                        <section className="post-ans-container">
                           <h3>Your Answer</h3>
                           <form onSubmit={(e)=>handleSubmit(e,question.answer.length)}>
                              <textarea value={answer} onChange={(e)=>setAnswer(e.target.value)} name="" id="" cols="30" rows="10" />
                              <Button type="Submit"  className="post-ans-btn"  children={"Post Your Answer"}/>
                           </form>
                           <p>
                              Browse Other Question tagged
                              {
                                 question.questionTags.map((tag,index)=>(
                                    <Link to={"/tags"} key={index} style={{padding:'2px 2px',}} className="ans-tags">{tag}</Link>
                                    
                                    ))
                              } or
                              <Link to={"/ask-question"} style={{textDecoration:"none",color:"#009dff"}}> Ask Question</Link>
                           </p>
                        </section>
                  </div>
               )
         }
      </>   
   }
   </div>
  )
}

export default QuestionDetails