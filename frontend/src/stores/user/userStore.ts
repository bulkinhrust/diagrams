import { makeAutoObservable } from 'mobx';

import User from '../../models/User';

class UserStore {
  private _isAuth = false;
  private _user = new User();

  constructor() {
    makeAutoObservable(this);
  }

  setIsAuth(isAuth: boolean) {
    this._isAuth = isAuth;
  }

  setUser(user: User) {
    this._user = user;
  }

  get isAuth() {
    return this._isAuth;
  }

  get user() {
    return this._user;
  }
}

export default new UserStore();
