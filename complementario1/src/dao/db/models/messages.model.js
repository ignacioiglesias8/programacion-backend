import mongoose from 'mongoose';

const userCollection = 'messages';

const userSchema = new mongoose.Schema({
    user: {
        type: String
    }, 
    message: {
        type: String
    }
})

export const messageModel = mongoose.model(userCollection, userSchema);