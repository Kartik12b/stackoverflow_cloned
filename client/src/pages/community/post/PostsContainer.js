import React from 'react'
import { useSelector,useDispatch} from 'react-redux'
import { getAllPost } from '../../../actions/PostAction'
import Post from './Post'
import './Post.css'

const Posts = () => {
   // const postList=[{
   //    "_id":"1",
   //    "caption":"It is a caption",
   //    "post_url":'https://images.unsplash.com/photo-1649617464882-e0f7e815efef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
   //    "postedBy":"Kalyan",
   //    "createdAt":"20 Dec",
   //    "likes":[{
   //       1:"1",
   //       2:"2"
   //    }],
   //    "comments":[{
   //       0:{
   //          "commentBy":"Kingklf",
   //          "commentBody":"This is a comment"
   //       }
   //    }]
   // },{
   //    "_id":"2",
   //    "post_url":"https://images.unsplash.com/photo-1671098360283-db2adb8a79e1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
   //    "postedBy":"Kingkhy",
   //    "createdAt":"21 Dec",
   //    "likes":[
   //       "1",
   //       "2"
   //    ],
   //    "comments":[{
   //          "commentBy":"Kalyan",
   //          "commentBody":"This is a comment"    
   //    },{
   //       "commentBy":"Kalyan",
   //       "commentBody":"This is a comment"  
   //    }]
   // },{
   //    "_id":"3",
   //    "caption":"It is a caption",
   //    "post_url":"https://images.unsplash.com/photo-1649617471291-afec8d44fa2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
   //    "postBody":"It is a postbody 3",
   //    "postedBy":"Lisa",
   //    "createdAt":"21 Dec",
   //    "likes":[{
   //       1:"1",
   //       2:"2"
   //    }],
   //    "comments":[
   //       {
   //          "commentBy":"Lisa",
   //          "commentBody":"This is a comment"
   //       },
   //       {
   //          "commentBy":"Kalyan",
   //          "commentBody":"This is a comment"
   //       },
   //    ]
   // }]
   const {post:postList}=useSelector((state)=>state.post)
   const dispatch=useDispatch()
   
   React.useEffect(()=>{
      dispatch(getAllPost())
   },[dispatch])
   
  return (
    <div className='ps-container'>
      {postList?.length !== 0 &&
         postList?.map((post)=>
            <Post post={post} key={post._id}/>
         )
      }
   </div>
  )
}

export default Posts