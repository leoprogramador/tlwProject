// Created Styled-Components
import * as C from './styled'

// Hooks React
import { useEffect, useState, useRef } from 'react'

// Hooks Custom
import { useInfoReducer } from '../../contexts/context'

// Api Requests
import { Api } from '../../helpers/api'

// Auth Verify
import { doLogout } from "../../helpers/AuthHandler"

// Components folders 
import { PageContainer } from '../../components/TemplateComponents'

//Types
import { StateList, UserInfo } from '../../types/MainTypes'

const initialUser = {
    name: "",
    state: "",
    email: "",
    image: ""
}

export const Profile = () => {

    // Controler send field (FormData)
    const fileField = useRef<HTMLInputElement>(null)

    //Instance Hook (Reducer)
    const { state, dispatch } = useInfoReducer()

    // Request states (webService)
    const [states, setStates] = useState([])

    // All user info
    const [userInfo, setUserInfo] = useState<UserInfo>(initialUser)

    // Initial infos
    const [InitialEmail, setInitialEmail] = useState("")
    const [Initialname, setInitialName] = useState("")

    // Form Fields
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [stateUser, setStateUser] = useState("")
    const [image, setImage] = useState("")

    // Password Fields
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")

    // Request Controllers
    const [visiblePassword, setVisiblePassword] = useState(false)
    const [disable, setDisable] = useState(false)
    const [message, setMessage] = useState("")
    const [messagePassword, setMessagePassword] = useState("")
    const [messageImage, setMessageImage] = useState("")
    const [messageColor, setMessageColor] = useState("#000")
    const [displayModal, setDisplayModal] = useState(["none", "0"])

    // Section infos/image/password
    const [currentSection, setCurrentSection] = useState(0)

    useEffect(() => {
        const getUserInfo = async () => {
            const json = await Api.getUserInfo()
            setUserInfo(json)
        }
        getUserInfo()
    }, [])

    useEffect(() => {
        const getStates = async () => {
            const json = await Api.getStates()
            setStates(json)
        }
        getStates()
    }, [])

    useEffect(() => {
        setEmail(userInfo.email)
        setName(userInfo.name)
        setInitialEmail(userInfo.email)
        setInitialName(userInfo.name)
        setStateUser(userInfo.state)
        if (userInfo.image) {
            dispatch({ type: "SET_IMAGE", payload: userInfo.image })
        }
    }, [userInfo])

    // Edit user info
    const editUser = async () => {
        setDisplayModal(["none", "0"])
        setDisable(true)
        setMessage("")

        if (name == "") {
            setMessage("Preencha o nome")
            setMessageColor("#c9242e")
            setDisable(false)
            return
        }
        if (email == "") {
            setMessage("Preencha o email")
            setMessageColor("#c9242e")
            setDisable(false)
            return
        }
        if (stateUser == "") {
            setMessage("Selecione um Estado")
            setMessageColor("#c9242e")
            setDisable(false)
            return
        }

        const formData = new FormData() // Create FormData
        formData.append("state", stateUser)

        if (name !== Initialname) {
            formData.append("name", name)
        }
        if (email !== InitialEmail) {
            formData.append("email", email)
        }

        // Send Request
        const json = await Api.editUser(formData)

        if (!json.error) {
            setMessage("Alterações salvas com sucesso")
            setMessageColor("#408140")

        } else {
            setMessage(json.error)
            setMessageColor("#c9242e")
        }
        setDisable(false)
    }

    // Edit Password
    const editPassword = async () => {
        setDisplayModal(["none", "0"])
        setDisable(true)
        setMessagePassword("")

        if (password == "") {
            setMessagePassword("Preencha a senha atual")
            setMessageColor("#c9242e")
            setDisable(false)
            return
        }

        if (newPassword == "" || newPassword.length < 8) {
            setMessagePassword("Preencha a nova senha corretamente")
            setMessageColor("#c9242e")
            setDisable(false)
            return
        }
        if (newPassword !== confirmPassword) {
            setMessagePassword("Senhas não correspondentes")
            setMessageColor("#c9242e")
            setDisable(false)
            return
        }


        const formData = new FormData() // Create FormData
        formData.append("password", password)
        formData.append("newPassword", newPassword)

        // Send Request
        const json = await Api.editUser(formData)

        if (json.error.newPassword) {
            setMessagePassword(json.error.newPassword.msg)
            setMessageColor("#c9242e")
            setDisable(false)
            return
        }

        if (!json.error) {
            setMessagePassword("Senha alterada com sucesso")
            setMessageColor("#408140")
        } else {
            setMessagePassword(json.error)
            setMessageColor("#c9242e")
        }
        setDisable(false)
    }

    // Image preview
    const prevImage = () => {
        const formData = new FormData()
        // Verify Images, format and append in formData
        let fields = fileField.current as HTMLInputElement
        let files = fields.files as FileList
        if (files.length > 0) {
            formData.append("images", files[0])
        } else {
            return
        }

        let imageUrl = URL.createObjectURL(files[0])
        setImage(imageUrl)
    }

    // Add image
    const addImage = async () => {
        setMessageImage("")
        setMessageColor("")
        setDisable(true)

        const formData = new FormData()
        // Verify Images, format and append in formData
        let fields = fileField.current as HTMLInputElement
        let files = fields.files as FileList
        if (files.length > 0) {
            formData.append("image", files[0])
        } else {
            return
        }

        // Send Request
        const json = await Api.editUser(formData)
        if (!json.error && json.image) {
            dispatch({ type: "SET_IMAGE", payload: json.image })
            setMessageImage("Imagem atualizada")
            setMessageColor("#408140")
        } else {
            setMessageImage(json.error)
            setMessageColor("#c9242e")
        }
        setDisable(false)
    }

    // Delete image
    const deleteImage = async () => {
        dispatch({ type: "SET_IMAGE", payload: "/images/default-profile.jpg" }) // Reset reducer
        setMessagePassword("")
        setMessageColor("")
        setDisable(true)

        let fields = fileField.current as HTMLInputElement
        fields.value = "" // Clean input

        if (image || userInfo.image) {
            const formData = new FormData()
            formData.append("delProfileImage", "delete")

            // Send Request
            const json = await Api.editUser(formData)

            if (!json.error) {
                setMessageImage("Imagem Removida")
                setMessageColor("#faad14")
                setImage("")
            } else {
                setMessageImage(json.error)
                setMessageColor("#c9242e")
            }
            setDisable(false)
        }
    }

    return (
        <PageContainer>
            <C.Warning display={displayModal[0]}>
                <div className="box--warn">
                    <div className='warning'>
                        <img src="/icons/alert.png" alt="" />
                        <div className='warn'>Aviso</div>
                    </div>
                    <div className='message-box'>
                        <span>Para sua segurança, você será desconectado após as alterações.</span>
                        <span>Certifique-se de possuir as informações de acesso.</span>
                        <span>Tem certeza que deseja salvar as alterações? </span>
                    </div>
                    <div className="box--buttons">
                        <button className="confirm" onClick={(e) => ((displayModal[1] == "1") ? editUser() : editPassword())}>Salvar alterações</button>
                        <button className="cancel" onClick={e => setDisplayModal(["none", '0'])}>Cancelar</button>
                    </div>
                </div>
            </C.Warning>

            <C.PageArea color={messageColor}>
                <div className='title--area'>
                    <h2>Meu Cadastro</h2>
                    <div className='options'>
                        <div className={(currentSection == 0) ? "active" : "desactive"} onClick={() => setCurrentSection(0)}>Informações de Cadastro</div>
                        <div className={(currentSection == 1) ? "active" : "desactive"} onClick={() => setCurrentSection(1)}>Foto de perfil</div>
                        <div className={(currentSection == 2) ? "active" : "desactive"} onClick={() => setCurrentSection(2)}>Alteraçao de senha</div>
                    </div>

                </div>

                {currentSection === 0 &&
                    <div className='box--info'>
                        <span className='title-box'>Dados da conta</span>
                        {message &&
                            <div className='message'>{message}</div>
                        }
                        <form action="" method='PUT'>
                            <label>
                                <span>Nome Completo</span>
                                <input type="text" value={name} onChange={(e) => setName(e.target.value)} disabled={disable} />
                            </label>
                            <label>
                                <span>Email</span>
                                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} disabled={disable} />
                            </label>
                            <label className='labelP'>
                                <div className='seld'>
                                <span>Província</span>
                                <select className='selet' onChange={(e) => setStateUser(e.target.value)} disabled={disable} value={stateUser}>
                                    {states.map((i: StateList, k) =>
                                        <option key={k} value={i.name}>{i.name}</option>
                                    )}
                                </select>
                                </div>
                            </label>
                        </form>
                        <div className='bt_send'>
                            <button className='send' disabled={disable} onClick={() => setDisplayModal(["flex", "1"])}>Salvar Alterações</button>
                        </div>
                    </div>
                }
            </C.PageArea>
            <C.PageArea color={messageColor}>
                {currentSection === 1 &&

                    <div className='box--info'>
                        <span className='title-box'>Alterar Foto de Perfil</span>
                        {messageImage &&
                            <div className='message'>{messageImage}</div>
                        }
                        <form action="" method='PUT'>
                            <div className='currentImage'>
                                <img src={(image) ? image : state.userImage} alt="default-image" />
                            </div>
                            <div className='input--area'>
                                <label htmlFor="file">
                                    <img src="/icons/plus.png" alt="adicionar" />
                                    <input type="file" name='file' id='file' ref={fileField} onChange={prevImage} />
                                </label>
                            </div>
                            <div className='input--area'>
                                <label className='delete-label'>
                                    <div className='del' onClick={deleteImage}>
                                        <img src="/icons/trash.png" alt="delete" />
                                        <span>Excluir Imagem</span>
                                    </div>
                                </label>
                            </div>
                        </form>
                        <div className='bt_send'>
                            <button className='send' disabled={disable} onClick={() => addImage()}>Salvar Alterações</button>
                        </div>
                    </div>

                }
            </C.PageArea>
            <C.PageArea color={messageColor}>
                {currentSection === 2 &&

                    <div className='box--info'>
                        <span className='title-box'>Aterar Senha</span>
                        {messagePassword &&
                            <div className='message'>{messagePassword}</div>
                        }
                        <form action="" method='PUT'>
                            <label>
                                <input type="text" autoComplete="username" style={{ display: 'none' }} />
                            </label>
                            <label>
                                <span>Senha Atual</span>
                                <input type="password" autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} disabled={disable} />
                            </label>
                            <label>
                                <span>Nova Senha <small>Mínimo 8 caracteres</small></span>
                                <div className='vs-password'>
                                    {!visiblePassword &&
                                        <>
                                            <input type="password" autoComplete="new-password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} disabled={disable} />
                                            <img src="/icons/show.png" alt="show" onClick={() => setVisiblePassword(true)} />
                                        </>
                                    }
                                    {visiblePassword &&
                                        <>
                                            <input type="text" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} disabled={disable} />
                                            <img src="/icons/hide.png" alt="hide" onClick={() => setVisiblePassword(false)} />
                                        </>
                                    }
                                </div>
                            </label>
                            <label>
                                <span>Confirmar senha<small>Mínimo 8 caracteres</small></span>
                                <div className='vs-password'>
                                    {!visiblePassword &&
                                        <>
                                            <input
                                                type="password"
                                                disabled={disable}
                                                value={confirmPassword}
                                                onChange={e => setConfirmPassword(e.target.value)}
                                            />

                                        </>
                                    }
                                    {visiblePassword &&
                                        <>
                                            <input
                                                type="password"
                                                disabled={disable}
                                                value={confirmPassword}
                                                onChange={e => setConfirmPassword(e.target.value)}
                                            />

                                        </>
                                    }
                                </div>
                            </label>
                        </form>
                        <div className='bt_send'>
                            <button className='send' disabled={disable} onClick={() => setDisplayModal(["flex", "2"])}>Salvar Alterações</button>
                        </div>
                    </div>
                }
            </C.PageArea>
        </PageContainer>
    )
}