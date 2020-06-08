import React from 'react'

import './style.css'
import '../global.css'

function Input({
    title="Informe o title",
    type="text",
    htmlfor="text",
    value='',
    onchange= () => '',
  }) {
  return (
    <div className="field">
      <label htmlFor={htmlfor}>{title}</label>
      <input
        type={type}
        name={htmlfor}
        id={htmlfor}
        value={value}
        onChange={onchange}
      />
    </div>
  )
}

export default Input
