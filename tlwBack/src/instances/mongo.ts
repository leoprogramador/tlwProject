import { connect } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

let db_url = process.env.MONGO_URL as string
//teste
if(process.env.NODE_ENV === "test"){
    db_url = process.env.MONGO_TEST_URL as string
}

export const mongoConnect =  async () => {
    try{
        console.log("Tente a conexão com o MongoDB")
            await connect(db_url as string, {})
        console.log("Conexão disponível com MongoDB")
    } catch(error) {
        console.log("Falha na conexão com o MongoDB", error)
    }
}









/*dotenv.config();

let db_url = process.env.MONGO_URL as string

if(process.env.NODE_ENV === "test"){
    db_url = process.env.MONGO_TEST_URL as string
}

export const mongoConnect =  async () => {
    try{
        console.log("Tente a conexão com o MongoDB")
            await connect(db_url as string, {})
        console.log("Conexão disponível com MongoDB")
    } catch(error) {
        console.log("Falha na conexão com o MongoDB", error)
    }
} */