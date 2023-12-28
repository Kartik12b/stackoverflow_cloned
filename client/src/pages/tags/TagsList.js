import React from 'react'

const TagsList = ({tag}) => {
  return(
      <div className={'tag'}>
          <h4 className={'h1'}>{tag.tagName}</h4>
          <p className={'p'}>{tag.tagDesc}</p>
      </div>
  )
}
export default TagsList