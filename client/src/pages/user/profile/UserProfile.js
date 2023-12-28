import React, {useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import moment from "moment";

import LeftSidebar from "../../../component/bars/leftsidebar/LeftSidebar";
import Avatar from "../../../component/avatar/Avatar";
import {getAllUser} from "../../../actions/auth";
import Button from "../../../component/button/Button";
import EditUserProfile from "./EditProfile";
import ProfileBio from "./ProfileBio";
import './UserProfile.css'

const UserProfile=()=>{
    const {id}=useParams()
    const dispatch=useDispatch()
    const[Switch,setSwitch]=useState(false)
    const {currentUser:loggedUser,allUser}=useSelector((state)=>state.user)
    const user=allUser?.filter((user)=>user?._id === id)[0]

    async function effect() {
        await dispatch(getAllUser()) 
    }
    React.useEffect(()=>{
        effect().then(
            r=> console.log(r)
        )

    },[user])

    return(
        <div className={'home-container-1'}>
            <LeftSidebar/>
            <div className={'home-container-2'}>
                <div style={{marginTop:"50px"}}>
                    {user? (
                        <section>
                            <div className={'user-details-container'}>
                                <div className={'user-details'}>
                                <Avatar
    
                                    color={'white'}
                                    className="avatar-user"
                                    fontSize={'50px'}                                   
                                    src={user.avatar?.url}
                                    children={user.name?.charAt(0).toUpperCase()}
                                />
                                <div className={'user-name'}>
                                    <h3>{user.name}</h3>
                                    <h3>{user.email}</h3>
                                    <p><i className="fa-solid fa-cake-candles"/> Joined {moment(user.joinedOn).fromNow()}</p>
                                </div>
                                </div>
                                <div>
                                    {user._id=== loggedUser?.result._id?(
                                        <Button
                                            type={'button'}
                                            onClick={()=>setSwitch(!Switch)}
                                            className={'edit-profile-btn'}
                                        >
                                            <i className="fa-solid fa-pen-to-square"></i>
                                            Edit Profile
                                        </Button>
                                    ):null
                                    }
                                </div>
                            </div>
                            <>
                                {Switch ?(
                                        <EditUserProfile Switch={Switch} setSwitch={setSwitch}/>
                                    ):
                                    (
                                        <ProfileBio user={user}/>
                                    )
                                }
                            </>

                        </section>
                        ):
                        (<><h2 style={{textAlign:'center'}}>Loading</h2></>)
                    }


                </div>
            </div>
        </div>
    )
}
export default UserProfile