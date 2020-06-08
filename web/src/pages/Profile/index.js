import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { AiOutlineLogout } from 'react-icons/ai'
import { FiEdit2, FiTrash2 } from 'react-icons/fi'

import logo from '../../assets/logo.svg'

import './style.css'

import api from '../../services/api'
import { logout } from '../../services/token'

import AlertError from '../../Components/AlertError'

function Profile() {
  const history = useHistory()

  const [points, setPoints] = useState([])
  const [user, setUser] = useState([])
  const [error, setError] = useState('')
  const [Alert, setAlert] = useState(false)
  const [deletePointId, setDeletePointId] = useState(0)

  useEffect(() => {
    api.get('/user')
      .then(res => setUser(res.data))

    api.get('/user/points')
      .then(res => setPoints(res.data))
  }, [])

  useEffect(() => {
    localStorage.removeItem('pointID')
  }, [])

  function handleLogout() {
    logout()

    history.push('/')
  }

  async function handleDeletePoint(id) {
    try {
      await api.delete(`/user/point/${id}`)

      setPoints(points.filter(point => point.id !== id))
    } catch (e) {
      setError('Aconteceu um erro. Tente novamente!')
    }
  }

  return (
    <div id="page-profile">
      <AlertError error={error} onclick={() => setError('')} />

      {
        Alert ?
          <div className="deleteAlert">
            <h3>Você tem certeza que quer deletar esse ponto?</h3>

            <div className="deleteButton">
              <button className="btn btn-ghost" onClick={() => {
                setAlert(false)
                setDeletePointId(0)
              }}>Cancelar</button>

              <button
                className="btn btn-full"
                onClick={() => {
                  setAlert(false)
                  handleDeletePoint(deletePointId)
                  setDeletePointId(0)
                }}
              > Deletar </button>
            </div>
          </div> : ''
      }

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
                  <div className="point-edit">
                    <FiEdit2 onClick={() => {
                      localStorage.setItem('pointID', point.id)
                      history.push('/user/update-point')
                    }} />

                    <FiTrash2 onClick={() => {
                      setAlert(true)
                      setDeletePointId(point.id)
                    }} />
                  </div>

                  <div className="point-img">
                    <img src={point.image_url} alt={point.name} />
                  </div>

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
