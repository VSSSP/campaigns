import { User } from '../domain/entities/User';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import { UserRepository } from '../repositories/UserRepository';

export class UserUseCase {
  private userRepository = new UserRepository();

  async login(email: string, password: string): Promise<string> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    const passwordMatched = await bcrypt.compare(password, user.password);
    if (!passwordMatched) {
      throw new Error('Senha incorreta');
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || '', {
      expiresIn: '1d',
    });

    return token;
  }

  async register(email: string, password: string): Promise<User> {
    const user = new User();
    user.email = email;
    user.password = password;
    return await this.userRepository.save(user);
  }
}
