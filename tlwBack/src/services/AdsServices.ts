const Category = require('../models/category')
const Ads = require("../models/ads")
const State = require("../models/state")
const User = require("../models/user")
import mongoose from 'mongoose'
import { unlink } from 'fs/promises'
import sharp from 'sharp'
import {Request} from 'express'
import fs from "fs"
import { s3Delete, s3Upload } from "../config/aws"

type Data = {
    title: string
    category: string
    price: string
    state: string
    priceNegotiable: string
    description: string
    numberWpp:number
    delImages?: string
    status?: string
}
// Retorna todas as categorias
export const getAllCategories = async () => {
    return await Category.find()
}
// Retorna todos os anúncios
export const findAllAds = async () => {
    return await Ads.find()
}
// Adiciona um novo anúncio
export const AddAds = async (data: Data, req: Request ) => {
    let token = req.headers.authorization?.slice(7)
    let user = await User.findOne({token})

    if(!data.title || !data.category){
        return new Error("Titulo e/ou categoria inválido(s)")
    }
    if(!data.description){
        return new Error("Descrição inválida")
    }
    if(!data.numberWpp){
        return new Error("Descrição inválida")
    }

    let price = 0
    if(data.price){
        price = parseFloat(data.price.replace(".", "").replace(",", ".").replace("Kzs",""))
    }

    // Verifica estado válido
    if(data.state){
        if(mongoose.Types.ObjectId.isValid(data.state)){
            const stateItem = await State.findById(data.state)
            if(!stateItem){
                return new Error("Estado inválido")
            }
        } else {
            return new Error("Código de estado inválido")
        }
    }

 
    //Verifica a categoria valida 
    if(data.category){
        if(mongoose.Types.ObjectId.isValid(data.category)){
            const categoryItem = await Category.findById(data.category)
            if(!categoryItem){
                return new Error("Categoria inválida")
            }
        } else {
            return new Error("Código de categoria inválido" )
        }
    }
    
    // Images 
    let images: string[]= []
    if(req.files){
        let files = req.files as Express.Multer.File[]
        files.forEach( async (item) => {
            images.push(item.filename)
            await sharp(item.path)
            // .resize()
            .toFormat("jpeg")
            .toFile(`./public/media/${item.filename}.jpg`)
            // await s3Upload(item)
            await unlink (item.path)
        })
    }else {
        return new Error("Arquivo inválido")
    }

    let ads = await new Ads ({
        status: true,
        idUser: user._id,
        state: data.state,
        dateCreated: new Date(),
        title: data.title,
        category: data.category,
        price,
        priceNegotiable: (data.priceNegotiable == "true") ? true : false,
        description: data.description,
        numberWpp: data.numberWpp,
        views: 0,
        images
    })
    ads.save()
    return ads._id
}




