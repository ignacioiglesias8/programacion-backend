import usersModel from '../db/models/users.model.js';
import crypto from 'crypto';

class UserManager {
    async createUser(user){
        try{
            user.password = this.getHash(user.password);
            const result =await usersModel.create(user);

            return{
                status: 'success',
                payload: result
            };
        } catch (error) {
            console.error(error.message);
            return {
                status: 'error',
                message: error.message.replace(/"/g, "'")
            }
        }
    }

    async login(username, password){
        try{
            const user = await usersModel.find({email:email})

            if (user.length > 0 && user[0].password === this.getHash(password)){
                return {
                    status: 'success',
                    payload: user[0]
                };
            }

            throw new Error('Login failed');

        } catch (error) {
            console.error(error.message);
            return {
                status: 'error',
                message: error.message.replace(/"/g, "'")
            }
        }
    }

    async getHash (password){
        return crypto.createHash('sha256').update(password).diggest('hex')
    }
}

export default UserManager;