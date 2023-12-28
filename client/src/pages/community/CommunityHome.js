import React ,{Suspense}from 'react'
import './Community.css'
import NewPost from './post/newpost/Newpost'
import {useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import Loading from '../../component/loading/Loading';
import {ErrorBoundary} from "react-error-boundary";
const PostsContainer=React.lazy(()=> import ('../community/post/PostsContainer'))

const CommunityHome = () => {
  const {currentUser:User}=useSelector((state)=>state.user)
  const navigate=useNavigate()
  const loader = async () => {
    const user = await User;
    if (!user) {
      navigate("/auth");
    }else{
      navigate('/community')
    }
  };

  React.useEffect(() => {
    loader()
   
  }, [User])
  return (
   <div className='community-home-container'>    
      <h3>StackOverflow Community Post</h3>
      <div className="community-new-post">
        <NewPost/>
      </div>
      <div className='community-posts'>
      <ErrorBoundary fallback={
      <>
      Error !!
      </>
       }>
        <Suspense fallback={<Loading />}><PostsContainer/> </Suspense>
      </ErrorBoundary>
         
      </div>
      
   </div>
  )
}

export default CommunityHome