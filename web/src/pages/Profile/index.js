import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { AiOutlineLogout } from 'react-icons/ai'

import logo from '../../assets/logo.svg'

import './style.css'

import api from '../../services/api'
import { logout } from '../../services/token'

function Profile() {
  const history = useHistory()

  const [points, setPoints] = useState([])
  const [user, setUser] = useState([])

  useEffect(() => {
    api.get('/user')
      .then(res => setUser(res.data))

    api.get('/user/points')
      .then(res => setPoints(res.data))
  }, [])

  function handleLogout() {
    logout()

    history.push('/')
  }

  return (
    <div id="page-profile">
      <div className="content">
        <header>
          <img src={logo} alt="Helpeo" className="logo-img" />

          <h1>Bem vindo {user.name}</h1>

          <div className="buttons">
            <Link to="/user/create-point">
              <button className="btn btn-ghost">Novo Ponto</button>
            </Link>

            <button className="btn btn-full" onClick={handleLogout}>
              <AiOutlineLogout />
            </button>
          </div>
        </header>

        <main>
          <p className="points-length"><strong>{points.length} pontos</strong> encontrados</p>

          <div className="points-container">
            {
              points.map(point => (
                <div key={point.id} className="points">
                  <img src={point.image_url} alt={point.name} />

                  <div className="point-content">
                    <h2>{point.title}</h2>
                    <p>Cidade: {point.city} / {point.uf}</p>
                    <p>Rua: {point.address}</p>
                    <p>Bairro: {point.neighborhood}</p>
                    <p>Número: {point.numbering}</p>
                    <p>Whatsapp: {point.whatsapp}</p>
                  </div>
                </div>
              ))
            }
          </div>
        </main>
      </div>
    </div>
  )
}

export default Profile
