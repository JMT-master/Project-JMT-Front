import React from 'react'
import '../css/schedule.css'

const RadioGroup = ({label, children}) => {
  return (
    <fieldset className="selectItem-radio">
      <legend>{label}</legend>
      {children}      
    </fieldset>
  )
}

export default RadioGroup