import React from 'react'
import { Link } from '../../button/Link'
import moment from "moment";

const Question = ({q}) => {

    return (
    <div key={q._id} className='display-question-container'>
        <div className={'display-counts'}>
            <div  className="display-votes-ans">
                <p style={{textAlign:"center"}} key={(q.upVote)}> {q.upVote.length} </p> <p> votes</p>
            </div>
            <div className="display-votes-ans">
                <p style={{textAlign:"center"}} key={q.noOfAnswers}> {q.noOfAnswers} </p> <p> answers</p>
            </div>
        </div>
        <div key={q.questionTitle} className="display-question-details">
            <Link to={`/questions/${q._id}`} className="question-title-link"> {q.questionTitle} </Link>
            <div className="display-tags-time">
                <div className="display-tags">
                   {q.questionTags && q.questionTags.map((t,i)=>
                  <p className='tags' key={i}>{t}</p>
                )}
                </div>
                <p key={q.userPosted} className="display-time">
                     asked on {moment(q.postedOn).fromNow()} by {q.userPosted}
                </p>
            </div>
        </div>
    </div>
  )
}

export default Question