import React from 'react'

function Password({ type, place, onChange }) {
  return (
    <input
      type={type}
      name="password"
      placeholder={place}
      min="6"
      max="20"
      onChange={onChange}
    />
  )
}

export default Password
