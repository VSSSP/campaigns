import { Request, Response } from 'express';
import { UserUseCase } from '../usecase/User';

export class UserController {
  private userUseCase = new UserUseCase();

  async login(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    try {
      const token = await this.userUseCase.login(email, password);
      return res.json({ token });
    } catch (error) {
      return this.handleError(res, error);
    }
  }

  async register(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    try {
      const user = await this.userUseCase.register(email, password);
      return res.status(201).json(user);
    } catch (error) {
      return this.handleError(res, error);
    }
  }

  private handleError(res: Response, error: unknown): Response {
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message });
    }
    return res.status(400).json({ message: 'An unknown error has occurred.' });
  }
}
