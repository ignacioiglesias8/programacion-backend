import { userModel } from '../db/models/users.model.js';
import {createHash, isValidPassword} from '../../functions/bcrypt.js';

class UserManager {
    async createUser(user) {
        try {
            user.password = createHash(user.password);
            return await userModel.create(user);
        } catch (error) {
            throw new Error(error.message.replace(/"/g, "'"));
        }
    }

    async login(email, password) {
        try {
            const user = await userModel.find({email: email});

            if (user.length > 0 && isValidPassword(user[0], password)) {
                return user[0];
            }
            
            throw new Error('Login failed');

        } catch (error) {
            throw new Error(error.message.replace(/"/g, "'"));
        }
    }

    async generateWelcomeMessage(first_name, last_name, email, age) {
        return `
            <h1>Bienvenido ${first_name} ${last_name}</h1>
            <hr>
            <h2>Tus datos son:</h2>
            <div class="userData">
                <p><b>Nombre:</b> ${first_name}</p>
                <p><b>Apellido:</b> ${last_name}</p>
                <p><b>Email:</b> ${email}</p>
                <p><b>Edad:</b> ${age}</p>
            </div>
        `;
    }
}

export default UserManager;