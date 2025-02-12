import { action, computed, makeObservable, observable } from 'mobx';

import User from '../../models/User';
import { googleLogout, useGoogleLogin, CredentialResponse, CodeResponse } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import authService from '../../services/authService';

class AuthStore {
  loading = true;
  user: User | undefined = undefined;
  accessToken: string | null = localStorage.getItem('accessToken');

  constructor() {
    makeObservable(this, {
      isAuth: computed,
      loading: observable,
      accessToken: observable,
      user: observable,
      // checkAuth: action.bound,
      fetchUser: action.bound,
      login: action.bound,
      // loginWithToken: action.bound,
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
    this.accessToken = accessToken;
    if (accessToken) {
      localStorage.setItem('accessToken', accessToken);
    } else {
      localStorage.removeItem('accessToken');
    }
  }

  setUser(user?: User) {
    this.user = user;
  }

  // async checkAuth() {
  //   if (!this.accessToken) {
  //     await this.refreshToken();
  //   }

  //   try {
  //     const user = await authService.checkAuth(); // Получаем данные пользователя
  //     if (user) {
  //       this.setUser(user);
  //     }
  //   } catch (error) {
  //     console.error('Failed to fetch user:', error);
  //     this.logout();
  //   }
  // }

  // async login() {
  //   try {
  //     const res = await authService.login();
  //   } catch (e) {
  //     console.error(e);
  //   }
  // }

  async login(response: CredentialResponse) {
    try {
      console.log(response);
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

  logout() {
    googleLogout();
    this.setUser();
    this.setToken(null);
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

  // async loginWithToken(code: string) {
  //   try {
  //     const res = await authService.loginWithToken(code);
  //     this.setToken(res.accessToken);
  //     this.user = res.user;
  //   } catch (e) {
  //     console.error(e);
  //   }
  // }
}

export default new AuthStore();
