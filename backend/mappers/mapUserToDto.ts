import User from '../db/models/User';
import { UserDto } from '../types/UserDto';

export const mapUserToDto = (user: User): UserDto => ({
  id: user.id,
  email: user.email,
  name: user.name,
  role: user.role,
  picture: user.picture,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
});
