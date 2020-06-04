import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { BsFillEyeFill } from 'react-icons/bs'

import BackTo from '../../Components/BackTo'
import Password from '../../Components/Password'

import api from '../../services/api'
import { login, getToken } from '../../services/token'

import '../sign.css'

function SignIn() {
  const history = useHistory()

  useEffect(() => {
    if(getToken()) {
      history.push('/user/profile')
    }
  }, [history])


  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [error, setError] = useState('')
  const [viewPassword, setViewPassword] = useState('password')

  function handleViewPassword() {
    viewPassword === 'password' ?
      setViewPassword('text') :
      setViewPassword('password')
  }

  async function handleSubmit(e) {
    e.preventDefault()

    if(!email || !password) return setError("Preencha os campos")

    const data = {
      email,
      password
    }

    try {
      const res = await api.post('/signin', data)

      login(res.data.token)
      history.push('/user/profile')
    } catch(e) {
      setError('Aconteceu algum erro, verifique suas credenciais!')
    }
  }

  return (
    <div className="page-sign">
      <BackTo to='/' back="Home" />

      <form action="/signin" method="POST" onSubmit={handleSubmit}>
        <fieldset>
          <legend>
            <h1>Login</h1>
          </legend>

          {
            error !== '' ?
              <p className="infoError">
                {error} <span className="closeError" onClick={() => setError('')}>&times;</span>
              </p> : ''
          }

          <div className="field">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          <div className="field">
            <label htmlFor="password">Senha</label>
            <div className="view-password">
              <Password
                type={viewPassword}
                place="Exemplo: #Test1"
                onChange={e => setPassword(e.target.value)}
              />

              <BsFillEyeFill className="viewPassword" onClick={handleViewPassword} />
            </div>
          </div>
        </fieldset>

        <button type="submit">Logar</button>

        <Link to="/signup">
          Criar uma nova conta
        </Link>
      </form>
    </div>
  )
}

export default SignIn
