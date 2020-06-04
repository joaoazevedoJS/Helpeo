import React from 'react'
import { Link } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'

import logo from '../../assets/logo.svg'

import './style.css'

function BackTo({ back, to }) {
  return (
    <header id="backto">
      <img src={logo} alt="Helpeo" className="logo-img"/>

      <Link to={to}>
        <FiArrowLeft />

      Voltar para {back}
      </Link>
    </header>
  )
}

export default BackTo