/* const test = async (data: Data, req: Request ) => {
    let token = req.headers.authorization?.slice(7)
    let user = await User.findOne({token})

    if(!data.title || !data.category){
        return new Error("Titulo e/ou categoria inválido(s)")
    }
    if(!data.description){
        return new Error("Descrição inválida")
    }

    let price = 0
    if(data.price){
        price = parseFloat(data.price.replace(".", "").replace(",", ".").replace("Kzs",""))
    }

    // Verifica estado válido
    if(data.state){
        if(mongoose.Types.ObjectId.isValid(data.state)){
            const stateItem = await State.findById(data.state)
            if(!stateItem){
                return new Error("Estado inválido")
            }
        } else {
            return new Error("Código de estado inválido")
        }
    }

 
    //Verifica a categoria valida 
    if(data.category){
        if(mongoose.Types.ObjectId.isValid(data.category)){
            const categoryItem = await Category.findById(data.category)
            if(!categoryItem){
                return new Error("Categoria inválida")
            }
        } else {
            return new Error("Código de categoria inválido" )
        }
    }
    
    // Images 
    let images: string[]= []
    if(req.files){
        let files = req.files as Express.Multer.File[]
        files.forEach( async (item) => {
            images.push(item.filename)
            await sharp(item.path)
            // .resize()
            .toFormat("jpeg")
            .toFile(`./public/media/${item.filename}.jpg`)
            // await s3Upload(item)
            await unlink (item.path)
        })
    }else {
        return new Error("Arquivo inválido")
    }

    let ads = await new Ads ({
        status: true,
        idUser: user._id,
        state: data.state,
        dateCreated: new Date(),
        title: data.title,
        category: data.category,
        price,
        priceNegotiable: (data.priceNegotiable == "true") ? true : false,
        description: data.description,
        views: 0,
        images
    })
    ads.save()
    return ads._id
} */
// Retorna anúncios personalizados com base em filtros
export const findCustomAds = async (
    sort: string, 
    offset: number, 
    limit: number, 
    q: string, 
    cat:string, 
    state:string) => {

    let options: any = {status: true}
    let total = 0

    if(q) {options.title = {'$regex': q, '$options': 'i'}}

    if(cat){
        const c = await Category.findOne({ slug: cat })
        if(c){options.category = c._id}
    }

    if(state){
        const s = await State.findOne({ name: state })
        if(s){options.state = s._id}
    }

    const adsTotal = await Ads.find(options)
    total = adsTotal.length

    let adsData = await Ads.find(options)
    .sort({dateCreated: (sort == "desc"? -1: 1)})
    .skip(Number(offset))
    .limit(Number(limit))

    let ads = []
    for (let i in adsData){
        let image = ""
        if(adsData[i].images[0]){
            image = `${process.env.AWS_BASE_ROUTE_IMAGE}/media/${adsData[i].images[0]}.jpg`
        }else {
            image = `${process.env.BASE}/media/default-img.jpg`
        }

        ads.push({
            id: adsData[i]._id,
            title: adsData[i].title,
            price: adsData[i].price,
            priceNegotiable: adsData[i].priceNegotiable,
            dateCreated: adsData[i].dateCreated,
            numberWpp: adsData[i].numberWpp,
            image
        })
    }

    return {ads, total}
}


/*
 const test = async (
    sort: string, 
    offset: number, 
    limit: number, 
    q: string, 
    cat:string, 
    state:string) => {

    let options: any = {status: true}
    let total = 0

    if(q) {options.title = {'$regex': q, '$options': 'i'}}

    if(cat){
        const c = await Category.findOne({ slug: cat })
        if(c){options.category = c._id}
    }

    if(state){
        const s = await State.findOne({ name: state })
        if(s){options.state = s._id}
    }

    const adsTotal = await Ads.find(options)
    total = adsTotal.length

    let adsData = await Ads.find(options)
    .sort({dateCreated: (sort == "desc"? -1: 1)})
    .skip(Number(offset))
    .limit(Number(limit))

    let ads = []
    for (let i in adsData){
        let image = ""
        if(adsData[i].images[0]){
            image = `${process.env.AWS_BASE_ROUTE_IMAGE}/media/${adsData[i].images[0]}.jpg`
        }else {
            image = `${process.env.BASE}/media/default-img.jpg`
        }

        ads.push({
            id: adsData[i]._id,
            title: adsData[i].title,
            price: adsData[i].price,
            priceNegotiable: adsData[i].priceNegotiable,
            dateCreated: adsData[i].dateCreated,
            image
        })
    }

    return {ads, total}
} */
// Retorna informações de um anúncio específico
export const findAd = async (id: string, other: string|null) => {
    if(!id){
        return new Error("Item não encontrado")
    }

    let item = await Ads.findById(id)
    if(!item){
        return new Error("Item não encontrado")
    }
    let images: string[] = []
    for (let i in item.images){
        images.push(`${process.env.AWS_BASE_ROUTE_IMAGE}/media/${item.images[i]}.jpg`) 
    }
    if(images.length == 0){
        images.push(`${process.env.BASE}/media/default-img.jpg`)
    }
    
    let category = await Category.findById(item.category)
    let userInfo = await User.findById(item.idUser)
    let stateUser = await State.findById(userInfo.state)
    let stateProduct = await State.findById(item.state)

    let imageUser
    if(userInfo.image !== ""){
        imageUser = `${process.env.AWS_BASE_ROUTE_IMAGE}/media/${userInfo.image}.jpg`
    }else{
        imageUser = ""
    }

    let others: object[] = []
    if(other === "true") {
        
        const otherProducts = await Ads.find({status: true, idUser: item.idUser }).limit(4)
        for(let i in otherProducts){
            if(otherProducts[i]._id.toString() !== item._id.toString()){
                let image = ""
                if(otherProducts[i].images[0]){
                    image = `${process.env.AWS_BASE_ROUTE_IMAGE}/media/${otherProducts[i].images[0]}.jpg`
                }else {
                    image = `${process.env.BASE}/media/default-img.jpg`
                }

                others.push({
                    id: otherProducts[i]._id,
                    title: otherProducts[i].title,
                    price: otherProducts[i].price,
                    priceNegotiable: otherProducts[i].priceNegotiable,
                    dateCreated: otherProducts[i].dateCreated,
                    image
                })
            }
        }
    }

    let productInfo = {
        id: item._id,
        title: item.title,
        price: item.price,
        priceNegotiable: item.priceNegotiable,
        description: item.description,
        dateCreated: item.dateCreated,
        views: item.views,
        images,
        category: category.slug,
        categoryName: category.name,
        state: stateProduct.name,
        status: item.status,
        numberWpp:item.numberWpp,
        userInfo: {
            name: userInfo.name,
            email: userInfo.email,
            state: stateUser.name,
            image: imageUser
        },
        others
    }

    item.views++
    await item.save()
    return productInfo
}



