import React from 'react'
import { Link } from 'react-router-dom'
import { FiLogIn } from 'react-icons/fi'

import logo from '../../assets/logo.svg'

import './style.css'

function Home() {
  return (
    <div id="page-home">
      <div className="content">
        <header>
          <img src={logo} alt="Helpeo" className="logo-img"/>
        </header>

        <main>
          <h1>Ajude as pessoas <br/> na crise do coronavírus.</h1>
          <p>Ajudamos pessoas a encontrarem pontos de doação de forma eficiente.</p>

          <Link to="/signin">
            <span>
              <FiLogIn />
            </span>

            <strong>Cadastrar um ponto de doação</strong>
          </Link>
        </main>
      </div>
    </div>
  )
}

export default Home
