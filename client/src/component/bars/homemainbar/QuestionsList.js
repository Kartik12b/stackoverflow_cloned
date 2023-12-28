import React from 'react'
import Question from './Question'
import Nothing from '../../loading/Nothing'

const QuestionList = ({question}) => {
  return ( 
    <div className='q-list'>
      {question.length===0?
      <Nothing children={'Question'} childrenlink='ask-question'/>
      :
      <div>
      {question.map((q)=>{
        return <Question key={q._id} q={q}/>
         })}
      </div>
      }
    </div>
  )
}

export default QuestionList