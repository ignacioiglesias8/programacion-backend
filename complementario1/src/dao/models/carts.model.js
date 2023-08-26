import mongoose from 'mongoose';

const userCollection = 'carts';

const userSchema = new mongoose.Schema({
    products: {
        type:Array,
        required:true,
    },
})

export const cartModel = mongoose.model(userCollection, userSchema);
