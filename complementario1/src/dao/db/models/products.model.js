import mongoose from 'mongoose';

const userCollection = 'products';

const userSchema = new mongoose.Schema({
    title: {
        type:String,
        unique:true,
        required:true,
    },
    description: {
        type:String,
        required:true,
    },
    price: {
        type:Number,
        required:true,
    },
    thumbnails : Array,
    code: {
        type:String,
        unique:true,
        required:true,
    },
    stock: {
        type:Number,
        required:true,
    },
    category: {
        type:String,
        required:true,
    },
    status: Boolean,
})

export const productModel = mongoose.model(userCollection, userSchema);