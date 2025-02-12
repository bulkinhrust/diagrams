import User from '../models/User';
import http from './api';

const URL = '/api/auth';

type ReturnToken = { token: string };
type ReturnUser = { refreshToken: string, accessToken: string, user: User };

class UserService {
  async login(credential: string) {
    const res = await http.post<ReturnUser, { token: string }>(`${URL}/login`, { token: credential });
    return res;
  }
  // async login() {
  //   const res = await http.post<ReturnUser, { token: string }>(`${URL}login`);

  //   return res;
  // }

  async refreshToken() {
    const res = await http.get<ReturnToken>(`${URL}/refresh`);
    return res?.token;
  }

  // async checkAuth() {
  //   console.log(4);
  //   const res = await http.get<{ user: User }>(`${URL}/check`);

  //   return res.user;
  // }

  async currentUser() {
    const res = await http.get<{ user: User }>(`${URL}/currentUser`);

    return res.user;
  }

  // async loginWithToken(code: string): Promise<{ user: User, accessToken: string }> {
  //   const res = await http.post<{ user: User, accessToken: string }, { code: string}>(`${URL}/loginWithToken`, { code });

  //   return res;
  // }
}

export default new UserService;