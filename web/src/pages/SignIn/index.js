import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'

import BackTo from '../../Components/BackTo'
import Password from '../../Components/Password'
import Input from '../../Components/Input'
import AlertError from '../../Components/AlertError'

import api from '../../services/api'
import { login, getToken } from '../../services/token'

import '../sign.css'

function SignIn() {
  const history = useHistory()

  useEffect(() => {
    if (getToken()) {
      history.push('/')
    }
  }, [history])


  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [viewPassword, setViewPassword] = useState('password')

  function handleViewPassword() {
    viewPassword === 'password' ?
      setViewPassword('text') :
      setViewPassword('password')
  }

  async function handleSubmit(e) {
    e.preventDefault()

    if (!email || !password) return setError("Preencha os campos")

    const data = {
      email,
      password
    }

    try {
      const res = await api.post('/signin', data)

      login(res.data.token)
      history.push('/user/profile')
    } catch (e) {
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

          <AlertError error={error} onclick={() => setError('')} />

          <Input
            title="E-mail"
            type="email"
            htmlfor="email"
            value={email}
            onchange={e => setEmail(e.target.value)}
          />

          <Password
            type={viewPassword}
            place="Exemplo: #Test1"
            onChange={e => setPassword(e.target.value)}
            onclick={handleViewPassword}
          />
        </fieldset>

        <button type="submit" className="btn">Logar</button>

        <Link to="/signup">
          Criar uma nova conta
        </Link>
      </form>
    </div>
  )
}

export default SignIn
