import { UsersRepository } from '../repositories/users.repository.js';

export class UsersService {
  constructor() {
    this.usersRepository = new UsersRepository();
  }

  getUserById = async (id) => {
    return this.usersRepository.findUserById(id);
  };
}
