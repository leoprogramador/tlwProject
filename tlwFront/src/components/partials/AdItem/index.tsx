// Created Styled-Components
import * as C from './styled'

// Hooks React
import { Link } from 'react-router-dom'

// Types
import { ItemsList } from "../../../types/MainTypes"

// Props
type Data = {
    data: ItemsList
}
// Format Date 
const formatDate = (date: Date) => {
    let cDate = new Date(date)
    let months  = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"]
    let day = cDate.getDate()
    let month = cDate.getMonth() 
    let year = cDate.getFullYear()
    return `${day} de ${months[month]} de ${year} `
}

export const AdItem = ({data}: Data) => {

    // Verify price content
    let price = "";
    if(data.priceNegotiable){
        price = "Preço Negociável"
    }else{
        price = data.price.toLocaleString('an-pt', { style: 'currency', currency: 'Kzs' })
    }

    return(
        <C.Item className="AdItem">
           <Link to={`/ad/${data.id}`}>
               <div className="itemImg">
                   <img src={data.image} alt="" />
               </div>
               <div className="itemName">{data.title}</div>
               <div className="itemDataC">{formatDate(data.dateCreated)}</div>
               <div className="itemPrice">{price}</div>
           </Link>
        </C.Item>
    )
}