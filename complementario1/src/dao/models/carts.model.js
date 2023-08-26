import mongoose from 'mongoose';

const userCollection = 'carts';

const userSchema = new mongoose.Schema({

})

export const userModel = mongoose.model(userCollection, userSchema);
