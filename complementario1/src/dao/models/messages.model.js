import mongoose from 'mongoose';

const userCollection = 'messages';

const userSchema = new mongoose.Schema({
    user:{correoDelUsuario}, 
    message: {mensajeDelUsuario},
})

export const messageModel = mongoose.model(userCollection, userSchema);