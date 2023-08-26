import mongoose from 'mongoose';

const userCollection = 'messages';

const userSchema = new mongoose.Schema({

})

export const userModel = mongoose.model(userCollection, userSchema);