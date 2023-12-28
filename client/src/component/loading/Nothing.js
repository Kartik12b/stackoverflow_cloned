import React from 'react'
import {Link} from '../button/Link'
import './Loading.css'

const Nothing = ({children,childrenlink}) => {
  return (
    <div className='nothing'>
      <p>Nothing to Show here</p>
      <p>add a <Link to={`/${childrenlink}`}>{children}</Link></p>
   </div>
  )
}

export default Nothing