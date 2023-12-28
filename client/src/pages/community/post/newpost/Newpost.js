import React, { useState } from 'react'
import "../Post.css";
import { MdPermMedia } from 'react-icons/md';
import { BiLabel } from 'react-icons/bi';
import { CiLocationOn } from 'react-icons/ci';
import { MdEmojiEmotions } from 'react-icons/md';
import { MdCancel } from 'react-icons/md';
import {useDispatch, useSelector} from "react-redux"
import { newPost } from '../../../../actions/PostAction';
import { showError } from '../../../../actions/Error';

const NewPost = () => {
  const {currentUser:User}=useSelector((state)=>state.user)
  const [image,setImage]=useState(null)
  const dispatch=useDispatch()
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [caption,setCaption]=useState('')
  const [loading, setLoading] = useState('')
  
  let user=User?.result

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const Reader = new FileReader();
    Reader.readAsDataURL(file);
    Reader.onload = () => {
        if (Reader.readyState=== 2){
            setImage(Reader.result);
        }
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault()
    if(!image && !caption){
      dispatch(showError("You didn't select anything to post"))
    }else{
    const postData={
      caption:caption,
      userId:user?._id,
      image:image
    }   
    await dispatch(newPost(postData,setLoading))
    setImage(null)
    setCaption("")
  }
  }
  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            className="shareProfileImg"
            src={
              user?.avatar
                ?user?.avatar?.url
                : PF + "person/noAvatar.png"
            }
            alt=""
          />
          <input
            placeholder={"What's in your mind " + user?.name + "?"}
            className="shareInput"
            value={caption}
            onChange={(e)=>setCaption(e.target.value)}
          />
        </div>
        <hr className="shareHr" />
        {image && (
          <div className="shareImgContainer">
            <img className="shareImg" src={image} alt="" />
            <MdCancel className="shareCancelImg" onClick={() => setImage(null)} />
          </div>
        )}
        <form className="shareBottom" onSubmit={submitHandler}>
          <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
              <MdPermMedia color="tomato" className="shareIcon" />
              <span className="shareOptionText">Photo or Video</span>
              <input
                hidden
                type="file"
                id="file"
                accept=".png,.jpeg,.jpg"
                onChange={handleImageChange}
              />
            </label>
            <div className="shareOption">
              <BiLabel color="blue" className="shareIcon" />
              <span className="shareOptionText">Tag</span>
            </div>
            <div className="shareOption">
              <CiLocationOn color="green" className="shareIcon" />
              <span className="shareOptionText">Location</span>
            </div>
            <div className="shareOption">
              <MdEmojiEmotions color="goldenrod" className="shareIcon" />
              <span className="shareOptionText">Feelings</span>
            </div>
          </div>
          <button disabled={loading} className="shareButton" type="submit">
            {!loading?"Share":"Sharing"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default NewPost