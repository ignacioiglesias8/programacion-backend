import 'dotenv/config'; 
import mongoose from "mongoose";
import chai from 'chai';
import supertest from 'supertest';

const uri= process.env.MONGO_URL
const PORT = process.env.PORT

import { cartModel } from '../src/dao/models/carts.model.js';

mongoose.connect(uri)

const expect = chai.expect;
const request = supertest(`http://localhost:${PORT}/api/carts`)
let createdCartId;

describe('Testing Carts Router', () => {
    describe ('POST /', () => {
        it('Debe crear un carrito nuevo con Id de Mongo', async () => {

            const {
                statusCode, 
                _body
            } = await request.post('/');

            createdCartId = _body.cart._id;
    
            expect(statusCode).to.equal(200);
            expect(_body.cart).to.have.property('_id');
        });
    })

    describe('GET /:pid', () => {
        it('Debe retornar el carrito creado con Id válido', async () => {
            const cartId = createdCartId;

            const {
                statusCode, 
                _body
            } = await request.get(`/${cartId}`);

            expect(statusCode).to.equal(200);
            expect(_body).to.have.property('cart');
        });

        it('No debe retornar un carrito: Id inválido', async () => {
            const cartId = '654e8d9cdd7bc5ac119b66c2';

            const response = await request.get(`/${cartId}`);

            expect(response.statusCode).to.equal(200);
            expect(response.res._events).to.have.property('error');
        });
    });

    describe('POST /:cid/product/:pid', () => {
        it('Debe agregar un producto al carrito creado', async () => {
            const cartId = createdCartId;
            const productId = "654e8d9cdd7bc5ac119b66c0"

            const {
                statusCode, 
                _body
            } = await request.post(`/${cartId}/product/${productId}`);

            expect(statusCode).to.equal(200);
            expect(_body[0]).to.have.property('products').that.is.an('array').and.to.have.length.greaterThan(0);
        });

        it('Debe agregar cantidad +1 al producto agregado al carrito', async () => {
            const cartId = createdCartId;
            const productId = "654e8d9cdd7bc5ac119b66c0"

            const {
                statusCode, 
                _body
            } = await request.post(`/${cartId}/product/${productId}`);

            expect(statusCode).to.equal(200);
            expect(_body[0].products[0]).to.have.property('quantity').that.equal(2);
        });

        it('No debe agregar un producto al carrito: Producto no encontrado', async () => {
            const cartId = createdCartId;
            const productId = "654e8d9cdd7bc5ac119b66c2"

            const response = await request.get(`/${cartId}/product/${productId}`);

            expect(response.statusCode).to.equal(404);
            expect(response.res._events).to.have.property('error');
        });
    });
    
    describe ('PUT /', () => {
        it('Debe modificar todo el carrito creado', async () => {
            const cartId = createdCartId;

            const modification = {
                products: [
                    {
                        product: "654e8de0dd7bc5ac119b66c2",
                        quantity: 4
                    },
                    {
                        product: "654e8e05dd7bc5ac119b66c4",
                        quantity: 3
                    },
                    {
                        product: "654e8e36dd7bc5ac119b66c6",
                        quantity: 5
                    },
                ]
            };

            const {
                statusCode, 
                _body
            } = await request.put(`/${cartId}`).send(modification);

            expect(statusCode).to.equal(200);
            expect(_body[0].products[0]).to.have.property('product').that.has.property('_id').that.equal('654e8de0dd7bc5ac119b66c2');
            expect(_body[0].products[1]).to.have.property('product').that.has.property('_id').that.equal('654e8e05dd7bc5ac119b66c4');
            expect(_body[0].products[2]).to.have.property('product').that.has.property('_id').that.equal('654e8e36dd7bc5ac119b66c6');
            expect(_body[0].products[0]).to.have.property('quantity').that.equal(4);
            expect(_body[0].products[1]).to.have.property('quantity').that.equal(3);
            expect(_body[0].products[2]).to.have.property('quantity').that.equal(5);
        });
    })

    describe ('PUT /', () => {
        it('Debe modificar la cantidad del producto en el carrito', async () => {
            const cartId = createdCartId;
            const productId= "654e8de0dd7bc5ac119b66c2";

            const modification = {
                quantity: 2
            };

            const {
                statusCode, 
                _body
            } = await request.put(`/${cartId}/product/${productId}`).send(modification);

            expect(statusCode).to.equal(200);
            expect(_body[0].products[0]).to.have.property('quantity').that.equal(2);
        });
    })

    describe ('DELETE /', () => {
        it('Elimina un determinado producto del carrito', async () => {
            const cartId = createdCartId;
            const productId= "654e8e05dd7bc5ac119b66c4";

            const {
                statusCode, 
                _body
            } = await request.delete(`/${cartId}/product/${productId}`);

            expect(statusCode).to.equal(200);
            expect(_body[0].products[1]).to.have.property('product').that.has.property('_id').that.equal('654e8e36dd7bc5ac119b66c6');
        });
    })

    describe ('DELETE /', () => {
        it('Elimina todos los productos del carrito', async () => {
            const cartId = createdCartId;

            const {
                statusCode, 
                _body
            } = await request.delete(`/${cartId}`);

            expect(statusCode).to.equal(200);
            expect(_body[0].products).to.be.an('array').that.is.empty;
        });
    })

    after(async () => {
        await cartModel.deleteOne({ _id: createdCartId });
    });
});