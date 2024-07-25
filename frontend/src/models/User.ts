export default class User {
  id = 0;

  email = '';

  constructor(data?: User) {
    if (data) {
      this.id = data.id;
      this.email = data.email;
    }
  }
}
