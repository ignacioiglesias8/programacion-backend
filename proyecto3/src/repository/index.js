import Chats from '../dao/mongo/messages.mongo.js';
import Users from '../dao/mongo/users.mongo.js';
import Products from '../dao/mongo/products.mongo.js';
//import Carts from '../dao/mongo/carts.mongo.js';

import MessagesRepository from './Messages.Repo.js';
import UsersRepository from './Users.Repo.js';
import ProductsRepository from './Products.Repo.js';
//import CartsRepository from './Carts.Repo.js';

export const chatsService = new MessagesRepository(new Chats())
export const usersService = new UsersRepository(new Users())
export const productsService = new ProductsRepository(new Products())
//export const cartsService = new CartsRepository(new Carts())