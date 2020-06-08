import React from 'react'

import './style.css'

function AlertError({ error, onclick }) {
  return (
    <div>
      {
        error ?
          <div className="infoError error-fixed">
            {error}
            <p className="closeError" onClick={onclick}>&times;</p>
          </div> : ''
      }
    </div>
  )
}

export default AlertError
