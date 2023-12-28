import React, {useState} from 'react'
import './mobile.css'
import {NavLink} from "react-router-dom";
import ClickAwayListener from '../button/ClickAwayListener';

const MobileMenu = () => {
    const [show,setShow]=useState(false)

    function handleClose(){
        setShow(false)
    }
    function blur(e){
        if(e && e.relatedTarget){
            e.relatedTarget.click(" ");
            setShow(!show)
        }
    }
  return(
    <ClickAwayListener onClickAway={handleClose}>
      <div  className={!show?'dropdown':'dropdown dropdown-active'}>
          <div onClick={()=>setShow(!show)}  className={!show?'stagger-icon':'stagger-icon stagger-icon-active'} >
              <i className="fa-solid fa-chevron-down"></i>
          </div>
          <div  onClick={handleClose} onBlur={blur} className={!show?"dropdown-content":"dropdown-content dropdown-content-active"}>
                  <NavLink to={"/"} className={({isActive}) => isActive ? "side-nav-links active" : "side-nav-links"} style={{paddlingLeft:'40px'}}>
                      <p>Home</p>
                  </NavLink>
                  <div className="side-nav-div">
                      <div><p>PUBLIC</p></div>
                      <NavLink to={"/questions"} className={({isActive}) => isActive ? "side-nav-links active" : "side-nav-links"}>
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
              </div>
      </div>
      </ClickAwayListener>
  )
}
export default MobileMenu