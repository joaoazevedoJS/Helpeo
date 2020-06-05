import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs'

import BackTo from '../../Components/BackTo'
import Password from '../../Components/Password'
import Input from '../../Components/Input'

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
      return setError('Senha precisa de uma letra maiuscula, minuscula, digitos, caracteres especiais e ter no minimo 6 digitos')

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
              <p className="infoError error-fixed">
                {error} <span className="closeError" onClick={() => setError('')}>&times;</span>
              </p> : ''
          }

          <Input
            title="Nome"
            type="text"
            htmlfor="name"
            onchange={e => setName(e.target.value)}
          />

          <Input
            title="E-mail"
            type="email"
            htmlfor="email"
            onchange={e => setEmail(e.target.value)}
          />

          <div className="field">
            <label htmlFor="password">Senha</label>
            <div className="view-password">
              <Password
                type={viewPassword}
                place="Exemplo: #Test1"
                onChange={e => setPassword(e.target.value)}
              />

              {
                viewPassword === 'password' ?
                  <BsFillEyeFill className="viewPassword" onClick={handleViewPassword} />
                  : <BsFillEyeSlashFill className="viewPassword" onClick={handleViewPassword} />
              }
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

              {
                viewPassword === 'password' ?
                  <BsFillEyeFill className="viewPassword" onClick={handleViewPassword} />
                  : <BsFillEyeSlashFill className="viewPassword" onClick={handleViewPassword} />
              }
            </div>
          </div>
        </fieldset>

        <button type="submit" className="btn">Cadastrar</button>
      </form>
    </div>
  )
}

export default SignUp
