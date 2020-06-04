import React, { useState, useEffect } from 'react'
import { AiOutlineLogout } from 'react-icons/ai'

import logo from '../../assets/logo.svg'

import './style.css'

import api from '../../services/api'

function Profile() {
  const [user, setUser] = useState([])

  useEffect(() => {
    api.get('/user')
      .then(res => setUser(res.data))
  }, [user])


  return (
    <div id="page-profile">
      <div className="content">
        <header>
          <img src={logo} alt="Helpeo" className="logo-img" />

          <h1>Bem vindo {user.name}</h1>

          <div className="buttons">
            <button className="btn btn-ghost">Novo Ponto</button>

            <button className="btn btn-full">
              <AiOutlineLogout />
            </button>
          </div>
        </header>
      </div>
    </div>
  )
}

export default Profile
