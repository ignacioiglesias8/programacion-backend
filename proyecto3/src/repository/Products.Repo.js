export default class ProductRepository {
    constructor (dao){
        this.dao = dao;
    }

    createProduct = async (data) => {
        let result = await this.dao.createDoc(data);
        return result
    }

    paginateProducts = async (filters, options) => {
        let result = await this.dao.paginateDocs(filters, options);
        return result
    }

    getById = async (_id) => {
        let result = await this.dao.getDocById(_id);
        return result
    }

    updateById = async (_id, product) => {
        let result = await this.dao.updateDocById(_id, product);
        return result
    }

    deleteById = async (_id) => {
        let result = await this.dao.deleteDocById(_id);
        return result
    }
}