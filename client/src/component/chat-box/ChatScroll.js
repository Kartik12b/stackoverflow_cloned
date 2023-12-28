import React, { useRef, useState} from 'react'
import Button from "../button/Button";
import {getResponse } from './intention';
import { useDispatch, useSelector } from 'react-redux'
import { askQuestion } from '../../actions/AskQuestion'
import { getAllQuestion } from '../../actions/AskQuestion'
import { useNavigate } from 'react-router-dom';
import './ChatBox.css'
import Chat from './Chat'
import AskQuestion from './askQuestion';
import Auth from './Auth';

const ChatScroll=(props)=>{
    const bottomRef=useRef(null)
    const dispatch=useDispatch()
    const[message,setMessage]=useState([])
    const [botMessage,setbotMessage]=useState({})
    const [uMessage,setUMessage]=useState({})
    const [questionTitle,setQuestionTitle]=useState('')
    const [questionBody, setQuestionBody] = useState('')
    const [questionTags, setQuestionTags] = useState('')
    const navigate=useNavigate()
    const {currentUser:User}=useSelector((state)=>state.user)
    const[show,setShow]=useState(false)
    const[login,setLogin]=useState(false)
    const[userMessage,setUserMessage]=useState('')
    
    


    React.useEffect( () => {
        bottomRef.current?.scrollIntoView({behavior: "smooth",block: "end"}) 
    },[message])

    React.useEffect(()=>{
        setTimeout(() => {
            setMessage([...message,{
                type: 'chatbot',
                message: 'Hi,There how can I help you?',
                createdAt:Date.now()
            }])
          }, 1000);
    },[])
    
    //post question
    function handleSubmit(e){
        e.preventDefault()
        dispatch(askQuestion({questionTitle,questionBody,questionTags,userPosted:User?.result?.name,userId:User?.result?._id},navigate))
        dispatch(getAllQuestion())
     }

    
    
    async function handleChat(e) {
        e.preventDefault()
        
        const updated=Object.assign({},uMessage,({
            type:'user',
            message:userMessage,
            createdAt:Date.now(),
        }))

        setUMessage(updated)

       // Determine the chatbot's response to the user's message
        const chatbotResponse = getResponse(userMessage);

        
        // Update the conversation with the chatbot's response
        setTimeout(() => {
            const updated=Object.assign({},botMessage,{
              type: 'chatbot',
              message: chatbotResponse,
              createdAt:Date.now()
            });
            setbotMessage(updated)
            setMessage([...message,uMessage,botMessage])
          }, 1000);
        
        console.log(message)
    }

   
    return(
        <div className={'chat-scroll'} style={{scrollbarWidth:'none'}}>
           {(show===true && User)?
            <div className={'msg'}>
                <AskQuestion 
                    handleSubmit={handleSubmit}
                    setQuestionBody={setQuestionBody}
                    setQuestionTags={setQuestionTags}
                    setQuestionTitle={setQuestionTitle}
                    questionBody={questionBody}
                />
                <div ref={bottomRef}/>
                </div>
            :
            null
            }
            {(show===true && !User)?
            <div className={'msg'}>
                <Auth/>
            </div>
            :
            null
            }
            {(show===false && User)?
            <div className={'msg'}>
            {message?.map((item,index) => (
             <Chat key={index} item={item}/>
            ))}
            <div ref={bottomRef}/>
            </div>
            :
            null
            }
            {(login===true && !User)?
            <div className={'msg'}>
               <Auth/>
            <div ref={bottomRef}/>
            </div>
            :
            null
            }
            {(login===false && !User)?
            <div className={'msg'}>
               {message?.map((item,index) => (
                <Chat key={index} item={item}/>
            ))}
            <div ref={bottomRef}/>
            </div>
            :
            null
            }

            <div className={'suggestion'}>              
                <Button onClick={()=>{!User?setLogin(!login):setShow(!show)}} className={'suggest-btn'} children={!User?'Login to Ask':'Ask Question!'}/>
            </div>
            <form onSubmit={(show===false)?handleChat:handleSubmit}>
                <input disabled={(login===true || show===true)?true:false} onChange={(e)=>setUserMessage(e.target.value)} type={'text'}/>
                <Button  className={'btn'} type={'submit'}>
                    <i title={'Send'} className="fa-solid fa-paper-plane"></i>
                </Button>
            </form>
        </div>
    )
}
export default ChatScroll

