import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { BsFillEyeFill } from 'react-icons/bs'

import BackTo from '../../Components/BackTo'
import Password from '../../Components/Password'

import '../sign.css'

import api from '../../services/api'

function SignUp() {
  const history = useHistory()

  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')

  const [viewPassword, setViewPassword] = useState('password')

  async function handleSubmit(e) {
    e.preventDefault()

    if (!email || !name || !password || !confirmPassword) return setError('Preencha todos os dados!')
    if (password !== confirmPassword) return setError('Senhas não se correspondem!')
    if (!email.match(/\S+@\w+\.\w{2,6}(\.\w{2})?/g)) return setError('Use um e-mail válido!')
    if (!password.match(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%!^&*]).{6,20}$/gm))
      return setError('Senha precisa de uma letra maiuscula, minuscula, digitos e caracteres especiais')

    const data = { name, email, password }

    try {
      await api.post('/signup', data)

      history.push('/signin')
    } catch (e) {
      setError("Aconteceu algum erro. Tente Novamente!")
    }
  }

  function handleViewPassword() {
    viewPassword === 'password' ?
      setViewPassword('text') :
      setViewPassword('password')
  }

  return (
    <div className="page-sign">
      <BackTo to='/signin' back="Login" />

      <form action="/signup" method="POST" onSubmit={handleSubmit}>
        <fieldset>
          <legend>
            <h1>Cadastro</h1>
          </legend>

          {
            error !== '' ?
              <p className="infoError">
                {error} <span className="closeError" onClick={() => setError('')}>&times;</span>
              </p> : ''
          }

          <div className="field">
            <label htmlFor="name">Nome</label>
            <input
              type="text"
              name="name"
              id="name"
              onChange={e => setName(e.target.value)}
            />
          </div>

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

          <div className="field">
            <label htmlFor="password">Confirmar senha</label>
            <div className="view-password">
              <Password
                type={viewPassword}
                place="Exemplo: #Test1"
                onChange={e => setConfirmPassword(e.target.value)}
              />

              <BsFillEyeFill className="viewPassword" onClick={handleViewPassword} />
            </div>
          </div>
        </fieldset>

        <button type="submit">Cadastrar</button>
      </form>
    </div>
  )
}

export default SignUp
