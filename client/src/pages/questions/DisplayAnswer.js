import React from 'react'
import {useLocation, useNavigate} from "react-router-dom";
import moment from "moment/moment";
import copy from "copy-to-clipboard";
import {useDispatch, useSelector} from "react-redux";

import Button from '../../component/button/Button'
import {Link} from '../../component/button/Link'
import Avatar from '../../component/avatar/Avatar'
import "../questions/Questions.css"
import {deleteAnswer} from "../../actions/AnswerQuestion";
import { showMessage} from "../../actions/Error";


const DisplayAnswer = ({question}) => {
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const location=useLocation()
    const {currentUser:user}=useSelector((state)=>state.user)
    const url="https://cstack-overflow.herokuapp.com"
  function userAnswered(userAnswered) {
    if(!userAnswered)
      return "A"
    else
      return userAnswered
  }


  function handleShare() {
      copy(url+location.pathname)
      dispatch(showMessage("Copied"))
  }
  async function handleDelete(_id) {
        await dispatch(deleteAnswer(question._id,{answerId:_id,noOfAnswers:question.noOfAnswers},navigate))
    }

    return (
    <div>
      {
         question.answer.map((ans)=>(
            <div key={ans._id} className="display-ans">
                  <p>{ans.answerBody}</p>
                  <div className="question-action-user">
                     <div>
                        <Button onClick={handleShare} type={"button"} className="button">Share</Button>
                       {user && user.result._id===ans.userId?
                           <button onClick={()=>handleDelete(ans._id)} type={"button"} className="button">Delete</button>
                           : null
                       }

                     </div>
                     <div>
                        <p>answered {moment(ans.answeredOn).fromNow()}</p>
                        <Link to={`/user/${question.userId}`} className="user-link" style={{color:'#0086d8'}}>
                              <Avatar backgroundColor={"green"} px={"8px"} py={"5px"}>
                                 {userAnswered(ans.userAnswered)}
                              </Avatar>
                              <div>
                                 {userAnswered(ans.userAnswered)}
                              </div>
                        </Link>
                     </div>
                  </div>
            </div>
         ))
      }
    </div>
  )
}

export default DisplayAnswer