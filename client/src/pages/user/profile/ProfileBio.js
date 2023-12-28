import React from 'react'

const ProfileBio = ({user}) => {
  return(
      <div className='profile-bio'>
            <div className='profile-bio-about'>
            <h3>About</h3>
              {
                  user?.about ?(
                     <p>{user.about}</p>
                  ):(
                      <p>No Bio Found</p>
                  )
              }
          </div>
          {user?.tags.length !== 0 ?(
                  <div>
                    <h4>Tags Watched</h4>
                    <div className="profile-bio-tags">
                      {
                          user?.tags.map((tag)=>(
                              <p key={tag}>{tag}</p>
                          ))
                      }
                    </div>
                  </div>
              ):<div>0 tags watched</div>
          }        
      </div>
  )
}
export default ProfileBio