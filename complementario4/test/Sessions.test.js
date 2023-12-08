import mongoose from "mongoose";
import chai from 'chai';
import supertest from 'supertest';

mongoose.connect('mongodb+srv://ignacioiglesias8:9HzbVxanl92pkney@cluster0.paoiaa9.mongodb.net/ecommerce?retryWrites=true&w=majority')

const expect = chai.expect;
const request = supertest('http://localhost:8080/api/sessions')

describe('Testing Sessions Router', () => {

});

//terminar