import Chats from '../dao/mongo/messages.mongo.js';
import MessageRepository from './Messages.Repo.js';

export const chatsService = new MessageRepository(new Chats())