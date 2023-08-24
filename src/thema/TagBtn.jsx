import React from 'react'

const TagBtn = (props) => {
  return (
    <button className={props.className}
    onClick={props.tagAdd} value={props.data} 
    style={props.style} name={props.name}
    >#{props.data}</button>
  )
}

export default TagBtn