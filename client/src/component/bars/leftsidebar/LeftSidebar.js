import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import "./LeftSidebar.css"
function LeftSidebar() {
  const {currentUser:user}=useSelector(state=>state.user)
  return (
    <div className='left-sidebar'>
      <nav className="side-nav">
        <NavLink to={"/"} className={({isActive}) => isActive ? "side-nav-links active" : "side-nav-links"}
                 style={{paddlingLeft:'40px'}}
        >
          <p>Home</p>
        </NavLink>
        <div className="side-nav-div">
          <div><p>PUBLIC</p></div>
          <NavLink to={"/questions"} className={({isActive}) => isActive ? "side-nav-links active" : "side-nav-links"} >
            <i className="fa-solid fa-globe"></i>
            <p style={{paddingLeft:"10px"}}>Question</p>
          </NavLink>
          <NavLink to={"/tags"} className={({isActive}) => isActive ? "side-nav-links active" : "side-nav-links"}>
               <p style={{paddingLeft:"10px"}}>Tag</p>
          </NavLink>
          <NavLink to={"/user"} className={({isActive}) => isActive ? "side-nav-links active" : "side-nav-links"}>
                <p style={{paddingLeft:"10px"}}>User</p>
          </NavLink>
          <NavLink to={"/community"} className={({isActive}) => isActive ? "side-nav-links active" : "side-nav-links"}>
                <p style={{paddingLeft:"10px"}}>Community</p>
          </NavLink>
          
        </div>
      </nav>
    </div>
  )
}

export default LeftSidebar