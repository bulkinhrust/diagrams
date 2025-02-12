import User from '../models/User';
import http from './api';
import { UserDto } from './dtos';
import { mapDtoToUser } from './mappers';

const URL = '/api/auth';

type ReturnToken = { token: string };
type ReturnUser = { accessToken: string, user: UserDto };

class UserService {
  async login(credential: string): Promise<{ accessToken: string; user: User }> {
    const res = await http.post<ReturnUser, { token: string }>(`${URL}/login`, { token: credential });
    
    return {
      accessToken: res.accessToken, 
      user: mapDtoToUser(res.user),
    };
  }

  async refreshToken() {
    const res = await http.get<ReturnToken>(`${URL}/refresh`);
    return res?.token;
  }

  async currentUser() {
    const userDto = await http.get<UserDto>(`${URL}/currentUser`);

    return mapDtoToUser(userDto);
  }

  async logout() {
    return await http.get(`${URL}/logout`);
  }
}

export default new UserService;