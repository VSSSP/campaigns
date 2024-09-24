import { Repository } from 'typeorm';
import { User } from '../domain/entities/User';
import { IUserRepository } from '../domain/interfaces/IUserRepository';
import { AppDataSource } from '../data-source'; 

export class UserRepository implements IUserRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository(User);
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.ormRepository.findOne({ where: { email } });
  }

  async save(user: User): Promise<User> {
    return await this.ormRepository.save(user);
  }
}
