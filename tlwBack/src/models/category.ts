import { Schema, model, connection } from 'mongoose';

type CategoryType = {
    name: string,
    image: string,
    slug: string
}

const modelSchema = new Schema<CategoryType>({
    name: String,
    image: String,
    slug: String
})

const modelName = "Category"

if(connection && connection.models[modelName]){
    module.exports = connection.models[modelName]
}else{
    module.exports = model(modelName, modelSchema)
}