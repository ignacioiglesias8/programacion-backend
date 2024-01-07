import 'dotenv/config'; 
import mongoose from "mongoose";
import chai from 'chai';
import supertest from 'supertest';

const uri= process.env.MONGO_URL
const PORT = process.env.PORT

mongoose.connect(uri)

const expect = chai.expect;
const request = supertest(`http://localhost:${PORT}/api/products`)
let createdProductId;

describe('Testing Products Router', () => {
    describe('GET /', () => {
        it('Debe retornar un arreglo de productos', async () => {

            const {
                statusCode, 
                _body
            } = await request.get('/');

            expect(statusCode).to.equal(200);
            expect(_body.payload).to.be.an('array');
        });
    });

    describe('GET /:pid', () => {
        it('Debe retornar un producto con Id válido', async () => {
            const productId = '654e8d9cdd7bc5ac119b66c0';

            const {
                statusCode, 
                _body
            } = await request.get(`/${productId}`);

            expect(statusCode).to.equal(200);
            expect(_body).to.have.property('product');
        });

        it('No debe retornar un producto: Id inválido', async () => {
            const productId = '654e8d9cdd7bc5ac119b66c2';

            const response = await request.get(`/${productId}`);

            expect(response.statusCode).to.equal(200);
            expect(response.res._events).to.have.property('error');
        });
    });

    describe('POST /', () => {
        it('Debe crear un producto nuevo con Id de Mongo', async () => {
            const productMock = {
                title: 'Producto Test',
                description: 'Esto es un producto test',
                price: 19.99,
                code: 'TP001',
                stock: 10,
                category: 'Categoría test',
                owner: 'admin@test.com',  
            };

            const {
                statusCode, 
                _body
            } = await request.post('/').send(productMock);

            createdProductId = _body.payload._id;

            expect(statusCode).to.equal(200);
            expect(_body).to.have.property('payload').that.has.property('_id');
        });

        it('No debe crear un nuevo producto: error del servidor', async () => {
            const productMock = {
                title: 'Producto Test',
                description: 'Esto es un producto test',
                price: 19.99,
                code: 'pack01',
                stock: 10,
                category: 'Categoría test',
                owner: 'admin@test.com',  
            };

            const response = await request.post('/').send(productMock);

            expect(response.status).to.equal(500);
            expect(response.res._events).to.have.property('error');
        });
    });

    describe('PUT /:pid', () => {
        it('Debe modificar el producto creado', async () => {
            const productId = createdProductId;
            const modifications = {status: "false"};

            const {
                statusCode, 
                _body
            } = await request.put(`/${productId}`).send(modifications);

            expect(statusCode).to.equal(200);
            expect(_body.updatedProduct[0]).to.have.property('status').that.equals(false);
        });
    });

    describe('DELETE /:pid', () => {
        it('Debe eliminar el producto creado y modificado', async () => {
            const productId = createdProductId;

            const {
                statusCode, 
                _body
            } = await request.delete(`/${productId}`)

            expect(statusCode).to.equal(200);
            expect(_body.result).to.have.property('acknowledged').that.equals(true);
        });
    });
});