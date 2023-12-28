import React from 'react'
import BlackLogo from "../../../assets/607669_black_2048x2048.png"
const Widget = () => {
  return (
    <div className='widget'>
      <h4>The Overflow Blog</h4>
      <div className="right-sidebar-div-1">
         <div className="right-sidebar-div-2">
            <i className="fa-solid fa-pen"></i>
            <p>Fighting to balance identity and anonymity on the web(3) (Ep. 504)</p>
         </div>
         <div className="right-sidebar-div-2">
            <i className="fa-solid fa-pen"></i>
            <p>
               Hashgraph: The sustainable alternative to blockchain
            </p>
         </div>
      </div>
      <h4>Featured on Meta</h4>
      <div className="right-sidebar-div-1">
         <div className="right-sidebar-div-2">
            <i className='fa-solid fa-message'/>
            <p>The 2022 Community-a-thon has begun!</p>
         </div>
         <div className="right-sidebar-div-2">
           <img src={BlackLogo} width="24px" height={"24px"} alt="logo"/>
            <p>
               Mobile app infrastructure being decommissioned
            </p>
         </div>
         <div className="right-sidebar-div-2">
         <img src={BlackLogo} width="24px" height={"24px"} alt="logo"/>
            <p>
               The Ask Wizard (2022) has graduated
            </p>
         </div>
      </div>
      <h4>Hot Meta Posts</h4>
      <div className="right-sidebar-div-1">
         <div className="right-sidebar-div-2">
            <i className='fa-solid fa-message'/>
            <p>Fighting to balance identity and anonymity on the web(3) (Ep. 504)</p>
         </div>
         <div className="right-sidebar-div-2">
            <i className='fa-solid fa-message'/>
            <p>
               Hashgraph: The sustainable alternative to blockchain
            </p>
         </div>
      </div>
    </div>
  )
}

export default Widget