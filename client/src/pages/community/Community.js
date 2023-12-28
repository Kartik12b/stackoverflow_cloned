import React from 'react'
import LeftSidebar from "../../component/bars/leftsidebar/LeftSidebar";
import CommunityHome from './CommunityHome';

const Community=()=>{

    return(
        <div className={'home-container-1'}>
            <LeftSidebar/>
            <div className={'home-container-2'}>
               <CommunityHome/>
            </div>
        </div>
    )
}
export default Community