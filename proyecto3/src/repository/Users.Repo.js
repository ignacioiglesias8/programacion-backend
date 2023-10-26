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
}