import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { validationMiddleware } from '../middlewares/validationMiddleware';
import { loginSchema } from '../schemas/userSchema';

const router = Router();
const userController = new UserController();

router.post(
  '/login',
  validationMiddleware(loginSchema),
  userController.login.bind(userController),
);

router.post(
  '/register',
  validationMiddleware(loginSchema),
  userController.register.bind(userController),
);

export default router;