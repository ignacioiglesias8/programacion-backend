import mongoose from 'mongoose';

const userCollection = 'products';

const userSchema = new mongoose.Schema({

})

export const userModel = mongoose.model(userCollection, userSchema);