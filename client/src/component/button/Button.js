import React from 'react'

function Button({children,type,title,onClick,className}) {
  const style={
    cursor: 'pointer',
    transition:'0.3s'
  }
  return (
    <>
      <button title={title} style={style} type={type || "button" } onClick={onClick} className={className}>
               {children || "It a button"}
      </button> 
    </>
  )
}

export default Button