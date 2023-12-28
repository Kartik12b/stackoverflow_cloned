import React, { useState } from 'react'
import  './EditPost.css'
import Button from '../../../../component/button/Button'
import ClickAwayListener from '../../../../component/button/ClickAwayListener'
const EditPost = ({handleDelete}) => {
   const[show,setShow]=useState(false)

   function handleClose(){
      setShow(!show)
   }
  return (
   <div className="post-function">
   {!show?
   <Button
       title="Edit/Delete"
       onClick={()=>setShow(!show)}
       className={'ellipsis'}
       children={<i className="fa-solid fa-ellipsis-vertical"/>}
   />
   :
   <ClickAwayListener onClickAway={handleClose}>
   <div className="model-edit">
      <div className="edit-menu">
         <Button className="edit-btn"><i className="fa-solid fa-pen-to-square"></i>Edit Post</Button>
         <Button onClick={handleDelete} className="edit-btn"><i className="fa-solid fa-trash"></i>Delete Post</Button>
      </div>
   </div>
   </ClickAwayListener>
   }
   </div>
  )
}

export default EditPost