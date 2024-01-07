import 'dotenv/config'; 
import mongoose from "mongoose";
import chai from 'chai';
import supertest from 'supertest';

const uri= process.env.MONGO_URL
const PORT = process.env.PORT

import { userModel } from '../src/dao/models/users.model.js';
import { cartModel } from '../src/dao/models/carts.model.js';

mongoose.connect(uri)

const expect = chai.expect;
const sessionRequest = supertest(`http://localhost:${PORT}/api/sessions`)
const userRequest = supertest(`http://localhost:${PORT}/api/users`)
let createdUserId;
let createdCartId;

describe('Testing Sessions Router', () => {
    describe('POST /register', () => {
        it('Debe registrar un usuario nuevo', async () => {

            const userMock = {
                first_name: "Test",
                last_name: "Funcional",
                email: "test@example.com",
                age: 0,
                password: "test",
                cart: [],
            }

            const {
                statusCode, 
                header
            } = await sessionRequest.post('/register').send(userMock);

            const user = await userRequest.get(`/${userMock.email}`);
            const responseBody = JSON.parse(user.text);
            createdUserId =  responseBody.user[0]._id;
            createdCartId = responseBody.user[0].cart[0].cartInfo._id

            expect(statusCode).to.equal(302);
            expect(header.location).to.equal('/login');
        });
    });

    describe('GET /failRegister', () => {
        it('Debe fallar en registrar un usuario nuevo: Usuario ya existe', async () => {

            const userMock = {
                first_name: "Test",
                last_name: "Funcional",
                email: "ignacioiglesias8@gmail.com",
                age: 0,
                password: "test",
                cart: [],
            }

            const {
                statusCode, 
                header
            } = await sessionRequest.get('/failRegister').send(userMock);

            expect(statusCode).to.equal(302);
            expect(header.location).to.equal('/register');
        });
    });

    describe('POST /login', () => {
        it('Debe logearse un usuario', async () => {

            const userCredentials = {
                email: 'test@example.com',
                password: 'test',
            };

            const {
                statusCode, 
                header,
            } = await sessionRequest.post('/login').send(userCredentials);

            expect(statusCode).to.equal(302);
            expect(header.location).to.equal('/products');
        });
    });

    describe('GET /failLogin', () => {
        it('No debe logearse un usuario: Credenciales inválidas', async () => {

            const userCredentials = {
                email: 'ignacioiglesias8@gmail.com',
                password: 'test',
            };

            const {
                statusCode, 
                _body
            } = await sessionRequest.get('/failLogin').send(userCredentials);

            expect(statusCode).to.equal(200);
            expect(_body).to.have.property('status').that.equals('error')
        });
    });

    describe('GET /logout', () => {
        it('Debe desloguearse el usuario', async () => {

            const {
                statusCode, 
                header
            } = await sessionRequest.get('/logout')

            expect(statusCode).to.equal(302);
            expect(header.location).to.equal('/login');
        });
    });

    describe('GET /github y /githubcallback', () => {
        it('Debe redirigir a github para su autenticación', async () => {
            
            const { 
                statusCode,
            } = await sessionRequest.get('/github');

            expect(statusCode).to.equal(302);
        });
    
        it('Debe autenticar con github y redirigr a products', async () => {
            
            const { 
                statusCode, 
            } = await sessionRequest.get('/githubcallback');
    
            expect(statusCode).to.equal(302);
        });
    });

    after(async () => {
        await userModel.deleteOne({ _id: createdUserId });
        await cartModel.deleteOne({ _id: createdCartId });
    });
});