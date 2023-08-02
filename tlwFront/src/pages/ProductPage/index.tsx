// Created Styled-Components
import * as C from './styled'

// Hooks React
import { useEffect, useState } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { Link } from "react-router-dom"

// Api Requests
import { Api } from '../../helpers/api'
import { isLogged } from '../../helpers/AuthHandler'

// Components folders 
import { PageContainer } from '../../components/TemplateComponents'
import { AdItem } from '../../components/partials/AdItem'

// Types
import { SingleItem, ItemsList } from '../../types/MainTypes'

const initialItem = {
    id: "",
    title: "",
    category: "",
    categoryName: "",
    price: 0,
    dateCreated: new Date(),
    priceNegotiable: false,
    description: "",
    numberWpp: 0,
    state: "",
    others: [],
    images: [],
    views: 0,
    status: false,
    userInfo: {
        name: "",
        email: "",
        state: "",
        image: ""
    }
}

export const ProductPage = () => {

    // Url Params 
    const { id } = useParams()

    //Navigate Instance
    let navigate = useNavigate()

    // Loading Controller
    const [loading, setLoading] = useState(true)
    const [displayModal, setDisplayModal] = useState("none")

    //Product Content
    const [pdInfo, setPdInfo] = useState<SingleItem>(initialItem)
    const [changeProduct, setChangeProduct] = useState(false)

    //Format Price 
    const [FormatedPrice, setFormatPrice] = useState("")

    // Slide Controllers
    const [slideWidth, setSlideWidth] = useState(1000)
    const [currentImage, setCurrentImage] = useState(0)

    // User Logged
    const [loggedOn, setLoggedOn] = useState(false)
    const { pathname } = useLocation();

    const message = encodeURIComponent('Olá, estou interessado no seu produto.');

    // Verify Logged 
    useEffect(() => {
        const { logged, email } = isLogged();
        if (pdInfo.userInfo && logged && pdInfo.userInfo.email === email) {
            setLoggedOn(true);
        }
    }, [pdInfo.userInfo]);

    // Request to get the product
    useEffect(() => {
        const getItem = async (id: string) => {
            const json = await Api.getItem(id, true);
            setPdInfo(json.productInfo);
            setLoading(false);
        };
        getItem(id as string);
    }, [id, changeProduct]);

    // Width slide controller and Price format 
    useEffect(() => {
        if (pdInfo.images) {
            const qtImages = pdInfo.images.length;
            setSlideWidth(500 * qtImages);
        }
        if (pdInfo.price) {
            setFormatPrice(pdInfo.price.toLocaleString('an-pt', { style: 'currency', currency: 'Kzs' }));
        }
        setLoading(false);
    }, [pdInfo.images, pdInfo.price]);

    // Format Date 
    const formatDate = (date: Date) => {
        let cDate = new Date(date)
        let months = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"]
        let day = cDate.getDate()
        let month = cDate.getMonth()
        let year = cDate.getFullYear()
        return `${day} de ${months[month]} de ${year} `
    }

    // Left button controller
    const handleSlidePrev = () => {
        let maxMargin = slideWidth - 500
        let margin = currentImage + 500
        if (margin > 0) {
            margin = -maxMargin
            setCurrentImage(margin)
        } else {
            setCurrentImage(margin)
        }
    }

    // Right button controller
    const handleSlideNext = () => {
        let maxMargin = slideWidth - 500
        let margin = currentImage - 500
        if ((-margin) > maxMargin) {
            margin = 0
            setCurrentImage(margin)
        } else {
            setCurrentImage(margin)
        }
    }

    // Resquest for Status Product
    const statusProduct = async (status: boolean) => {
        const formData = new FormData()
        formData.append("status", status.toString())
        const json = await Api.editAds(formData, id as string)
        if (!json.error) {
            setChangeProduct(!changeProduct)
        }
    }

    // Request for Delete Product
    const deleteProduct = async () => {
        await Api.deleteAds(id as string)
        navigate("/user/ads")
    }

    return (
        <PageContainer>
            <C.Warning display={displayModal}>
                <div className="box--warn">
                    <div className='warning'>
                        <img src="/icons/alert.png" alt="" />
                        <div className='warn'>Aviso</div>
                    </div>
                    <div className='message-box'>
                        <span>Ao excluir esse anúncio ele será apagado permanentemente</span>
                        <span>Tem certeza que deseja excluir? </span>
                    </div>
                    <div className="box--buttons">
                        <button className="confirm" onClick={() => deleteProduct()}>Excluir</button>
                        <button className="cancel" onClick={e => setDisplayModal("none")}>Cancelar</button>
                    </div>
                </div>
            </C.Warning>

            <C.BreadChumb>
                <Link to="/">Home</Link>/
                <Link to={`/ads?state=${pdInfo.state}`}>{pdInfo.state}</Link>/
                <Link to={`/ads?state=${pdInfo.state}&cat=${pdInfo.category}`}>{pdInfo.categoryName}</Link>/
                <div>{pdInfo.title}</div>
            </C.BreadChumb>

            <C.PageArea width={slideWidth} currentImage={currentImage}>
                <div className='leftSide'>
                    <div className='box'>

                        <div className='area--image'>
                            <div className='productImage'>
                                <div className='arrow left' onClick={handleSlidePrev}>
                                    <img src="/icons/arrow-left.png" alt="left" />
                                </div>
                                {loading && <C.Fake height={300} />}
                                {pdInfo.images &&
                                    <div className='slide--Area'>
                                        {loading && <C.Fake height={20} />}
                                        {pdInfo.images.map((img: string, k: number) =>
                                            <div key={k} className='slide--Item'>
                                                <img src={img} alt="" />
                                            </div>
                                        )}
                                    </div>
                                }
                                <div className='arrow right' onClick={handleSlideNext}>
                                    <img src="/icons/arrow-right.png" alt="right" />
                                </div>
                            </div>
                            <div className='mini--images'>
                                {pdInfo.images &&
                                    <div className='mini--images--area'>
                                        {pdInfo.images.map((img: string, k: number) =>
                                            <div key={k}
                                                className="mini--item">
                                                <img
                                                    src={img}
                                                    alt="image"
                                                    onClick={() => setCurrentImage(-k * 500)}
                                                    className={(currentImage == (-k * 500) ? "active" : '')}
                                                />
                                            </div>
                                        )}
                                    </div>
                                }
                            </div>
                        </div>

                    </div>
                    <div className='pdInfo'>
                        <div className='pdName'>
                            {loading && <C.Fake height={60} />}
                            {pdInfo.title &&
                                <div className='sub-infos'>
                                    <small>Criado em {formatDate(pdInfo.dateCreated)}</small>
                                    {pdInfo.title &&
                                        <small>Visualizações: {pdInfo.views}</small>
                                    }
                                    <h2>{pdInfo.title}</h2>

                                </div>
                            }
                        </div>
                        <span className='descTitle'>Descrição</span>
                        <div className='pdDescription'>
                            {loading && <C.Fake height={100} />}
                            {pdInfo.description}
                        </div>
                    </div>
                </div>

                <div className='rightSide'>
                    <div className='box'>
                        <div className='box--padding box-price'>
                            {loading && <C.Fake height={20} />}
                            {pdInfo.priceNegotiable &&
                                <div className='price'><span>Preço Negociável</span></div>
                            }
                            {!pdInfo.priceNegotiable && pdInfo.price &&
                                <div className='price'><span>{FormatedPrice}</span></div>
                            }
                        </div>
                        {loading && !loggedOn &&
                            <>
                                <C.Fake height={30} />
                                <br />
                                <C.Fake height={100} />
                            </>
                        }
                        {!loggedOn && pdInfo.userInfo &&
                            <>

                                <a href={`mailto:${pdInfo.userInfo.email}`} target='_blank' className='contactSelletLink'>Contactar pelo Email</a>
                                <a href={`https://wa.me/${pdInfo.numberWpp}?text=${message}`} target='_blank' className='contactSelletLink'>Contactar pelo Whatsapp</a>

                                <div className='createdBy box box--padding'>
                                    <div className='img-name'>
                                        {pdInfo.userInfo.image &&
                                            <img src={pdInfo.userInfo.image} alt="" />
                                        }
                                        <strong>{pdInfo.userInfo.name}</strong>
                                    </div>

                                    <small> E-mail: {pdInfo.userInfo.email}</small>
                                    <small>Província: {pdInfo.userInfo.state}</small>
                                </div>
                            </>
                        }
                    </div>
                    {loading && loggedOn &&
                        <>
                            <br />
                            <C.Fake height={30} />
                            <br />
                            <C.Fake height={30} />
                            <br />
                            <C.Fake height={30} />
                        </>
                    }

                    {loggedOn &&
                        <div className='action-buttons'>
                            <Link to={`/user/edit/ads/${pdInfo.id}`}>
                                <div className='editAdButton'>
                                    <img src="/icons/edit.png" alt="Edit--Icon" />
                                    EDITAR
                                </div>
                            </Link>
                            <div className='deleteAdButton' onClick={() => setDisplayModal("flex")}>
                                <img src="/icons/trash.png" alt="Delete--Icons" />
                                EXCLUIR
                            </div>
                        </div>
                    }
                </div>
            </C.PageArea>
            <C.OthersArea>
                {pdInfo.others &&
                    <>
                        <h2>Outros Produtos do Vendedor</h2>
                        <div className='list'>
                            {pdInfo.others.map((item: ItemsList, k: number) =>
                                <AdItem key={k} data={item} />
                            )}
                        </div>
                    </>
                }
            </C.OthersArea>
        </PageContainer>
    )
}