/* const test = async (id: string, other: string|null) => {
    if(!id){
        return new Error("Item não encontrado")
    }

    let item = await Ads.findById(id)
    if(!item){
        return new Error("Item não encontrado")
    }
    let images: string[] = []
    for (let i in item.images){
        images.push(`${process.env.AWS_BASE_ROUTE_IMAGE}/media/${item.images[i]}.jpg`) 
    }
    if(images.length == 0){
        images.push(`${process.env.BASE}/media/default-img.jpg`)
    }
    
    let category = await Category.findById(item.category)
    let userInfo = await User.findById(item.idUser)
    let stateUser = await State.findById(userInfo.state)
    let stateProduct = await State.findById(item.state)

    let imageUser
    if(userInfo.image !== ""){
        imageUser = `${process.env.AWS_BASE_ROUTE_IMAGE}/media/${userInfo.image}.jpg`
    }else{
        imageUser = ""
    }

    let others: object[] = []
    if(other === "true") {
        
        const otherProducts = await Ads.find({status: true, idUser: item.idUser }).limit(4)
        for(let i in otherProducts){
            if(otherProducts[i]._id.toString() !== item._id.toString()){
                let image = ""
                if(otherProducts[i].images[0]){
                    image = `${process.env.AWS_BASE_ROUTE_IMAGE}/media/${otherProducts[i].images[0]}.jpg`
                }else {
                    image = `${process.env.BASE}/media/default-img.jpg`
                }

                others.push({
                    id: otherProducts[i]._id,
                    title: otherProducts[i].title,
                    price: otherProducts[i].price,
                    priceNegotiable: otherProducts[i].priceNegotiable,
                    dateCreated: otherProducts[i].dateCreated,
                    image
                })
            }
        }
    }

    let productInfo = {
        id: item._id,
        title: item.title,
        price: item.price,
        priceNegotiable: item.priceNegotiable,
        description: item.description,
        dateCreated: item.dateCreated,
        views: item.views,
        images,
        category: category.slug,
        categoryName: category.name,
        state: stateProduct.name,
        status: item.status,
        userInfo: {
            name: userInfo.name,
            email: userInfo.email,
            state: stateUser.name,
            image: imageUser
        },
        others
    }

    item.views++
    await item.save()
    return productInfo
} */
// Atualiza um anúncio existente
export const updateAds = async (id: string, data: Data, req: Request) => {
    let token = req.headers.authorization?.slice(7)

    if(id.length < 12){
        return new Error("Id inválido")
    }

    let item = await Ads.findById(id)
    if(!item){
        return new Error("Item inválido")
    }

    let user = await User.findOne({token})
    if(user._id.toString() !== item.idUser){
        return new Error("Anúncio não pertence ao usuário logado")
    }

    let updates: any = {}

    if(data.title){
        updates.title = data.title
    }
    if(data.price){
        let price = parseFloat(data.price.replace(".", "").replace(",", ".").replace("Kzs",""))
        updates.price = price
    }
    if(data.priceNegotiable){
        updates.priceNegotiable = (data.priceNegotiable=="true")?true:false
    }
    if(data.status){
        updates.status = (data.status=="true")?true:false
    }

    if(data.category){
        const category = await Category.findOne({slug: data.category})
        if(!category){
            return new Error("Categoria inválida")
        }
        updates.category = category._id
    }

    if(data.state){
        const stateLoc = await State.findOne({name: data.state})
        if(!stateLoc){
            return new Error("Estado inválido")
        }
        updates.state = stateLoc._id
    }

    if(data.description){
        updates.description = data.description
    }
    if(data.numberWpp){
        updates.numberWpp = data.numberWpp
    }

     //Images 
     //(new Images)
     let Newimages: string[] = []
     if(req.files){
        let files = req.files as Express.Multer.File[]
        let adsItem = await Ads.findById(id)
        let itemImages = adsItem.images
        let currentImages = (5 - itemImages.length)
        if(files.length > currentImages) {
            return new Error("Limite de imagens exedido")
        }
        files.forEach( async (item) => {
            Newimages.push(item.filename)
            updates.images = [...adsItem.images, ...Newimages]
            await sharp(item.path)
            .resize(500)
            .toFormat("jpeg")
            .toFile(`./public/media/${item.filename}.jpg`)
            // await s3Upload(item)
            await unlink (item.path) 
        })
    }
     
    //(delete Images)
    let editImages: string[] = []
    if(data.delImages){
        let delImages = data.delImages.split(",")
        let adsItem = await Ads.findById(id)
        let itemImages = adsItem.images

        let formatLink: string[] = []
        for (let i in delImages){
            formatLink.push(
                delImages[i].replace(`${process.env.AWS_BASE_ROUTE_IMAGE}/media/`, "").replace(".jpg", "")
            )
        }

        for (let i in itemImages) {
            if(!formatLink.includes(itemImages[i])){
                editImages.push(itemImages[i])
            }else{
                // s3Delete(itemImages[i])

                // Controller crash Heroku 
                // This function is commented to avoid the crash of Heroku, 
                //which does not store files permanently and when deleted cause instability on the server

                //_________________________________________________________________
                // fs.unlink(`./public/media/${itemImages[i]}.jpg`, (err) => {
                //     if (err) throw err;
                // });
                //__________________________________________________________________
            }
        } 

        updates.images = [...editImages, ...Newimages]
    }

    await Ads.findByIdAndUpdate(id, {$set: updates})
}


