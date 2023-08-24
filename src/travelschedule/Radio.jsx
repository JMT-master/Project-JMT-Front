import React from 'react'

const Radio = ({children, value, name, defaultChecked}) => {
  return (
    <label>
      <input
      type='radio'
      value={value}
      name={name}
      defaultChecked={defaultChecked}
      ></input>
      {children}
    </label>
  )
}

export default Radio
