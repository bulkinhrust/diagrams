import Diagram from '../models/Diagram';
import User from '../models/User';

export const users = [
  new User({ id: 1, email: 'user1@mail.ru' }),
  new User({ id: 2, email: 'user2@mail.ru' }),
  new User({ id: 3, email: 'user3@mail.ru' }),
  new User({ id: 4, email: 'user4@mail.ru' }),
  new User({ id: 5, email: 'user5@mail.ru' }),
];

export const diagrams = [
  new Diagram({ id: 1, name: 'Diagram 1', author: users[0] }),
  new Diagram({ id: 2, name: 'Diagram 2', author: users[0] }),
  new Diagram({ id: 3, name: 'Diagram 3', author: users[1] }),
  new Diagram({ id: 4, name: 'Diagram 4', author: users[1] }),
  new Diagram({ id: 5, name: 'Diagram 5', author: users[1] }),
  new Diagram({ id: 6, name: 'Diagram 6', author: users[0] }),
  new Diagram({ id: 7, name: 'Diagram 7', author: users[0] }),
  new Diagram({ id: 8, name: 'Diagram 8', author: users[0] }),
  new Diagram({ id: 9, name: 'Diagram 9', author: users[0] }),
  new Diagram({ id: 10, name: 'Diagram 10', author: users[0] }),
];
