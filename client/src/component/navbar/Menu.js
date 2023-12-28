import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {removeCurrentUser} from "../../actions/currentUser";
import decode from "jwt-decode";
import {Link} from "../button/Link";
import Avatar from "../avatar/Avatar";
import Button from "../button/Button";

const style={
    menu:{
        border:"none",
        padding:"0"
    }
}
export const Menu=()=> {
    const dispatch=useDispatch()
    const {currentUser:User}= useSelector((state)=>state.user)
    const [visible,setVisible]=useState(false)

    const logOut=()=>{
        setVisible(!visible)
        console.log(visible)
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

    return(
        <>
            {visible?null:
            <div  onClick={()=>setVisible(!visible)} className={"menu"}>
            <Link  to={`/user/${User?.result?._id}`} style={{textDecoration:'none'}}>
                <Avatar
                    backgroundColor={'#009dff'}
                    px={'12px'}
                    py={'6px'}
                    borderRadius={'50%'}
                    children={User?.result.name}
                    color="white"
                />
            </Link>
            </div>}
            {visible? <Button onClick={logOut} style={style.menu}  className={"nav-item nav-logout"} >Log Out</Button>:null}
        </>
    )
}