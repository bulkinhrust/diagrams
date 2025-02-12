export default class User {
  id = 0;

  email = '';

  name = '';

  picture?: string;

  constructor(data?: User) {
    if (data) {
      this.id = data.id;
      this.email = data.email;
      this.name = data.name;
      this.picture = data.picture;
    }
  }
}
