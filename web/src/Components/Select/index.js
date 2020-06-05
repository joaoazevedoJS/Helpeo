import React from 'react'

import './style.css'
import '../global.css'

function Input({
    title="Informe o title",
    htmlfor="text",
    value=0,
    onchange= () => '',
    option="Selecione alguma coisa",
    array=[]
  }) {

  return (
    <div className="field">
      <label htmlFor={htmlfor}>{title}</label>
      <select
        name={htmlfor}
        id={htmlfor}
        value={value}
        onChange={onchange}
      >
        <option value="0">{option}</option>
        {array.map(item => (
          <option value={item} key={item}>{item}</option>
        ))}
      </select>
    </div>
  )
}

export default Input
