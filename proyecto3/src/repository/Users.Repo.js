import UserDTO from "../dao/dto/usersDTO.js"

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

    showUser = async (data) => {
        let result = new UserDTO(data);
        return result
    }

    addTicketToUser = async (userId, ticket) => {
        let result = await this.dao.addTicket(userId, ticket);
        return result
    }
}