import mongoose from 'mongoose';

const userCollection = "users";

const userSchema = mongoose.Schema({
    first_name:{
        type: String,
        require: true,
    },
    last_name:{
        type: String,
        require: true,
    },
    email:{
        type: String,
        unique: true,
        require: true,
    },
    age:{
        type: Number,
        require: true,
    },
    password:{
        type: String,
        require: true,
    },
    cart: {
        type:[
            {
                cartInfo: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "carts"
                }
            }
        ],
        default: [],
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
})

export const userModel = mongoose.model(userCollection, userSchema);