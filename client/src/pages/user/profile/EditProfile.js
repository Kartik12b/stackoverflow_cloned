import React, {useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import Button from "../../../component/button/Button";
import {updateUserDetails} from "../../../actions/currentUser";
import {useParams} from "react-router-dom";
import '../User.css'
import './UserProfile.css'
const EditUserProfile=({setSwitch,Switch})=>{
    const dispatch=useDispatch()
    const {currentUser:User}=useSelector((state)=>state.user)
    const {id}=useParams()
    const[name,setName]=useState(User?.result?.name)
    const[about,setAbout]=useState(User?.result?.about)
    const[tags,setTags]=useState([])
    
    function handleSubmit(e) {
         e.preventDefault()
        dispatch(updateUserDetails(setSwitch,Switch,id,{name,about,tags}))
    }

    return(
        <div className='edit-profile-container'>
            <p className={'edit-profile-title'}>Edit Your Profile</p>
            <p className={'edit-profile-title'}>Public Information</p>
            <form className={'edit-profile-form'} onSubmit={handleSubmit}>
                <label htmlFor={'name'}>
                    <h3>UserName: {User?.result?.name} </h3>
                    <input value={name}  onChange={(e)=>setName(e.target.value)} type={'text'} name={'name'} id={'name'}/>
                </label>
                <label htmlFor={'about'}>
                    <h3>About: {User?.result?.about}</h3>
                    <textarea value={about} onChange={(e)=>setAbout(e.target.value)} rows={20} cols={30} name={'about'} id={'email'}/>
                </label>
                <label htmlFor={'tags'}>
                    <h3>Watched Tags</h3>
                    <p>Add Tags Seperated By 1 space</p>
                    <input onChange={(e)=>setTags(e.target.value.split(' '))} type={'text'} name={'tags'} id={'tags'}/>
                </label>
                <br/>
                <Button type={'submit'} children={'Save Profile'} className={'user-submit-btn'}/>
                <Button type={'button'} onClick={()=>setSwitch(!Switch)} className={'user-cancel-btn'} children={'Cancel'}/>
            </form>
        </div>
    )
}
export default EditUserProfile