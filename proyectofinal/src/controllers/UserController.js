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

    async updateUserNewPassword(userId, newPassword) {
        try{
            const user = await usersService.updateNewPassword(userId, newPassword);
            return user;
        }catch (err) {
            console.error('Error al cambiar el password', err);
            return null;
        }
    }

    async updateUserNewRole(userId, newRole) {
        try{
            const user = await usersService.updateNewRole(userId, newRole);
            return user;
        }catch (err) {
            console.error('Error al cambiar el password', err);
            return null;
        }
    }

    async getUsers() {
        try {
            const users = await usersService.getAllUsers();
            return users;
        } catch (err) {
            console.error('Error al obtener usuarios:', err);
            return [];
        }
    }

    async showUsers(data) {
        try {
            const user = await usersService.showAllUsers(data);
            return user;
        }catch (err) {
            console.error('Error al buscar usuario:', err);
            return null;
        }
    }

    async deleteUser(_id) {
        try {
            const result = await usersService.deleteOneUser({_id});
            return result
        }catch (err) {
            console.error('Error al leer el archivo de usuarios:', err);
        }
    }
}

    export default UserController;