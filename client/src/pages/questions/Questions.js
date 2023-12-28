import React from 'react'
import LeftSidebar from '../../component/bars/leftsidebar/LeftSidebar'
import RightSidebar from '../../component/bars/rightsidebar/RightSidebar'
import HomeMainbar from '../../component/bars/homemainbar/HomeMainbar'
import  '../../App.css'

function Questions() {

  return (
    <div className="home-container-1">
        <LeftSidebar/>
        <div className="home-container-2">
          <HomeMainbar />
          <RightSidebar />
        </div>
    </div>
  )
}

export default Questions