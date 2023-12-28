import React from 'react'
import "./RightSidebar.css"
const WidgetTags = () => {
  const tags=['c','css','java','javascript','c++','firebase','mongodb','python']
  return (
    <div className='widget-tags'>
      <h3>Watched tags</h3>
      <div className="widget-tags-div">
        {
          tags.map((tag) => {
            return (
               <p className='tags' key={tag}>
                   {tag}
               </p>)
          })
        }
      </div>
    </div>
  )
}

export default WidgetTags