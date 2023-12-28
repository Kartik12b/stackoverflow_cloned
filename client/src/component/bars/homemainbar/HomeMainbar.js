import React from 'react'
import {useLocation} from 'react-router-dom'
import { Link } from '../../button/Link'
import QuestionList from './QuestionsList'
import "./HomeMainbar.css"
import {useDispatch, useSelector} from "react-redux";
import {getAllQuestion} from "../../../actions/AskQuestion";
import Loading from '../../loading/Loading'
function HomeMainbar() {
    const dispatch=useDispatch()
    const location=useLocation()
   const {currentUser:user}=useSelector((state)=>state.user)
   const {questionList}=useSelector((state)=>state.question)

    React.useEffect(() => {
        return () => {
            dispatch(getAllQuestion())
        };
    }, [dispatch])

  return (
    <div className='main-bar'>
      <div className="main-bar-header">
        {location.pathname === '/' ? <h1>Top Question</h1> : <h1>All Question</h1>}
        <Link to={!user ?"/auth":"/ask-question"} className='ask-btn'> Ask Question</Link>
      </div>
      <div >
        {(questionList === null) ? <Loading/> :
        <>
          {questionList.length === 0?null:<p>{questionList.length} questions</p>}
          <QuestionList question={questionList}/>
        </>  
        }
      </div>
    </div>
  )
}

export default HomeMainbar