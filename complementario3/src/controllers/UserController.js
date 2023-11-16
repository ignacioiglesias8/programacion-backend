import {usersService} from '../repository/index.js'

class UserController {
    async getUserByEmail(email) {
        try {
            const user = await usersService.getUser({email: email});

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

    async createUser(userData) {
        try {
            const newUser = await usersService.createNewUser(userData);
            return newUser;
        } catch (err) {
            console.error('Error al crear un nuevo usuario:', err);
            return null;
        }
    }

    async findOneUser(query) {
        try {
            const user = await usersService.searchUser(query);
            return user;
        } catch (err) {
            console.error('Error al buscar usuario:', err);
            return null;
        }
    }

    async showCurrentUser(data) {
        try {
            const user = await usersService.showUser(data);
            return user;
        }catch (err) {
            console.error('Error al buscar usuario:', err);
            return null;
        }
    }
}

    export default UserController;