/* const test = async (id: string, data: Data, req: Request) => {
    let token = req.headers.authorization?.slice(7)

    if(id.length < 12){
        return new Error("Id inválido")
    }

    let item = await Ads.findById(id)
    if(!item){
        return new Error("Item inválido")
    }

    let user = await User.findOne({token})
    if(user._id.toString() !== item.idUser){
        return new Error("Anúncio não pertence ao usuário logado")
    }

    let updates: any = {}

    if(data.title){
        updates.title = data.title
    }
    if(data.price){
        let price = parseFloat(data.price.replace(".", "").replace(",", ".").replace("Kzs",""))
        updates.price = price
    }
    if(data.priceNegotiable){
        updates.priceNegotiable = (data.priceNegotiable=="true")?true:false
    }
    if(data.status){
        updates.status = (data.status=="true")?true:false
    }

    if(data.category){
        const category = await Category.findOne({slug: data.category})
        if(!category){
            return new Error("Categoria inválida")
        }
        updates.category = category._id
    }

    if(data.state){
        const stateLoc = await State.findOne({name: data.state})
        if(!stateLoc){
            return new Error("Estado inválido")
        }
        updates.state = stateLoc._id
    }

    if(data.description){
        updates.description = data.description
    }

     //Images 
     //(new Images)
     let Newimages: string[] = []
     if(req.files){
        let files = req.files as Express.Multer.File[]
        let adsItem = await Ads.findById(id)
        let itemImages = adsItem.images
        let currentImages = (5 - itemImages.length)
        if(files.length > currentImages) {
            return new Error("Limite de imagens exedido")
        }
        files.forEach( async (item) => {
            Newimages.push(item.filename)
            updates.images = [...adsItem.images, ...Newimages]
            await sharp(item.path)
            .resize(500)
            .toFormat("jpeg")
            .toFile(`./public/media/${item.filename}.jpg`)
            // await s3Upload(item)
            await unlink (item.path) 
        })
    }
     
    //(delete Images)
    let editImages: string[] = []
    if(data.delImages){
        let delImages = data.delImages.split(",")
        let adsItem = await Ads.findById(id)
        let itemImages = adsItem.images

        let formatLink: string[] = []
        for (let i in delImages){
            formatLink.push(
                delImages[i].replace(`${process.env.AWS_BASE_ROUTE_IMAGE}/media/`, "").replace(".jpg", "")
            )
        }

        for (let i in itemImages) {
            if(!formatLink.includes(itemImages[i])){
                editImages.push(itemImages[i])
            }else{
                // s3Delete(itemImages[i])

                // Controller crash Heroku 
                // This function is commented to avoid the crash of Heroku, 
                //which does not store files permanently and when deleted cause instability on the server

                //_________________________________________________________________
                // fs.unlink(`./public/media/${itemImages[i]}.jpg`, (err) => {
                //     if (err) throw err;
                // });
                //__________________________________________________________________
            }
        } 

        updates.images = [...editImages, ...Newimages]
    }

    await Ads.findByIdAndUpdate(id, {$set: updates})
} */
// Retorna todos os anúncios de um usuário
export const findAllAdsUser = async (idUser: string, status: boolean) => {
    return await Ads.find({idUser, status})
}
// Retorna anúncios personalizados de um usuário com base em filtros
export const findCustomAdsUser = async (idUser: string, status: boolean, sort: string, offset: number, limit: number) => {
    return await Ads.find({idUser, status})
    .sort({dateCreated: (sort == "desc"? -1: 1)})
    .skip(Number(offset))
    .limit(Number(limit))
}

/* const test = async (idUser: string, status: boolean, sort: string, offset: number, limit: number) => {
    return await Ads.find({idUser, status})
    .sort({dateCreated: (sort == "desc"? -1: 1)})
    .skip(Number(offset))
    .limit(Number(limit))
} */
// Exclui um anúncio
export const deleteAds = async (id: string) => {

    let ads = await Ads.findById(id)

    if(ads.images){
        for(let i in ads.images){
            // s3Delete(ads.images[i])
            fs.unlink(`./public/media/${ads.images[i]}.jpg`, (err) => {
                if (err) throw err;
            });
        }
    }
    return await Ads.findByIdAndDelete(id)
}


/* const test = async (id: string) => {

    let ads = await Ads.findById(id)

    if(ads.images){
        for(let i in ads.images){
            // s3Delete(ads.images[i])
            fs.unlink(`./public/media/${ads.images[i]}.jpg`, (err) => {
                if (err) throw err;
            });
        }
    }
    return await Ads.findByIdAndDelete(id)
} */
// Retorna informações de um usuário
export const findUser = async (token: string|undefined) => {
    return await User.findOne({token})
}