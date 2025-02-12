import User from '../../models/User';
import { UserDto } from '../dtos';

export const mapDtoToUser = (dto: UserDto) => (
  new User({
    id: dto.id,
    email: dto.email,
    name: dto.name || dto.email,
    picture: dto.picture,
  })
);