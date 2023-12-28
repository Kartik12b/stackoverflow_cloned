import React, {useEffect, useState} from 'react'
import { Link } from '../button/Link'
import Avatar from '../avatar/Avatar'
import Button from '../button/Button'
import { useDispatch, useSelector} from 'react-redux'
import { removeCurrentUser } from '../../actions/currentUser'
import "./Navbar.css"
import decode from "jwt-decode";
import logo  from '../../assets/logo.png'
import {Menu} from "./Menu";


function Navbar() {
   const dispatch=useDispatch()
   const [iconShow,setIconShow]=useState(false)
   const {currentUser:User}= useSelector((state)=>state.user)
   const logOut=()=>{
      dispatch(removeCurrentUser())
   }
   useEffect(()=>{
      const token=User?.token
      if(token){
         const decodedToken =decode(token)
         if(decodedToken.exp * 1000 < new Date().getTime()){
            logOut()
         }
      }
   },[logOut])

   function setShow() {
     setIconShow(!iconShow)
      console.log(iconShow)
   }

   return (
    <nav className='nav'>
      <div className="navbar">
         <Link to="/" className='nav-item nav-logo'>
            <img src={logo} alt={'Logo'}/>
         </Link>
         <Button className={'search-icon-btn'} onClick={setShow}>
            <i className="fa-solid fa-magnifying-glass"></i>
         </Button>
         <Link to="/" className="nav-item nav-btn"> About </Link>
         <Link to="/" className="nav-item nav-btn"> Products </Link>
         <Link to="/" className="nav-item nav-btn"> For Teams </Link>
         <form>
            <input type="text" name="search" id="search" placeholder='Search....' />
            <i className="fa-solid fa-magnifying-glass"></i>
         </form>
         {User === null ? 
            <Link to="/auth" className='nav-item nav-links'>
               Log In
            </Link> :
             (<div className={'logout'}>
               <Link className={'avatar-id'} to={`/user/${User?.result?._id}`} style={{textDecoration:'none'}}>
                  <Avatar
                     // backgroundColor={'#009dff'}
                     src={User?.result?.avatar?.url}
                     borderRadius={'50%'}
                     children={User?.result.name}
                     color="white"
                     className={"avatar-navbar"}
                  />
               </Link>
               <Button id={'logout-btn-id'} onClick={logOut} className={"nav-item nav-links"} >
                  Log Out
               </Button>
               <Menu className={'menu-nav'}/>
                 </div>
            )
      }
         </div>
       {iconShow? (
           <div className={'mobile-searchbar'}>
              <form>
                 <input type="text" name="search" id="search" placeholder='Search....' />
                 <i className="fa-solid fa-magnifying-glass"></i>
                 <Button className={"search-btn"} children={"Search"}/>
              </form>
           </div>
       ):null}
   </nav>
  )
}

export default Navbar