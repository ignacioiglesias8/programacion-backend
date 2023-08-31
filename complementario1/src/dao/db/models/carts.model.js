import mongoose from 'mongoose';

const userCollection = 'carts';

const userSchema = new mongoose.Schema({
    products: {
        type:[
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "product"
                }
            }
        ],
        default: [],
    },
})

export const cartModel = mongoose.model(userCollection, userSchema);
