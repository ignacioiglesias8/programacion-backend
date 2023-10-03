import { userModel } from '../db/models/users.model.js';

class UserManager {
    async getUserByEmail(email) {
        try {
            const user = await userModel.find({email: email});

            if (user) {
                return user;
            } else {
                console.error('Usuario no encontrado');
                return null;
            }
        } catch (err) {
            console.error('Error al leer el archivo de usuarios:', err);
            return null;
        }
    }
}

    export default UserManager;