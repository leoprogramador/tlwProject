const Category = require('../models/category')
import bcrypt from 'bcrypt'
import { generateToken } from '../config/passport'
import mongoose from 'mongoose'
import { Request } from "express"
import sharp from 'sharp'
import { unlink } from 'fs'
import { s3Delete, s3Upload } from '../config/aws'
type Data = {
  name: string,
}
export const createCategory = async (data:Data, req: Request) => {
  let image,x;
  if(req.file){
      let file = req.file as Express.Multer.File
          image = file.filename
          await sharp(file.path)
          .toFormat("jpeg")
          .toFile(`./public/assets/images/${file.filename}.png`)
          // s3Upload(file)
          unlink(file.path, (err) => {
              if (err) throw err;
          })
          x=file.filename
  }

  const category = await new Category({ 
    name: data.name, 
    slug: x, 
    image
   });
   category.save();
  return  category._id;
};


export const findCategoryByName = async (name: string) => {
  return await Category.findOne({ name });
};

export const findCategoryBySlug = async (slug: string)  => {
  return await Category.findOne({ slug });
};

export const updateCategory = async (id: string, data: Record<string, any>) => {
  return await Category.findByIdAndUpdate(id, data, { new: true });
};

export const deleteCategory = async (id: string) => {
  return await Category.findByIdAndDelete(id);
};

export const findAllCategories = async () => {
  return await Category.find();
};
