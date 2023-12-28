import React from 'react'
// import moment from 'moment'
const Chat = ({item}) => {
  console.log(item)
  // const time=item?.createdAt
  return (
   <div>
     {item?.type==='chatbot'?
       <p title={'Bot'} className={`msg-data data-bot`}>          
               <span>
                    <i className="fa-solid fa-robot"></i>
               </span>           
            {item?.message}
      </p>
      :
     <p title={'user'} className={`msg-data data-user`}>                    
      {item?.message}
    </p>
    }
      {/* <span>{moment(time).format("s")}</span> */}
   </div>
  )
}

export default Chat