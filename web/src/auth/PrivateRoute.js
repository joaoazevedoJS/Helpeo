import React, { useEffect, useState } from 'react'
import { Route, Redirect } from 'react-router-dom'

import api from '../services/api'
import { logout } from '../services/token'

function PrivateRoute({ component: Component, ...rest }) {
  const [auth, setAuth ] = useState(true)

  useEffect(() => {
    api.get('/user/authenticated')
      .then(res => setAuth(true))
      .catch(err => {
        setAuth(false)

        logout()
      })
  }, [])

  return (
    <Route {...rest} render={props => (
      auth ? (
        <Component {...props} />
      ) : (
          <Redirect to={{ pathname: '/', state: { from: props.location } }} />
        )
    )} />
  )
}

export default PrivateRoute


