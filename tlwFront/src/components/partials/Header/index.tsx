// Created Styled-Components
import * as C from './styled'
// Hooks React
import { Link, useLocation } from 'react-router-dom'

// Hooks custom (Context API)
import { useInfoReducer } from '../../../contexts/context'

// Helpers 
import { isLogged, doLogout } from '../../../helpers/AuthHandler'
import { useEffect, useState } from 'react'
import { Api } from '../../../helpers/api'


export const Header = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  // Verify Logged User
  const { logged } = isLogged()

  //Context UserInfo
  const { state, dispatch } = useInfoReducer()

  // Logout
  const handleLogout = () => {
    doLogout()
    window.location.href = '/'
  }

  // Set Icon (User Image)
  useEffect(() => {
    if (logged) {
      const getUser = async () => {
        const json = await Api.getUserInfo()
        if (json.image) {
          dispatch({ type: "SET_IMAGE", payload: json.image })
        }
      }
      getUser()
    }
  }, [logged])

  return (
    <C.HeaderArea>
      <div className={isHomePage ? 'filter' : ''}>
        {isHomePage && (
          <>
            <span className='mask bg-gradient-primary opacity-4'></span>
            <div className='centered-text'>
              <h2>Tillow E-marketplace</h2>
              <p>
              Mergulhe em uma jornada de conforto e bem-estar como nunca antes. <br />Sua busca por excelência começa aqui.
              </p>
            </div>
          </>
        )}
        <div className={isHomePage ? 'containerFixed' : 'container'}>
          <nav className={isHomePage ? 'navBarFixed' : 'navBar'}>
            <div>
              <ul className={isHomePage ? '' : 'ulOther'}>
                <div className='logo'>
                  <Link to="/">
                    <img src="/images/logo.png" alt="TLW Logo" />
                  </Link>
                </div>
                {logged &&
                  <>
                    <li>
                      <Link to="/user/ads">
                        <svg width="24px" height="24px" viewBox="0 0 24 24">
                          <path
                            fill="#4a4a4a"
                            d="M3 2.25h7a.75.75 0 0 1 .75.75v7a.75.75 0 0 1-.75.75H3a.75.75 0 0 1-.75-.75V3A.75.75 0 0 1 3 2.25zm.75 7h5.5v-5.5h-5.5v5.5zm10.25-7h7a.75.75 0 0 1 .75.75v7a.75.75 0 0 1-.75.75h-7a.75.75 0 0 1-.75-.75V3a.75.75 0 0 1 .75-.75zm.75 7h5.5v-5.5h-5.5v5.5zm-.75 4h7a.75.75 0 0 1 .75.75v7a.75.75 0 0 1-.75.75h-7a.75.75 0 0 1-.75-.75v-7a.75.75 0 0 1 .75-.75zm.75 7h5.5v-5.5h-5.5v5.5zM3 13.25h7a.75.75 0 0 1 .75.75v7a.75.75 0 0 1-.75.75H3a.75.75 0 0 1-.75-.75v-7a.75.75 0 0 1 .75-.75zm.75 7h5.5v-5.5h-5.5v5.5z">
                          </path>
                        </svg>
                        Meus Anúncios
                      </Link>
                    </li>
                    <li>
                      <Link to="/user/profile">
                        <img src={state.userImage} alt="" />
                        Minha Conta
                      </Link>
                    </li>
                    <li className='l2'>
                      <button onClick={handleLogout}>Sair</button>
                    </li>
                    <li className='l2'>
                      <Link to="post-on-ad" className='button'>Anunciar</Link>
                    </li>
                  </>
                }
                {!logged &&
                  <>
                    <li>
                      <Link to="/signin">
                        <svg width="24px" height="24px" viewBox="0 0 24 24">
                          <path
                            fill="#4a4a4a"
                            d="M3 2.25h7a.75.75 0 0 1 .75.75v7a.75.75 0 0 1-.75.75H3a.75.75 0 0 1-.75-.75V3A.75.75 0 0 1 3 2.25zm.75 7h5.5v-5.5h-5.5v5.5zm10.25-7h7a.75.75 0 0 1 .75.75v7a.75.75 0 0 1-.75.75h-7a.75.75 0 0 1-.75-.75V3a.75.75 0 0 1 .75-.75zm.75 7h5.5v-5.5h-5.5v5.5zm-.75 4h7a.75.75 0 0 1 .75.75v7a.75.75 0 0 1-.75.75h-7a.75.75 0 0 1-.75-.75v-7a.75.75 0 0 1 .75-.75zm.75 7h5.5v-5.5h-5.5v5.5zM3 13.25h7a.75.75 0 0 1 .75.75v7a.75.75 0 0 1-.75.75H3a.75.75 0 0 1-.75-.75v-7a.75.75 0 0 1 .75-.75zm.75 7h5.5v-5.5h-5.5v5.5z">
                          </path>
                        </svg>
                        Meus Anúncios
                      </Link>
                    </li>
                    <li>
                      <Link to="/signin">
                        <svg width="24px" height="24px" viewBox="0 0 24 24">
                          <path
                            fill="#4a4a4a" d="M20.75 21v-2A4.75 4.75 0 0 0 16 14.25H8A4.75 4.75 0 0 0 3.25 19v2a.75.75 0 1 0 1.5 0v-2A3.25 3.25 0 0 1 8 15.75h8A3.25 3.25 0 0 1 19.25 19v2a.75.75 0 1 0 1.5 0zM12 11.75a4.75 4.75 0 1 1 0-9.5 4.75 4.75 0 0 1 0 9.5zm0-1.5a3.25 3.25 0 1 0 0-6.5 3.25 3.25 0 0 0 0 6.5z">
                          </path>
                        </svg>
                        Login
                      </Link>
                    </li>
                    <li className='l2'>
                      <Link to="/signup">Cadastrar</Link>
                    </li>
                  </>
                }
              </ul>
            </div>
          </nav>

        </div>
      </div>
    </C.HeaderArea>
  )
}