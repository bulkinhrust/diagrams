import User from './User';

export default class Diagram {
  id = 0;

  name = '';

  author: User = new User();

  constructor(data?: Diagram) {
    if (data) {
      this.id = data.id;
      this.name = data.name;
      this.author = data.author;
    }
  }
}
