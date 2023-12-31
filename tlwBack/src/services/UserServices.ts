const User = require("../models/user")
const State = require("../models/state")
import bcrypt from 'bcrypt'
import { generateToken } from '../config/passport'
import mongoose from 'mongoose'
import { Request } from "express"
import sharp from 'sharp'
import { unlink } from 'fs'
import { s3Delete, s3Upload } from '../config/aws'


export const findUserEmail = async (email: string) => {
    return await User.findOne({email})
}

export const updateUser = async (token: string|undefined, data:Record<string, any>, req: Request|{file: ""}) => {
    let updates: any = {}

    if(data.name){
        updates.name = data.name
    }

    if(data.email){
        
        const existentEmail = await User.findOne({email: data.email})
        if(existentEmail){
            return new Error("E-mail já registrado")
        }else {
            updates.email = data.email
        }
    }
    if(data.state){
        const stateLoc = await State.findOne({name: data.state})
        if(!stateLoc){
            return new Error("Estado inválido")
        }
        updates.state = stateLoc._id
    }
  

    if(data.newPassword && data.password){
        const userToken = await User.findOne({token})
        const match = await bcrypt.compare(data.password, userToken.passwordHash)
        if(match){
            const passwordHash = await bcrypt.hash(data.newPassword, 10)
            updates.passwordHash = passwordHash
        }else{
            return new Error("Senha atual incorreta")
        }
    }
    
   
    
    let image;
    if(req.file){
        let file = req.file as Express.Multer.File
            image = file.filename
            updates.image = image
            await sharp(file.path)
            .resize(500, 500)
            .toFormat("jpeg")
            .toFile(`./public/media/${file.filename}.jpg`)
            // s3Upload(file)
            unlink(file.path, (err) => {
                if (err) throw err;
            })
    }

    if(data.delProfileImage){
        let user = await User.findOne({token})
        updates.image = ""
    }
    
    let userImageProfile = (image) ? `${process.env.BASE}/media/${image}.jpg`: null
    await User.findOneAndUpdate({token}, {$set: updates})
    return userImageProfile
}

export const createUser = async (data:Record<string, any>) => {
  // Verif se existe user
  const user = await User.findOne({email: data.email})
  if(user){
      return new Error("E-mail já registrado")
  }

  // Verif  State valido
  const stateItem = await State.findById(data.state)
  if(mongoose.Types.ObjectId.isValid(data.state) && data.state){
      if(!stateItem){
        return new Error("Estado inválido")
      }
  } else {
    return new Error("Código de estado inválido")
  }

  // Crypt password
  const passwordHash = await bcrypt.hash(data.password, 10)

  // gera Token
  const token = generateToken(data)

  // Create User
  const newUser = await new User({
      name: data.name,
      email: data.email,
      passwordHash,
      token,
      state: data.state
  })
  await newUser.save()
  return token
}

export const singInUser = async (data:Record<string, any>) => {
     // Verify User for Email
     const user = await User.findOne({email: data.email})
     if(!user) { 
         return new Error("E-mail e/ou senha incorreto(s)")
     }
     
     // Verify User for password
     const match = await bcrypt.compare(data.password, user.passwordHash)
     if(!match) {
        return new Error("E-mail e/ou senha incorreto(s)")
     }
 
     //Generate Token 
     const token = generateToken(data)
 
     // Save new Token
     user.token = token 
     await user.save()

     return token
}

export const findStateId = async (state: string|undefined) => {
    const completState = await State.findById(state)
    return (completState)?completState.name:""
}

export const findAllStates = async () => {
    return await State.find()
}