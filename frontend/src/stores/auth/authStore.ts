import { CredentialResponse } from '@react-oauth/google';
import { action, computed, makeObservable, observable } from 'mobx';

import User from '../../models/User';
import authService from '../../services/authService';

class AuthStore {
  loading = true;
  user: User | undefined = undefined;

  constructor() {
    makeObservable(this, {
      isAuth: computed,
      loading: observable,
      user: observable,
      fetchUser: action.bound,
      login: action.bound,
      logout: action.bound,
      refreshToken: action.bound,
      setToken: action.bound,
      setUser: action.bound,
    });
  }

  get isAuth() {
    return !!this.user?.id;
  }

  setToken(accessToken: string | null) {
    if (accessToken) {
      localStorage.setItem('accessToken', accessToken);
    } else {
      localStorage.removeItem('accessToken');
    }
  }

  setUser(user?: User) {
    this.user = user;
  }

  async login(response: CredentialResponse) {
    try {
      const res = await authService.login(response.credential || '');
      if (res) {
        this.setUser(new User(res.user));
        this.setToken(res.accessToken);
      }
    } catch (e) {
      console.error(e);
    }
  }
  
  async refreshToken() {
    try {
      const token = await authService.refreshToken();
      this.setToken(token);
      return token;
    } catch (error) {
      console.error('Failed to refresh token:', error);
      this.logout();
    }
  }

  async logout() {
    try {
      await authService.logout();
      this.setToken(null);
      this.setUser();
    } catch (error) {
      console.error('Failed to logout', error);
      this.logout();
    }
  }

  async fetchUser() {
    try {
      const user = await authService.currentUser();
      this.setUser(new User(user));
    } catch (e) {
      console.error(e);
    } finally {
      this.loading = false;
    }
  }
}

export default new AuthStore();
