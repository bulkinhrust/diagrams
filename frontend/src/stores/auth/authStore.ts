import { CredentialResponse } from '@react-oauth/google';
import { AxiosError } from 'axios';
import { action, computed, makeObservable, observable } from 'mobx';

import User from '../../models/User';
import authService, { RegisterData } from '../../services/authService';

class AuthStore {
  loading = true;
  user: User | undefined = undefined;

  constructor() {
    makeObservable(this, {
      isAuth: computed,
      loading: observable,
      user: observable,
      fetchUser: action.bound,
      googleLogin: action.bound,
      login: action.bound,
      logout: action.bound,
      refreshToken: action.bound,
      register: action.bound,
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

  async register(data: RegisterData): Promise<boolean | string> {
    try {
      await authService.register(data);
      return true;
    } catch (e) {
      if (e instanceof Error) {
        return e.message;
      }
      return false;
    }
  }

  async login(data: RegisterData): Promise<boolean | string> {
    try {
      const res = await authService.login(data);
      if (res) {
        this.setUser(res.user);
        this.setToken(res.accessToken);
      }
      return true;
    } catch (e) {
      if (e instanceof AxiosError) {
        return e.response?.data.message;
      }
      return false;
    }
  }

  async googleLogin(response: CredentialResponse) {
    try {
      const res = await authService.googleLogin(response.credential || '');
      if (res) {
        this.setUser(new User(res.user));
        this.setToken(res.accessToken);
      }
    } catch (e) {
      console.error('Failed to google login');
    }
  }
  
  async refreshToken() {
    try {
      const token = await authService.refreshToken();
      this.setToken(token);
      return token;
    } catch (error) {
      console.error('Failed to refresh token');
      this.logout();
    }
  }

  async logout() {
    try {
      await authService.logout();
      this.setToken(null);
      this.setUser();
    } catch (error) {
      console.error('Failed to logout');
      this.logout();
    }
  }

  async fetchUser() {
    try {
      const user = await authService.currentUser();
      this.setUser(new User(user));
    } catch (e) {
      console.error('Failed to get user');
    } finally {
      this.loading = false;
    }
  }
}

export default new AuthStore();
