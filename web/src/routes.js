import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import PrivateRoute from './auth/PrivateRoute'

import Home from './pages/Home'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Profile from './pages/Profile'
import CreatePoint from './pages/CreatePoint'
import UpdatePoint from './pages/UpdatePoint'

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signin" exact component={SignIn} />
        <Route path="/signup" exact component={SignUp} />
        <PrivateRoute path="/user/profile" exact component={Profile} />
        <PrivateRoute path="/user/create-point" exact component={CreatePoint}/>
        <PrivateRoute path="/user/update-point" exact component={UpdatePoint}/>
        <Route path="*" component={() => <h1 id="notFound">Page not Found</h1>} />
      </Switch>
    </BrowserRouter>
  )
}



export default Router
