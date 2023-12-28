import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Auth from '../pages/Auth/Auth'
import Home from '../pages/home/Home'
import Questions from '../pages/questions/Questions'
import AskQuestion from '../pages/askQuestion/AskQuestion'
import DisplayQuestion from '../pages/questions/DisplayQuestion'
import Tags from "../pages/tags/Tag";
import Users from "../pages/user/Users";
import UserProfile from "../pages/user/profile/UserProfile";
import Community from '../pages/community/Community'



function AppRoutes() { 
  return (
      <Routes>
         <Route exact path='/' element={<Home/>}/>
         <Route path='/auth' element={<Auth/>}/>
         <Route path='/questions' element={<Questions/>}/>
         <Route path='/tags' element={<Tags/>}/>
         <Route path='/user' element={<Users/>}/>
         <Route path='/community' element={<Community/>}/>
         <Route path='/user/:id' element={<UserProfile/>}/>
         <Route path='/ask-question' element={<AskQuestion/>}/>
         <Route path='/questions/:id' element={<DisplayQuestion/>}/>
      </Routes>
  )
}

export default AppRoutes