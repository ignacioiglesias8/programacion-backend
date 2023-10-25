import Users from '../dao/mongo/users.mongo.js';

const usersService = new Users();

class UserManager {
    async getUserByEmail(email) {
        try {
            const user = await usersService.findByEmail(email);

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
            const newUser = await usersService.createNew(userData);
            return newUser;
        } catch (err) {
            console.error('Error al crear un nuevo usuario:', err);
            return null;
        }
    }

    async findOneUser(query) {
        try {
            const user = await usersService.findUser(query);
            return user;
        } catch (err) {
            console.error('Error al buscar usuario:', err);
            return null;
        }
    }
}

    export default UserManager;