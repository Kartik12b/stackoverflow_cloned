import React from 'react'
import {useDispatch,useSelector} from 'react-redux'
import Avatar from '../../../component/avatar/Avatar'
// import Button from "../../../component/button/Button"
import {Link} from "../../../component/button/Link"
import './Post.css'
import moment from 'moment'
import EditPost from './edit/EditPost'
import { showError } from '../../../actions/Error'
import { deletePost, feedback } from '../../../actions/PostAction'

const Post = ({post}) => {
  const dispatch=useDispatch()
  const {currentUser:user}=useSelector((state)=>state.user)
  
  function handleDelete(){   
    if(!user){
      showError("Login please!")
    }
    dispatch(deletePost({postId:post?._id}))
  }
  function like(id) {
    dispatch(feedback(id,'liked'))
  }
  return (
    <div className='post-card'>
      <div className="post-header">
         <div className="post-details">
              <div className='post-by'>
                  <Avatar 
                    title={`${post?.postedBy?.name}`}
                    className={'av'}
                    backgroundColor={'#009dff'}
                    px={'0.3rem'}
                    py={'0.5rem'}
                    borderRadius={'10%'}
                    children={post?.postedBy?.name}
                  />
                  <div>
                  <Link to={`/user/${post?.postedBy?._id}`}>{post?.postedBy?.name}</Link>
                  <div>{moment(post?.createdAt).fromNow()}</div>
                  </div>
              </div>
              <div style={{flexGrow:1}}/>
              {(user?.result?._id===post?.postedBy?._id)?<EditPost handleDelete={handleDelete}/>:null}
         </div>
         {(post?.caption && (post?.image?.public_id)==="")?
         null
         :
          <div className="post-caption">
          {post?.caption}
          </div>}
      </div>
      {(post?.image?.public_id)===""?
    <div className="text-post">
       {post?.caption}
    </div>
      :
      <div className="post-body">
        <img alt={'https://unsplash.com/photos/ZSS9oOHf8S8'} src={post?.image?.url}/>
      </div>}
      <div className="post-interactions">
        <div onClick={()=>like(post._id)} className="like">
            <span>{(post?.likes?.some(like=>like._id === user?.result?._id))?<i className="fa-solid fa-thumbs-up"></i>:<i className="fa-regular fa-thumbs-up"></i>} like {post?.likes?.length}</span>
        </div>
        <div onKeyDown={()=>console.log('Key')} className="like">
            <span>{post?.comments?.length} comment</span>
        </div>
      </div>
   </div>
  )
}

export default Post