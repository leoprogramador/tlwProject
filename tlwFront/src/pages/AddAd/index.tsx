// Created Styled-Components
import * as C from './styled'

// Hooks React
import { ChangeEvent, FormEvent, FormEventHandler, MouseEventHandler, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

// Api Requests
import { Api } from '../../helpers/api'

//Components folders
import { PageContainer, PageTitle } from '../../components/TemplateComponents'

//Mask price field (libs)
import MaskedInput from 'react-text-mask'
import { createNumberMask } from 'text-mask-addons'

//Types
import { CategoryList, StateList } from '../../types/MainTypes'

export const AddAd = () => {

    // Create FormData
    const formData = new FormData()

    // Controler send field (FormData)
    const fileField = useRef<HTMLInputElement>(null)

    // Navigate instance
    const navigate = useNavigate()

    // Request states (webService)
    const [categories, setCategories] = useState([])
    const [statesLoc, setStatesLoc] = useState([])

    // Form items
    const [title, setTitle] = useState("")
    const [category, setCategory] = useState("")
    const [statePd, setStatePd] = useState("")
    const [price, setPrice] = useState("")
    const [priceNegotiable, setPriceNegotiable] = useState(false)
    const [desc, setDesc] = useState("")
    const [numberWpp, setNumberWpp] = useState("")


    // Request Controllers
    const [disabled, setDisabled] = useState(false)
    const [error, setError] = useState("")
    const [errorT, setErrorT] = useState("")
    const [errorC, setErrorC] = useState("")
    const [errorI, setErrorI] = useState("")
    const [errorD, setErrorD] = useState("")
    const [errorP, setErrorP] = useState("")
    const [errorS, setErrorS] = useState("")
    const [errorW, setErrorW] = useState("")
    //Prev Images 
    const [pImages, setPImages] = useState<string[]>([])


    // Request Categories webSite
    useEffect(() => {
        const getCategories = async () => {
            const cats = await Api.getCategories()
            setCategories(cats)
        }
        getCategories()
    }, [])

    // Request States webSite
    useEffect(() => {
        const getStates = async () => {
            const states = await Api.getStates()
            setStatesLoc(states)
        }
        getStates()
    }, [])

    // Summit Action
    const handleSubmit = async () => {
        setDisabled(true) // Disable buttons
        setErrorT("") // Clean error
        setErrorD("")
        setErrorI("")
        setErrorP("")
        setErrorS("")
        setErrorC("")
        setErrorW("")
        if (!title.trim()) {  // Verify empty title
            setErrorT("Preencha um titúlo para o anúncio")
            setDisabled(false)
            return
        }

        if (!category) { // Verify empty category
            setErrorC("Selecione uma Categoria")
            setDisabled(false)
            return
        }
        if (!desc.trim()) { // Verify empty desc
            setErrorD("Insira uma descrição")
            setDisabled(false)
            return
        }
        if (!statePd) { // Verify empty state
            setErrorS("Selecione uma província")
            setDisabled(false)
            return
        }

        if (!price && !priceNegotiable) {
            setErrorP("Informe o preço ou aceite negociações")
            setDisabled(false)
            return
        }
     

        // If not found errors
        formData.append("state", statePd)
        formData.append("category", category)
        formData.append("title", title)
        formData.append("priceNegotiable", priceNegotiable.toString())
        formData.append("description", desc)
        formData.append("numberWpp", numberWpp)
        formData.append("price", price)

        // Verify Images, format and append in formData
        let fields = fileField.current as HTMLInputElement
        let files = fields.files as FileList
        if (files.length > 0 && pImages.length !== 0) {
            for (let i in files) {
                formData.append("images", files[i])
            }
        }

        // Send Request
        const json = await Api.addAd(formData)

        // Verify errors 
        if (!json.error) {
            navigate(`/ad/${json.id}`) // Redirect to product page
            return
        } else {
            setErrorI(json.error)
        }
        setDisabled(false)
    }



    /* const hsbt = async () => {
    
        
            setDisabled(true) // Disable buttons
            setErrorT("") // Clean error
            setErrorD("")
            setErrorI("")
            setErrorP("")
            setErrorS("")
            setErrorC("")
            if (!title.trim()) {  // Verify empty title
                setErrorT("Preencha um titúlo para o anúncio")
                setDisabled(false)
                return
            }
    
            if (!category) { // Verify empty category
                setErrorC("Selecione uma Categoria")
                setDisabled(false)
                return
            }
            if (!desc.trim()) { // Verify empty desc
                setErrorD("Insira uma descrição")
                setDisabled(false)
                return
            }
            if (!statePd) { // Verify empty state
                setErrorS("Selecione uma província")
                setDisabled(false)
                return
            }
    
            if (!price && !priceNegotiable) {
                setErrorP("Informe o preço ou aceite negociações")
                setDisabled(false)
                return
            }
    
            // If not found errors
            formData.append("state", statePd)
            formData.append("category", category)
            formData.append("title", title)
            formData.append("priceNegotiable", priceNegotiable.toString())
            formData.append("description", desc)
            formData.append("price", price)
    
            // Verify Images, format and append in formData
            let fields = fileField.current as HTMLInputElement
            let files = fields.files as FileList
            if (files.length > 0 && pImages.length !== 0) {
                for (let i in files) {
                    formData.append("images", files[i])
                }
            }
    
            // Send Request
            const json = await Api.addAd(formData)
    
            // Verify errors 
            if (!json.error) {
                navigate(`/ad/${json.id}`) // Redirect to product page
                return
            } else {
                setErrorI(json.error)
            }
            setDisabled(false)
        } */
    // Previews of images
    const prevImages = () => {
        // Verify Images, format, number and append in formData
        let fields = fileField.current as HTMLInputElement
        let files = fields.files as FileList
        if (files.length > 5) {
            setErrorI("Limite de imagens exedido")
            return
        }

        if (files.length > 0) {
            let blobImages: string[] = []
            for (let i = 0; i < files.length; i++) {
                if (typeof (files[i]) == "object") {
                    let imageUrl = URL.createObjectURL(files[i])
                    blobImages.push(imageUrl)
                }
            }
            setPImages(blobImages)
        }
    }

    //Clear image selection
    const cleanInputFile = () => {
        formData.delete("images")
        let fields = fileField.current as HTMLInputElement
        fields.value = ""
        setPImages([])
    }

    // Mask config in price field
    const priceMask = createNumberMask({
        prefix: "Kzs ",
        includeThousandsSeparator: true,
        thousandsSeparatorSymbol: '.',
        allowDecimal: true,
        decimalSymbol: ",",
    })

    const handleTitleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === "Enter") {
            event.preventDefault();
        }
    };
    //
    const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newPrice = e.target.value.slice(0, 11); // Limita a 10 caracteres

        setPrice(newPrice);
    };
    return (
        <>
            <PageContainer>
                <h2>Postar um anúncio</h2>
                <C.TituloCategoryArea>
                    <form action="">
                        <div className='col-1'>
                            <div className='areaTitle'>
                                <h4>Quanto mais detalhado, melhor!</h4>
                                <label>Primeiro, pensa num título bom*</label>
                                <div className='titleD'>Título</div>
                                <div className='area-input-title'>
                                    <textarea
                                        className={errorT ? "bordaError" : ""}
                                        placeholder="exemplo: Teclado Mecânico"
                                        disabled={disabled}
                                        value={title}
                                        onChange={e => setTitle(e.target.value)}
                                        onKeyDown={handleTitleKeyDown}

                                    />
                                    {errorT &&
                                        <>
                                            <div className='box-error'>{errorT}</div>
                                        </>
                                    }

                                    <div className='titleD'>Categoria</div>
                                    <div className='area--input'>
                                        <select

                                            disabled={disabled}
                                            onChange={e => setCategory(e.target.value)}
                                        >
                                            <option value="">Escolha uma categoria</option>
                                            {categories && categories.map((i: CategoryList, key) =>
                                                <option key={key} value={i._id}>{i.name}</option>
                                            )}
                                        </select>
                                        {errorC &&
                                            <>
                                                <div className='box-error'>{errorC}</div>
                                            </>
                                        }
                                    </div>
                                </div>
                            </div>

                        </div>

                    </form>
                </C.TituloCategoryArea>
            </PageContainer>

            <PageContainer>
                <C.imagesArea>
                    <form action="">
                        <div className='col-2'>
                            <div className='area--title'>
                                <h4>Imagens</h4>
                                <div className='box-images'>
                                    {pImages.length > 0 &&
                                        <>
                                            <div className='images'>
                                                {pImages.map((i, k) =>
                                                    <div className='image' key={k}>
                                                        <img src={i} alt="" />
                                                    </div>
                                                )}
                                            </div>
                                            <div className='button'>
                                                <button onClick={cleanInputFile}>Limpar Seleção</button>
                                            </div>
                                        </>
                                    }
                                    {pImages.length <= 0 &&
                                        <>
                                            <img src="/images/no-pictures.png" alt="" />
                                            <img src="/images/no-pictures.png" alt="" />
                                            <img src="/images/no-pictures.png" alt="" />
                                            <img src="/images/no-pictures.png" alt="" />
                                            <img src="/images/no-pictures.png" alt="" />
                                        </>
                                    }
                                </div>
                            </div>
                            <label htmlFor="file" className='area'>
                                <div className='area--title'>Adicionar</div>
                                <small>máx: 5</small>
                                <div className='area--input'>
                                    <input
                                        type="file"
                                        disabled={disabled}
                                        ref={fileField}
                                        id="file"
                                        multiple
                                        onChange={prevImages}
                                    />
                                </div>
                                {errorI &&
                                    <>
                                        <div className='box-error'>{errorI}</div>
                                    </>
                                }
                            </label>
                        </div>
                        <div className='col-1'></div>
                    </form>
                </C.imagesArea>
                <C.DescriptionArea>
                    <form action="">
                        <div className='col-1'>
                            <label htmlFor="" className='area'>
                                <div className='area--title'>Descrição</div>
                                <div className='area--input'>
                                    <textarea
                                        className={errorD ? "bordaError" : ""}
                                        placeholder='Escreve.....'
                                        disabled={disabled}
                                        value={desc}
                                        onChange={e => setDesc(e.target.value)}
                                    ></textarea>
                                    {errorD &&
                                        <>
                                            <div className='box-error'>{errorD}</div>
                                        </>
                                    }
                                </div>
                            </label>
                        </div>
                    </form>
                </C.DescriptionArea>

                <C.locationArea>
                    <form action="">
                        <div className='col-1'>
                            <div className='areaTitle'>
                                <div className='area-input-title'>

                                    <div className='titleD'>Província</div>
                                    <div className='area--input'>
                                        <select
                                            disabled={disabled}
                                            onChange={e => setStatePd(e.target.value)}
                                        >
                                            <option value="">Localização</option>
                                            {statesLoc && statesLoc.map((i: StateList, key) =>
                                                <option key={key} value={i._id}>{i.name}</option>
                                            )}

                                        </select>
                                        {errorS &&
                                            <>
                                                <div className='box-error'>{errorS}</div>
                                            </>
                                        }
                                    </div>
                                </div>
                            </div>

                        </div>

                    </form>
                </C.locationArea>

                <C.priceArea>
                    <form action="">
                        <div className='col-1'>
                            <div className='areaTitle'>
                                <div className='area-input-title'>

                                    <div className='titleD'>Preço</div>
                                    <div className=''>
                                        <MaskedInput
                                            mask={priceMask}
                                            placeholder="Kzs "
                                            disabled={disabled || priceNegotiable}
                                            value={price}
                                            onChange={handlePriceChange}
                                        />
                                    </div>
                                </div>
                                <label htmlFor="" className='area area-checkbox'>
                                    <div className='area--title'>Negociável</div>
                                    <div className='area--input'>
                                        <input
                                            className='check-input'
                                            type="checkbox"
                                            disabled={disabled}
                                            checked={priceNegotiable}
                                            onChange={e => setPriceNegotiable(!priceNegotiable)}
                                        />

                                    </div>
                                    {errorP &&
                                        <>
                                            <div className='box-error'>{errorP}</div>
                                        </>
                                    }
                                </label>
                            </div>

                            <div className='area-input-title'>

                                <div className='titleD'>Telefone</div>
                                <div className=''>
                                    <input
                                        disabled={disabled}
                                        value={numberWpp}
                                        autoComplete="off"
                                        type="text"
                                        onChange={e => setNumberWpp(e.target.value)} />
                                </div>
                            </div>

                        </div>

                    </form>
                </C.priceArea>

                <C.sendArea>
                    <div className='col-1'>
                        <div className='button-area'>
                            <button disabled={disabled} onClick={handleSubmit}>Adicionar Anúncio</button>
                        </div>
                    </div>
                </C.sendArea>

            </PageContainer>

        </>)

}