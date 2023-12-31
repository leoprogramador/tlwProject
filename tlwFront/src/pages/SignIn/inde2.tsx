// Created Styled-Components
import * as C from './styled'

// Hooks React
import { useState } from 'react'
import { Link } from 'react-router-dom'

// Api Requests
import { Api } from '../../helpers/api'

//Helpers (login verify)
import { doLogin } from '../../helpers/AuthHandler'

// Components folders
import { PageContainer, PageTitle} from '../../components/TemplateComponents'


export const SignIn = () => {
    
    // SignIn Fields 
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [rememberPassword, setRememberPassword] = useState(false)

    // Request Controllers
    const [disabled, setDisabled] = useState(false)
    const [error, setError] = useState("")
    const [opacity, setOpacity] = useState(1)

    //Visibility Password 
    const [visiblePassword, setVisiblePassword] = useState(false)

    // Send request
    const handleSubmit = async () => {
        setDisabled(true)
        setOpacity(0.5)
        setError("")
        
        let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ 
        let match = regex.test(email)

        if(!match && password){
            setError("E-mail inválido")
            setOpacity(1)
            setDisabled(false)
            return
        }

        if(email && password) {
            const json = await Api.login(email, password)
            if(json.error){
                if(json.error.email){
                    setError(json.error.email.msg)
                    setOpacity(1)
                    setDisabled(false)
                    return
                }
                if(json.error.password){
                    setError(json.error.password.msg)
                    setOpacity(1)
                    setDisabled(false)
                    return
                }
                setError(json.error)
                setOpacity(1)
                setDisabled(false)
            }else{
                doLogin(json.token, rememberPassword, email)
                window.location.href = '/'
            }
        }
        setDisabled(false)
        setOpacity(1)
    }

    return(
        <PageContainer>
            <C.PageArea opacity={opacity}>
                <div className='signin--area'>
                <div className="">
                        <div className="">
                            <h4 className="font-weight-bolder text-white mt-1">Join us today</h4>
                            <p className="mb-1 text-white text-sm">Enter your email and password to register</p>
                        </div>
                    </div>
            
                    {error &&
                        <div className='box-error'>
                            <img src="/icons/alert.png" alt="alert-icon" />
                            <span className='text-messge'>{error}</span>
                        </div>
                    }
                    <form action="">
                        <label htmlFor="" className='area'>
                            <div className='area--title'>E-mail</div>
                            <div className='area--input'>
                                <input 
                                type="email" 
                                disabled={disabled}
                                value={email}
                                onChange={e=>setEmail(e.target.value)}
                                />
                            </div>
                        </label>

                        <label htmlFor="" className='area'>
                            <div className='area--title'>Senha</div>
                            <div className='area--input'>
                                {!visiblePassword && 
                                    <div className='vs-password'>
                                        <input 
                                            type="password" 
                                            disabled={disabled}
                                            value={password}
                                            onChange={e=>setPassword(e.target.value)}       
                                        />
                                        <img src="/icons/show.png" alt="show" onClick={()=> setVisiblePassword(true)}/>
                                    </div>
                                }
                                {visiblePassword && 
                                    <div className='vs-password'>
                                        <input 
                                            type="text" 
                                            disabled={disabled}
                                            value={password}
                                            onChange={e=>setPassword(e.target.value)}       
                                        />
                                        <img src="/icons/hide.png" alt="hide" onClick={()=> setVisiblePassword(false)}/>
                                    </div>
                                }
                            </div>
                        </label>

                        <label htmlFor="" className='area area--checkbox'>
                            <div className='area--title'>Manter Conectado</div>
                            <div className='area--input'>
                                <input 
                                type="checkbox" 
                                className='check-input' 
                                disabled={disabled}
                                checked={rememberPassword}
                                onChange={e=>setRememberPassword(!rememberPassword)}
                                />
                            </div>
                        </label>
                    </form>
                    <div className='button-area'>
                        <button disabled={disabled} onClick={handleSubmit}>
                            Entrar
                        </button>
                    </div>
                    <div className='signup--box'>
                        <span>Não tem uma conta? <Link to="/signup">Cadastre-se</Link></span>
                    </div>
                    <div className='help-box'>Precisa de ajuda?</div>
                </div>
            </C.PageArea>
        </PageContainer>
    )
}