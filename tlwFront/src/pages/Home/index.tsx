// Created Styled-Components
import * as C from './styled'

// Hooks React
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

// Api Requests
import { Api } from "../../helpers/api"

// Components folders 
import { PageContainer2 } from "../../components/TemplateComponents"
import { AdItem } from "../../components/partials/AdItem"
// Types
import { StateList, CategoryList, ItemsList } from "../../types/MainTypes"

export const Home = () => {

    // Request states (webService)
    const [stateList, setStateList] = useState([])
    const [categories, setCategories] = useState([])
    const [adList, setAdList] = useState([])

    // 
    const [seeCat, setSeeCat] = useState("none")

    // Request States webSite
    useEffect(() => {
        const getStates = async () => {
            const sList = await Api.getStates()
            setStateList(sList)
        }
        getStates()
    }, [])

    // Request Categories webSite
    useEffect(() => {
        const getCategories = async () => {
            const catList = await Api.getCategories()
            setCategories(catList)
        }
        getCategories()
    }, [])

    // Ads List Request 
    useEffect(() => {
        const getRecentAds = async () => {
            const json = await Api.getAds({
                sort: 'desc',
                limit: 16
            })
            setAdList(json.ads)
        }
        getRecentAds()
    }, [])

    return (
        <>
            <C.SearchArea seeCat={seeCat}>
                <PageContainer2 >
                    <div className="searchBox">
                        <form action="/ads" method="">
                            <svg xmlns="http://www.w3.org/2000/svg" height="1.3em"  viewBox="0 0 512 512"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" /></svg>
                            <input type="text" name="q" placeholder="O que procura?" />
                            <select name="state">
                                <option value="">Selecione uma província</option>
                                {stateList.map((item: StateList, index) =>
                                    <option key={index} value={item.name}>{item.name}</option>
                                )}
                            </select>
                            <button>Pesquisar</button>
                        </form>
                    </div>
                </PageContainer2>
            </C.SearchArea>

            <C.CategoryArea seeCat={seeCat}>
                <PageContainer2 >
                    <h2>Categorias</h2>
                    <div className="categoryList">
                        {categories.map((item: CategoryList, index) =>
                            <Link key={index} to={`/ads?cat=${item.slug}`} className="categoryItem">
                                <div className='box-image'>
                                    <img src={item.img} alt="" />
                                </div>
                                <span>{item.name}</span>
                            </Link>
                        )}
                    </div>
                    <div className='seeCat' onClick={() => setSeeCat(seeCat == "none" ? "flex" : "none")}>
                        <span>Ver Categorias</span>
                        <img src="/icons/arrow-down.png" alt="" />
                    </div>
                </PageContainer2>

            </C.CategoryArea>
            <C.PageArea>
                <PageContainer2>
                    <h2>Anúncios Recentes</h2>

                    <div className="list">
                        {adList.map((item: ItemsList, index) =>
                            <AdItem key={index} data={item} />
                        )}
                    </div>

                    <Link to='/ads' className="seeAllLink">Ver Todos</Link>

                    

                    
                </PageContainer2>
            </C.PageArea>

        </>
    )
}