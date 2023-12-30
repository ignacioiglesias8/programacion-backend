import UsersDTO from "../dao/dto/usersDTO.js"

export default class UserRepository {
    constructor (dao){
        this.dao = dao;
    }

    getUser = async (data) => {
        let result = await this.dao.findByEmail(data);
        return result
    }

    createNewUser = async (data) => {
        let result = await this.dao.createUserDB(data);
        return result
    }

    searchUser = async (query) => {
        let result = await this.dao.findUserByQuery(query);
        return result
    }

    addTicketToUser = async (email, ticket) => {
        let user = await this.dao.findByEmail(email)
        let result = await this.dao.addTicket(user[0]._id, ticket);
        return result
    }

    removeTicketFromUser = async (userId) => {
        let result = await this.dao.removeTicket(userId);
        return result
    }

    updateNewPassword = async (userId, password) => {
        let result = await this.dao.updatePassword(userId, password);
        return result
    }

    updateNewRole = async (userId, newRole) => {
        let result = await this.dao.updateRole(userId, newRole);
        return result
    }

    getAllUsers = async () => {
        let result = await this.dao.getUsers();
        return result
    }

    showAllUsers = async (data) => {
        let result = new UsersDTO(data);
        return result
    }

    deleteOneUser = async (_id) => {
        let result = await this.dao.deleteUserById(_id);
        return result
    }
}