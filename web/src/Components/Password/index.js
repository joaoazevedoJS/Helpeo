import React from 'react'
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs'

import './style.css'
import '../global.css'

function Password({ title, type, place, onChange, onclick }) {
  return (
    <div className="field">
      <label htmlFor="password">{title}</label>
      <div className="view-password">
        <input
          type={type}
          name="password"
          placeholder={place}
          min="6"
          max="20"
          onChange={onChange}
        />

        {
          type === 'password' ?
            <BsFillEyeFill className="viewPassword" onClick={onclick} />
            : <BsFillEyeSlashFill className="viewPassword" onClick={onclick} />
        }
      </div>
    </div>
  )
}

export default Password
