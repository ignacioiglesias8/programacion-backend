import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const productCollection = 'products';

const productSchema = new mongoose.Schema({
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

productSchema.plugin(mongoosePaginate);

export const productModel = mongoose.model(productCollection, productSchema);